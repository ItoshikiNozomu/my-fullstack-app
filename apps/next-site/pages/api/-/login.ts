import { format } from "date-fns"
import { STATUS_CODES } from "http"
import { NextApiHandler } from "next"

import { getUserByNameAndPwd, UserProps, createUserToken } from "models/User"
import { setCookieString } from "../../../utils/httpUtils"

const handler: NextApiHandler = async (req, res) => {
  // console.log('xxx',format(Date.now(), "yyyy-MM-dd HH:mm:ss"))
  let u: UserProps
  try {
    const { username, password } = JSON.parse(req.body)
    u = await getUserByNameAndPwd(username, password)
  } catch (e) {
    res.status(500)
    res.json({
      message: String(e),
    })
    // todo log
  }
  if (u) {
    res.setHeader(
      "set-cookie",

      setCookieString({
        key: "token",
        value: await createUserToken(u),
        maxAge: 24 * 10 * 60 * 60,
      }),
    )
    res.json(u)
  }
}

export default handler
