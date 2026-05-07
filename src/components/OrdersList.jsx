import React from 'react'
import { formatDate } from '../utils/formatters'

function OrderRow({ pedido, ativo, onSelect }) {
  return (
    <button
      type="button"
      className={`order-row ${ativo ? 'active' : ''}`}
      onClick={() => onSelect(pedido)}
    >
      <span className="order-id">#{pedido.id}</span>
      <span className="order-main">
        <strong>{pedido.cliente}</strong>
        <small>{pedido.itens.map((item) => item.produto).join(', ')}</small>
      </span>
      <span className="order-date">{formatDate(pedido.data_entrega)}</span>
    </button>
  )
}

export function OrdersList({ pedidos, selecionado, onSelect }) {
  return (
    <div className="orders-list">
      {pedidos.length === 0 && (
        <p className="empty-state">Nenhum pedido processado ainda.</p>
      )}
      {pedidos.map((pedido) => (
        <OrderRow
          key={pedido.id}
          pedido={pedido}
          ativo={selecionado?.id === pedido.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
