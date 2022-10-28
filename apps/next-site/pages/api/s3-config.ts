import { NextApiHandler } from "next"
import { getCredentials } from "utils/s3Utils"

const handler: NextApiHandler = async (req, res) => {
  res.json({
    credentials: await getCredentials(),
    region:process.env.AWS_S3_REGION,
    bucket:process.env.AWS_S3_BUCKET_NAME,
    // s3Token:'todo'
  })
}
export default handler
