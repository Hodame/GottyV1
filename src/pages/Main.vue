<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navigation from '../components/Navigation.vue';
import SideBar from '../components/SideBar.vue'
const resData = ref({
  results: ""
})
const API_KEY = "e0bd00b887d44e569f95cce1824ffd92"
// onMounted( async () => {
//   const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search="diablo"`)
//   resData.value = await response.json()
//   console.log(resData.value)
// })
</script>

<template>
  <div class="body">
    <Navigation />
    <div class="body__container">
        <SideBar />
        <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.body {
    max-width: 2000px;
    margin: 0 auto;
    padding: 0 25px;
    &__container {
        display: grid;
        grid-template-columns: 250px 1fr;
    }
}
</style>
