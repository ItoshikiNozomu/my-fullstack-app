import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"
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
}: {
  renderAbove: () => React.ReactNode
  renderBellow: () => React.ReactNode
  wrapperStyle?: React.CSSProperties
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
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: ["fullscreen", "code", "casechange"],
          toolbar: "fullscreen code bold italic underline casechange",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {renderBellow()}
    </EditorWrapper>
  )
}
