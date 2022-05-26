import getDB from "../utils/getDB"
import { nanoid } from "nanoid"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import { format } from "date-fns"

const db = getDB()

export type UserProps = {
  userId: string
  userName?: string
  pwdHash?
  pwdSalt?
  createAt
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
      userId: id,

      userName,
      pwdHash: hash,
      pwdSalt: salt,
      // createAt: '2017-01-30 16:49:19',
      createAt: format(Date.now(), "yyyy-MM-dd HH:mm:ss"),
    }

    try {
      await db("users").insert([props])
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }

    return User.fromProps(props)
  }
  static createUserByMobile(mobile: string) {}

  static async getUserByUserId(userId: string) {
    // todo
    const userProps = (await db("users").where("userId", userId))[0]

    const user = new User()
    user.props = userProps
    return user
  }
  static fromProps(props: UserProps) {
    const u = new User()
    delete props.pwdHash
    delete props.pwdSalt
    u.props = props
    u.token = jsonwebtoken.sign(props, "someSecret", { expiresIn: "10d" })
    return u
  }
  static fromToken(token: string) {
    if (!token) return null
    const u = new User()
    u.token = token

    u.props = jsonwebtoken.decode(token) as UserProps
    return u
  }

  static async fromUserNameAndPwd(name, pwd) {
    const rows = await db("users").where("userName", name)
    const { pwdHash, pwdSalt, ...props } = rows[0]
    const inputHash = crypto
      .pbkdf2Sync(pwd, pwdSalt, 1000, 64, "sha512")
      .toString("hex")
    if (inputHash === pwdHash) {
      return User.fromProps({ ...props })
    }
    throw new Error("user do not match")
  }
  static async removeUserById(id: string) {
    await db("users").where("userId", id).del()
  }
}
