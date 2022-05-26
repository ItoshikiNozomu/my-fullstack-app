import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthStatus, ReduxState } from "../../store"
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
    const token = localStorage.getItem("token")
    if (token) {
      //pending
      // dispatch()
      if (!props.needVerify) {
        dispatch({
          payload: {
            authToken:token,
            authStatus: "NOT_VERIFIED",
          },

          type: "authUpdate",
        })
      } else {
        // todo verify the token
      }
    } else {
      dispatch({
        type: "authUpdate",
        payload: {
          authStatus: "ANONYMOUS",
        },
      })
    }
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
