import db from "./getDB"

it("connect to db", async () => {
  const result = await db.raw("SELECT NOW()")
  //   console.log(result.rows)
  expect(result.rows.length).toBe(1)
})

afterAll(() => {
  // db.destroy()
})

export {}
