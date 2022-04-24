import { EndWorkRequest as BodyType } from "./../../libs/client/types/dataTypes";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import { getCanStartTime } from "@libs/server/utils";
import { WorkTimeResponse } from "@libs/server/types/dataTypes";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<WorkTimeResponse>
) => {
  if (req.method === "POST") {
    const { start, end, duration } = req.body as BodyType;

    if (!end && start) {
      await client.users.update({
        where: {
          id: req.session.user!.id,
        },
        data: {
          status: "WORKING",
        },
      });

      const workTime = await client.workTimes.create({
        data: {
          user: {
            connect: {
              id: req.session.user!.id,
            },
          },
          start: new Date(start),
        },
      });
      return res.status(201).json({ success: true, workTime });
    }

    if (start && end && duration) {
      const isTimeExist = await client.workTimes.findFirst({
        where: {
          userId: req.session.user!.id,
          id: start,
        },
      });
      if (!isTimeExist) return res.status(400).json({ success: false });

      const workTime = await client.workTimes.update({
        where: {
          id: isTimeExist.id,
        },
        data: {
          end: new Date(end),
          duration,
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

      return res.status(201).json({ success: true, workTime });
    }

    return res.json({ success: false });
  }

  if (req.method === "GET") {
    const workTimes = await client.workTimes.findMany({
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

    return res.json({ success: true, workTimes });
  }
};

export default withCookie(
  withMethod({ methods: ["GET", "POST"], handler, isPrivate: false })
);
