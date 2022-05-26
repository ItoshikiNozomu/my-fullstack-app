import { NextApiHandler } from "next"
import { setCookieString } from "../../utils/httpUtils"

const handler: NextApiHandler = (req, res) => {
  res.setHeader(
    "set-cookie",
    setCookieString({
      key: "token",
      value: "",
      maxAge: 0,
    })
  )
  res.json({
      message:"ok"
  })
}

export default handler
