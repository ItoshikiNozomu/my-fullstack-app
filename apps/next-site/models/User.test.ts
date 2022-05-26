import User from "./User"

it("test the static methods", async () => {
  // const id = User.createUserByNameAndPwd('tom','123456')
  // const user = await User.getUserByUserId(id)
  // expect(user.props.userName).toBe('tom')
  const user = await User.getUserByUserNameAndPwd("tom", "123456")
  expect(user.props.userName).toBe("tom")
  const u2 = User.fromToken(user.token)

  expect(u2.props.userId).toBe(user.props.userId)
  // expect(user)
})
