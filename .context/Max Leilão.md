# Contexto do Projeto: Max Leilão

## 1. O Problema (A Dor do Cliente)

O cliente, Vitor, é um comprador e vendedor ativo de veículos de leilão. Sua principal dificuldade é a ineficiência e a perda de oportunidades de negócio causadas pela necessidade de monitorar manualmente múltiplos sites de leiloeiros. Atualmente, existem cerca de 150 leiloeiros em São Paulo e 3.000 no Brasil, tornando impossível acompanhar todas as ofertas de forma eficaz.

Vitor descreve a dor como a necessidade de "ficar salvando os links do leilão para você conseguir entender, se manter atualizado". Essa abordagem manual é demorada e o faz perder veículos de interesse que podem estar em leilões em locais distantes ou em sites que ele não tem tempo de verificar. Ele busca uma solução que centralize essas informações e o notifique proativamente.

## 2. A Solução Proposta

A solução é o **Max Leilão**, uma plataforma web no modelo SaaS (Software as a Service) que funcionará como um agregador de leilões de veículos. O objetivo é centralizar todos os anúncios em um único lugar, permitindo que os usuários encontrem o que procuram de forma simples e objetiva.

A plataforma irá:
* Consumir dados de um serviço de *scraping* que extrai informações de diversos sites de leiloeiros, com atualizações duas vezes ao dia.
* Oferecer filtros avançados, inspirados no Web Motors, para que os usuários possam refinar suas buscas.
* Enviar notificações e alertas (inclusive via WhatsApp) sobre novos veículos que correspondam aos interesses do usuário.
* Redirecionar o usuário para o site do leiloeiro original para que ele possa dar o lance.
* Disponibilizar uma calculadora para ajudar a estimar a viabilidade financeira de cada compra.

## 3. O Cliente e os Stakeholders

* **Cliente:** Vitor Lima. É um empresário com outras empresas (como a Cave Food) e vasta experiência no mercado de leilões. É descrito como simples, objetivo e de poucas palavras. Ele é o primeiro cliente e idealizador da solução, nascida de uma necessidade própria.
* **Equipe de Desenvolvimento:** Composta por Otávio Codato, Laura Barcellos e Marcos Bricches.
* **Equipe de Scraping:** Uma empresa externa, contratada por Vitor, responsável por desenvolver e manter o robô de extração de dados.

## 4. Restrições e Dependências

* **Prazo:** O prazo é um fator crítico. O cliente tem a expectativa de que o projeto esteja pronto no começo de novembro.
* **Dependência Externa:** O projeto depende totalmente do serviço de *scraping* fornecido por outra empresa. A equipe de desenvolvimento precisará se comunicar com eles para entender a estrutura do banco de dados.
* **Identidade Visual:** O cliente já possui uma identidade visual para a marca "Max Leilão" e deseja que a plataforma siga essa paleta de cores e estilo.
* **Landing Page:** Foi identificado durante as reuniões que a criação de uma Landing Page é essencial para o projeto, embora não estivesse no escopo inicial, o que pode impactar o prazo e o custo.