import axios from "axios";
export default class EditorasApi {
  async buscarTodasAsEditoras() {
    const response = await axios.get("http://localhost:4000/Editoras");
    return response.data;
  }

  async buscarEditora(id) {
    const response = await axios.get(`http://localhost:4000/Editoras/${id}`);
    return response.data;
  }

  async adicionarEditora(editora) {
    const response = await axios.post(
      "http://localhost:4000/Editoras",
      editora
    );
    return response.data;
  }

  async excluirEditora(id) {
    const response = await axios.delete(`http://localhost:4000/Editoras/${id}`);
    return response.data;
  }

  async atualizarEditora(editora) {
    const response = await axios.put(
      `http://localhost:4000/Editoras/${editora.id}`,
      editora
    );
    return response.data;
  }
}
