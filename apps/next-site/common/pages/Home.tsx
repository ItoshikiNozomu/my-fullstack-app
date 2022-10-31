import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useAuthentication from "../hooks/useAuthentication"
import User, { UserProps } from "../../models/User"
import { AuthStatus, ReduxState } from "../../store"
import { decode } from "jsonwebtoken"
import Uploader from "../components/Uploader/Uploader"
import SiteHead from "../components/SiteHead"
import styled from "styled-components"
import MyImgList from "../components/MyImgList"
import { storeToIPFS } from "../../utils/ipfs"
import useUploadFile from "common/hooks/useUploadFile"
import { useRecoilValue } from "recoil"
import { userPros } from "common/atoms"

const StyledContainer = styled.div`
  padding: 20px;
`

const Home = (props: { user?: UserProps }) => {
  const { logout } = useAuthentication({
    needLogin: true,
  })

  const userProps = useRecoilValue(userPros)

  const uploadFn = useUploadFile()

  return (
    <StyledContainer>
      <div>
        Home
        {userProps && (
          <p>
            username:{userProps.user_name}
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault()
                await logout()
              }}
            >
              logout
            </a>
          </p>
        )}
      </div>
      <div>
        <MyImgList></MyImgList>
        <Uploader></Uploader>
        <input
          type={"file"}
          onChange={async (evt) => {
            const r = new FileReader()
            // r.readAsArrayBuffer(evt.target.files[0])
            // const cid = await storeToIPFS(evt.target.files[0])
            // console.log(cid)
            const loc = await uploadFn({
              file: evt.target.files[0],
              name: evt.target.files[0].name,
            })
            console.log(loc)
          }}
        />
      </div>
    </StyledContainer>
  )
}
export default Home
