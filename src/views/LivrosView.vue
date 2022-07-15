<script>
import axios from "axios";
export default {
  data() {
    return {
      livros: [],
      livro: {},
      autores: [],
      editoras: [],
      categorias: [],
      indice_editar: -1,
    };
  },
  async created() {
    await this.buscarTodosOsLivros();
    const editoras = await axios.get("http://localhost:4000/editoras");
    this.editoras = editoras.data;
    const categorias = await axios.get("http://localhost:4000/categorias");
    this.categorias = categorias.data;
    const autores = await axios.get("http://localhost:4000/autores");
    this.autores = autores.data;
  },
  methods: {
    async buscarTodosOsLivros() {
      const livros = await axios.get(
        "http://localhost:4000/livros?expand=editora&expand=categoria&expand=autore"
      );
      this.livros = livros.data;
    },

    async salvar() {
      if (this.livro.id) {
        await axios.patch(
          `http://localhost:4000/livros/${this.livro.id}`,
          this.livro
        );
        await this.buscarTodosOsLivros();
      } else {
        await axios.post(`http://localhost:4000/livros`, this.livro);
        await this.buscarTodosOsLivros();
      }
      this.livro = {};
    },
    async excluir(livro) {
      await axios.delete(`http://localhost:4000/livros/${livro.id}`);
      await this.buscarTodosOsLivros();
    },
    editar(livro) {
      const indice = this.livros.indexOf(livro);
      this.indice_editar = indice;
      Object.assign(this.livro, livro);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h2>Gerenciamento de livros</h2>
    </div>
    <div class="form-input">
      <input
        @keyup.enter="salvar"
        v-model="livro.titulo"
        type="text"
        placeholder="Nome do livro"
        class="input-menor"
      />
      <select v-model="livro.editoraId">
        <option value="" disabled selected>Nome da editora</option>
        <option
          v-for="editora in editoras"
          :key="editora.id"
          :value="editora.id"
        >
          {{ editora.nome }}
        </option>
      </select>
      <select v-model="livro.categoriaId">
        <option value="" disabled selected>Nome da categoria</option>
        <option
          v-for="categoria in categorias"
          :key="categoria.id"
          :value="categoria.id"
        >
          {{ categoria.nome }}
        </option>
      </select>
      <select v-model="livro.autoreId">
        <option value="" disabled selected>Nome da autor</option>
        <option v-for="autor in autores" :key="autor.id" :value="autor.id">
          {{ autor.nome }}
        </option>
      </select>
      <input
        @keyup.enter="salvar"
        v-model="livro.preco"
        type="number"
        placeholder="Preco do livro"
        class="input-menor"
      />
      <button @click="salvar">Salvar</button>
    </div>
    <div class="list-editoras">
      <table>
        <thead>
          <tr>
            <th>ID-livro</th>
            <th>Nome</th>
            <th>Autor</th>
            <th>Cartegoria</th>
            <th>Editora</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="livro in livros" :key="livro.id">
            <td>
              {{ livro.id }}
            </td>
            <td>
              {{ livro.titulo }}
            </td>
            <td>
              {{ livro.autore.nome }}
            </td>
            <td>
              {{ livro.categoria.nome }}
            </td>
            <td>
              {{ livro.editora.nome }}
            </td>
            <td>R$ {{ livro.preco }}</td>
            <td>
              <button @click="editar(livro)">Editar</button>
              <button @click="excluir(livro)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
