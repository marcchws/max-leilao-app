# Tasks de Correção de Bugs – Max Leilão

Este documento detalha as falhas funcionais e de usabilidade identificadas na plataforma Max Leilão, organizadas em tarefas para correção.

## Épico: Autenticação e Gerenciamento de Conta

### Task: Corrigir Validação de Senhas no Cadastro
* **Descrição:** O formulário de criação de conta não valida se os campos de senha e confirmação de senha são idênticos, permitindo que o usuário crie uma conta com senhas divergentes.
* **Passos para Reproduzir:**
    1.  Acessar a página de "Criar Conta".
    2.  Preencher todos os campos obrigatórios.
    3.  No campo "Senha", digitar `senha123`.
    4.  No campo "Confirme sua senha", digitar `senha456`.
    5.  Clicar em "Criar conta".
* **Comportamento Esperado:** O sistema deve exibir uma mensagem de erro informando que "As senhas não conferem" e impedir a criação da conta.
* **Comportamento Atual:** O sistema cria a conta com sucesso, sem exibir nenhum alerta de erro.

### Task: Implementar Validação Avançada nos Campos de Cadastro
* **Descrição:** O formulário de cadastro depende apenas da validação padrão do navegador, o que é insuficiente. Faltam validações cruciais, como a verificação de e-mail duplicado e a formatação de campos.
* **Requisitos:**
    * **E-mail:** Verificar no backend se o e-mail informado já existe no banco de dados. Se sim, exibir a mensagem "Este e-mail já está em uso".
    * **Telefone:** Implementar uma máscara de entrada (ex.: `(XX) XXXXX-XXXX`) e permitir apenas a inserção de números.

### Task: Corrigir o Comportamento do Botão "Voltar ao Dashboard"
* **Descrição:** Na página "Minha Conta", o botão "Voltar ao Dashboard" está realizando um logout inesperado, em vez de apenas redirecionar o usuário para a página principal da aplicação.
* **Passos para Reproduzir:**
    1.  Fazer login na plataforma.
    2.  Acessar a página "Minha Conta".
    3.  Clicar no botão "Voltar ao Dashboard".
* **Comportamento Esperado:** O usuário deve ser redirecionado para o dashboard principal, permanecendo logado.
* **Comportamento Atual:** O usuário é deslogado e redirecionado para a landing page.

## Épico: Funcionalidades Principais

### Task: Adicionar Validação de Limites nos Filtros de Veículos
* **Descrição:** Os campos de filtro (preço e ano) permitem a inserção de valores ilógicos, como um valor mínimo maior que o máximo ou anos fora da realidade, resultando em uma busca vazia sem nenhum feedback para o usuário.
* **Requisitos:**
    * Impedir que o valor mínimo seja maior que o valor máximo nos filtros de preço e ano.
    * Exibir uma mensagem de erro clara (ex.: "O valor mínimo não pode ser maior que o máximo") caso o usuário tente inserir valores inválidos.
    * Limitar os anos a um intervalo razoável (ex.: 1900 até o ano atual + 1).

### Task: Implementar Modal de Confirmação para Limpar Favoritos
* **Descrição:** O botão "Limpar Todos" na página de Favoritos executa a ação imediatamente, sem pedir confirmação, o que pode levar à perda acidental de dados importantes para o usuário.
* **Sugestão de Solução:**
    1.  Ao clicar em "Limpar Todos", exibir um modal de confirmação com a mensagem: "Você tem certeza que deseja remover todos os seus favoritos? Esta ação não pode ser desfeita."
    2.  O modal deve conter os botões "Confirmar" e "Cancelar".
    3.  A ação de exclusão só deve ser executada se o usuário clicar em "Confirmar".

