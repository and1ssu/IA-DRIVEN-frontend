import React from 'react'

export function Topbar({ carregando, onAtualizar }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Processamento de pedidos</p>
        <h1>Central Inteligente</h1>
      </div>
      <button className="ghost-button" type="button" onClick={onAtualizar} disabled={carregando}>
        Atualizar
      </button>
    </header>
  )
}
