import * as Yup from "yup";

export const schemaCurriculo = Yup.object({
  nome: Yup.string().required("Nome é obrigatório").min(3, "Mínimo 3 caracteres"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  telefone: Yup.string().required("Telefone é obrigatório").min(14, "Telefone incompleto"),
  endereco: Yup.object({
    cep: Yup.string().required("CEP é obrigatório").min(9, "CEP incompleto"),
    rua: Yup.string().required("Rua é obrigatória"),
    numero: Yup.string().required("Número é obrigatório"),
    bairro: Yup.string().required("Bairro é obrigatório"),
    cidade: Yup.string().required("Cidade é obrigatória"),
    estado: Yup.string().required("UF é obrigatória").max(2),
  }),
  resumo: Yup.string().required("Resumo é obrigatório").min(20, "Escreva ao menos 20 caracteres"),
  experiencias: Yup.array().of(
    Yup.object({
      cargo: Yup.string().required("Cargo obrigatório"),
      empresa: Yup.string().required("Empresa obrigatória"),
      inicio: Yup.string().required("Data início obrigatória"),
      fim: Yup.string().required("Data fim obrigatória"),
      descricao: Yup.string().required("Descrição obrigatória"),
    })
  ),
  formacoes: Yup.array().of(
    Yup.object({
      curso: Yup.string().required("Curso obrigatório"),
      instituicao: Yup.string().required("Instituição obrigatória"),
      conclusao: Yup.string().required("Ano de conclusão obrigatório"),
    })
  ),
  idiomas: Yup.array().of(
    Yup.object({
      idioma: Yup.string().required("Idioma obrigatório"),
      nivel: Yup.string().required("Nível obrigatório"),
    })
  ),
});
