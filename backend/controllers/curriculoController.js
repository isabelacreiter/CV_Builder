const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "..", "models", "curriculos.json");

// helpers
const readData = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "[]");
  return JSON.parse(fs.readFileSync(dataPath, "utf-8") || "[]");
};
const saveData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// handlers
exports.list = (req, res) => {
  const data = readData();
  res.json(data);
};

exports.getById = (req, res) => {
  const data = readData();
  const found = data.find((c) => String(c.id) === String(req.params.id));
  if (!found) return res.status(404).json({ message: "Currículo não encontrado" });
  res.json(found);
};

exports.create = (req, res) => {
  const data = readData();
  const now = new Date().toISOString();
  const novo = { id: Date.now(), createdAt: now, updatedAt: now, ...req.body };
  data.push(novo);
  saveData(data);
  res.status(201).json(novo);
};

exports.update = (req, res) => {
  const data = readData();
  const idx = data.findIndex((c) => String(c.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Currículo não encontrado" });
  data[idx] = { ...data[idx], ...req.body, updatedAt: new Date().toISOString() };
  saveData(data);
  res.json(data[idx]);
};

exports.remove = (req, res) => {
  const data = readData();
  const idx = data.findIndex((c) => String(c.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Currículo não encontrado" });
  const [deleted] = data.splice(idx, 1);
  saveData(data);
  res.json(deleted);
};
