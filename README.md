# SchoolEvents API - Documentação

## Descrição

API backend para o sistema "Sem nome" de Gestão de Atividades Escolares do Instituto Médio de Tecnologia da Saúde - RADLUK. Esta API gerencia atividades extracurriculares, eventos, cadastro de usuários e mais, seguindo a arquitetura definida na especificação do sistema.

## Requisitos do Sistema

- Node.js (v18 ou superior)
- PostgreSQL (v14 ou superior)
- npm ou yarn
- PgAdmin ou outra ferramenta de gestão para PostgreSQL (opcional, para administração visual do banco)
- Docker (opcional, caso queira utilizar containerização para o banco de dados)

## Configuração Inicial

### 1. Configuração do Banco de Dados

Crie um banco de dados PostgreSQL com as seguintes configurações:

- Nome do banco: `schoolevent`
- Usuário proprietário: `jose`
- Senha: Defina uma senha segura

### 2. Clonando o Repositório

```bash
git clone https://github.com/emersonalbino20/schoolevent-api.git
cd schoolevents-api
```

### 3. Instalação de Dependências

```bash
npm install
```

### 4. Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="postgresql://jose:SuaSenhaAqui@localhost:5432/schoolevent"
PORT=3333
```

Substitua `SuaSenhaAqui` pela senha definida para o usuário `jose` no PostgreSQL.

## Comandos Disponíveis

| Comando                 | Descrição                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| `npm run dev`           | Inicia o servidor em modo de desenvolvimento (src/index.ts) com hot reload.                         |
| `npm run build`         | Compila o projeto TypeScript para JavaScript (gera pasta dist/).                                    |
| `npm start`             | Inicia o projeto já compilado (dist/index.js).                                                      |
| `npm run db:generate`   | Gera o client do Prisma com base no schema.prisma.                                                  |
| `npm run db:push`       | Empurra as models para o banco direto, sem migrations (somente em desenvolvimento).                 |
| `npm run db:seed`       | Roda o arquivo prisma/seed.ts para popular o banco de dados.                                        |
| `npm run db:migrate`    | Cria/aplica migrations no banco de dados em desenvolvimento.                                        |
| `npm run db:reset`      | Reseta todo banco de dados (dropa e recria) sem rodar o seed.                                       |
| `npm run db:reset-seed` | Reseta todo banco de dados (dropa e recria) e roda o seed depois.                                   |
| `npm run db:prepare`    | (Super comando) Reseta o banco, aplica migrations, gera client do Prisma e popula os dados de seed. |

## Primeiros Passos

1. Depois de configurar o banco de dados e as variáveis de ambiente:

```bash
# Gerar o Prisma Client
npm run db:generate

# Preparar o banco de dados (reset, migrations e seed)
npm run db:prepare

# Iniciar o servidor de desenvolvimento
npm run dev
```

2. O servidor estará disponível em `http://localhost:3333`
3. A documentação Swagger pode ser acessada em `http://localhost:3333/api-docs`

## Estrutura da API

A API segue uma estrutura RESTful com os seguintes principais endpoints:

- `/users` - Gestão de usuários (alunos e professores)
- `/events` - Gestão de eventos e atividades
- `/enrollments` - Gestão de inscrições em atividades
- `/feedback` - Gestão de feedback de atividades
- `/auth` - Autenticação e autorização

Consulte a documentação Swagger para detalhes completos sobre todos os endpoints disponíveis.

## Desenvolvimento e Contribuição

Para contribuir com o desenvolvimento:

1. Crie uma branch para sua funcionalidade: `git checkout -b feature/nova-funcionalidade`
2. Faça commit das suas alterações: `git commit -m 'feat: adiciona nova funcionalidade'`
3. Envie para o repositório remoto: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request
