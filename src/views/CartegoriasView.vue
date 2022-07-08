<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      categorias: [
        {
          id_categoria: "16390338-fb77-4e4c-84f9-da9d1a1bdee7",
          descricao: "Drama",
        },
        {
          id_categoria: "933f3ba7-0a49-4e63-80c3-134600987018",
          descricao: "Medo",
        },
        {
          id_categoria: "ed4a44b6-720b-4b7b-a4fa-a2ff27ec3d17",
          descricao: "Ficção",
        },
      ],
      nova_categoria: {
        descricao: "",
      },
      indice_editar: -1,
    };
  },
  methods: {
    salvar() {
      if (this.nova_categoria.descricao !== "") {
        if (this.nova_categoria.id_categoria) {
          this.categorias.splice(this.indice_editar, 1, this.nova_categoria);
          this.indice_editar = -1;
        } else {
          this.nova_categoria.id_categoria = uuidv4();
          this.categorias.push(this.nova_categoria);
        }
        this.nova_categoria = {
          descricao: "",
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
        v-model="nova_categoria.descricao"
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
              {{ categoria.id_categoria }}
            </td>
            <td>
              {{ categoria.descricao }}
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
