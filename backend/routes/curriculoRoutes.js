import { salvarCurriculo } from '../utils/api';
import React from 'react';
import express from 'express';
import curriculoRoutes from './routes/curriculoRoutes';

const app = express();
app.use(express.json());
app.use('/api/curriculos', curriculoRoutes);

function FormPage() {
  const [form, setForm] = React.useState({ /* campos do currículo */ });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await salvarCurriculo(form);
      alert('Currículo salvo com sucesso!');
      // redirecionar ou limpar formulário
    } catch (error) {
      alert('Erro ao salvar currículo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* campos do formulário */}
      <button type="submit">Salvar</button>
    </form>
  );
}

export default FormPage;

const express = require("express");
const ctrl = require("../controllers/curriculoController");
const router = express.Router();

router.get("/", ctrl.list);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;
