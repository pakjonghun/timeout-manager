import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import client from "@libs/server/client";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { title, description } = req.body;

    await client.posts.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: req.session.user!.id,
          },
        },
      },
    });

    return res.status(201).json({ success: true });
  }

  if (req.method === "GET") {
    const posts = await client.posts.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.json({ success: true, posts });
  }
};

export default withCookie(withMethod({ methods: ["POST", "GET"], handler }));
