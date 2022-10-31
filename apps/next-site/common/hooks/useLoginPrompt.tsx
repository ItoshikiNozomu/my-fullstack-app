import { loginModalVisible, loginStatus } from "common/atoms"
import { useEffect, useRef } from "react"
import * as ReactDOM from "react-dom/client"

import { useRecoilState, useRecoilValue } from "recoil"

import LoginModal from "../components/LoginModal"

export default () => {
  // const loginVisible = useRef(false)
  const [loginModalVis, setLoginModalVis] = useRecoilState(loginModalVisible)

  const loginStatusVal = useRecoilValue(loginStatus)
  const showLoginModal = () => {
    if (!loginModalVis) {
      const root = ReactDOM.createRoot(
        document.body.querySelector("#login-container"),
      )

      setLoginModalVis(true)
    }
  }

  useEffect(() => {
    let $loginContainer = document.querySelector("#login-container")
    if (!$loginContainer) {
      $loginContainer = document.createElement("div")
      $loginContainer.id = "login-container"
      document.body.appendChild($loginContainer)
    }
  }, [])

  useEffect(() => {
    if (loginStatusVal === "VERIFIED") {
      setLoginModalVis(false)
    }
  }, [loginStatusVal])

  return {
    showLoginModal,
  }
}
