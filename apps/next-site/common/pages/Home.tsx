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

const StyledContainer = styled.div`
  padding: 20px;
`

const Home = (props: { user?: UserProps }) => {
  const { logout } = useAuthentication({
    needLogin: true,
  })
  const { authStatus, authToken } = useSelector<
    ReduxState,
    { authStatus: AuthStatus; authToken: string }
  >(({ authStatus, authToken }) => {
    // debugger
    return { authStatus, authToken }
  })
  const [user, setUser] = useState<UserProps>()

  useEffect(() => {
    // debugger
    if (props.user) {
      setUser(props.user)
    } else if (authStatus === "VERIFIED" || authStatus === "NOT_VERIFIED") {
      // debugger
      setUser(decode(authToken) as UserProps)
    }
  }, [authStatus, props.user])

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <StyledContainer>
      <div>
        Home
        {user && (
          <p>
            username:{user.userName}
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault()
                await logout()
                setUser(undefined)
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
            const cid = await storeToIPFS(evt.target.files[0])
            console.log(cid)
          }}
        />
      </div>
    </StyledContainer>
  )
}
export default Home
