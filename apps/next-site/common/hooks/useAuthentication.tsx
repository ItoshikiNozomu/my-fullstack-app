import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthStatus, ReduxState } from "../../store"
import checkAuth from "../../utils/checkAuth"
import useLogin from "./useLogin"

export default (props?: { needLogin?; needVerify? }) => {
  const { authToken, authStatus } = useSelector<
    ReduxState,
    { authToken; authStatus: AuthStatus }
  >(({ authStatus, authToken }) => {
    return { authToken, authStatus }
  })
  const { showLoginModal } = useLogin()
  const dispatch = useDispatch()
  const logout = async () => {
    await fetch("/api/logout", {
      method: "post",
    })
    dispatch({
      type: "authUpdate",
      payload: {
        token: "",
        authStatus: "ANONYMOUS",
      },
    })
    localStorage.removeItem("token")
  }
  //   const { showPopup } = useLogin()
  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem("token")
      const { status } = await checkAuth(token)
      dispatch({
        type: "authUpdate",
        payload: {
          authStatus: status,
          token: status !== "ANONYMOUS" ? token : "",
        },
      })
    })()
  }, [])

  useEffect(() => {
    if (authStatus === "ANONYMOUS" && props?.needLogin) {
      //   showPopup()
      // debugger
      showLoginModal()
    }
  }, [props?.needLogin, authStatus])

  return {
    authToken,
    authStatus,
    logout,
  }
}
