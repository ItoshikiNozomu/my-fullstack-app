import knex, { Knex } from "knex"

let db:Knex<any, unknown[]>

export const getDB = () => {
  db = knex({
    client: "pg",
    connection: process.env.DATABASE_URL,
  })
  return db
  // console.log(db)
}

export default db ? db : (db = getDB())


// export default getDB

// import { Pool, Client } from "pg"

// export const test = async () => {
//   const pool = new Pool({
//     connectionString: "postgres://postgres:postgrespw@10.0.0.13:5432",
//   })
//   const results = await pool.query("SELECT NOW()")
//   console.log(results)
//   pool.end()
// }
