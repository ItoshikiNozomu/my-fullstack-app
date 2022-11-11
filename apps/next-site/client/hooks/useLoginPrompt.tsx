import { loginModalVisible, loginStatus } from "client/atoms"
import { useEffect, useRef } from "react"
import * as ReactDOM from "react-dom/client"

import { useRecoilState, useRecoilValue } from "recoil"

import LoginModal from "../../common/components/LoginModal"

export default () => {
  // const loginVisible = useRef(false)
  const [loginModalVis, setLoginModalVis] = useRecoilState(loginModalVisible)

  const loginStatusVal = useRecoilValue(loginStatus)
  const showLoginModal = () => {
    if (!loginModalVis) {
      setLoginModalVis(true)
    }
  }

  useEffect(() => {
    if (loginStatusVal === "VERIFIED") {
      setLoginModalVis(false)
    }
  }, [loginStatusVal])

  return {
    showLoginModal,
  }
}
