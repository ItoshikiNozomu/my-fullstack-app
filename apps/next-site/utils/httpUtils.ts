export const setCookieString = (props: { key; value; maxAge? }) => {
  return `${props.key}=${encodeURIComponent(props.value)}; ${
    props.maxAge === undefined ? `max-age=${props.maxAge}` : ""
  }; path=/`
}
