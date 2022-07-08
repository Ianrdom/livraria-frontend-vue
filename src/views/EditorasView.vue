<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      editoras: [
        {
          id_editora: "630c1d03-cb59-460a-89b8-cca1d42c1bc6",
          nome: "Companhia das Letras",
          site_lf: "https://www.companhiadasletras.com.br",
          site_lnf: "www.companhiadasletras.com.br",
        },
        {
          id_editora: "597ceef8-36ac-4b0e-859e-77551c9818c0",
          nome: "Editora Rocco",
          site_lf: "https://www.rocco.com.br/",
          site_lnf: "www.rocco.com.br",
        },
        {
          id_editora: "8ecb8a1e-5114-496d-9bee-1308dccf4b87",
          nome: "Editora Arqueiro",
          site_lf: "https://www.editoraarqueiro.com.br",
          site_lnf: "www.editoraarqueiro.com.br",
        },
      ],
      nova_editora: { nome: "", site_lf: "", site_lnf: "" },
      indice_editar: -1,
    };
  },
  methods: {
    salvar() {
      if (this.nova_editora.nome !== "" && this.nova_editora.site_lnf !== "") {
        if (this.nova_editora.id_editora) {
          this.editoras.splice(this.indice_editar, 1, this.nova_editora);
          this.indice_editar = -1;
        } else {
          this.nova_editora.id_editora = uuidv4();
          this.editoras.push(this.nova_editora);
        }
        this.nova_editora = {
          nome: "",
          site_lnf: "",
        };
      }
    },
    excluir(editora) {
      const indice = this.editoras.indexOf(editora);
      this.editoras.splice(indice, 1);
    },
    editar(editora) {
      const indice = this.editoras.indexOf(editora);
      this.indice_editar = indice;
      Object.assign(this.nova_editora, editora);
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="title">
      <h2>Gerenciamento de Editoras</h2>
    </div>
    <div class="form-input">
      <input
        @keyup.enter="salvar"
        v-model="nova_editora.nome"
        type="text"
        placeholder="Nome do editora"
        class="input-maior"
      />
      <input
        @keyup.enter="salvar"
        v-model="nova_editora.site_lnf"
        type="text"
        placeholder="Nome do site"
        class="input-maior"
      />
      <button @click="salvar">Adicionar</button>
    </div>
    <div class="list-editoras">
      <table>
        <thead>
          <tr>
            <th>ID-Editora</th>
            <th>Nome</th>
            <th>Site</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="editora in editoras" :key="editora.id">
            <td>
              {{ editora.id_editora }}
            </td>
            <td>
              {{ editora.nome }}
            </td>
            <td>
              <a target="blank" :href="editora.site_lf">
                {{ editora.site_lnf }}</a
              >
            </td>
            <td>
              <button @click="editar(editora)">Editar</button>
              <button @click="excluir(editora)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
