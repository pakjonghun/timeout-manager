import { CommonResponse } from "@libs/server/types/dataTypes";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import client from "@libs/server/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CommonResponse>
) => {
  const { id, ...data } = req.body;

  const isExist = await client.users.findUnique({ where: { id } });
  if (!isExist) return res.status(400).json({ success: false });

  await client.users.update({
    where: {
      id,
    },
    data,
  });

  return res.json({ success: true });
};

export default withCookie(withMethod({ handler, methods: ["PATCH"] }));
