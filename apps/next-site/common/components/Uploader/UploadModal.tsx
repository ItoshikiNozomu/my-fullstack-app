import { useEffect, useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"

const StyledContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  // background: rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0.6);
  display: none;
  justify-content: center;
  align-items: center;
  &.fade-out {
    display: flex;
    
    animation: 0.3s fadeOut;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
  }
  &.fade-in {
    display: flex;
    animation: 0.3s fadeIn;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
    opacity:0;
  }
  @keyframes fadeIn {
    0% {
      opacity:0
    }
    100% {
      opacity:1;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity:1
    }
    100% {
      opacity:0
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

const uploadProps: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file
    if (status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files)
  },
}

const UploadModal = (props: { onClose; visible }) => {
  const [visible, setVisible] = useState(false)
  const [domReady, setDomReady] = useState(false)
  const [clz, setClz] = useState("")
  useEffect(() => {
    setVisible(props.visible)
    // debugger
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
            props.onClose()
          }
        }}
        className={clz}
        onClick={(e) => {
          if (e.target !== e.currentTarget) return
          setClz("fade-out")
          
        }}
      >
        <StyledBox>
          <Upload.Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Upload.Dragger>
        </StyledBox>
      </StyledContainer>,
      document.body
    )
  )
}
export default UploadModal
