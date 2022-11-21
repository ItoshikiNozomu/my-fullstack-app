import { useEffect } from "react"
import { atom, useRecoilState } from "recoil"

export type PostData = {}
export const myPosts = atom({
  key: "myPosts",
  default: [],
})
export default ({ initialPosts }: { initialPosts: Array<PostData> }) => {
    const [myPostsVal,setMyPosts] = useRecoilState(myPosts)
    setMyPosts(initialPosts??[])
    return {myPostsVal,
        createPost:async ({title,richTextContent})=>{
            
        }
    }
}
