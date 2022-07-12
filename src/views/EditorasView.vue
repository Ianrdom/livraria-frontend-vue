<script>
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export default {
  data() {
    return {
      editoras: [],
      nova_editora: {
        nome: "",
        site_lnf: "",
      },
      indice_editar: -1,
    };
  },
  async created() {
    const editoras = await axios.get("http://localhost:4000/editoras");
    this.editoras = editoras.data;
  },

  methods: {
    async salvar() {
      if (this.nova_editora.nome !== "" && this.nova_editora.site_lnf !== "") {
        if (this.nova_editora.id) {
          await axios.patch(
            `http://localhost:4000/editoras/${this.nova_editora.id}`,
            {
              nome: this.nova_editora.nome,
              site_lnf: this.nova_editora.site_lnf,
              site_lf: "https://" + this.nova_editora.site_lnf,
            }
          );
          this.editoras.splice(this.indice_editar, 1, this.nova_editora);
          this.indice_editar = -1;
        } else {
          const editora_criada = await axios.post(
            "http://localhost:4000/editoras",
            {
              nome: this.nova_editora.nome,
              site_lnf: this.nova_editora.site_lnf,
              site_lf: "https://" + this.nova_editora.site_lnf,
            }
          );
          this.editoras.push(editora_criada.data);
        }
        this.nova_editora = {
          nome: "",
          site_lnf: "",
        };
      }
    },
    async excluir(editora) {
      await axios.delete(`http://localhost:4000/editoras/${editora.id}`);
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
              {{ editora.id }}
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
