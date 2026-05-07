const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function parseResponse(response) {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.erro || 'Falha ao chamar API')
  }
  return data
}

export async function fetchPedidos() {
  const response = await fetch(`${API_URL}/pedidos`)
  return parseResponse(response)
}

export async function createPedido(texto) {
  const response = await fetch(`${API_URL}/pedido`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto })
  })
  return parseResponse(response)
}

export { API_URL }
