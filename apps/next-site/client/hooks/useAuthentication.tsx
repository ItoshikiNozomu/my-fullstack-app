import { loginStatus, userProps } from "client/atoms"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import wrappedFetch from "utils/wrappedFetch"

import useLogin from "./useLoginPrompt"

export default (props?: { needLogin?; needVerify? }) => {
  const [uProps, setUProps] = useRecoilState(userProps)
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
        const authData = await wrappedFetch("/api/authentication").then(
          (authData) => {
            setUProps(authData)
            if (authData) {
              setStatus("VERIFIED")
            } else {
              setStatus("ANONYMOUS")
            }
          },
          (err) => {
            // console.warn(err,'===============')
            // debugger
            showLoginModal()
          },
        )
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
