import { useEffect, useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

const StyledContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  // background: rgba(0, 0, 0, 0);
  display: none;
  justify-content: center;
  align-items: center;
  &.fade-out {
    display: flex;
    background: rgba(0, 0, 0, 0.6);
    animation: 0.3s fadeOut;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
  }
  &.fade-in {
    display: flex;
    animation: 0.3s fadeIn;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
  }
  @keyframes fadeIn {
    0% {
      background: rgba(0, 0, 0, 0);
    }
    100% {
      background: rgba(0, 0, 0, 0.6);
    }
  }
  @keyframes fadeOut {
    0% {
      background: rgba(0, 0, 0, 0.6);
    }
    100% {
      background: rgba(0, 0, 0, 0);
    }
    // 100%{
    //   display:none;
    // }
  }
`
const StyledBox = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 15px;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 700px;
  background: #fff;
  input {
    display: block;
    width: 1px;
    height: 1px;
    visibility: hidden;
  }
`

const UploadModal = (props: { onClose; visible }) => {
  const [visible, setVisible] = useState(false)
  const [domReady, setDomReady] = useState(false)
  const [clz, setClz] = useState("")
  useEffect(() => {
    setVisible(props.visible)
    if (props.visible) {
      setClz("fade-in")
    }
  }, [props.visible])
  useEffect(() => {
    setDomReady(true)
  }, [])
  return (
    domReady &&
    createPortal(
      <StyledContainer
        onAnimationEnd={(e) => {
          if (e.animationName === "fadeOut") {
            setClz("")
          }
        }}
        className={clz}
        onClick={(e) => {
          if(e.target!==e.currentTarget)return
          setClz("fade-out")
        }}
      >
        <StyledBox>
          <div className="input-wrapper">
            <label htmlFor="input-file">xxx</label>
            <input
              type="file"
              accept="image/*"
              className="custom-file-input"
              id="input-file"
            />
          </div>
        </StyledBox>
      </StyledContainer>,
      document.body
    )
  )
}
export default UploadModal
