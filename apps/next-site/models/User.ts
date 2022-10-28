import db from "../utils/getDB"
import { nanoid } from "nanoid"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
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

  static async createUserByNameAndPwd(userName: string, pwd: string) {
    const id = nanoid()
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto
      .pbkdf2Sync(pwd, salt, 1000, 64, "sha512")
      .toString("hex")

    const props = {
      user_id: id,

      user_name:userName,
      pwd_hash: hash,
      pwd_salt: salt,
      // createAt: '2017-01-30 16:49:19',
      create_at: format(Date.now(), "yyyy-MM-dd HH:mm:ss"),
    }

    try {
      await db('users').insert([props])
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }

    return User.fromProps(props)
  }
  static createUserByMobile(mobile: string) {}

  static async getUserByUserId(userId: string) {
    // todo
    const userProps = (await db('users').where("user_id", userId))[0]
    if(!userProps)return null
    return this.fromProps(userProps)
  }
  private static fromProps(props: UserProps) {
    
    const u = new User()
    delete props.pwd_hash
    delete props.pwd_salt
    u.props = props
    u.token = jsonwebtoken.sign(props, process.env.JWT_SECRET, {
      expiresIn: "10d",
    })
    return u
  }
   static fromToken(token: string) {
    if (!token) return null
    const u = new User()
    u.token = token

    u.props = jsonwebtoken.decode(token) as UserProps
    return u
  }

  static async getUserByNameAndPwd(name, pwd) {
    const rows = await db('users').where("user_name", name)
    const { pwd_hash, pwd_salt, ...props } = rows[0] as UserProps
    const inputHash = crypto
      .pbkdf2Sync(pwd, pwd_salt, 1000, 64, "sha512")
      .toString("hex")
    if (inputHash === pwd_hash) {
      return User.fromProps({ ...props })
    }
    throw new Error("user do not match")
  }
  static async removeUserById(id: string) {
    await db('users').where("user_id", id).del()
  }
}




