import { UserProps } from "models/User"
import { atom } from "recoil"
// {
//   credentials: {
//     AccessKeyId: "ASIAVXKOQEVTWNB3TXQP",
//     SecretAccessKey: "BFQK45ms1H0nDXf87lSzWN4VeIgcQQ7g19yCODMK",
//     SessionToken:
//       "IQoJb3JpZ2luX2VjEF8aDmFwLW5vcnRoZWFzdC0xIkcwRQIhALYXrrGxEoPGYq601kjcVJi9PfdDzsHUe3D4MdlJMC7UAiASRCRjPH6cL0jVCWrnFLDrs5Zwee/ButPMSePTQAr5HCrrAQhZEAAaDDM5MzY5MTAxNDUwMyIMZwozEASrVwR+FGLEKsgBUcF4tDcwWQcpyq1PzoNrQRdfsylIh0Hqpt6LqoO6U6dzXKFuO8V2xTf8KHB84xk3sHe7s2zzmbg6/i7DAjd0FONGn4gZTJq866YwscvRtST5ga2OwsIrIY36iXQyg+tt7sueMeQiS+ApeOzXLUwO4GwZMT9GaqSgCl0TnQ1wKwp023p+HgKF6WctT6c5zcQgY6QJIkikHlPrAw722irkV9EUaEFSUD9ph9eGoWhZBPGFvjFwbCM/0FqoU0zyTimzPBr8i2octDMwsrGtmwY6mAHhmQEAmneV59eduvzuUkIl45JoTSaRwiPqLbheFQsBZp13/HV0lH7j9wJhPwwgDu0rOBOesTh4vSdEsXrjHaL9EGdWYdeFWcYSifQhItHYEFWA3OcDvqm7y7sINb2E5Fte0QxHhhpEESj1O2jd9EHM8XPDmQJAhWma6oStF6vRkEWpsCIMC2e53beCD0OrXFrZo0KaAjx/Mw==",
//     Expiration: "2022-11-09T19:37:22.000Z",
//   },
//   region: "ap-northeast-1",
//   bucket: "lh-aws-dev",
// }
export type S3ClientConfigJSON = {
  //
  credentials: { AccessKeyId; SessionToken; SecretAccessKey; Expiration }
  region
  bucket
}

export const s3ClientConfig = atom({
  key: "s3ClientConfig",
  default: null as null | S3ClientConfigJSON,
})

export const userProps = atom<UserProps>({
  key: "userProps",
  default: null,
})

export const loginStatus = atom<"PENDING" | "ANONYMOUS" | "VERIFIED">({
  key: "loginStatus",
  default: "PENDING",
})

export const loginModalVisible = atom({
  key: "loginModalVisible",
  default: false,
})

export const editingPostId = atom({
  key:'editingPostId',
  default:null
})