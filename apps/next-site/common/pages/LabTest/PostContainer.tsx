import { CSSProperties, ReactNode } from "react"
import styled from "styled-components"

import pen from "./resources/pencil.svg"
import trashCan from "./resources/trash-can.svg"

const Container = styled.div`
  margin-left: 320px;
  margin-right: 320px;

  .title-and-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    &::before {
      position: absolute;
      content: " ";
      left: 10px;
      right: 30px;
      top: 50%;
      height: 1px;
      background: rgba(0, 0, 0, 0.1);
      z-index: -1;
    }
    margin-bottom:25px;
  }
  .title {
    background: radial-gradient(
      50% 115.18% at 50% -15.18%,
      #8f00ff 0%,
      #532bc5 100%
    );
    border-radius: 16px;
    padding: 4px 16px;
    color: #fff;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .actions {
    display: flex;
    align-items: center;
  }
  .edit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: #532bc5;
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    padding: 4px 16px;
    cursor: pointer;
  }
  .del-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background: #c4c4c4;
    margin-left: 6px;
    border-radius: 100%;
    cursor: pointer;
  }
  .post-date {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */

    /* Style */

    color: #818181;
    margin-top:24px;
  }
  & + & {
    margin-top: 60px;
  }
`

export default ({
  title,
  containerStyle,
  children,
  postDate,
}: {
  title
  containerStyle?: CSSProperties
  children: ReactNode
  postDate
}) => {
  return (
    <Container className="post-container" style={containerStyle}>
      <div className="title-and-actions">
        <div className="title">{title}</div>
        <div className="actions">
          <span className="edit-btn">
            <img src={pen.src} alt="" style={{ marginRight: "6px" }} /> Edit
          </span>
          <span className="del-btn">
            <img src={trashCan.src} alt="" />
          </span>
          {/* <img src={trash.src} alt="" /> */}
        </div>
      </div>
      {children}
      <div className="post-date">{postDate}</div>
    </Container>
  )
}
