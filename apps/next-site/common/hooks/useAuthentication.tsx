import { loginStatus, userPros } from "common/atoms"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import wrappedFetch from "utils/wrappedFetch"

import useLogin from "./useLoginPrompt"

export default (props?: { needLogin?; needVerify? }) => {
  const [uProps, setUProps] = useRecoilState(userPros)
  const [status, setStatus] = useRecoilState(loginStatus)
  const { showLoginModal } = useLogin()

  const logout = async () => {
    await fetch("/api/logout", {
      method: "post",
    })
    setUProps(null)
    setStatus("ANONYMOUS")
  }
  //   const { showPopup } = useLogin()
  useEffect(() => {
    ;(async () => {
      if (uProps === null) {
        const authData = await wrappedFetch("/api/authentication")
        setUProps(authData)
        if (authData) {
          setStatus("NOT_VERIFIED")
        } else {
          setStatus("ANONYMOUS")
        }
      }
    })()
  }, [])

  useEffect(() => {
    if (props.needLogin && status === "ANONYMOUS") {
      showLoginModal()
    } else if (props.needVerify) {
    }
  }, [props?.needLogin, status])

  return {
    logout,
  }
}
