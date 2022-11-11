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
      const jwtPayload = (
        await jwtVerify(
          request.cookies.get("token"),
          new TextEncoder().encode(process.env.JWT_SECRET),
        )
      ).payload
      console.log('jwtPayload',jwtPayload)
      if (!jwtPayload) {
        return NextResponse.rewrite(
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
      }
    }
  }
}
