import { NextApiHandler } from "next"

const handler: NextApiHandler = (req, resp) => {
  // console.log(req)
  resp.json({
    message: req.query.message,
  })
}
export default handler
