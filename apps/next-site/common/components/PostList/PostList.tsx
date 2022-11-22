import { editingPostId } from "client/atoms"
import usePosts from "client/hooks/usePosts"
import { useRecoilValue } from "recoil"
import { EditingPostForm } from "../../pageComponents/myPosts/EditorForm"

import { SimplePost } from "../../pageComponents/myPosts/Post3"
import PostContainer from "../../pageComponents/myPosts/PostContainer"

export default ({ postData }) => {
  const { posts } = usePosts({ initialPosts: postData })
  const editingPostIdVal = useRecoilValue(editingPostId)
  return (
    <>
      {posts.map((e) => {
        return e.post_id === editingPostIdVal ? (
          <EditingPostForm
            postData={{ title: e.title, content: e.rich_text_content,postId:e.post_id }}
          ></EditingPostForm>
        ) : (
          <PostContainer
            postId={e.post_id}
            title={e.title}
            postDate={e.create_date}
            key={e.title}
          >
            <SimplePost content={e.rich_text_content}></SimplePost>
          </PostContainer>
        )
      })}
    </>
  )
  {
    /* {posts.map((e) => {
        return e.title === editingPostTitle ? (
          <EditingPostForm postData={e}></EditingPostForm>
        ) : (
          <PostContainer title={e.title} postDate={e.postDate} key={e.title}>
            <SimplePost content={e.content}></SimplePost>
          </PostContainer>
        )
      })}

      <PostContainer
        postDate={"May 3, 2022 16:22"}
        title="Orci varius natoque penatibus et magnis"
        canDelete={false}
      >
        <Post1></Post1>
      </PostContainer>
      <PostContainer
        postDate={"May 3, 2022 16:22"}
        title="Proin laoreet semper"
        canEdit={false}
      >
        <Post2></Post2>
      </PostContainer>
      <PostContainer
        postDate={"May 3, 2022 16:22"}
        title="Proin laoreet semper tortor ac posuere"
        canEdit={false}
        canDelete={false}
      >
        <Post3></Post3>
      </PostContainer> */
  }
}
