// import { create, IPFS } from "ipfs-core"
import { ImportCandidate } from "ipfs-core-types/src/utils"
import { create, IPFSHTTPClient } from "ipfs-http-client"

let ipfs: IPFSHTTPClient = null

export const storeToIPFS = async (content: ImportCandidate) => {
  if (!ipfs) {
   // @ts-ignore
    const auth = "Basic " + window.infuraAuth

    ipfs = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    })
  }
  const { cid } = await ipfs.add(content)
  return cid
}
