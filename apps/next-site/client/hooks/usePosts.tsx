import { PostProps } from "models/Post"
import { useEffect } from "react"
import { atom, useRecoilState } from "recoil"
import wrappedFetch from "utils/wrappedFetch"

export type PostData = PostProps
export const myPosts = atom({
  key: "myPosts",
  default: [] as Array<PostData>,
})
export default (props?: { initialPosts?: Array<PostData> }) => {
  const { initialPosts } = props ?? {}
  const [myPostsVal, setMyPosts] = useRecoilState(myPosts)

  useEffect(() => {
    if (!initialPosts?.length && myPostsVal.length === 0) {
      ;(async () => {
        const list = await wrappedFetch("/api/post")
        setMyPosts(list)
      })()
    }
  }, [])
  return {
    createPost: async ({ title, richTextContent }) => {},
    updatePost: async ({ postId, content, title }) => {
      // todo
      const { last_mod_date } = await wrappedFetch("/api/post", {
        method: "POST",
        body: JSON.stringify({
          title,
          postId,
          richTextContent: content,
        }),
      })
      const newList = myPostsVal.map((e) =>
        e.post_id === postId
          ? { ...e, title, last_mod_date, rich_text_content: content }
          : e,
      )
      setMyPosts(newList)
    },
    posts:
      initialPosts?.length && myPostsVal.length === 0
        ? initialPosts
        : myPostsVal,
  }
}
