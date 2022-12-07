import { Editor } from "@tinymce/tinymce-react"
import { PostProps } from "models/Post"
import { Editor as TMCEditor } from "tinymce/tinymce"
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
        const list: PostData[] = await wrappedFetch("/api/post")
        // list.forEach(p=>{

        // })
        setMyPosts(list)
      })()
    }
  }, [])
  return {
    createPost: async (title, editor: TMCEditor) => {
      // todo
      // console.log(editor.getContent())
      const results = await editor.uploadImages()
      for (let i = 0; i < results.length; i++) {
        if (!results[i].uploadUri) {
          // upload uncompleted
          // todo show some tip
          return
        }
      }

      const postData = await wrappedFetch("/api/post", {
        method: "PUT",
        body: JSON.stringify({
          title: title,

          richTextContent: editor.getContent(),
        }),
      })
      setMyPosts([
        {
          ...postData,
          rich_text_content: editor.getContent(),
        },
        ...myPostsVal,
      ])
    },
    updatePost: async ({ postId, content, title }) => {
      // todo
      // const { last_mod_date } = await wrappedFetch("/api/post", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     title,
      //     postId,
      //     richTextContent: content,
      //   }),
      // })
      // const newList = myPostsVal.map((e) =>
      //   e.post_id === postId
      //     ? { ...e, title, last_mod_date, rich_text_content: content }
      //     : e,
      // )
      // setMyPosts(newList)
    },
    posts:
      initialPosts?.length && myPostsVal.length === 0
        ? initialPosts
        : myPostsVal,
  }
}
