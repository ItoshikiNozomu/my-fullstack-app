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

const PageContainer = styled.div`
  /* width: 1440px; */
  margin: auto;
  font-family: "Poppins";
  * {
    box-sizing: border-box;
  }
  padding-bottom: 364px;
`

const Icon = styled.i``
const HDNav = styled.div`
  padding: 76.08px 324.16px 0 324.16px;

  display: flex;
  align-items: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  /* GG */

  color: #606060;
  .back-ic {
    display: inline-block;
    // width: 15.84px;
    // height: 15.84px;
  }
`

const MainTitle = styled.h3`
  margin-top: 18px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
  /* identical to box height */

  text-align: center;

  /* On surface - White */

  color: #1f1f2c;
`

const BLOCK_HOR_MARGIN = "320px"

const ProfileTip = styled.div`
  margin: 48px ${BLOCK_HOR_MARGIN} 0 ${BLOCK_HOR_MARGIN};
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  .status-mark {
    flex: 100px 0 0;
    height: 100px;
    background: radial-gradient(84.9% 100% at 50% 0%, #8f00ff 0%, #532bc5 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const TipDetail = styled.div`
  padding: 24px 0 24px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .text-tip {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    /* identical to box height */

    /* GG */

    color: #606060;
  }
  .profile-link {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */

    /* On surface - White */

    color: #1f1f2c;
    display: flex;
    align-items: center;
  }
`

const TabSwitcher = styled.div`
  margin: 48px ${BLOCK_HOR_MARGIN} 0 ${BLOCK_HOR_MARGIN};
  display: flex;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  overflow: hidden;
  .tab-unit {
    padding: 10px 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;

    color: #606060;
  }
  .selected {
    background: #532bc5;
    color: #fff;
  }
  .count-tip {
    display: inline-flex;
    padding: 0px 8px;
    background: #fff;
    color: #532bc5;
    margin-left: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }
`

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

export const ctx = createContext({
  update: (newState) => {},
  state: {
    posts: [],
    editingPostTitle: "",
  },
})

const App = (props: {
  data?: {
    posts
  }
}) => {
  const { posts, editingPostTitle } = useContext(ctx).state

  return (
    <PageContainer>
      <Link href={"/"}>
        <HDNav className="hd-nav">
          <img
            className="back-ic"
            src={backIcon.src}
            style={{ marginRight: "8px" }}
          ></img>
          Back
        </HDNav>
      </Link>

      <MainTitle className="main-title">Manage post</MainTitle>
      <ProfileTip>
        <div className="status-mark">
          <img src={checkIcon.src} alt="" className="status-mark-ic" />
        </div>

        <TipDetail>
          <span className="text-tip">link to your profile</span>
          <span className="profile-link">
            https://twitter.com/p/12345
            <img
              src={contentCopy.src}
              alt=""
              style={{ cursor: "pointer", marginLeft: "12px" }}
            />
          </span>
        </TipDetail>
      </ProfileTip>
      <TabSwitcher>
        <div className="tab-unit">Settings</div>
        <div className="tab-unit selected">
          Posts <span className="count-tip">4</span>
        </div>
      </TabSwitcher>
      {}
      <NewPostForm></NewPostForm>
      {/* {posts.map((e) => {
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
      </PostContainer> */}
    </PageContainer>
  )
}

const NewPostForm = () => {
  const newPostEditorRef = useRef()
  const [btnStatus, setBtnStatus] = useState("")
  const [titleValue, setTitleValue] = useState("")
  const { update, state } = useContext(ctx)
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
                  richTextContent: newPostEditorRef.current.getContent(),
                }),
              }).then(json=>{
                console.log(json)
              })
              setTimeout(() => {
                update({
                  posts: [
                    {
                      postDate: format(new Date(), "MMM d, yyyy HH:mm"),
                      title: titleValue,
                      // @ts-ignore
                      content: newPostEditorRef.current.getContent(),
                    },
                    ...state.posts,
                  ],
                })
                setBtnStatus("")
                setTitleValue("")
                // @ts-ignore
                newPostEditorRef.current.setContent("")
              }, 1000)
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

const EditingPostForm = ({ postData }) => {
  const { state, update } = useContext(ctx)
  const newPostEditorRef = useRef()
  const [titleValue, setTitleValue] = useState(postData.title)
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
            onClick={() => {
              let post = state.posts.find((e) => e.title === postData.title)
              post.title = titleValue
              // @ts-ignore
              post.content = newPostEditorRef.current.getContent()
              update({
                posts: [...state.posts],
              })
            }}
          >
            <img src={checkBold.src} alt="" style={{ marginRight: "10px" }} />
            Save
          </DoPostButton>
          <div
            className="pull-right btn-cancel"
            onClick={() => {
              update({
                ...state,
                editingPostTitle: "",
              })
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

export default () => {
  const [ctxState, set] = useState({
    editingPostTitle: "my post",
    posts: [
      {
        postDate: format(new Date(), "MMM d, yyyy HH:mm"),
        title: "my post",
        // @ts-ignore
        content: `<p>Maecenas quam nunc, sagittis non condimentum at, rutrum sit amet eros. Fusce rutrum, lectus in blandit sagittis, mi tortor ullamcorper mi, vitae vestibulum libero quam a nisi. In eu mauris et neque sodales porta eu eget dui. Nunc eu quam sit amet justo elementum mollis. </p>
      <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed laoreet metus nulla, in gravida urna rhoncus in. Proin laoreet semper tortor ac posuere. </p>
      
      `,
      },
    ],
  })
  return (
    <ctx.Provider
      value={{
        update: (newState) => {
          set(newState)
        },
        state: ctxState,
      }}
    >
      <App></App>
    </ctx.Provider>
  )
}
