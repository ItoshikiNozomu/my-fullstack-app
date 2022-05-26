import { useEffect, useRef } from "react"
import * as ReactDOM from "react-dom/client"
import { useDispatch, useSelector } from "react-redux"
import { AuthStatus, ReduxState } from "../../store"
import LoginModal from "../components/LoginModal"

export default () => {
  // console.log()
  // const popupRef = useRef<Window>()
  const authStatus = useSelector<ReduxState, AuthStatus>(
    (state) => state.authStatus
  )
  const loginVisible = useRef(false)
  const rootRef = useRef<ReactDOM.Root>()
  const dispatch = useDispatch()
  const showLoginModal = () => {
    if (!loginVisible.current) {
      const root = ReactDOM.createRoot(
        document.body.querySelector("#login-container")
      )
      root.render(<LoginModal></LoginModal>)
      rootRef.current = root
      loginVisible.current = true
    }
  }

  const onStorage = (evt: StorageEvent) => {
    if (evt.key === "token" && evt.newValue) {
      dispatch({
        type: "authUpdate",
        payload: {
          authToken: evt.newValue,
          authStatus: "VERIFIED",
        },
      })
    }
  }
  const onLoginEvent = () => {
    
    dispatch({
      type: "authUpdate",
      payload: {
        authToken: localStorage.getItem("token"),
        authStatus: "VERIFIED",
      },
    })
  }
  useEffect(() => {
    let $loginContainer = document.querySelector("#login-container")
    if (!$loginContainer) {
      $loginContainer = document.createElement("div")
      $loginContainer.id = "login-container"
      document.body.appendChild($loginContainer)
    }
    window.addEventListener("storage", onStorage)
    document.addEventListener("login", onLoginEvent)
    return () => {
      window.removeEventListener("storage", onStorage)
      document.removeEventListener("login", onLoginEvent)
    }
  }, [])
  useEffect(() => {
    if (authStatus === "NOT_VERIFIED" || authStatus === "VERIFIED") {
      setTimeout(() => {
        rootRef.current?.unmount()
        loginVisible.current = false
        // close popup
      }, 0)
    }
  }, [authStatus])
  return {
    showLoginModal,
  }
}
