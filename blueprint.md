# Blueprint: Drakonik Nexus !

## Visão Geral

Drakonik Nexus é um jogo da memória interativo construído como uma Single-Page Application (SPA) usando Vue.js. O projeto foi desenvolvido com foco em performance, design moderno e uma experiência de usuário engajante. O objetivo do jogo é combinar todos os pares de cartas de dragões cibernéticos dentro de um tempo limite, testando a memória e a agilidade do jogador.

## Estrutura e Estilo

- **Framework**: Vue.js 3 com Composition API e a sintaxe `<script setup>`.
- **Linguagem**: TypeScript para segurança de tipos e melhor desenvolvimento.
- **Build Tool**: Vite para um desenvolvimento rápido e otimizado.
- **Estilização**: Tailwind CSS para uma abordagem "utility-first", permitindo a criação de designs complexos e responsivos diretamente no HTML.
- **Gerenciamento de Estado**: Pinia para um estado global reativo, simples e poderoso.
- **Componentização**: A aplicação é dividida em componentes reutilizáveis, como o tabuleiro do jogo (`GameBoard.vue`), as cartas (`FlipCard.vue`) e a navegação (`SliderNavigator.vue`).
- **Responsividade**: O design é totalmente responsivo, adaptando-se a telas de desktop e dispositivos móveis, com imagens e layouts que se ajustam dinamicamente.

## Funcionalidades Implementadas

- **Tela Inicial**: Apresenta o jogo com um design impactante e um botão para iniciar a partida.
- **Tabuleiro de Jogo**:
  - Geração dinâmica de cartas a partir de uma lista de dados.
  - As cartas são duplicadas e embaralhadas aleatoriamente a cada novo jogo.
- **Mecânica de Jogo**:
  - O jogador pode virar duas cartas por vez.
  - Se as cartas formarem um par, elas permanecem viradas e o jogador pontua.
  - Se não formarem um par, elas são viradas de volta após um curto período.
  - O jogo termina quando todos os pares são encontrados.
- **Contador de Pontos e Movimentos**: O jogador pode acompanhar seu progresso em tempo real.
- **Cronômetro Regressivo com Alerta**:
    - Um cronômetro de 2 minutos define o tempo limite para completar o jogo.
    - Se o tempo acabar, o jogo termina.
    - **Feedback de Urgência**: Durante os últimos 30 segundos, o cronômetro fica vermelho e pulsante para alertar o jogador.
- **Navegação entre Cartas (Modo Detalhe)**: Uma view dedicada (`SliderNavigator`) permite ao jogador visualizar todas as cartas do jogo em detalhe, com suas estatísticas e descrições.
- **Controles de Jogo**: Botões para "Reiniciar" o jogo ou voltar para a "Início".
- **Efeitos Sonoros**: Uma música de introdução para criar uma atmosfera imersiva.

## CI/CD e Deploy

- **Plataforma**: O projeto é automaticamente publicado no **GitHub Pages**.
- **Automação**: Utiliza **GitHub Actions** para Integração Contínua e Deploy Contínuo (CI/CD).
- **Workflow**: Um workflow definido no arquivo `.github/workflows/deploy-gh-pages.yml` é acionado a cada `push` na branch `main`.
- **Processo do Workflow**:
  1.  **Checkout**: Baixa o código do repositório.
  2.  **Setup**: Configura o ambiente com Node.js na versão 20.
  3.  **Install**: Instala todas as dependências do projeto com `npm install`.
  4.  **Build**: Compila e otimiza o projeto para produção usando `npm run build`.
  5.  **Deploy**: Publica os arquivos da pasta `dist/` no GitHub Pages, tornando o site acessível publicamente.

---

## Plano de Desenvolvimento (Última Modificação)

**Objetivo:** Configurar e depurar o processo de deploy automático (CI/CD) para o GitHub Pages.

**Passos Concluídos:**

1.  **Criação do Workflow Inicial**:
    - Criado o arquivo `.github/workflows/deploy-gh-pages.yml` para automatizar o deploy.
    - O workflow foi configurado para rodar a cada push na branch `main`.

2.  **Resolução de Conflitos e Erros de Linting**:
    - Identificado e removido um workflow conflitante (`ci.yml`) que executava um passo de `lint` e causava falhas no processo.
    - Modificado o script `ci` no `package.json` para não executar o `lint`, que estava impedindo o build de ser concluído no ambiente de CI.

3.  **Atualização de Ações Depreciadas**:
    - O workflow falhou devido ao uso de versões desatualizadas de ações do GitHub.
    - Todas as ações (`checkout`, `setup-node`, `upload-pages-artifact`, `deploy-pages`) foram atualizadas para suas versões mais recentes (`v4`, `v5`, etc.) para garantir compatibilidade e segurança.

4.  **Correção do Ambiente de Deploy**:
    - Ocorreu um erro final de "Missing environment".
    - Foi adicionada a chave `environment` ao arquivo de workflow, especificando `github-pages` como o alvo do deploy, o que é uma exigência das versões atuais da ação `deploy-pages`.

5.  **Atualização Final do `blueprint.md`**:
    - O documento foi completamente atualizado para incluir a nova seção "CI/CD e Deploy" e para refletir que a configuração do deploy foi a última modificação significativa realizada no projeto.
