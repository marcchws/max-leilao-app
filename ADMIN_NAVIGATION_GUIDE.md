# Navegação Administrativa - Guia de Acesso

## Como Acessar as Páginas Administrativas

### 1. Acesso Principal
Para acessar a área administrativa, você tem duas opções:

#### Opção 1: Através da Navegação Principal
1. Faça login no sistema com o usuário admin: `vitor@maxleilao.com.br`
2. Na barra de navegação superior, você verá um botão **"Admin"** (ícone de escudo vermelho)
3. Clique no botão para acessar o painel administrativo

#### Opção 2: URL Direta
- Acesse diretamente: `http://localhost:3000/admin`
- Para desenvolvimento, use: `http://localhost:3000/admin?admin=true`

### 2. Controle de Acesso
O sistema possui controle de acesso administrativo:

- **Usuário Admin**: `vitor@maxleilao.com.br` (configurado no contexto)
- **Acesso de Desenvolvimento**: Botão disponível na tela de acesso negado
- **Simulação**: Use `localStorage.setItem('admin_access', 'true')` no console

### 3. Navegação Interna do Admin

#### Barra de Navegação Administrativa
A área admin possui sua própria navegação com:

- **Dashboard** (`/admin`) - Visão geral do sistema
- **Usuários** (`/admin/users`) - Gerenciamento de usuários (RF-009)
- **Notificações** (`/admin/notifications`) - Central de notificações
- **Relatórios** (`/admin/reports`) - Relatórios e análises
- **Configurações** (`/admin/settings`) - Configurações do sistema

#### Breadcrumb
- Sempre mostra: `Início > Admin > [Página Atual]`
- Permite voltar facilmente para a página inicial

#### Botões de Ação
- **"Voltar ao Site"**: Retorna para a landing page
- **"Sair"**: Logout do sistema admin

### 4. Páginas Disponíveis

#### Dashboard Admin (`/admin`)
- Métricas gerais do sistema
- Gráficos de crescimento
- Notificações importantes
- Estatísticas de usuários

#### Gerenciamento de Usuários (`/admin/users`)
- Lista completa de usuários
- Filtros e busca avançada
- Ações administrativas:
  - Estender trial
  - Conceder acesso temporário
  - Suspender/ativar usuários
  - Cadastrar usuários manualmente
  - Excluir usuários

#### Central de Notificações (`/admin/notifications`)
- Todas as notificações do sistema
- Filtros por tipo
- Marcar como lida/não lida
- Estatísticas de notificações

#### Relatórios (`/admin/reports`)
- Relatórios pré-configurados
- Geração de novos relatórios
- Download de relatórios
- Agendamento de relatórios

#### Configurações (`/admin/settings`)
- Configurações gerais do sistema
- Configurações de segurança
- Configurações de notificações
- Configurações de banco de dados
- Zona de perigo (ações irreversíveis)

### 5. Funcionalidades de Navegação

#### Responsividade
- Navegação adaptável para mobile
- Menu colapsível em telas pequenas
- Layout otimizado para diferentes dispositivos

#### Estados Visuais
- Página ativa destacada na navegação
- Indicadores de status
- Badges informativos
- Ícones intuitivos

#### Acessibilidade
- Navegação por teclado
- Contraste adequado
- Textos descritivos
- Estrutura semântica

### 6. Desenvolvimento e Testes

#### Mock Data
- Usuários de exemplo configurados
- Notificações simuladas
- Relatórios de demonstração
- Configurações padrão

#### Estados de Teste
- Loading states
- Error states
- Empty states
- Success states

### 7. Próximos Passos

1. **Autenticação Real**: Integrar com sistema de autenticação
2. **Permissões**: Sistema de roles e permissões
3. **Auditoria**: Log de todas as ações administrativas
4. **Notificações**: Sistema de notificações em tempo real
5. **API Integration**: Conectar com APIs reais

## Estrutura de Arquivos

```
src/
├── app/
│   └── admin/
│       ├── layout.tsx              # Layout com navegação
│       ├── page.tsx                 # Dashboard principal
│       ├── users/page.tsx           # Gerenciamento de usuários
│       ├── notifications/page.tsx   # Central de notificações
│       ├── reports/page.tsx         # Relatórios
│       └── settings/page.tsx        # Configurações
├── components/
│   └── features/
│       └── admin/
│           ├── AdminNavigation.tsx      # Navegação principal
│           ├── AdminAccessControl.tsx   # Controle de acesso
│           ├── UserManagementTable.tsx  # Tabela de usuários
│           ├── UserActionsDialog.tsx    # Modal de ações
│           └── AddUserDialog.tsx        # Modal de cadastro
```

A navegação administrativa está completamente funcional e pronta para uso!
