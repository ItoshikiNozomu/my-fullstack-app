import styled from "styled-components"
import Editor from "../../components/Editor/Editor"

import backIcon from "./resources/arrow-left.svg"

import checkIcon from "./resources/check-circle.svg"

import contentCopy from "./resources/content-copy.svg"

import checkBold from "./resources/check-bold.svg"

import windowClose from "./resources/window-close.svg"
import PostContainer from "./PostContainer"
import Post1 from "./Post1"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import Post2 from "./Post2"
import Post3, { SimplePost } from "./Post3"
import { format } from "date-fns"
import Link from "next/link"
import wrappedFetch from "utils/wrappedFetch"
import PostList from "../../components/PostList/PostList"
import { NewPostForm } from "./EditorForm"
import useAuthentication from "client/hooks/useAuthentication"
import { useSetRecoilState } from "recoil"
import { editingPostId } from "client/atoms"

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




const App = (props: {
  data?: {
    posts
  }
}) => {
  // const { posts, editingPostTitle } = useContext(ctx).state
  
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
      <PostList postData={props.data?.posts}></PostList>
      <NewPostForm></NewPostForm>
    </PageContainer>
  )
}



export default (props: { data? }) => {
  const setEditingPostId = useSetRecoilState(editingPostId)
  useAuthentication({needLogin:true})
  useEffect(()=>{
    return ()=>{
      setEditingPostId(null)
    }
  },[])
  return <App data={props.data}></App>
}
