import { decode } from "jsonwebtoken"
import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, resp) => {
  const token = req.cookies.token

  resp.json(decode(token))
}

export default handler
