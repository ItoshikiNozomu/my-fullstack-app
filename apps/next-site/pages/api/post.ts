import { decodeJwt } from "jose"
import { createPost, findPostsByAuthorUser, updatePost } from "models/Post"
import { fromToken } from "models/User"
import { NextApiHandler } from "next"
import { NextRequest } from "next/server"
import getLogger from "utils/getLogger"

const handler: NextApiHandler = async (req, resp) => {
  const user = fromToken(req.cookies.token)

  if (req.method === "PUT") {
    const { title, richTextContent } = JSON.parse(req.body)

    let post
    try {
      post = await createPost({
        title,
        rich_text_content: richTextContent,
        author_user_id: user.user_id,
        visibility: 1,
      })
    } catch (e) {
      getLogger().error(String(e))
      resp.status(500)
      resp.json({
        message: "create post failed",
      })
    }
    if (post) {
      resp.json({
        postId: post.post_id,
      })
    }

    // createPost({})
  } else if (req.method === "GET") {
    resp.json(await findPostsByAuthorUser(user.user_id))
  } else if (req.method === "POST") {
    const { title, richTextContent, postId } = JSON.parse(req.body)
    const result = await updatePost({
      title,
      rich_text_content: richTextContent,
      post_id: postId,
    })
    resp.json(result)
  }
}

export default handler
