import db from "utils/getDB"

export type UserFileProps = {
  uploaded_at
  user_id
  file_url
  file_desc?
  file_name
}

export const addOne = async (props: UserFileProps) => {
  props.file_desc = props.file_desc??""
  try {
    await db("user_file").insert([props])
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

export const removeByName = async (fileName) => {
  try {
    // console.log('======================')
   console.log(await db("user_file").where("file_name", fileName).del())
    

  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

export const findByUserId = async (userId) => {
  // console.log(1111111)
  const ret = (await db("user_file").where({user_id:userId}))
  
  return ret as Array<UserFileProps>
}

export const findByName = async (fileName) => {
  const ret = (await db("user_file").where("file_name", fileName))[0]
  
  return ret as UserFileProps
}
