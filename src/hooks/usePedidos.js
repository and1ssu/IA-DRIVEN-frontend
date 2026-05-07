import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchPedidos, createPedido } from '../api/pedidos'

function humanizeError(message) {
  if (message === 'Failed to fetch') return 'Não foi possível conectar à API.'
  return message
}

export function usePedidos() {
  const [pedidos, setPedidos] = useState([])
  const [selecionado, setSelecionado] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const carregarPedidos = useCallback(async () => {
    setCarregando(true)
    try {
      const data = await fetchPedidos()
      setPedidos(data)
      setSelecionado((current) => current || data[0] || null)
    } catch {
      // falha silenciosa — o estado vazio já comunica que não há pedidos
    } finally {
      setCarregando(false)
    }
  }, [])

  const enviarPedido = useCallback(async (texto) => {
    setCarregando(true)
    setErro('')
    try {
      const novoPedido = await createPedido(texto)
      setPedidos((current) => [novoPedido, ...current])
      setSelecionado(novoPedido)
      return true
    } catch (error) {
      setErro(humanizeError(error.message))
      return false
    } finally {
      setCarregando(false)
    }
  }, [])

  const totalItens = useMemo(
    () => pedidos.reduce((total, pedido) => total + pedido.itens.length, 0),
    [pedidos]
  )

  useEffect(() => {
    carregarPedidos()
  }, [carregarPedidos])

  return {
    pedidos,
    selecionado,
    setSelecionado,
    carregando,
    erro,
    totalItens,
    carregarPedidos,
    enviarPedido
  }
}
