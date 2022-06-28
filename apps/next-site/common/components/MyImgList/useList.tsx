import useSWR from "swr"
import { getGQLFetcher } from "../../../utils/getFetcher"

const gqlFetcher = getGQLFetcher()

export default () => {
  const { data, error } = useSWR(
    `query ($name: String) {
  
        hello(name: $name)
      }`,
    gqlFetcher
  )
  return {
    list: data,
    isLoading: !error && !data,
    isError: error,
  }
}
