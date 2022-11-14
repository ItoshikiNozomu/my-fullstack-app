import {
  createUserByNameAndPwd,
  getUserByNameAndPwd,
  getUserByUserId,
  removeUserByUserId,
  updateUserPropsByUserId,
} from "./User"

it("test the static methods", async () => {
  const u = await createUserByNameAndPwd("tom", "123456")

  expect((await getUserByUserId(u.user_id)).user_name).toBe("tom")

  expect((await getUserByNameAndPwd("tom", "123456")).user_name).toBe("tom")
  const ret = await updateUserPropsByUserId(u.user_id,{mobile:'18688394959'})
  // console.log('updateeeeeeeee',ret)
  expect((await getUserByUserId(u.user_id)).mobile).toBe("18688394959")
  await removeUserByUserId(u.user_id)
  expect(await getUserByUserId(u.user_id)).toBe(null)
})

// afterAll()