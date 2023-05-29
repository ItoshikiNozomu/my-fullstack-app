import useS3 from "client/hooks/useS3"
import React, { useEffect, useMemo, useState } from "react"

export default (
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { s3key? },
) => {
  const [, , getUrl] = useS3()
  const [url, setUrl] = useState("")
  useEffect(() => {
    ;(async () => {
      setUrl(await getUrl(props.s3key || props.src))
    })()
  }, [props.s3key, props.src, getUrl])

  return <img {...props} src={url} />
}
