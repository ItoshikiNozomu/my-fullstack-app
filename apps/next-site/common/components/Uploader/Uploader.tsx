import { useState } from "react"
import styled from "styled-components"
import UploadModal from "./UploadModal"
const StyledButton = styled.span`
  --b: 8px; /* the thickness */
  width: 120px; /* the size */
  aspect-ratio: 1;
  border: 20px solid #000; /* the outer space */
  background: conic-gradient(
      from 90deg at var(--b) var(--b),
      #000 90deg,
      #fff 0
    )
    calc(100% + var(--b) / 2) calc(100% + var(--b) / 2) / calc(50% + var(--b))
    calc(50% + var(--b));
  display: inline-block;
  cursor: pointer;
`

const Uploader = () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <StyledButton
        onClick={() => {
          setModalVisible(true)
        }}
      ></StyledButton>
      <UploadModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
      ></UploadModal>
    </>
  )
}
export default Uploader
