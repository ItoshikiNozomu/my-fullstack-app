export default (resource: RequestInfo, config?: RequestInit) =>
  fetch(resource, config).then((r) => {
    if (!r.ok) {
      throw new Error(r.statusText)
    }
    return r
  })
