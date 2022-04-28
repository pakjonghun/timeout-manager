import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "PATCH") {
    const data = req.body;
    await client.posts.update({
      where: {
        id: +id.toString(),
      },
      data,
    });
  }

  if (req.method === "DELETE") {
    await client.posts.delete({
      where: { id: +id.toString() },
    });
  }

  if (req.method === "GET") {
    const post = await client.posts.findUnique({
      where: { id: +id.toString() },
      include: {
        user: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    return res.json({ success: true, post });
  }

  return res.json({ success: true });
};

export default withCookie(
  withMethod({ methods: ["DELETE", "PATCH", "GET"], handler })
);
