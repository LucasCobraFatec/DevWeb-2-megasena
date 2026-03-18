import express from "express";
import { pool } from "./database.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.listen(3001, () => console.log("Server onn"));

//rota que lista todos os concursos

app.get("/concursos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resultados ORDER BY concurso DESC LIMIT 1"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar concursos" });
  }
});



//rota de busca de um concurso especifico

app.get("/concursos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM resultados WHERE concurso = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Concurso não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro na consulta" });
  }
});


//rota para apenas numeros sorteados em um array

app.get("/concursos/:id/numeros", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT bola1, bola2, bola3, bola4, bola5, bola6 FROM resultados WHERE concurso = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Concurso não encontrado" });
    }
    const numeros = Object.values(result.rows[0]);
    res.json({ concurso: id, numeros });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao processar números" });
  }
});


