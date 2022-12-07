import { format } from "date-fns"
import { decodeJwt } from "jose"
import { addOne } from "models/UserFile"
import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, resp) => {
  const { fileUrl, fileName } = JSON.parse(req.body)
  const token = req.cookies.token
  const payload = decodeJwt(token)
  await addOne({
    user_id: payload.user_id,
    file_url: fileUrl,
    file_desc: "",
    uploaded_at: format(Date.now(), "yyyy-MM-dd HH:mm:ss"),
    file_name: fileName,
  })
  resp.json({ message: "success" })
}
export default handler
