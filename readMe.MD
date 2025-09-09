# documentacao do teste da nublify


Aplicação fullstack para teste tecnico da Nublify, consiste em um Todo-app com funcionalidades completas de autenticação e gerenciamento de tarefas.


## 🚀 Tecnologias Utilizadas

### 🔙 Backend:
    - PostgreSQL > Banco de dados Relacional amplamente utilizado, robusto e confiável.
    - Node com express > Plataforma Javascript e framework que possibilita a criação de API e lidar com requisições HTTP.
    - Prisma ORM > Utilizado para interagir com banco de dados via código, com fácil gerenciamento
    - JWT > Utilizado em engenharia de permissão e autenticação de usuário e rotas de API.
    - Bcrypt > Utilizado para criptografia de senha do usuário

### 🎨 Frontend:
    - React > Lib popular pra criacao de interface responsiva e dinâmica com alto desempenho. Ampla comunidade e compatibilidade.
    - Vite > Bundler para o react, adiciona funcoes auxiliares para desenvolvimento ágil como refresh automático e otimização de compilação.
    - TailwindCss > Framework css que permite criação de interfaces de maneira rápida e personalizada.
    - Axios > Utilizado para comunicação com backend via HTTP, simples e eficiente.
    - Yup > Lib usada para validadação de formulários no frontend


### 🐳 Docker:
- **Docker Compose** → Para rodar todo o ambiente com um único comando.
- Inclui:
  - Backend
  - Frontend
  - PostgreSQL
  - PgAdmin


### Funcionalidades:
- Cadastro de Usuários: O usuário pode se cadastrar fornecendo um nome, email e senha. A senha é criptografada com Bcrypt.js para garantir segurança.

- Login e logout de Usuários: O usuário pode se autenticar fornecendo seu email e senha. Um JWT é gerado e retornado para ser usado em requisições subsequentes.

- Listagem de Tarefas: Após o login, o usuário pode visualizar todas as suas tarefas. A lista é filtrada com base no usuário autenticado.

- Criação, Edição e Exclusão de Tarefas: O usuário pode criar, editar e excluir suas tarefas. Cada tarefa tem um status (Pendente/Concluída).

- Alteração de Status: O usuário pode marcar as tarefas como Concluídas ou Pendentes.

## ⚙️ Como Rodar o Projeto

### 📁 Pré-requisitos:
- Docker
- Docker Compose
- Git

### 🐳 Rodar tudo com Docker:
```bash
git clone https://github.com/Matheus-Patricio-dev/nublify-test.git
cd nublify-test
docker compose up