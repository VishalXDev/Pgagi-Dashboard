import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// Default export function for the API route
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Respond with a JSON object
  res.status(200).json({ name: "Vishal Dwivedy" });
}
