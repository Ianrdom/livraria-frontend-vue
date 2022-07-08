<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      livros: [
        {
          id: "7313422d-7fa3-403f-aa3c-a14d3196991b",
          titulo: "The witcher",
          editora: "630c1d03-cb59-460a-89b8-cca1d42c1bc6",
          autor: "4b95ec3f-c3a0-49d9-971d-b3696657fbbd",
          categoria: "16390338-fb77-4e4c-84f9-da9d1a1bdee7",
          preco: 70.0,
        },
        {
          id: "736c8f35-b5cf-43bf-a9ee-e4d8950ee0a5",
          titulo: "Grimório das Bruxas",
          editora: "597ceef8-36ac-4b0e-859e-77551c9818c0",
          autor: "ec38e964-9ddc-4d39-b6e3-688e239f8da9",
          categoria: "933f3ba7-0a49-4e63-80c3-134600987018",
          preco: 40.0,
        },
        {
          id: "519d6a87-60c2-465a-aa2f-1b8d0ef079cf",
          titulo: "O pequeno príncipe",
          editora: "8ecb8a1e-5114-496d-9bee-1308dccf4b87",
          autor: "d48aca58-0c61-46fc-896f-9ea630a90cfb",
          categoria: "ed4a44b6-720b-4b7b-a4fa-a2ff27ec3d17",
          preco: 20.0,
        },
      ],
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
  methods: {
    salvar() {
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
    excluir(livro) {
      const indice = this.livros.indexOf(livro);
      this.livros.splice(indice, 1);
    },
    editar(livro) {
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
        <option value="630c1d03-cb59-460a-89b8-cca1d42c1bc6">
          Companhia das Letras
        </option>
        <option value="597ceef8-36ac-4b0e-859e-77551c9818c0">
          Editora Rocco
        </option>
        <option value="8ecb8a1e-5114-496d-9bee-1308dccf4b87">
          Editora Arqueiro
        </option>
      </select>
      <select
        name="categorias"
        class="input-menor"
        v-model="novo_livro.categoria"
      >
        <option value="16390338-fb77-4e4c-84f9-da9d1a1bdee7">Drama</option>
        <option value="933f3ba7-0a49-4e63-80c3-134600987018">Medo</option>
        <option value="ed4a44b6-720b-4b7b-a4fa-a2ff27ec3d17">Ficção</option>
      </select>
      <select name="autor" class="input-menor" v-model="novo_livro.autor">
        <option value="4b95ec3f-c3a0-49d9-971d-b3696657fbbd">
          Andrzej Sapkowski
        </option>
        <option value="ec38e964-9ddc-4d39-b6e3-688e239f8da9">
          RONALD HUTTON
        </option>
        <option value="d48aca58-0c61-46fc-896f-9ea630a90cfb">
          Antoine de Saint-Exupéry
        </option>
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
