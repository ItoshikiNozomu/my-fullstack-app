import { createReadStream } from "fs"
import { simpleUpload,getCredentials } from "./s3Utils"

it("test s3 utils", async () => {
  // const location = await simpleUpload({
  //   file: createReadStream(
  //     "C:\\Users\\luhuan\\Pictures\\QQ图片20220424141922.jpg",
  //   ),
  //   name: "test.jpg",
  // })
  // expect(location).toBe(
  //   `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/test.jpg`,
  // )

  // const s3Token = await getCredentials()
  // console.log(s3Token)
})
