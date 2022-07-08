<script>
export default {
  data() {
    return {
      usuario: "Adm1",
    };
  },
};
</script>

<template>
  <header>
    <div class="menu-esquerdo">
      <span> <RouterLink to="/">Home</RouterLink> </span>
      <span>|</span>
      <span> <RouterLink to="/editoras">Editoras</RouterLink> </span>
      <span>|</span>
      <span> <RouterLink to="/livros">Livros</RouterLink> </span>
      <span>|</span>
      <span> <RouterLink to="/cartegorias">Cartegorias</RouterLink> </span>
      <span>|</span>
      <span> <RouterLink to="/autores">Autores</RouterLink> </span>
    </div>
    <div class="menu-direito">
      <span> {{ usuario }} </span>
      <span>Sair</span>
    </div>
  </header>
</template>
