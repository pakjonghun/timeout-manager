import { NextApiRequest, NextApiResponse } from "next";
import withMethod from "@libs/server/withMethod";
import client from "@libs/server/client";
import { CommonResponse } from "@libs/server/types/dateTypes";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CommonResponse>
) => {
  const { phone, email } = req.body;
  const user = await client.users.findUnique({
    where: {
      ...(phone && { phone: phone.toString() }),
      ...(email && { email: email.toString() }),
    },
    select: {
      id: true,
    },
  });

  if (!user) return res.status(400).json({ success: false });

  await client.auths.create({
    data: {
      authNumber: Math.floor(Math.random() * 89999 + 10000),
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  res.status(201).json({ success: true });
};

export default withMethod({ handler, methods: ["POST"], isPrivate: false });
