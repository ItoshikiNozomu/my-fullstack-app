// request for s3 token and upload directly from browser
import {
  UploadPartCommand,
  CreateMultipartUploadCommand,
  CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3"
import { userProps } from "client/atoms"
import { useRecoilValue } from "recoil"
import wrappedFetch from "utils/wrappedFetch"

import useS3 from "./useS3"

export default () => {
  const [s3Client, s3Config] = useS3()
  const userPropsVal = useRecoilValue(userProps)
  return async ({ file, name }: { file: File | Blob; name: string }) => {
    const fileKey = `${userPropsVal.user_id}-${Date.now()}-${name}`
    if (s3Client && s3Config) {
      const { UploadId } = await s3Client.send(
        new CreateMultipartUploadCommand({
          Bucket: s3Config.bucket,
          Key: fileKey,
        }),
      )

      const { ETag, $metadata } = await s3Client.send(
        new UploadPartCommand({
          UploadId,
          Body: file,
          Bucket: s3Config.bucket,
          Key: fileKey,
          // todo
          PartNumber: 1,
        }),
      )
      // console.log("=====", ETag, file, $metadata)
      const { Location } = await s3Client.send(
        new CompleteMultipartUploadCommand({
          UploadId,
          Bucket: s3Config.bucket,
          Key: fileKey,
          MultipartUpload: {
            // todo  the etag was generated at uploadpart
            Parts: [{ PartNumber: 1, ETag }],
          },
        }),
      )
      wrappedFetch("/api/user-resource", {
        method: "put",
        body: JSON.stringify({
          fileUrl: Location,
          fileName:fileKey
        }),
      })
      return [Location,fileKey]
    }
    
  }
}
