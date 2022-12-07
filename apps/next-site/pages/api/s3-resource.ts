import { NextApiHandler } from "next"
import {  getObjectUrl } from "utils/s3Utils"

const handler: NextApiHandler = async (req, res) => {
  res.redirect(await getObjectUrl(req.query.key))
}
export default handler
