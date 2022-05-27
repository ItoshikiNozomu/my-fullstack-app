import { GetServerSideProps } from "next"

import User, { UserProps } from "../models/User"

import Home from "../common/pages/Home"
import SiteHead from "../common/components/SiteHead"


export default ()=><Home></Home> 

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context)

  const authToken = decodeURIComponent(
    // @ts-ignore
    (context.query.token || context.req.cookies.token) ?? ""
  )

  const user = User.fromToken(authToken as string)
  // console.log(authToken,user,'=======')
  return { props: { user: authToken ? user.props : null } }
}

// todo infura ipfs