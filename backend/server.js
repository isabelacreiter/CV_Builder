const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Caminho do JSON
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

app.get("/api/curriculos", (_req, res) => {
  res.json(readData());
});

app.get("/api/curriculos/:id", (req, res) => {
  const c = readData().find(c => c.id === req.params.id);
  if (!c) return res.status(404).json({ error: "Currículo não encontrado" });
  res.json(c);
});

app.post("/api/curriculos", (req, res) => {
  const data = readData();
  const novo = { ...req.body, id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  data.push(novo);
  writeData(data);
  res.status(201).json(novo);
});

app.put("/api/curriculos/:id", (req, res) => {
  const data = readData();
  const idx = data.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Currículo não encontrado" });
  data[idx] = { ...data[idx], ...req.body, updatedAt: new Date().toISOString() };
  writeData(data);
  res.json(data[idx]);
});

app.delete("/api/curriculos/:id", (req, res) => {
  let data = readData();
  data = data.filter(c => c.id !== req.params.id);
  writeData(data);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
