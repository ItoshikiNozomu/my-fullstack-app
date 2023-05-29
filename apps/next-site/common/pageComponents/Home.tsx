import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useAuthentication from "../../client/hooks/useAuthentication"
import  { UserProps } from "../../models/User"
import { AuthStatus, ReduxState } from "../../store"
import { decode } from "jsonwebtoken"
import Uploader from "../components/Uploader/Uploader"
import SiteHead from "../components/SiteHead"
import styled from "styled-components"
import MyImgList from "../components/MyImgList"
import { storeToIPFS } from "../../utils/ipfs"
import useUploadFile from "client/hooks/useUploadFile"
import { useRecoilValue } from "recoil"
import { loginStatus, userProps } from "client/atoms"
import Link from "next/link"

const StyledContainer = styled.div`
  padding: 20px;
`

const Home = (props: { user?: UserProps }) => {
  const { logout } = useAuthentication({
    needLogin: true,
  })

  const userPropsVal = useRecoilValue(userProps)
  const loginStatusVal = useRecoilValue(loginStatus)
  const [uProps, setUProps] = useState(props.user)

  const uploadFn = useUploadFile()
  useEffect(() => {
    if(loginStatusVal!=="PENDING")
    setUProps(userPropsVal)
  }, [userPropsVal,loginStatusVal])

  return (
    <StyledContainer>
      <div>
        Home
        {uProps && (
          <p>
            username:{uProps?.user_name}
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault()
                await logout()
              }}
            >
              logout
            </a>
            &nbsp;
            <Link href="/my-post">my post</Link>
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
            const [loc] = await uploadFn({
              file: evt.target.files[0],
              name: evt.target.files[0].name,
            })
            
          }}
        />
      </div>
    </StyledContainer>
  )
}
export default Home
