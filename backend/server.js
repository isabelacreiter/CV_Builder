const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const file = path.join(__dirname, "../data.json");

function load() {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}
function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

router.get("/", (req, res) => {
  const curriculos = load();
  res.json(curriculos);
});

router.get("/:id", (req, res) => {
  const curriculos = load();
  const id = parseInt(req.params.id);
  const curriculo = curriculos.find(c => c.id === id);
  if (!curriculo) return res.status(404).json({ message: "Currículo não encontrado" });
  res.json(curriculo);
});

router.post("/", (req, res) => {
  const curriculos = load();
  const novo = req.body;
  novo.id = curriculos.length ? curriculos[curriculos.length - 1].id + 1 : 1;
  novo.createdAt = new Date().toISOString();
  curriculos.push(novo);
  save(curriculos);
  res.status(201).json(novo);
});

router.put("/:id", (req, res) => {
  const curriculos = load();
  const id = parseInt(req.params.id);
  const idx = curriculos.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ message: "Currículo não encontrado" });

  curriculos[idx] = { ...curriculos[idx], ...req.body, id };
  save(curriculos);
  res.json(curriculos[idx]);
});

router.delete("/:id", (req, res) => {
  const curriculos = load();
  const id = parseInt(req.params.id);
  const novo = curriculos.filter(c => c.id !== id);
  if (novo.length === curriculos.length) return res.status(404).json({ message: "Currículo não encontrado" });
  save(novo);
  res.json({ message: "Excluído com sucesso" });
});

module.exports = router;
