import { fromToken } from "models/User"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decodeJwt, jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  // console.log('token:::::::',request.cookies.get("token"))
  // let user = null
  const requestPath = request.nextUrl.pathname
  if (requestPath.startsWith("/api")) {
    if (!requestPath.startsWith("/api/-")) {
      let jwtVerifyRes
      try {
        jwtVerifyRes = await jwtVerify(
          request.cookies.get("token"),
          new TextEncoder().encode(process.env.JWT_SECRET),
        )
      } catch (e) {
        console.warn(e)
      }

      if (!jwtVerifyRes) {
        const rewrite = NextResponse.rewrite(
          new URL(
            `/api/-/error-message?${new URLSearchParams({
              message: "user invalid",
            })}`,
            request.url,
          ),
          {
            status: 401,
            
          },
        )
        rewrite.cookies.set("token", "", { maxAge: -1 })
        return rewrite
      }
    }
  }
}
