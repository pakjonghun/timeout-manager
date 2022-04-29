import withCookie from "@libs/server/withCookie";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone, email } = req.body;
  let addOption;

  if (req.session.user?.id) {
    addOption = {
      id: {
        not: req.session.user.id,
      },
    };
  }

  const isExist = await client.users.findFirst({
    where: {
      ...(addOption && addOption),
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

export default withCookie(
  withMethod({ methods: ["POST"], handler, isPrivate: false })
);
