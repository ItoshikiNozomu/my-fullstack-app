import styled from "styled-components"

import playFill from "./resources/play.fill.svg"

const PostContainer = styled.div`
  padding: 0 25px;
  img {
    width: 363px;
    margin-bottom: 24px;
  }
  .img-gallery {
    column-count: 2;
  }
  .html-container {
    font-size: 14px;
    line-height: 21px;
    p {
      font-family: "Popins";
      font-weight: normal;

      color: #606060;
    }
    strong {
      font-family: "Popins";
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #030303;
    }
  }
`

export default () => {
  return (
    <PostContainer>
      <div
        className="html-container"
        dangerouslySetInnerHTML={{
          __html: `<p><strong>Proin laoreet semper</strong></p>
            <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed laoreet metus nulla, in gravida urna rhoncus in. Proin laoreet semper tortor ac posuere. </p>`,
        }}
      ></div>
      <AudioWidget></AudioWidget>
    </PostContainer>
  )
}

const AudioContainer = styled.div`
  margin-top: 24px;

  width: 431px;
  display: flex;
  align-items: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.03);
  .play-ic {
    flex: 40px 0 0;
    height: 40px;
    background: radial-gradient(
      50% 115.18% at 50% -15.18%,
      #8f00ff 0%,
      #532bc5 100%
    );
    img {
      width: 12px;
      height: 12px;
      margin-bottom: 0;
    }
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .progress-indicator {
    flex: 1;
    margin-left: 24px;
    .progress-bar {
      &::before {
        content: " ";
        position: absolute;
        left: 33%;
        top: -4px;
        width: 10px;
        height: 10px;
        background: radial-gradient(
          50% 115.18% at 50% -15.18%,
          #8f00ff 0%,
          #532bc5 100%
        );
        border-radius: 16px;
        cursor: pointer;
      }
      //   overflow: hidden;
      height: 2px;
      background: rgba(83, 43, 197, 0.1);
      border-radius: 8px;
      position: relative;
      .inner {
        width: 35%;
        background: #522ac4;
        height: 100%;
      }
    }
    .time-tip {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      margin-top: 5px;
      font-family: "SF Pro Text";
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      /* or 118% */

      letter-spacing: 0.066px;

      color: #222625;
    }
  }
`

const AudioWidget = () => {
  return (
    <AudioContainer>
      <span className="play-ic">
        <img src={playFill.src} alt="" />
      </span>
      <div className="progress-indicator">
        <div className="progress-bar">
          <div className="inner"></div>
        </div>
        <div className="time-tip">
          <span>10:06</span>
          <span>-30:09</span>
        </div>
      </div>
    </AudioContainer>
  )
}
