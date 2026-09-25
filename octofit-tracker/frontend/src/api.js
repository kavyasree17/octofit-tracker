const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function recordsFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function fetchRecords(resource) {
  const endpoint = resource.startsWith('http://') || resource.startsWith('https://')
    ? resource
    : resource.startsWith('/api/')
    ? resource.slice('/api'.length)
    : `/${resource}/`
  const response = await fetch(endpoint.startsWith('http') ? endpoint : `${apiBaseUrl}${endpoint}`)
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  return recordsFromResponse(await response.json())
}