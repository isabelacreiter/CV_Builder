const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const DB_FILE = "./db.json";

// Função auxiliar para ler DB
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ curriculos: [] }, null, 2));
  }
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

// Função auxiliar para salvar DB
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Rota: listar todos
app.get("/curriculos", (req, res) => {
  const db = readDB();
  res.json(db.curriculos);
});

// Rota: pegar um por id
app.get("/curriculos/:id", (req, res) => {
  const db = readDB();
  const curriculo = db.curriculos.find((c) => c.id === req.params.id);
  if (!curriculo) {
    return res.status(404).json({ error: "Currículo não encontrado" });
  }
  res.json(curriculo);
});

// Rota: criar novo
app.post("/curriculos", (req, res) => {
  const db = readDB();
  const novoCurriculo = { id: uuidv4(), ...req.body };
  db.curriculos.push(novoCurriculo);
  writeDB(db);
  res.status(201).json(novoCurriculo);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
