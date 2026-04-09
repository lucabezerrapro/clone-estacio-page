# Backend - Consulta de Diplomas Estácio (Clone)

Este é o backend completo para a plataforma de consulta de diplomas, construído com **FastAPI**, **SQLAlchemy** e **PostgreSQL**.

## Pré-requisitos

- Docker e Docker Compose instalados.

## Como Executar

1. **Subir os containers**:
   No diretório `backend`, execute:
   ```bash
   docker-compose up --build
   ```

2. **Popular o Banco de Dados (Seed)**:
   Com o container rodando, em uma nova aba do terminal:
   ```bash
   docker exec -it diploma_app python scripts/seed.py
   ```
   Isso criará os dados da aluna **HELLEN GEANNE REZENDE SILVA** para testes.

3. **Acessar a Documentação**:
   Abra o navegador em: [http://localhost:8000/docs](http://localhost:8000/docs)

## Endpoints Principais

- `GET /api/v1/diplomas/{query_key}`: Retorna os dados completos do diploma.
- `GET /api/v1/diplomas/{query_key}/xml`: Download do arquivo XML.
- `GET /api/v1/diplomas/{query_key}/rvdd`: Download do arquivo RVDD.
- `GET /api/v1/diplomas/{query_key}/ies`: Dados detalhados da Instituição.
- `GET /api/v1/diplomas/{query_key}/course`: Dados detalhados do Curso.
- `GET /api/v1/diplomas/{query_key}/registration`: Dados do registro/status.

## Chave de Consulta para Teste
A chave pré-configurada no script de semente é:
`ESTACIO2024-AD-HGRS-7788`

## Estrutura do Projeto

- `app/models`: Definição das tabelas do banco de dados.
- `app/schemas`: Validação e serialização de dados (Pydantic).
- `app/api/endpoints`: Lógica das rotas da API.
- `app/db`: Configuração da conexão com o banco.
- `scripts`: Scripts utilitários (como o seed).
