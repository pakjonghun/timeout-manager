import { NextApiRequest, NextApiResponse } from "next";
import withMethod from "@libs/server/withMethod";
import client from "@libs/server/client";
import { CommonResponse } from "@libs/server/types/dataTypes";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CommonResponse>
) => {
  const { phone, email, name } = req.body;

  await client.users.create({
    data: {
      phone: phone.toString(),
      email: email.toString(),
      name: name.toString(),
    },
  });
  res.status(201).json({ success: true });
};

export default withMethod({ handler, methods: ["POST"], isPrivate: false });
