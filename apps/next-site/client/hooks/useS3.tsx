import { S3Client } from "@aws-sdk/client-s3"
import { loginStatus, s3ClientConfig, S3ClientConfigJSON } from "client/atoms"
import { format, parseISO } from "date-fns"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import wrappedFetch from "utils/wrappedFetch"

const S3_KEY = "s3Config"

const getS3ClientConfig = async () => {
  const ret = await wrappedFetch("/api/s3-config", {})
  localStorage.setItem("s3Config", JSON.stringify(ret))
  return ret as S3ClientConfigJSON
}
let s3Client: S3Client

export default () => {
  const [config, setConfig] = useRecoilState(s3ClientConfig)
  const loginStatusVal = useRecoilValue(loginStatus)
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
    }
  }, [config])
  return [s3Client, config] as [S3Client, S3ClientConfigJSON]
}
