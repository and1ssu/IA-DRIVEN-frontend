import React from 'react'

function Metric({ label, value }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export function MetricsBar({ totalPedidos, totalItens }) {
  return (
    <div className="metrics">
      <Metric label="Pedidos" value={totalPedidos} />
      <Metric label="Itens" value={totalItens} />
    </div>
  )
}
