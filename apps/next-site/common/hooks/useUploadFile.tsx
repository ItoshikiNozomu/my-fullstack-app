// request for s3 token and upload directly from browser
import {
  S3Client,
  UploadPartCommand,
  CreateMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  
} from "@aws-sdk/client-s3"
import { s3ClientConfig, S3ClientConfigJSON } from "common/atoms"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import wrappedFetch from "utils/wrappedFetch"

const getS3ClientConfig = async () => {
  const ret = await wrappedFetch("/api/s3-config", {})
  return ret as S3ClientConfigJSON
}
let s3Client: S3Client
export default () => {
  const [config, setConfig] = useRecoilState(s3ClientConfig)
  useEffect(() => {
    if (config === null) {
      ;(async () => {
        setConfig(await getS3ClientConfig())
      })()
    }
  }, [])
  useEffect(() => {
    if (config !== null && s3Client === undefined) {
      // debugger
      s3Client = new S3Client({
        region: config.region,
        credentials: {
          sessionToken: config.credentials.SessionToken,
          accessKeyId: config.credentials.AccessKeyId,
          secretAccessKey: config.credentials.SecretAccessKey,
        },
      })
    }
  }, [config])
  return async ({ file, name }: { file: File; name: string }) => {
    const {  UploadId } = await s3Client.send(
      new CreateMultipartUploadCommand({
        Bucket: config.bucket,
        Key: name,
      }),
    )

    const { ETag,$metadata } = await s3Client.send(
      new UploadPartCommand({
        UploadId,
        Body: file,
        Bucket: config.bucket,
        Key: name,
        // todo
        PartNumber: 1,
      }),
    )
      console.log('=====',ETag,file,$metadata)
    const { Location } = await s3Client.send(
      new CompleteMultipartUploadCommand({
        UploadId,
        Bucket: config.bucket,
        Key: name,
        MultipartUpload: {
          // todo  the etag was generated at uploadpart
          Parts: [{ PartNumber: 1, ETag }],
        },
      }),
    )
    return Location
  }
}
