import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { loginStatus, s3ClientConfig, S3ClientConfigJSON } from "client/atoms"
import { format, parseISO } from "date-fns"
import { useCallback, useEffect, useState } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"

import wrappedFetch from "utils/wrappedFetch"

const S3_KEY = "s3Config"

const getS3ClientConfig = async () => {
  const ret = await wrappedFetch("/api/s3-config", {})
  localStorage.setItem("s3Config", JSON.stringify(ret))
  return ret as S3ClientConfigJSON
}
let s3Client: S3Client
const s3ReadyAtom = atom({
  key:'s3Ready',
  default:false
})
export default () => {
  const [config, setConfig] = useRecoilState(s3ClientConfig)
  const [s3Ready,setS3Ready] = useRecoilState(s3ReadyAtom)
  const loginStatusVal = useRecoilValue(loginStatus)
  
  const getUrl = useCallback(async (key) => {
    if(s3Ready){
      const command = new GetObjectCommand({
        Bucket: config.bucket,
        Key: key,
        // todo
        ResponseContentType: "image/png",
      })
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  
      return url
    }
    return ''
    
  },[s3Ready])

  useEffect(() => {
    if (config === null && loginStatusVal === "VERIFIED") {
      const localConfig = JSON.parse(
        localStorage.getItem(S3_KEY),
      ) as S3ClientConfigJSON
      ;(async () => {
        setConfig(
          parseISO(localConfig?.credentials.Expiration) > new Date()
            ? localConfig
            : await getS3ClientConfig(),
        )
      })()
    } else if (loginStatusVal === "ANONYMOUS") {
      localStorage.removeItem(S3_KEY)
    }
  }, [loginStatusVal])
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
      setS3Ready(true)
    }
  }, [config])

  // useEffect(()=>{
  //   (async()=>{
  //     // todo how to use im Image
  //     console.log(await getUrl('be4Vp1saAJUQR4VngzPCd-1670234979025-mceclip0.png'))
  //   })()

  // },[clientReady])

  return [s3Client, config, getUrl] as [
    S3Client,
    S3ClientConfigJSON,
    Function
  ]
}
