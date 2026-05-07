import React from 'react'
import { formatDate, formatDateTime } from '../utils/formatters'

export function OrderDetail({ pedido }) {
  if (!pedido) {
    return (
      <aside className="detail-panel empty-state">
        Selecione um pedido para ver os dados estruturados.
      </aside>
    )
  }

  return (
    <aside className="detail-panel">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Pedido #{pedido.id}</p>
          <h3>{pedido.cliente}</h3>
        </div>
      </div>

      <dl className="detail-grid">
        <div>
          <dt>Entrega</dt>
          <dd>{formatDate(pedido.data_entrega)}</dd>
        </div>
        <div>
          <dt>Criado em</dt>
          <dd>{formatDateTime(pedido.criado_em)}</dd>
        </div>
      </dl>

      <table className="items-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Qtd.</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          {pedido.itens.map((item, index) => (
            <tr key={`${item.produto}-${index}`}>
              <td>{item.produto}</td>
              <td>{item.quantidade}</td>
              <td>{item.unidade || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="raw-text">
        <span>Texto original</span>
        <p>{pedido.texto_original}</p>
      </div>
    </aside>
  )
}
