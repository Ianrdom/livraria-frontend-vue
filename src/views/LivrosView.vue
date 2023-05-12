<script>
import axios from "axios";
export default {
  data() {
    return {
      livros: [],
      livro: {
        categoria: {},
        editora: {},
        autores: {},
      },
      autores: [],
      editoras: [],
      categorias: [],
      indice_editar: -1,
    };
  },
  async created() {
    await this.buscarTodosOsLivros();
    const editoras = await axios.get("/editoras");
    this.editoras = editoras.data;
    const categorias = await axios.get("/categorias");
    this.categorias = categorias.data;
    const autores = await axios.get("/autores");
    this.autores = autores.data;
  },
  methods: {
    async buscarTodosOsLivros() {
      const livros = await axios.get("/livros");
      this.livros = livros.data;
    },

    async salvar() {
      if (this.livro.id) {
        await axios.patch(`/livros/${this.livro.id}`, this.livro);
        await this.buscarTodosOsLivros();
      } else {
        await axios.post(`/livros/`, this.livro);
        await this.buscarTodosOsLivros();
      }
      this.livro = {};
    },
    async excluir(livro) {
      await axios.delete(`/livros/${livro.id}`);
      await this.buscarTodosOsLivros();
    },
    editar(livro) {
      const indice = this.livros.indexOf(livro);
      this.indice_editar = indice;
      Object.assign(this.livro, livro);
      console.log(livro);
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

      <input
        @keyup.enter="salvar"
        v-model="livro.quantidade"
        type="number"
        placeholder="Quantidade"
        class="input-menor"
      />
      <select v-model="livro.editora.id">
        <option value="" disabled selected>Nome da editora</option>
        <option
          v-for="editora in editoras"
          :key="editora.id"
          :value="editora.id"
        >
          {{ editora.nome }}
        </option>
      </select>
      <select v-model="livro.categoria.id">
        <option value="" disabled selected>Nome da categoria</option>
        <option
          v-for="categoria in categorias"
          :key="categoria.id"
          :value="categoria.id"
        >
          {{ categoria.descricao }}
        </option>
      </select>
      <select v-model="livro.autores">
        <option value="" disabled selected>Nome da autor</option>
        <option v-for="autor in autores" :key="autor.id" :value="autor.id">
          {{ autor.nome }}
        </option>
      </select>
      <input
        @keyup.enter="salvar"
        v-model="livro.preco"
        type="text"
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
            <th>Autor(es)</th>
            <th>Categoria</th>
            <th>Editora</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr style="height: 50px" v-for="livro in livros" :key="livro.id">
            <td>
              {{ livro.id }}
            </td>
            <td>
              {{ livro.titulo }}
            </td>
            <td>
              <p v-for="autor in livro.autores">{{ autor.nome }}</p>
            </td>
            <td>
              {{ livro.categoria.descricao }}
            </td>
            <td>
              {{ livro.editora.nome }}
            </td>
            <td>R$ {{ livro.preco }}</td>
            <td style="min-width: 120px">
              <button style="margin-right: 5px" @click="editar(livro)">
                Editar
              </button>
              <button @click="excluir(livro)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
