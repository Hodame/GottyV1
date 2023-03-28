<script setup lang="ts">
import Navigation from '../components/Navigation.vue';
import SideBar from '../components/SideBar.vue'

</script>

<template>
  <div class="body">
    <Navigation />
    <div class="body__container">
      <SideBar />
      <RouterView>
      </RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.body {
  max-width: 2000px;
  margin: 0 auto;
  padding: 0 25px;
  padding-bottom: 30px;

  &__container {
    display: grid;
    grid-template-columns: 250px 1fr;
  }
}
</style>
