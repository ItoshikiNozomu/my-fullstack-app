import { AuthStatus } from "../store"
 
type Opts = {
  needVerify?
}
export default async (token, opts?: Opts) => {
  let status: Exclude<AuthStatus, "PENDING"> = "ANONYMOUS"
  const { needVerify } = opts ?? {}
  if (token) {
    if (!needVerify) {
      status = "NOT_VERIFIED"
    } else {
      // todo verify the token by jwt or something
      
    }
  }
 
  return {
    status,
  }
}
