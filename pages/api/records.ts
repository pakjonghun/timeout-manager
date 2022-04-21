import { NextApiResponse, NextApiRequest } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import { pageTake } from "@libs/server/constants";
import {
  RecordSortKeyType,
  SortType,
  UserRecordType,
} from "@libs/server/types";
import { getCanStartTime } from "@libs/server/utils";

type PageType = { page: string };
type PagnationType = { [key in RecordSortKeyType]?: SortType } & PageType;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserRecordType>
) => {
  const { page, createdAt, end, start, duration, name } =
    req.query as PagnationType;

  if (req.method === "GET") {
    if (!page || +page < 1) return res.status(400).json({ success: false });

    const orderBy = {
      ...(name && { user: { name } }),
      ...(createdAt && { createdAt }),
      ...(start && { start }),
      ...(end && { end }),
      ...(duration && { duration }),
    };

    if (req.session?.user?.role === "USER") {
      const records = await client.workTimes.findMany({
        where: {
          userId: req.session?.user?.id,
        },
        select: {
          id: true,
          start: true,
          end: true,
          duration: true,
          createdAt: true,
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

      res.json({
        records,
        success: true,
        totalPage: Math.ceil(totalPage / pageTake),
      });
    }

    if (req.session.user?.role === "ADMIN") {
      const records = await client.workTimes.findMany({
        where: {
          start: {
            gte: getCanStartTime(),
          },
        },
        take: pageTake,
        skip: (+page - 1) * pageTake,
        select: {
          id: true,
          start: true,
          end: true,
          duration: true,
          createdAt: true,
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
  }

  if (req.method === "DELETE") {
    if (req.session.user?.role !== "ADMIN") {
      return res.status(403).json({ success: false });
    }
    const ids = req.body.ids as string[];
    if (!ids?.length) return res.status(400).json({ success: false });

    await client.workTimes.deleteMany({
      where: {
        id: {
          in: ids.map((v) => +v),
        },
      },
    });

    return res.json({ success: true });
  }

  if (req.method === "PATCH") {
    const { id, start, end, duration } = req.body;
    const data = {
      ...(id && { id }),
      ...(start && { start }),
      ...(end && { end }),
      ...(duration && { duration }),
    };
    await client.workTimes.update({
      where: {
        id,
      },
      data,
    });

    return res.json({ success: true });
  }
};

export default withCookie(
  withMethod({
    methods: ["GET", "POST", "DELETE", "PATCH"],
    handler,
    isPrivate: false,
  })
);
