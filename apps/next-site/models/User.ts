import db from "utils/getDB"
import { nanoid } from "nanoid"
import crypto from "crypto"
// import jsonwebtoken, { verify } from "jsonwebtoken"
import { SignJWT, decodeJwt, jwtVerify } from "jose"
import { format } from "date-fns"

// const db = getDB()

export type UserProps = {
  user_id: string
  user_name?: string
  pwd_hash?
  pwd_salt?
  create_at
  mobile?: string
}

export default class User {
  token: string
  props: UserProps

  updateProps() {}

  // static async createUserByNameAndPwd(userName: string, pwd: string) {
  //   const id = nanoid()
  //   const salt = crypto.randomBytes(16).toString("hex")
  //   const hash = crypto
  //     .pbkdf2Sync(pwd, salt, 1000, 64, "sha512")
  //     .toString("hex")

  //   const props = {
  //     user_id: id,

  //     user_name: userName,
  //     pwd_hash: hash,
  //     pwd_salt: salt,
  //     // createAt: '2017-01-30 16:49:19',
  //     create_at: format(Date.now(), "yyyy-MM-dd HH:mm:ss"),
  //   }

  //   try {
  //     await getDB()("users").insert([props])
  //   } catch (e) {
  //     console.error(e)
  //     throw new Error(e)
  //   }

  //   return User.fromProps(props)
  // }
  // static createUserByMobile(mobile: string) {}

  // static async getUserByUserId(userId: string) {
  //   // todo
  //   const userProps = (await getDB()("users").where("user_id", userId))[0]
  //   if (!userProps) return null
  //   return this.fromProps(userProps)
  // }
  // private static async fromProps(props: UserProps) {
  //   const u = new User()
  //   delete props.pwd_hash
  //   delete props.pwd_salt
  //   u.props = props
  //   u.token = await new SignJWT(props)
  //     .setExpirationTime("10d")
  //     .sign(new TextEncoder().encode(process.env.JWT_SECRET))
  //   // u.token = jsonwebtoken.sign(props, process.env.JWT_SECRET, {
  //   //   expiresIn: "10d",
  //   // })
  //   return u
  // }

  // static async removeUserById(id: string) {
  //   await getDB()("users").where("user_id", id).del()
  // }
}

export const createUserByNameAndPwd = async (userName, pwd) => {
  const id = nanoid()
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.pbkdf2Sync(pwd, salt, 1000, 64, "sha512").toString("hex")

  const props = {
    user_id: id,

    user_name: userName,
    pwd_hash: hash,
    pwd_salt: salt,
    // createAt: '2017-01-30 16:49:19',
    create_at: format(Date.now(), "yyyy-MM-dd HH:mm:ss"),
  }

  try {
    await db("users").insert([props])
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
  return props
  //   return User.fromProps(props)
}

export const createUserToken = async (uProps: UserProps) => {
  const { pwd_hash, pwd_salt, ...props } = uProps
  const token = await new SignJWT(props)
    .setExpirationTime("10d")
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))

  return token
}

export const fromToken = (token: string) => {
  if (!token) return null
  // todo
  // if(verify(token).)
  return decodeJwt(token) as UserProps
}

export const getUserByNameAndPwd = async (name, pwd) => {
  const rows = await db("users").where("user_name", name)
  const { pwd_hash, pwd_salt, ...props } = rows[0] as UserProps
  const inputHash = crypto
    .pbkdf2Sync(pwd, pwd_salt, 1000, 64, "sha512")
    .toString("hex")
  if (inputHash === pwd_hash) {
    return props as UserProps
  }
  throw new Error("user do not match")
}
