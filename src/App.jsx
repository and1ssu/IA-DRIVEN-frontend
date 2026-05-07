import React from 'react'
import { usePedidos } from './hooks/usePedidos'
import { Topbar } from './components/Topbar'
import { OrderForm } from './components/OrderForm'
import { MetricsBar } from './components/MetricsBar'
import { OrdersList } from './components/OrdersList'
import { OrderDetail } from './components/OrderDetail'

export function App() {
  const {
    pedidos,
    selecionado,
    setSelecionado,
    carregando,
    erro,
    totalItens,
    carregarPedidos,
    enviarPedido
  } = usePedidos()

  return (
    <main className="app-shell">
      <section className="input-section">
        <Topbar carregando={carregando} onAtualizar={carregarPedidos} />
        <OrderForm carregando={carregando} onSubmit={enviarPedido} />
        {erro && <p className="error-message">{erro}</p>}
        <MetricsBar totalPedidos={pedidos.length} totalItens={totalItens} />
      </section>

      <section className="orders-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Pedidos estruturados</p>
            <h2>Lista de pedidos</h2>
          </div>
          <span className="status-pill">{carregando ? 'Carregando' : 'Pronto'}</span>
        </div>

        <div className="orders-layout">
          <OrdersList
            pedidos={pedidos}
            selecionado={selecionado}
            onSelect={setSelecionado}
          />
          <OrderDetail pedido={selecionado} />
        </div>
      </section>
    </main>
  )
}
