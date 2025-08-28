import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

const FormPage = () => {
  const initialValues = {
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    resumo: "",
    experiencias: [{ cargo: "", empresa: "", inicio: "", fim: "", descricao: "" }],
    formacoes: [{ curso: "", instituicao: "", ano: "" }],
    idiomas: [{ idioma: "", nivel: "" }]
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome obrigatório"),
    email: Yup.string().email("Email inválido").required("Email obrigatório"),
    telefone: Yup.string().required("Telefone obrigatório")
  });

  const handleSubmit = (values) => {
    console.log(values);
    alert("Currículo salvo (mock)!");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Criar Currículo</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched }) => (
          <Form className="space-y-6 bg-white p-6 rounded shadow">
            <div>
              <label>Nome</label>
              <Field name="nome" className="w-full p-2 border rounded" />
              {errors.nome && touched.nome ? <div className="text-red-500">{errors.nome}</div> : null}
            </div>

            <div>
              <label>Email</label>
              <Field name="email" className="w-full p-2 border rounded" />
              {errors.email && touched.email ? <div className="text-red-500">{errors.email}</div> : null}
            </div>

            <div>
              <label>Telefone</label>
              <Field name="telefone" placeholder="(00) 00000-0000" className="w-full p-2 border rounded" />
            </div>

            <div>
              <label>Resumo Profissional</label>
              <Field as="textarea" name="resumo" className="w-full p-2 border rounded" />
            </div>

            <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Salvar Currículo</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormPage;
