import { createPost, findPostsByAuthorUser } from "./Post"

it("test the static methods", async () => {
  await createPost({
    author_user_id: "xxx",
    rich_text_content: "<br>",
    visibility: 1,
    title: "ddd",
  })
  const posts = await findPostsByAuthorUser('xxx')
  expect(posts[0].rich_text_content).toBe('<br>')
  
})
