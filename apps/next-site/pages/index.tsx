import { GetServerSideProps } from "next"

import { fromToken, UserProps } from "models/User"

import Home from "../common/pages/Home"
import SiteHead from "../common/components/SiteHead"


export default ({user})=><Home user={user}></Home> 

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context)

  const authToken = decodeURIComponent(
    // @ts-ignore
    (context.query.token || context.req.cookies.token) ?? ""
  )

  const user =fromToken(authToken as string)
  // console.log(authToken,user,'=======')
  return { props: { user} }
}

// todo infura ipfs