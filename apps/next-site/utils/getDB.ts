import knex from "knex"

const u = process.env.CLEARDB_DATABASE_URL.replace("mysql:", "http:")

// console.log(u,'=============')

const urlObj = new URL(u)

let db = knex({
  client: "mysql",
  connection: {
    database: urlObj.pathname.replace("/", "") ?? "img_crm",
    host: urlObj.hostname ?? "172.25.53.171",
    user: urlObj.username ?? "dev",
    password: urlObj.password ?? "pwd",
    port: 3306,
  },
})

const getDB = () => db

export default getDB
