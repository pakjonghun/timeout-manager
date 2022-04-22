import { NextApiResponse, NextApiRequest } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import { MeType } from "@libs/server/types";

const handler = async (req: NextApiRequest, res: NextApiResponse<MeType>) => {
  const { status } = req.body;

  if (status) {
    const user = await client.users.findUnique({
      where: { id: req.session!.user!.id },
      select: {
        status: true,
      },
    });
    if (!user) return res.status(400).json({ success: false });
    res.json({ success: true, user });
  } else {
    const user = await client.users.findUnique({
      where: { id: req.session!.user!.id },
      select: {
        id: true,
        email: true,
        phone: true,
        avatar: true,
        name: true,
        role: true,
        status: true,
      },
    });
    if (!user) return res.status(400).json({ success: false });
    res.json({ success: true, user });
  }
};

export default withCookie(withMethod({ methods: ["GET"], handler }));
