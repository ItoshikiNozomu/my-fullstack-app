import { format } from "date-fns"
import { STATUS_CODES } from "http"
import { NextApiHandler } from "next"

import  { createUserByNameAndPwd, createUserToken, UserProps } from "models/User"
import getLogger from "utils/getLogger"
import { setCookieString } from "utils/httpUtils"

const handler: NextApiHandler = async (req, res) => {
  // console.log('xxx',format(Date.now(), "yyyy-MM-dd HH:mm:ss"))
  let u: UserProps
  try {
    const { username, password } = JSON.parse(req.body)
    u = await createUserByNameAndPwd(username, password)
  } catch (e) {
    // await User.removeUserById(u.props.userId)
    // todo rewrites
    getLogger().error(String(e))
    res.status(500)
    res.json({
      message: "register failed",
    })
    // todo log
  }
  if (u) {
    res.setHeader(
      "set-cookie",
      //   `token=${encodeURIComponent(u.token)}; max-age=${24*10*60*60}; path=/`
      setCookieString({
        key: "token",
        value:await createUserToken(u),
        maxAge: 24 * 10 * 60 * 60,
      }),
    )
    res.json(u)
  }
}

export default handler
