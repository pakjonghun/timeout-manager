import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import { TimeType } from "@libs/server/types";
import { getCanStartTime } from "@libs/server/utils";

type BodyType = {
  start: string;
  end?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<TimeType>) => {
  if (req.method === "POST") {
    const { start, end } = req.body as BodyType;
    if (!end && start) {
      await client.users.update({
        where: {
          id: req.session.user!.id,
        },
        data: {
          status: "WORKING",
        },
      });

      const time = await client.workTimes.create({
        data: {
          user: {
            connect: {
              id: req.session.user!.id,
            },
          },
          start,
        },
      });

      return res.status(201).json({ success: true, time: time });
    }

    if (start && end) {
      const isTimeExist = await client.workTimes.findFirst({
        where: {
          userId: req.session.user!.id,
          start,
        },
        select: {
          id: true,
          start: true,
        },
      });

      if (!isTimeExist) return res.status(400).json({ success: false });

      const time = await client.workTimes.update({
        where: {
          id: isTimeExist.id,
        },
        data: {
          end,
          duration:
            new Date(end.toString()).getTime() - isTimeExist.start.getTime(),
        },
      });

      await client.users.update({
        where: {
          id: req.session.user!.id,
        },
        data: {
          status: "NOTWORKING",
        },
      });

      return res.status(201).json({ success: true, time });
    }
  }

  if (req.method === "GET") {
    const times = await client.workTimes.findMany({
      where: {
        userId: req.session.user!.id,
        start: {
          gte: getCanStartTime(),
        },
      },
      select: {
        id: true,
        start: true,
        end: true,
        duration: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ success: true, times });
  }
};

export default withCookie(
  withMethod({ methods: ["GET", "POST"], handler, isPrivate: false })
);