### Task: Corrigir Sistema de Alertas
* **Descrição:** A funcionalidade de alertas está inoperante. Novos alertas não são salvos no sistema e os botões de edição e exclusão não funcionam.
* **Requisitos:**
    1.  **Salvar Alerta:** Garantir que, após o usuário definir os filtros e clicar em "Salvar Alerta", o novo alerta seja persistido no banco de dados e exibido corretamente na lista "Meus Alertas".
    2.  **Editar Alerta:** Implementar a funcionalidade do ícone de lápis para permitir a edição de um alerta salvo.
    3.  **Excluir Alerta:** Implementar a funcionalidade do ícone de lixeira, adicionando um modal de confirmação antes de excluir um alerta.

### Task: Validar Entradas na Calculadora de Lucro
* **Descrição:** A calculadora de lucro aceita entradas inválidas, como valores negativos e percentuais de comissão absurdos, o que pode levar a cálculos incorretos e confusos. Além disso, não força o preenchimento do nome da simulação.
* **Requisitos:**
    * Impedir a inserção de valores negativos nos campos de compra, comissão, manutenção e preço de venda.
    * Limitar o campo "Comissão (%)" a um intervalo razoável (ex.: 0 a 100).
    * Obrigar o preenchimento do campo "Nome da simulação". Caso esteja vazio, o botão "Criar" deve ficar desabilitado ou exibir uma mensagem de erro ao ser clicado.

## Épico: Assinatura e Pagamentos

### Task: Ativar Botões de Gerenciamento de Assinatura
* **Descrição:** Os botões relacionados à gestão de assinatura e planos na área "Minha Conta" estão inativos.
* **Requisitos:**
    * O botão **"Gerenciar Assinatura"** deve abrir a página ou modal correspondente para que o usuário possa visualizar, alterar ou cancelar seu plano.
    * O botão **"Escolher Plano"** deve redirecionar o usuário para a página de preços e planos.
    * O botão **"Exportar"** no histórico de pagamentos deve gerar e iniciar o download de um arquivo (ex: .csv ou .pdf) com os dados da tabela.

### Task: Melhorar Feedback ao Excluir Método de Pagamento
* **Descrição:** A exclusão de um cartão de crédito salvo carece de feedback visual claro. O sistema usa um alerta nativo do navegador e não atualiza a interface imediatamente após a confirmação.
* **Sugestão de Solução:**
    1.  Substituir o alerta nativo por um modal de confirmação estilizado.
    2.  Após a exclusão ser confirmada, exibir uma mensagem de sucesso temporária (ex: "Cartão removido com sucesso!").
    3.  Atualizar a lista de cartões na interface automaticamente, sem que o usuário precise fechar e reabrir o modal.

## Épico: Melhorias Gerais de UX e Qualidade

### Task: Vincular Toggles de Notificação ao Plano do Usuário
* **Descrição:** A seção de configuração de notificações via WhatsApp está disponível e funcional para todos os usuários, incluindo aqueles sem assinatura, embora seja um recurso premium.
* **Requisitos:**
    * Para usuários sem assinatura ativa, os toggles de notificação devem aparecer desabilitados.
    * Ao lado dos toggles desabilitados, exibir uma mensagem ou ícone indicando que é um recurso premium, com um link para a página de planos.

### Task: Melhorar a Experiência do Usuário para Erros em Links Externos
* **Descrição:** Alguns botões "Dar Lance" redirecionam para o site do leiloeiro, que por sua vez retorna um erro de servidor (ex: "502 Bad Gateway"). Embora o problema seja externo, a experiência para o usuário da Max Leilão é negativa.
* **Sugestão de Solução:**
    * No backend, antes de salvar o link do *scraping*, fazer uma verificação de status do link. Se o link já estiver retornando um erro, ele pode ser marcado como "indisponível".
    * Na interface, se um link estiver marcado como "indisponível", o botão "Dar Lance" pode ser desabilitado ou exibir uma mensagem informativa ao ser clicado, como: "O site do leiloeiro parece estar temporariamente fora do ar. Por favor, tente novamente mais tarde."