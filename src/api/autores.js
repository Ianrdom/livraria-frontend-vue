import axios from "axios";
export default class AutoresApi {
  async buscarTodosOsAutores() {
    const response = await axios.get("http://localhost:4000/Autores");
    return response.data;
  }

  async buscarAutor(id) {
    const response = await axios.get(`http://localhost:4000/Autores/${id}`);
    return response.data;
  }

  async adicionarAutor(autor) {
    const response = await axios.post("http://localhost:4000/Autores", autor);
    return response.data;
  }

  async excluirAutor(id) {
    const response = await axios.delete(`http://localhost:4000/Autores/${id}`);
    return response.data;
  }

  async atualizarAutor(autor) {
    const response = await axios.put(
      `http://localhost:4000/Autores/${autor.id}`,
      autor
    );
    return response.data;
  }
}
