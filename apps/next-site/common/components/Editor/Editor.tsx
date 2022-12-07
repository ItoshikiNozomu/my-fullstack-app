import { Editor } from "@tinymce/tinymce-react"
import { Editor as TMCEditor } from "tinymce/tinymce"
import { useCallback, useEffect, useRef } from "react"
import useUploadFile from "client/hooks/useUploadFile"
import styled from "styled-components"
import useS3 from "client/hooks/useS3"
import { useRecoilValue } from "recoil"

const BLOCK_HOR_MARGIN = "320px"

const EditorWrapper = styled.div`
  margin: 47px ${BLOCK_HOR_MARGIN} 0 ${BLOCK_HOR_MARGIN};
  position: relative;
`

const blobInfos = {}

export default ({
  renderAbove,
  renderBellow,
  wrapperStyle,
  onEditorInit,
  initialValue,
}: {
  renderAbove: () => React.ReactNode
  renderBellow: () => React.ReactNode
  wrapperStyle?: React.CSSProperties
  onEditorInit?: (editor: TMCEditor) => void
  initialValue?
}) => {
  const editorRef = useRef(null)

  const uploadToS3 = useUploadFile()

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
          automatic_uploads: false,
          height: 500,
          menubar: false,
          external_plugins: {
            case: "/case-plugin.js",
          },
          plugins: ["fullscreen", "code", "lists", "image"],
          toolbar:
            "fullscreen code | bold italic underline case | alignleft aligncenter numlist blocks image",
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
          images_upload_handler: async (blobInfo) => {
            const [, key] = await uploadToS3({
              file: blobInfo.blob(),
              name: blobInfo.filename(),
            })
            return `${location.protocol}//${location.host}/api/s3-resource?key=${key}`
            // return `${location.protocol}://${location.host}/api/s3-resource?key=${key}`
          },
        }}
      />
      {renderBellow()}
    </EditorWrapper>
  )
}
