import User from "./User"

it("test the static methods", async () => {
  const u =await User.createUserByNameAndPwd('tom','123456')
  
  expect((await User.getUserByUserId(u.props.user_id)).props.user_name).toBe('tom')
  
  expect((await User.getUserByNameAndPwd('tom','123456')).props.user_name).toBe('tom');
  await User.removeUserById(u.props.user_id);
  expect((await User.getUserByUserId(u.props.user_id))).toBe(null)
})
