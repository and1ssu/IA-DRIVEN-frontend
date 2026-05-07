import React, { useState } from 'react'

const EXEMPLO = 'Quero 10 caixas de leite integral e 5 fardos de agua para entrega amanha'

export function OrderForm({ carregando, onSubmit }) {
  const [texto, setTexto] = useState(EXEMPLO)

  async function handleSubmit(event) {
    event.preventDefault()
    if (!texto.trim()) return
    const ok = await onSubmit(texto)
    if (ok) setTexto('')
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <label htmlFor="texto-pedido">Pedido em texto livre</label>
      <textarea
        id="texto-pedido"
        value={texto}
        rows={8}
        onChange={(event) => setTexto(event.target.value)}
        placeholder="Ex.: Quero 10 caixas de leite integral e 5 fardos de agua para entrega amanha"
      />
      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={() => setTexto(EXEMPLO)}>
          Exemplo
        </button>
        <button type="submit" disabled={carregando}>
          {carregando ? 'Processando...' : 'Processar pedido'}
        </button>
      </div>
    </form>
  )
}
