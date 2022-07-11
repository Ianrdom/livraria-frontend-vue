<script>
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export default {
  data() {
    return {
      livros: [],
      novo_livro: {
        titulo: "",
        preco: "",
        editora: "",
        categoria: "",
        autor: "",
      },
      indice_editar: -1,
    };
  },
  async created() {
    const livros = await axios.get("http://localhost:4000/livros");
    this.livros = livros.data;
  },
  methods: {
    async salvar() {
      if (
        this.novo_livro.titulo !== "" &&
        this.novo_livro.preco !== "" &&
        this.novo_livro.editora !== "" &&
        this.novo_livro.autor !== "" &&
        this.novo_livro.categoria !== ""
      ) {
        if (this.novo_livro.id) {
          this.livros.splice(this.indice_editar, 1, this.novo_livro);
          this.indice_editar = -1;
        } else {
          this.novo_livro.id = uuidv4();
          this.livros.push(this.novo_livro);
        }
        this.novo_livro = {
          titulo: "",
          preco: "",
          editora: "",
          categoria: "",
          autor: "",
        };
      }
    },
    async excluir(livro) {
      const indice = this.livros.indexOf(livro);
      this.livros.splice(indice, 1);
    },
    async editar(livro) {
      const indice = this.livros.indexOf(livro);
      this.indice_editar = indice;
      Object.assign(this.novo_livro, livro);
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
        v-model="novo_livro.titulo"
        type="text"
        placeholder="Nome do livro"
        class="input-menor"
      />
      <select name="editoras" class="input-menor" v-model="novo_livro.editora">
        <option value="1">Companhia das Letras</option>
        <option value="2">Editora Rocco</option>
        <option value="3">Editora Arqueiro</option>
      </select>
      <select
        name="categorias"
        class="input-menor"
        v-model="novo_livro.categoria"
      >
        <option value="1">Drama</option>
        <option value="2">Medo</option>
        <option value="3">Ficção</option>
      </select>
      <select name="autor" class="input-menor" v-model="novo_livro.autor">
        <option value="1">Andrzej Sapkowski</option>
        <option value="2">RONALD HUTTON</option>
        <option value="3">Antoine de Saint-Exupéry</option>
      </select>
      <input
        @keyup.enter="salvar"
        v-model="novo_livro.preco"
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
            <th>Autor-id</th>
            <th>Cartegoria-id</th>
            <th>Editora-Id</th>
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
              {{ livro.autor }}
            </td>
            <td>
              {{ livro.categoria }}
            </td>
            <td>
              {{ livro.editora }}
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
