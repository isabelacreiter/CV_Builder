import { useState } from "react";
import axios from "axios";

export default function FormPage({ onNovoCurriculo }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/curriculos", { nome, email });
      alert("Currículo salvo!");
      setNome("");
      setEmail("");
      onNovoCurriculo(res.data); // Atualiza lista na página de visualização
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar currículo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
