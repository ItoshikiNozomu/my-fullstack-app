import { NextApiHandler } from "next"

const handler: NextApiHandler = (req, resp) => {
  resp.json({
    message: req.query.message,
  })
}
export default handler
