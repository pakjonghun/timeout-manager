import { NextApiResponse, NextApiRequest } from "next";
import withCookie from "@libs/server/withCookie";
import withMethod from "@libs/server/withMethod";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.json({ success: true });
};

export default withCookie(withMethod({ handler, methods: ["GET"] }));
