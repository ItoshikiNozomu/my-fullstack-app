import { ApolloServer } from "apollo-server-micro"
import cors from "cors"
import { NextApiHandler, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { queryType, stringArg, makeSchema } from "nexus"
import React from "react"

const Query = queryType({
  definition(t) {
    t.string("hello", {
      args: { name: stringArg() },
      resolve: (parent, { name }) => `Hello ${name || "World"}!`,
    })
  },
})

const schema = makeSchema({
  types: [Query],
})

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    // const session = await getSession({req});
    // const userEmail = session?.user?.email;
    // // Throw if invalid
    // if (!userEmail) {
    //   throw new Error('Not authenticated');
    // }
    return {
      // prisma
      // , currentUserEmail: userEmail
    }
  },
  //   tracing: process.env.NODE_ENV === 'development',
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const config = {
  api: { bodyParser: false },
}

let handler

export default async (req, res: NextApiResponse) => {
  // await runMiddleware(req,res,cors)
  res.setHeader("access-control-allow-methods", "POST")
  res.setHeader("access-control-allow-origin", "https://studio.apollographql.com")
  res.setHeader("access-control-allow-headers", "content-type")
  if (!handler) {
    await apolloServer.start()
    handler = await apolloServer.createHandler({
      path: "/api/graphql",
    })
  }

  if (req.method === "OPTIONS") {
    res.end()
    return false
  }

  handler(req, res)
}





