import styled from "styled-components"

import post11 from "./resources/post1-1.png"
import post12 from "./resources/post1-2.png"
import post13 from "./resources/post1-3.png"
import post14 from "./resources/post1-4.png"

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
  const imgs = [post11, post13, post12, post14]
  return (
    <PostContainer>
      <div
        className="html-container"
        dangerouslySetInnerHTML={{
          __html:
            `<p><strong>Nunc eu quam sit amet justo elementum mollis</strong></p>
            <p>Maecenas quam nunc, sagittis non condimentum at, rutrum sit amet eros. Fusce rutrum, lectus in blandit sagittis, mi tortor ullamcorper mi, vitae vestibulum libero quam a nisi. In eu mauris et neque sodales porta eu eget dui. Nunc eu quam sit amet justo elementum mollis.&nbsp;</p>
            <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed laoreet metus nulla, in gravida urna rhoncus in. Proin laoreet semper tortor ac posuere.&nbsp;</p>`,
        }}
      ></div>
      <div className="img-gallery">
        {imgs.map((e) => (
          <img key={e.src} className="gallery-item" src={e.src} alt="" />
        ))}
      </div>
    </PostContainer>
  )
}
