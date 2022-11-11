export default (resource: RequestInfo, config?: RequestInit) =>
  fetch(resource, config).then((r) => {
    if (!r.ok) {
      return Promise.reject(r)
    }

    
    return r.json().then((json) => json )
    
  })
