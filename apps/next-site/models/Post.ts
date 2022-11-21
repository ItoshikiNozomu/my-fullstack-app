import { format } from "date-fns"
import { nanoid } from "nanoid"
import db from "utils/getDB"
export type PostProps = {
  author_user_id
  create_date
  last_mod_date
  rich_text_content
  visibility
  title
  post_id
}

export const createPost = async (
  props: Omit<PostProps, "create_date" | "post_id" | "last_mod_date">,
) => {
  const id = nanoid()
  const d = Date.now()
  const postProps = {
    ...props,
    post_id: id,
    create_date: format(d, "yyyy-MM-dd HH:mm:ss"),
    last_mod_date: format(d, "yyyy-MM-dd HH:mm:ss"),
  }

  await db("user_post").insert(postProps)
  return postProps
}

export const updatePost = () => {}

export const findPostsByAuthorUser = async (userId) => {
  return (await db("user_post").where({
    author_user_id: userId,
  })) as Array<PostProps>
}
