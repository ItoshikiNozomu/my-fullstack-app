import styled from "styled-components"
import Editor from "../../components/Editor/Editor"

import backIcon from "./resources/arrow-left.svg"

import checkIcon from "./resources/check-circle.svg"

import contentCopy from "./resources/content-copy.svg"

import checkBold from "./resources/check-bold.svg"

import windowClose from "./resources/window-close.svg"
import PostContainer from "./PostContainer"
import Post1 from "./Post1"
import { createContext, useContext, useRef, useState } from "react"
import Post2 from "./Post2"
import Post3, { SimplePost } from "./Post3"
import { format } from "date-fns"
import Link from "next/link"
import wrappedFetch from "utils/wrappedFetch"
import PostList from "../../components/PostList/PostList"
import usePosts from "client/hooks/usePosts"
import { useSetRecoilState } from "recoil"
import { editingPostId } from "client/atoms"

const DoPostButton = styled.div`
  color: #fff;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  width: 390px;
  height: 48px;
  overflow: hidden;

  //   margin-top: 24px;
  border-radius: 5px;
  background: radial-gradient(
    50% 115.18% at 50% -15.18%,
    #8f00ff 0%,
    #532bc5 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const InputWrapper = styled.div`
  display: flex;
  margin-top: 47px;

  border: 1px solid rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 24px;
  .real-input {
    flex: 1;
    border: none;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    outline: none;
  }
`

const BtnRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .pull-right {
    margin-left: auto;
  }
  .btn-cancel {
    display: flex;
    algin-items: center;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #606060;
    cursor: pointer;
  }
`
export const NewPostForm = () => {
  const newPostEditorRef = useRef()
  const [btnStatus, setBtnStatus] = useState("")
  const [titleValue, setTitleValue] = useState("")
  // const { update, state } = useContext(ctx)
  return (
    <>
      <Editor
        onEditorInit={(editor) => {
          newPostEditorRef.current = editor
        }}
        renderAbove={() => (
          <InputWrapper>
            <input
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value)
              }}
              placeholder="Input post title"
              className="real-input"
            />
          </InputWrapper>
        )}
        renderBellow={() => (
          <DoPostButton
            className={btnStatus}
            onClick={() => {
              if (btnStatus !== "") return
              setBtnStatus("connecting")
              wrappedFetch("/api/post", {
                method: "PUT",
                body: JSON.stringify({
                  title: titleValue,
                  // @ts-ignore
                  richTextContent: newPostEditorRef.current.getContent(),
                }),
              }).then((json) => {
                console.log(json)
              })
              // setTimeout(() => {
              //   update({
              //     posts: [
              //       {
              //         postDate: format(new Date(), "MMM d, yyyy HH:mm"),
              //         title: titleValue,
              //         // @ts-ignore
              //         content: newPostEditorRef.current.getContent(),
              //       },
              //       ...state.posts,
              //     ],
              //   })
              //   setBtnStatus("")
              //   setTitleValue("")
              //   // @ts-ignore
              //   newPostEditorRef.current.setContent("")
              // }, 1000)
              // console.log(newPostEditorRef.current.getContent())
            }}
            style={{ marginTop: "24px" }}
          >
            {btnStatus === "" ? (
              <>
                <img
                  src={checkBold.src}
                  alt=""
                  style={{ marginRight: "10px" }}
                />
                Post
              </>
            ) : (
              "..."
            )}
          </DoPostButton>
        )}
      ></Editor>
    </>
  )
}

export const EditingPostForm = ({
  postData,
}: {
  postData: { title; content; postId }
}) => {
  // const { state, update } = useContext(ctx)
  const newPostEditorRef = useRef()
  const [titleValue, setTitleValue] = useState(postData.title)
  const { updatePost } = usePosts()
  const setEditingPostId = useSetRecoilState(editingPostId)
  return (
    <Editor
      onEditorInit={(editor) => {
        newPostEditorRef.current = editor
      }}
      initialValue={postData.content}
      renderAbove={() => (
        <>
          <h5>Eidt Post</h5>
          <InputWrapper style={{ marginTop: "24px" }}>
            <input
              placeholder="Nunc eu quam sit amet justo elementum mollis"
              className="real-input"
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value)
              }}
            />
          </InputWrapper>
        </>
      )}
      renderBellow={() => (
        <BtnRow style={{ marginTop: "24px" }}>
          <DoPostButton
            stlyle={{ marginTop: 0 }}
            onClick={async () => {
              await updatePost({
                postId: postData.postId,
                title: titleValue,
                // @ts-ignore
                content: newPostEditorRef.current.getContent(),
              })
              setEditingPostId(null)
              // let post = state.posts.find((e) => e.title === postData.title)
              // post.title = titleValue
              // // @ts-ignore
              // post.content = newPostEditorRef.current.getContent()
              // update({
              //   posts: [...state.posts],
              // })
            }}
          >
            <img src={checkBold.src} alt="" style={{ marginRight: "10px" }} />
            Save
          </DoPostButton>
          <div
            className="pull-right btn-cancel"
            onClick={() => {
              setEditingPostId(null)
            }}
          >
            <img style={{ marginRight: "9px" }} src={windowClose.src}></img>
            Cancel
          </div>
        </BtnRow>
      )}
      wrapperStyle={{
        padding: "24px",
        marginTop: "80px",
        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    ></Editor>
  )
}
