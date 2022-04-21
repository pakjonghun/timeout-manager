import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authNumber, phone, email } = req.body;
  const auth = await client.auths.findFirst({
    where: {
      authNumber,
      user: {
        ...(email && { email }),
        ...(phone && { phone }),
      },
    },
    select: {
      id: true,
      userId: true,
      user: {
        select: {
          role: true,
          status: true,
        },
      },
    },
  });

  if (!auth) return res.status(401).json({ success: false });

  await client.auths.deleteMany({
    where: {
      userId: auth.userId,
    },
  });

  req.session.user = {
    id: auth.userId,
    role: auth.user.role,
  };
  await req.session.save();

  res
    .status(200)
    .json({
      success: true,
      user: { role: auth.user.role, status: auth.user.status },
    });
};

export default withCookie(
  withMethod({ methods: ["POST"], handler, isPrivate: false })
);
