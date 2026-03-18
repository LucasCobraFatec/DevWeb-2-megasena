import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres', // Nome padrão do usuário postgres
  password: process.env.DB_PASSWORD || 'sua_senha_aqui', // Coloque a senha que está no seu .env
  database: process.env.DB_NAME || 'seu_banco_aqui', // Coloque o nome do banco do seu .env
  port: 5432,
});