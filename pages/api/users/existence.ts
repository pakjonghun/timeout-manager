import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone, email } = req.body;

  const isExist = await client.users.findFirst({
    where: {
      OR: [
        { ...(phone && { phone: phone.toString() }) },
        { ...(email && { email: email.toString() }) },
      ],
    },
  });

  if (!isExist) {
    return res.status(400).end();
  }

  res.status(200).end();
};

export default withMethod({ methods: ["POST"], handler, isPrivate: false });
