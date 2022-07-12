<script>
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export default {
  data() {
    return {
      autores: [],
      novo_autor: {
        nome: "",
      },
      indice_editar: -1,
    };
  },
  async created() {
    const autores = await axios.get("http://localhost:4000/autores");
    this.autores = autores.data;
  },
  methods: {
    async salvar() {
      if (this.novo_autor.nome !== "") {
        if (this.novo_autor.id) {
          await axios.patch(
            `http://localhost:4000/autores/${this.novo_autor.id}`,
            {
              nome: this.novo_autor.nome,
            }
          );
          this.autores.splice(this.indice_editar, 1, this.novo_autor);
          this.indice_editar = -1;
        } else {
          const autor_criada = await axios.post(
            "http://localhost:4000/autores",
            this.novo_autor
          );
          this.autores.push(autor_criada.data);
        }
        this.novo_autor = {
          nome: "",
        };
      }
    },
    async excluir(autor) {
      await axios.delete(`http://localhost:4000/autores/${autor.id}`);
      const indice = this.autores.indexOf(autor);
      this.autores.splice(indice, 1);
    },
    editar(autor) {
      const indice = this.autores.indexOf(autor);
      this.indice_editar = indice;
      Object.assign(this.novo_autor, autor);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h2>Gerenciamento de autores</h2>
    </div>
    <div class="form-input">
      <input
        @keyup.enter="salvar"
        v-model="novo_autor.nome"
        type="text"
        placeholder="Nome do autor"
        class="input-maior"
      />

      <button @click="salvar">Salvar</button>
    </div>
    <div class="list-editoras">
      <table>
        <thead>
          <tr>
            <th>ID-autor</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="autor in autores" :key="autor.id">
            <td>
              {{ autor.id }}
            </td>
            <td>
              {{ autor.nome }}
            </td>
            <td>
              <button @click="editar(autor)">Editar</button>
              <button @click="excluir(autor)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
