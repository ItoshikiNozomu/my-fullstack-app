
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useAuthentication from "../hooks/useAuthentication"
import User, { UserProps } from "../../models/User"
import { AuthStatus, ReduxState } from "../../store"
import { decode } from "jsonwebtoken"
import Uploader from "../components/Uploader/Uploader"
import SiteHead from "../components/SiteHead"
import styled from 'styled-components'

const StyledContainer = styled.div`
padding:20px;
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
    if (props.user) {
      setUser(props.user)
    } else if (authStatus === "VERIFIED" || authStatus === "NOT_VERIFIED") {
      setUser(decode(authToken) as UserProps)
    }
  }, [authStatus, props.user])



  useEffect(()=>{console.log(user)},[user])

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
        <Uploader></Uploader>
      </div>
    </StyledContainer>
  )
}
export default Home
