import axios from "axios";
export default class CategoriasApi {
  async buscarTodasAsCategorias() {
    const response = await axios.get("http://localhost:8000/categorias/");
    return response.data;
  }

  async buscarCategoria(id) {
    const response = await axios.get(`http://localhost:8000/categorias/${id}`);
    return response.data;
  }

  async adicionarCategoria(categoria) {
    const response = await axios.post(
      "http://localhost:8000/categorias/",
      categoria
    );
    return response.data;
  }

  async excluirCategoria(id) {
    const response = await axios.delete(
      `http://localhost:8000/categorias/${id}`
    );
    return response.data;
  }

  async atualizarCategoria(categoria) {
    const response = await axios.put(
      `http://localhost:8000/categorias/${categoria.id}`,
      categoria
    );
    return response.data;
  }
}
