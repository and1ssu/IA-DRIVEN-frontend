# Central Inteligente — Frontend

Interface web do sistema de processamento de pedidos em texto livre.  
Construída em **React 19 + Vite**, consome a API do [repositório backend](https://github.com/and1ssu/IA-DRIVEN-backend).

---

## Como executar

**Pré-requisito:** Node 20+

```bash
npm install
npm run dev
```

A interface sobe em `http://localhost:5173`.

Se a API estiver em outra URL (padrão é `http://localhost:8080`):

```bash
VITE_API_URL=http://meu-servidor:8080 npm run dev
```

Para gerar o build de produção:

```bash
npm run build
npm run preview   # serve o build localmente
```

---

## O que a interface faz

| Funcionalidade | Onde |
|---|---|
| Inserir pedido em texto livre | Coluna esquerda — formulário |
| Processar e estruturar o pedido via IA | Botão "Processar pedido" |
| Listar todos os pedidos | Coluna direita — lista |
| Ver detalhes estruturados de um pedido | Painel de detalhe ao selecionar |

---

## Estrutura do projeto

```
src/
  main.jsx              # entry point — apenas monta o React
  App.jsx               # composição do layout e orquestração
  api/
    pedidos.js          # fetch para POST /pedido e GET /pedidos
  utils/
    formatters.js       # formatação de datas em pt-BR
  hooks/
    usePedidos.js       # estado global + chamadas à API
  components/
    Topbar.jsx          # cabeçalho com título e botão Atualizar
    OrderForm.jsx       # textarea de texto livre + ações
    MetricsBar.jsx      # cards de resumo (pedidos e itens)
    OrdersList.jsx      # lista de pedidos + linha individual
    OrderDetail.jsx     # painel de detalhes do pedido selecionado
  styles.css            # CSS global sem framework
```

---

## Decisões técnicas

**Sem biblioteca de componentes ou CSS framework**  
O CSS foi escrito à mão para manter o projeto sem dependências supérfluas e facilitar a execução em qualquer máquina. O visual usa variáveis de espaçamento e paleta de cores consistentes sem precisar de Tailwind ou Material UI.

**Estado centralizado em um custom hook**  
Toda a lógica de estado (`pedidos`, `selecionado`, `carregando`, `erro`) e as chamadas à API vivem em `usePedidos`. O `App` só compõe o layout — nenhum componente acessa a API diretamente.

**Erro de carregamento inicial silencioso**  
Quando a API está indisponível ao abrir a página, a interface mostra estado vazio sem exibir erro. O usuário vê "Nenhum pedido processado ainda." em vez de uma mensagem técnica. Erros de ações iniciadas pelo usuário (envio do formulário) são exibidos com mensagem em português.

**Estado do texto do formulário é local**  
`OrderForm` gerencia o próprio `useState` para o campo de texto. Isso evita que cada tecla digitada re-renderize o `App` inteiro e mantém o componente autossuficiente.

**Separação clara entre camadas**  
`api/pedidos.js` isola tudo que depende de `fetch` e da URL da API. `utils/formatters.js` contém funções puras sem dependências. Qualquer troca de backend ou biblioteca de datas afeta apenas esses dois arquivos.

---

## Uso de IA

### Ferramenta utilizada

**Claude Code (Anthropic)** — usado como assistente direto no terminal, dentro do editor, durante todo o desenvolvimento.

---

### Arquitetura e estrutura de componentes

**Como usei:** pedi uma análise do arquivo `main.jsx` original (único arquivo com ~230 linhas) e solicitei uma proposta de componentização.

**Prompt inicial:**
> "Consegue estruturar o projeto, deixando mais componentizado?"

**O que a IA propôs:**
A IA identificou os limites naturais de responsabilidade e sugeriu a separação em `api/`, `utils/`, `hooks/` e `components/` — uma estrutura que faz sentido para o tamanho do projeto sem criar over-engineering.

**Onde validei:**
Revisei cada arquivo gerado para garantir que nenhum componente acumulasse responsabilidades que não eram suas. O `OrderForm` precisou de ajuste: na primeira versão, o estado do texto ainda era controlado pelo `App`. Corrigi para que o componente gerenciasse seu próprio estado local, já que o `App` não precisa dessa informação em tempo real.

**Onde corrigi a IA:**
O `OrdersList` foi gerado inicialmente com um wrapper `<section className="orders-section">` completo, duplicando o mesmo wrapper que já existia no `App.jsx`. A IA não percebeu o conflito de layout. Identifiquei o problema e instruí a remover o wrapper, deixando o componente responsável apenas pela lista de linhas.

---

### Feedback de UX

**Prompt:**
> "API localhost:8080 — essa informação para o usuário é desnecessária. Failed to fetch essa também."

**O que a IA fez:**
Removeu o card de métrica "API", separou o erro de carregamento automático (silenciado) do erro de ação do usuário (exibido), e adicionou tradução de `"Failed to fetch"` para português.

**Onde validei:**
Testei com o backend offline para confirmar que a mensagem de erro não aparecia no carregamento inicial, e testei com o backend online para confirmar que erros do servidor ainda apareciam normalmente ao enviar um pedido.

---

### Refinamento de prompts — exemplo prático

A primeira solicitação de componentização gerou código funcional, mas com um bug de layout (wrapper duplicado descrito acima). Em vez de aceitar o resultado cegamente, inspecionei o `App.jsx` gerado, identifiquei o conflito e fiz uma instrução de correção cirúrgica:

> "O OrdersList está com wrapper duplicado em relação ao App.jsx — simplifica para renderizar apenas a lista de linhas."

Isso demonstra o padrão que segui em todo o projeto: **gerar → inspecionar → corrigir → validar com build**. O `npm run build` serviu como verificação objetiva após cada mudança.

---

### Resumo do que a IA fez bem e onde precisei corrigir

| Tarefa | IA acertou | Precisei corrigir |
|---|---|---|
| Proposta de estrutura de pastas | ✅ Estrutura coerente com o tamanho do projeto | — |
| Separação de responsabilidades | ✅ Hook, api, utils claramente separados | Estado do texto ainda no App (corrigido) |
| Layout dos componentes | Componentes individuais corretos | Wrapper duplicado no OrdersList |
| Feedback de UX | ✅ Removeu info técnica, separou tipos de erro | — |
| Build sem erros | ✅ Código compilou na primeira tentativa | — |
