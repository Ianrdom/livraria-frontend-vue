<script>
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export default {
  data() {
    return {
      categorias: [],
      nova_categoria: {
        nome: "",
      },
      indice_editar: -1,
    };
  },
  async created() {
    const categorias = await axios.get("http://localhost:4000/categorias");
    this.categorias = categorias.data;
  },
  methods: {
    async salvar() {
      if (this.nova_categoria.nome !== "") {
        if (this.nova_categoria.id) {
          await axios.patch(
            `http://localhost:4000/categorias/${this.nova_categoria.id}`,
            {
              nome: this.nova_categoria.nome,
            }
          );
          this.categorias.splice(this.indice_editar, 1, this.nova_categoria);
          this.indice_editar = -1;
        } else {
          await axios.post(
            "http://localhost:4000/categorias",
            this.nova_categoria
          );
          this.categorias.push(this.nova_categoria);
        }
        this.nova_categoria = {
          nome: "",
        };
      }
    },
    excluir(categoria) {
      const indice = this.categorias.indexOf(categoria);
      this.categorias.splice(indice, 1);
    },
    editar(categoria) {
      const indice = this.categorias.indexOf(categoria);
      this.indice_editar = indice;
      Object.assign(this.nova_categoria, categoria);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h2>Gerenciamento de categorias</h2>
    </div>
    <div class="form-input">
      <input
        @keyup.enter="salvar"
        v-model="nova_categoria.nome"
        type="text"
        placeholder="Descrição da categoria"
        class="input-maior"
      />

      <button @click="salvar">Salvar</button>
    </div>
    <div class="list-editoras">
      <table>
        <thead>
          <tr>
            <th>ID-categoria</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categorias" :key="categoria.id">
            <td>
              {{ categoria.id }}
            </td>
            <td>
              {{ categoria.nome }}
            </td>
            <td>
              <button @click="editar(categoria)">Editar</button>
              <button @click="excluir(categoria)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
