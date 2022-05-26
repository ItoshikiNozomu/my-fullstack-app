import knex from "knex"
let db = knex({
  client: "mysql",
  connection: {
    database: "img_crm",
    host: "172.25.53.171",
    user: "dev",
    password: "pwd",
    port:3306
  },
})

const getDB = () => db

export default getDB
