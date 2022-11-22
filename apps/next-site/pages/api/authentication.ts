import { decodeJwt, jwtVerify } from "jose"
import { createUserToken, getUserByUserId } from "models/User"

import { NextApiHandler } from "next"
import { setCookieString } from "utils/httpUtils"

const handler: NextApiHandler = async (req, resp) => {
  const token = req.cookies.token
  const payload = decodeJwt(token)
  if (payload.exp * 1000 - Date.now() < 24 * 60 * 10 * 1000) {
    let verifyRes
    try {
      verifyRes = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET),
      )
    } catch (e) {}

    if (verifyRes) {
      const props = await getUserByUserId(payload.user_id)
      const newToken = createUserToken(props)
      resp.setHeader(
        "set-cookie",

        setCookieString({
          key: "token",
          value: newToken,
          maxAge: 24 * 10 * 60 * 60,
        }),
      )
    } else {
      resp.status( 403)
      resp.json({
        message: "invalid token",
      })
      return
      
    }
  }
  resp.json(payload)
}

export default handler
