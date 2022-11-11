import { format } from "date-fns"
import { addOne, findByName, findByUserId, removeByName } from "./UserFile"

it("crud tests", async () => {
//   await addOne({
//     user_id: "aaa",
//     file_name: "some_file.jpg",
//     file_url: "https://storage.com/some_file.jpg",
//     uploaded_at: format(Date.now(), "yyyy-MM-dd HH:mm:ss"),
//   })

  const f = await findByName("some_file.jpg")
  expect(f.file_name).toBe("some_file.jpg")
  const fList = await findByUserId("aaa")


//   expect(fList.length).toBe(1)

//   await removeByName("some_file.jpg")

//   expect((await findByUserId("aaa")).length).toBe(0)
})
