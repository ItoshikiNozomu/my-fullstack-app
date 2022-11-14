import db from './utils/getDB'
module.exports = async function (globalConfig, projectConfig) {
  await db.destroy()
  process.exit()
  
}
