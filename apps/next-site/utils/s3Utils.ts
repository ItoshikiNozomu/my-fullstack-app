import {
  S3Client,
  AbortMultipartUploadCommand,
  S3,
  UploadPartCopyCommand,
  UploadPartCommand,
  CreateMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  S3ClientConfig,
} from "@aws-sdk/client-s3"
import { createReadStream, ReadStream } from "fs"
import { nanoid } from "nanoid"
import { GetSessionTokenCommand, STSClient } from "@aws-sdk/client-sts"
const stsClient = new STSClient({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
})

const client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
})

export const getCredentials = async () => {
  const {
    Credentials,
  } = await stsClient.send(new GetSessionTokenCommand({}))
  return Credentials
}

export const simpleUpload = async ({
  file,
  name,
}: {
  file: ReadStream
  name: string
}) => {
  const { $metadata, UploadId } = await client.send(
    new CreateMultipartUploadCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: name,
    }),
  )

  const { ETag } = await client.send(
    new UploadPartCommand({
      UploadId,
      Body: file,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: name,
      // todo
      PartNumber: 1,
    }),
  )

  const { Location } = await client.send(
    new CompleteMultipartUploadCommand({
      UploadId,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: name,
      MultipartUpload: {
        // todo  the etag was generated at uploadpart
        Parts: [{ PartNumber: 1, ETag }],
      },
    }),
  )
  return Location
}
