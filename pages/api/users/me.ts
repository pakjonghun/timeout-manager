import { MeResponse } from "./../../../libs/server/types/dataTypes";
import { NextApiResponse, NextApiRequest } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MeResponse>
) => {
  const { status } = req.query;

  if (status) {
    const user = await client.users.findUnique({
      where: { id: req.session!.user!.id },
      select: {
        id: true,
        status: true,
      },
    });

    if (!user) return res.status(400).json({ success: false });

    if (user.status === "WORKING") {
      const startTime = await client.workTimes.findMany({
        where: {
          userId: user.id,
          end: null,
        },
        select: {
          id: true,
          start: true,
        },
        take: 1,
        orderBy: {
          start: "desc",
        },
      });

      if (startTime.length) {
        return res.json({
          success: true,
          user: { ...user, startTime: startTime[0] },
        });
      } else {
        await client.users.update({
          where: {
            id: user.id,
          },
          data: {
            status: "NOTWORKING",
          },
        });
      }
    }

    return res.json({ success: true, user });
  } else {
    const user = await client.users.findUnique({
      where: { id: req.session!.user!.id },
      select: {
        id: true,
        status: true,
        role: true,
      },
    });
    if (!user) return res.status(400).json({ success: false });
    res.json({ success: true, user });
  }
};

export default withCookie(withMethod({ methods: ["GET"], handler }));
