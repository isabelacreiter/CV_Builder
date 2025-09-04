import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:5000/api" });
export default api;

export async function salvarCurriculo(data) {
  const response = await api.post('/curriculos', data);
  return response.data;
}
