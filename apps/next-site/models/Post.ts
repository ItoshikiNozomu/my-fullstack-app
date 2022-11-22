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

export const updatePost = async ({ post_id, title, rich_text_content }) => {
  return (await db("user_post")
    .where({ post_id })
    .update(
      {
        title,
        rich_text_content,
        last_mod_date: format(Date.now(), "yyyy-MM-dd HH:mm:ss"),
      },
      ["last_mod_date"],
    ))[0]
}

export const findPostsByAuthorUser = async (userId) => {
  const list = (await db("user_post").where({
    author_user_id: userId,
  })) as Array<PostProps>
  list.forEach((e) => {
    e.create_date = e.create_date + ""
    e.last_mod_date = e.last_mod_date + ""
  })
  return list
}
