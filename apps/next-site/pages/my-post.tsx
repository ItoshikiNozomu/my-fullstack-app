import { decodeJwt } from "jose"
import { findPostsByAuthorUser } from "models/Post"
import { fromToken } from "models/User"
import { GetServerSideProps } from "next"
import UserPosts from "../common/pageComponents/myPosts/MyPosts"

export default ({ posts }) => {
  return <UserPosts data={{ posts }}></UserPosts>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context)
    // console.log(fromToken(context.req.cookies.token).user_id,await findPostsByAuthorUser( fromToken(context.req.cookies.token).user_id))
  
 const userProps = fromToken(context.req.cookies.token)
 if(userProps){
  const posts = await findPostsByAuthorUser( fromToken(context.req.cookies.token).user_id)
  return { props: { posts } }
 }
    
 return { props: { posts:[] } }
}
