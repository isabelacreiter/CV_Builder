const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Caminho do arquivo JSON
const dataPath = path.join(__dirname, "models", "curriculos.json");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Funções auxiliares
const readData = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "[]");
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Rotas
app.get("/", (_req, res) => res.json({ ok: true, api: "CV Builder API" }));

// Listar todos os currículos
app.get("/api/curriculos", (_req, res) => {
  const curriculos = readData();
  res.json(curriculos);
});

// Buscar currículo por id
app.get("/api/curriculos/:id", (req, res) => {
  const curriculos = readData();
  const curriculo = curriculos.find(c => c.id === req.params.id);
  if (!curriculo) return res.status(404).json({ error: "Currículo não encontrado" });
  res.json(curriculo);
});

// Criar novo currículo
app.post("/api/curriculos", (req, res) => {
  const curriculos = readData();
  const novo = { ...req.body, id: Date.now().toString() };
  curriculos.push(novo);
  writeData(curriculos);
  res.status(201).json(novo);
});

// Atualizar currículo existente
app.put("/api/curriculos/:id", (req, res) => {
  const curriculos = readData();
  const idx = curriculos.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Currículo não encontrado" });
  curriculos[idx] = { ...curriculos[idx], ...req.body };
  writeData(curriculos);
  res.json(curriculos[idx]);
});

// Deletar currículo
app.delete("/api/curriculos/:id", (req, res) => {
  let curriculos = readData();
  curriculos = curriculos.filter(c => c.id !== req.params.id);
  writeData(curriculos);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
