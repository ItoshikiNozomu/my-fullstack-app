import { Credentials } from "@aws-sdk/client-sts"
import { UserProps } from "models/User";
import { atom, useRecoilState } from "recoil"


export type S3ClientConfigJSON = {
  credentials: { AccessKeyId; SessionToken; SecretAccessKey }
  region,
  bucket
}

export const s3ClientConfig = atom({
  key: "s3ClientConfig",
  default: null as null|S3ClientConfigJSON,
})


export const  userPros = atom<UserProps>({
  key:'userProps',
  default:null  
})

export const loginStatus = atom<"PENDING" | "ANONYMOUS" | "VERIFIED"|'NOT_VERIFIED'>({
  key:'loginStatus',
  default:'PENDING'
})

export const loginModalVisible = atom({
  key:'loginModalVisible',
  default:false
})