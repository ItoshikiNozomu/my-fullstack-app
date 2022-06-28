import { request, gql } from "graphql-request"

export const getGQLFetcher = () => {
  return (query) => request("/api/graphql", query)
}
