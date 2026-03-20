# 🍀 Mega-Sena Results - Full Stack Docker Project

Este é um projeto **Full Stack** desenvolvido para a disciplina de Desenvolvimento de Sistemas Multiplataforma na **Fatec**. O sistema permite a visualização e busca de resultados históricos da Mega-Sena através de uma interface moderna e uma infraestrutura robusta.

---

## 🚀 Tecnologias e Ferramentas

O projeto utiliza o que há de mais moderno no ecossistema JavaScript e em infraestrutura de TI:

* **Front-end:** React + TypeScript (Vite)
* **Back-end:** Node.js + Express + TypeScript
* **Banco de Dados:** PostgreSQL 18.3 (Docker Image)
* **Conteinerização:** Docker & Docker Compose
* **Gerenciamento de Pacotes:** NPM

---

## 🛠️ Arquitetura do Sistema

A aplicação foi desenhada seguindo o modelo de micro-serviços, onde cada parte do sistema roda em seu próprio container isolado:

* **`db-1`**: Responsável pela persistência. Ao iniciar, executa o script `schema.sql` que cria as tabelas e importa automaticamente os dados do arquivo `megasena.csv`.
* **`server-1`**: API RESTful que serve os dados. Implementa lógica de filtragem, tratamento de erros de conexão e suporte a parâmetros de `limit` e `offset`.
* **`web-1`**: Interface do usuário (SPA). Consome a API utilizando Axios e gerencia o estado da aplicação com React Hooks (`useCallback`, `useEffect`).

---

## 📋 Funcionalidades Principais

* **Renderização Inteligente:** Inicialmente, o sistema carrega apenas o último sorteio realizado para economizar banda e processamento.
* **Paginação On-Demand:** Botão "Carregar Mais" que expande a lista de resultados dinamicamente (10 por vez).
* **Busca por Concurso:** Permite localizar um sorteio específico pelo número.
* **Tratamento de UX:** Mensagens de erro amigáveis como *"Não existe dados do concurso X"* e indicadores de carregamento (Spinners).
* **Design Responsivo:** CSS personalizado com efeitos 3D nas bolas e layout adaptável para celulares.

---

## 🏃 Como Rodar a Aplicação

Certifique-se de ter o **Docker Desktop** instalado e rodando.

1.  **Clone o projeto e entre na pasta:**
    ```bash
    git clone (https://github.com/LucasCobraFatec/DevWeb-2-megasena.git)
    cd projeto3
    ```

2.  **Suba todos os serviços com um único comando:**
    ```bash
    docker-compose up --build
    ```

3.  **Acesse as interfaces:**
    * **Aplicação Web:** [http://localhost:5173](http://localhost:5173)
    * **Endpoint da API:** [http://localhost:3001/concursos](http://localhost:3001/concursos)

---

## 🗄️ Estrutura de Dados (PostgreSQL)

| Coluna | Tipo | Restrição |
| :--- | :--- | :--- |
| `concurso` | `INT` | Primary Key |
| `data_sorteio` | `DATE` | Not Null |
| `bola1` a `bola6` | `INT` | Valores de 1 a 60 |

---

## 👤 Autor

* **Cobra** - *Scrum Master & Full Stack Developer*
* Estudante de Multiplatform Systems Development na **Fatec**.

---
*Este projeto foi desenvolvido com fins educacionais para demonstrar o uso de Docker em ambientes Full Stack.*
