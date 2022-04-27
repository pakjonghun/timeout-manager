import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import client from "@libs/server/client";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
  res.unstable_revalidate("/path-to-notices");
  return res.status(201).json({ success: true });
};

export default withCookie(withMethod({ methods: ["POST"], handler }));
