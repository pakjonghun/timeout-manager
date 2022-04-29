import { NextApiResponse, NextApiRequest } from "next";
import client from "@libs/server/client";
export type HandlerType = (req: NextApiRequest, res: NextApiResponse) => void;
type Methods = "POST" | "GET" | "PATCH" | "DELETE" | "PUT";

type Args = {
  isPrivate?: boolean;
  methods: Methods[];
  handler: HandlerType;
};

const withMethod =
  (args: Args) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { isPrivate = true, methods, handler } = args;
      const isMethodMatch = methods.includes(req.method! as Methods);
      if (!isMethodMatch) return res.status(405).json({ success: false });

      if (isPrivate && !req.session.user) {
        return res.status(401).json({ success: false });
      }

      if (isPrivate && req.session.user) {
        const user = await client.users.findUnique({
          where: { id: req.session.user.id },
        });

        if (!user) {
          req.session.destroy();
          req.session.save();
          return res.status(401).json({ success: false });
        }
      }

      return handler(req, res);
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  };

export default withMethod;
