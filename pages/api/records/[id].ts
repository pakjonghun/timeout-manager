import { NextApiResponse, NextApiRequest } from "next";
import client from "@libs/server/client";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import { GetRecordResponse } from "@libs/server/types/dataTypes";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetRecordResponse>
) => {
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { start, end, duration } = req.body;

    const data = {
      ...(start && { start: new Date(start) }),
      ...(end && { end: new Date(end) }),
      ...(duration && { duration }),
    };
    await client.workTimes.update({
      where: {
        id: +id.toString(),
      },
      data,
    });

    return res.json({ success: true });
  }
};

export default withCookie(
  withMethod({
    methods: ["DELETE"],
    handler,
  })
);
