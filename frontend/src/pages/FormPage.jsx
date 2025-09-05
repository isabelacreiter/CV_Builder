import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { schemaCurriculo } from "../utils/validations";
import { applyPhoneMask, applyCepMask } from "../utils/masks";
import api from "../utils/api";

const niveis = ["Básico", "Intermediário", "Avançado", "Fluente"];

const emptyState = {
  nome: "",
  email: "",
  telefone: "",
  titulo: "",
  endereco: { cep: "", rua: "", numero: "", bairro: "", cidade: "", estado: "" },
  resumo: "",
  experiencias: [{ cargo: "", empresa: "", inicio: "", fim: "", descricao: "" }],
  formacoes: [{ curso: "", instituicao: "", conclusao: "" }],
  idiomas: [{ idioma: "", nivel: "" }],
};

export default function FormPage() {
  const nav = useNavigate();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const editId = params.get("id");

  const [values, setValues] = useState(emptyState);
  const phoneRef = useRef(null);
  const cepRef = useRef(null);

  useEffect(() => {
    if (phoneRef.current) applyPhoneMask(phoneRef.current);
    if (cepRef.current) applyCepMask(cepRef.current);
  }, []);

  useEffect(() => {
    if (editId) {
      api.get(`/curriculos/${editId}`)
        .then(r => setValues(r.data))
        .catch(() => Swal.fire({ icon: "error", title: "Erro", text: "Não foi possível carregar o currículo" }));
    }
  }, [editId]);

  const handleChange = (path, value) => {
    setValues(old => {
      const draft = structuredClone(old);
      const keys = path.split(".");
      let cur = draft;
      keys.slice(0, -1).forEach(k => cur = cur[k]);
      cur[keys.at(-1)] = value;
      return draft;
    });
  };

  const addItem = (key, empty) => setValues(v => ({ ...v, [key]: [...v[key], empty] }));
  const removeItem = (key, idx) => setValues(v => ({ ...v, [key]: v[key].filter((_, i) => i !== idx) }));

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const valid = await schemaCurriculo.validate(values, { abortEarly: false });
      if (editId) await api.put(`/curriculos/${editId}`, valid);
      else await api.post("/curriculos", valid);

      await Swal.fire({ icon: "success", title: "Sucesso!", text: "Currículo salvo com sucesso." });
      nav("/visualizar-curriculos");
    } catch (err) {
      if (err.name === "ValidationError") {
        Swal.fire({
          icon: "error",
          title: "Validação",
          html: `<pre style="text-align:left">${err.errors.join("<br/>")}</pre>`,
        });
      } else {
        Swal.fire({ icon: "error", title: "Erro ao salvar" });
      }
    }
  };

  return (
    <>
      <Header />
      <NavBar />
      <section className="py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">{editId ? "Editar Currículo" : "Criar Currículo"}</h1>
        <form onSubmit={onSubmit} className="space-y-6">

          {/* Informações Pessoais */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Informações Pessoais</h2>
            <div className="form-grid-2">
              <input className="input" placeholder="Nome Completo" value={values.nome} onChange={e => handleChange("nome", e.target.value)} />
              <input className="input" placeholder="Email" value={values.email} onChange={e => handleChange("email", e.target.value)} />
              <input ref={phoneRef} className="input" placeholder="Telefone" value={values.telefone} onChange={e => handleChange("telefone", e.target.value)} />
              <input className="input" placeholder="Título/Cargo" value={values.titulo} onChange={e => handleChange("titulo", e.target.value)} />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <input ref={cepRef} className="input" placeholder="CEP" value={values.endereco.cep} onChange={e => handleChange("endereco.cep", e.target.value)} />
              <input className="input md:col-span-2" placeholder="Rua" value={values.endereco.rua} onChange={e => handleChange("endereco.rua", e.target.value)} />
              <input className="input" placeholder="Número" value={values.endereco.numero} onChange={e => handleChange("endereco.numero", e.target.value)} />
              <input className="input" placeholder="Bairro" value={values.endereco.bairro} onChange={e => handleChange("endereco.bairro", e.target.value)} />
              <input className="input" placeholder="Cidade" value={values.endereco.cidade} onChange={e => handleChange("endereco.cidade", e.target.value)} />
              <input className="input" placeholder="UF" maxLength={2} value={values.endereco.estado} onChange={e => handleChange("endereco.estado", e.target.value.toUpperCase())} />
            </div>
          </div>

          {/* Resumo Profissional */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2">Resumo Profissional</h2>
            <textarea className="input h-28" placeholder="Breve resumo" value={values.resumo} onChange={e => handleChange("resumo", e.target.value)} />
          </div>

          {/* Experiência Profissional */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Experiência Profissional</h2>
              <button type="button" className="btn-sec" onClick={() => addItem("experiencias", { cargo:"", empresa:"", inicio:"", fim:"", descricao:"" })}>+ Adicionar</button>
            </div>
            <div className="space-y-4 mt-4">
              {values.experiencias.map((ex,i) => (
                <div key={i} className="border rounded p-4">
                  <div className="form-grid-2 gap-3">
                    <input className="input" placeholder="Cargo" value={ex.cargo} onChange={e => handleChange(`experiencias.${i}.cargo`, e.target.value)} />
                    <input className="input" placeholder="Empresa" value={ex.empresa} onChange={e => handleChange(`experiencias.${i}.empresa`, e.target.value)} />
                    <input type="month" className="input" placeholder="Início" value={ex.inicio} onChange={e => handleChange(`experiencias.${i}.inicio`, e.target.value)} />
                    <input type="month" className="input" placeholder="Fim" value={ex.fim} onChange={e => handleChange(`experiencias.${i}.fim`, e.target.value)} />
                  </div>
                  <textarea className="input mt-3" placeholder="Descrição" value={ex.descricao} onChange={e => handleChange(`experiencias.${i}.descricao`, e.target.value)} />
                  {values.experiencias.length > 1 && <div className="mt-2"><button type="button" className="btn-danger" onClick={() => removeItem("experiencias", i)}>Remover</button></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Formação Acadêmica */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Formação Acadêmica</h2>
              <button type="button" className="btn-sec" onClick={() => addItem("formacoes", { curso:"", instituicao:"", conclusao:"" })}>+ Adicionar</button>
            </div>
            <div className="space-y-4 mt-4">
              {values.formacoes.map((f,i) => (
                <div key={i} className="grid md:grid-cols-3 gap-4 border rounded p-3">
                  <input className="input" placeholder="Curso" value={f.curso} onChange={e => handleChange(`formacoes.${i}.curso`, e.target.value)} />
                  <input className="input" placeholder="Instituição" value={f.instituicao} onChange={e => handleChange(`formacoes.${i}.instituicao`, e.target.value)} />
                  <input className="input" placeholder="Ano de conclusão" value={f.conclusao} onChange={e => handleChange(`formacoes.${i}.conclusao`, e.target.value)} />
                  {values.formacoes.length > 1 && <button type="button" className="btn-danger" onClick={() => removeItem("formacoes", i)}>Remover</button>}
                </div>
              ))}
            </div>
          </div>

          {/* Idiomas */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Idiomas</h2>
              <button type="button" className="btn-sec" onClick={() => addItem("idiomas", { idioma:"", nivel:"" })}>+ Adicionar</button>
            </div>
            <div className="space-y-4 mt-4">
              {values.idiomas.map((l,i) => (
                <div key={i} className="grid md:grid-cols-3 gap-4 border rounded p-3">
                  <input className="input" placeholder="Idioma" value={l.idioma} onChange={e => handleChange(`idiomas.${i}.idioma`, e.target.value)} />
                  <select className="input" value={l.nivel} onChange={e => handleChange(`idiomas.${i}.nivel`, e.target.value)}>
                    <option value="">Nível</option>
                    {niveis.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  {values.idiomas.length > 1 && <button type="button" className="btn-danger" onClick={() => removeItem("idiomas", i)}>Remover</button>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="btn-primary">{editId ? "Salvar Alterações" : "Salvar Currículo"}</button>
            <button type="button" className="btn-sec" onClick={() => nav("/visualizar-curriculos")}>Cancelar</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}
