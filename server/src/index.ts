import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',     
  user: process.env.DB_USER || 'milhonario',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'megasena',
  port: parseInt(process.env.DB_PORT || '5432'),
});

pool.connect((err) => {
  if (err) {
    console.error('❌ ERRO CRÍTICO: Não conectou no banco!', err.message);
  } else {
    console.log('✅ Conexão com o Postgres estabelecida com sucesso!');
  }
});

app.get('/concursos', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;
    const busca = req.query.busca as string || "";
    const limit = parseInt(req.query.limit as string) || 10;

    let queryText = "SELECT * FROM resultados"; 
    const params: any[] = [];

    if (busca && busca.trim() !== "") {
      queryText += " WHERE concurso = $1";
      params.push(parseInt(busca));
    }

    const pLimit = params.length + 1;
    const pOffset = params.length + 2;
    queryText += ` ORDER BY concurso DESC LIMIT $${pLimit} OFFSET $${pOffset}`;
    params.push(limit, offset);

    const result = await pool.query(queryText, params);
    res.json(result.rows);
  } catch (err: any) {
    // ESSA LINHA VAI TE DIZER O ERRO NO TERMINAL DO VS CODE
    console.error("❌ ERRO NO POSTGRES:", err.message); 
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Back-end rodando na porta ${PORT}`);
});