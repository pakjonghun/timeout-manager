import { NextApiRequest, NextApiResponse } from "next";
import withMethod from "@libs/server/withMethod";
import client from "@libs/server/client";
import { CommonResponse } from "@libs/server/types/dataTypes";

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

  const authKey = Math.floor(Math.random() * 89999 + 10000);

  await client.auths.create({
    data: {
      authNumber: authKey,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  if (phone) {
    const accountSid = process.env.TWILO_SID;
    const authToken = process.env.TWILO_TOKEN;
    const messenger = require("twilio")(accountSid, authToken);
    const phoneNumber = `+82${phone.replace(/-/g, "").trim()}`;
    messenger.messages
      .create({
        body: authKey,
        messagingServiceSid: process.env.TWILO_TIMEOUT_SID,
        to: phoneNumber,
      })
      .then((message: any) => console.log(message.sid))
      .catch((err: unknown) => console.log(err));
  }

  res.status(201).json({ success: true });
};

export default withMethod({ handler, methods: ["POST"], isPrivate: false });
