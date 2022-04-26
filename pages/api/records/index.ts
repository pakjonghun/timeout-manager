import { NextApiResponse, NextApiRequest } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import { pageTake } from "@libs/server/constants";
import { getCanStartTime } from "@libs/server/utils";
import { GetRecordRequest } from "@libs/client/types/dataTypes";
import { GetRecordResponse } from "@libs/server/types/dataTypes";
import { addDays } from "date-fns";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetRecordResponse>
) => {
  const {
    page,
    createdAt,
    end,
    start,
    duration,
    name,
    keyWord,
    startDate,
    endDate,
    dates,
  } = req.query as GetRecordRequest;

  const searchCondition = {
    ...(keyWord &&
      keyWord.toString().trim() && {
        user: {
          name: {
            contains: keyWord.trim(),
          },
        },
      }),
    ...(startDate && {
      createdAt: {
        gte: new Date(startDate),
      },
    }),
    ...(endDate && {
      createdAt: {
        lte: new Date(endDate),
      },
    }),
  };

  const OR = [] as { createdAt: { gte: Date; lte: Date } }[];

  if (dates) {
    const parsed = JSON.parse(dates.toString()) as string[];
    parsed.forEach((date) => {
      const obj = {
        createdAt: {
          gte: new Date(date),
          lte: addDays(new Date(date), 1),
        },
      };

      OR.push(obj);
    });
  }

  const orderBy = {
    ...(name && { user: { name } }),
    ...(createdAt && { createdAt }),
    ...(start && { start }),
    ...(end && { end }),
    ...(duration && { duration }),
  };

  if (req.method === "GET") {
    if (!page || +page < 1) return res.status(400).json({ success: false });

    if (req.session?.user?.role === "USER") {
      const records = await client.workTimes.findMany({
        where: {
          userId: req.session?.user?.id,
          ...searchCondition,
          ...(OR.length && { OR }),
        },
        select: {
          id: true,
          start: true,
          end: true,
          duration: true,
        },
        take: pageTake,
        skip: (+page - 1) * pageTake,
        orderBy,
      });

      const totalPage = await client.workTimes.count({
        where: {
          userId: req.session?.user?.id,
        },
      });

      return res.json({
        records,
        success: true,
        totalPage: Math.ceil(totalPage / pageTake),
      });
    }

    const records = await client.workTimes.findMany({
      where: {
        start: {
          gte: getCanStartTime(),
        },
        ...searchCondition,
        ...(OR.length && { OR }),
      },
      take: pageTake,
      skip: (+page - 1) * pageTake,
      select: {
        id: true,
        start: true,
        end: true,
        duration: true,
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            avatar: true,
            status: true,
            role: true,
          },
        },
      },
      orderBy,
    });

    const totalCount = await client.workTimes.count({
      where: {
        start: {
          gte: getCanStartTime(),
        },
      },
    });

    return res.json({
      success: true,
      records,
      totalPage: Math.ceil(totalCount / pageTake),
      totalCount,
    });
  }

  if (req.method === "DELETE") {
    if (req.session.user?.role !== "ADMIN") {
      return res.status(403).json({ success: false });
    }

    const ids = req.body.ids as number[];
    if (!ids?.length) return res.status(400).json({ success: false });

    await client.workTimes.deleteMany({
      where: {
        id: {
          in: ids.map((id) => id),
        },
      },
    });

    return res.json({ success: true });
  }
};

export default withCookie(
  withMethod({
    methods: ["GET", "DELETE"],
    handler,
  })
);
