import { format } from "date-fns"
import { STATUS_CODES } from "http"
import { NextApiHandler } from "next"

import User from "../../models/User"
import { setCookieString } from "../../utils/httpUtils"

const handler: NextApiHandler = async (req, res) => {
  // console.log('xxx',format(Date.now(), "yyyy-MM-dd HH:mm:ss"))
  let u: User
  try {
    const { username, password } = JSON.parse(req.body)
    u = await User.getUserByNameAndPwd(username, password)
    res.setHeader(
      "set-cookie",
      //   `token=${encodeURIComponent(u.token)}; max-age=${24*10*60*60}; path=/`
      setCookieString({
        key: "token",
        value: encodeURIComponent(u.token),
        maxAge: 24 * 10 * 60 * 60,
      })
    )
    res.json(u)
  } catch (e) {
    // await User.removeUserById(u.props.userId)
    res.status(500)
    res.json({
      message: String(e),
      bizCode: "todo",
    })
    // todo log
  }
}

export default handler
