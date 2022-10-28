import { Credentials } from "@aws-sdk/client-sts"
import { atom, useRecoilState } from "recoil"


export type S3ClientConfigJSON = {
  credentials: { AccessKeyId; SessionToken; SecretAccessKey }
  region,
  bucket
}

export const s3ClientConfig = atom({
  key: "s3Credentials",
  default: null as null|S3ClientConfigJSON,
})
