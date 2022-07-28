import { Editor } from "@tinymce/tinymce-react"

import { useEffect, useRef } from "react"
import styled from "styled-components"

const BLOCK_HOR_MARGIN = "320px"

const EditorWrapper = styled.div`
  margin: 47px ${BLOCK_HOR_MARGIN} 0 ${BLOCK_HOR_MARGIN};
  position: relative;
`

export default ({
  renderAbove,
  renderBellow,
  wrapperStyle,
  onEditorInit,
  initialValue
}: {
  renderAbove: () => React.ReactNode
  renderBellow: () => React.ReactNode
  wrapperStyle?: React.CSSProperties
  onEditorInit?: (editor) => void,
  initialValue?
}) => {
  const editorRef = useRef(null)
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  return (
    <EditorWrapper className="editor-wrapper" style={wrapperStyle}>
      {renderAbove()}
      <Editor
        apiKey="your-api-key"
        
        onInit={(evt, editor) => {
          editorRef.current = editor

          onEditorInit?.(editor)
        }}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: false,
          external_plugins: {
            case: "/case-plugin.js",
          },
          plugins: ["fullscreen", "code","lists"],
          toolbar: "fullscreen code | bold italic underline case | alignleft aligncenter numlist blocks",
          content_style: `body { font-family:Popins,Arial,sans-serif; font-size:14px ;
              font-size: 14px;
              line-height: 21px;
            
            }
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
            `,
        }}
      />
      {renderBellow()}
    </EditorWrapper>
  )
}
