import styled from "styled-components"

import post11 from "./resources/post1-1.png"
import post12 from "./resources/post1-2.png"
import post13 from "./resources/post1-3.png"
import post14 from "./resources/post1-4.png"

const PostContainer = styled.div`
  padding: 0 25px;
  img{
    width:363px;
   margin-bottom:24px;
  }
  .img-gallery{
    column-count:2;
  }
`

export default () => {
  const imgs = [post11, post12, post13, post14]
  return (
    <PostContainer>
      <div className="img-gallery">
        {imgs.map((e) => (
          <img 
          key={e.src}
          className="gallery-item"
          src={e.src} alt="" />
        ))}
      </div>
    </PostContainer>
  )
}
