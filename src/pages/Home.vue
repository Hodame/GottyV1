<template>
    <div class="home">
        <h1 class="home__title">Popular now</h1>
        <h2 class="home__subtitle">Based on player counts and release date</h2>
        <div class="home__game-list">
            <GameCard v-for="(card, idx) in resData" @linkToGame="openGame(card)" :key="idx" :gameCard="card" />
            <p v-if="resData === Object">loading............</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import GameCard from '../components/GameCard.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router"
const resData = ref({
})
const router = useRouter()
const API_KEY = "e0bd00b887d44e569f95cce1824ffd92"
onMounted(async () => {
    const subtractDays = (date: any, days: number) => {
        date.setDate(date.getDate() - days)
        return [date.getFullYear(), date.getMonth(), date.getDate()]
    }
    const date = [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()]
    const dateFrom = subtractDays(new Date(), 90)
    const dateIso = new Date(Date.UTC(date[0], date[1], date[2]))
    const todayDate = dateIso.toISOString().split('T')[0]
    const dateIsoFrom = new Date(Date.UTC(dateFrom[0], dateFrom[1], dateFrom[2]))
    const todayDateFrom = dateIsoFrom.toISOString().split('T')[0]
    // const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=${todayDateFrom},${todayDate}&ordering=-rating`)
    // const data = await response.json()
    // resData.value = data.results.sort((game1, game2) => game2.reviews_count - game1.reviews_count, 0)
})

const openGame = (card: object) => {
    router.replace({ name: "GamePage", params: { gameId: card.id}})
}
</script>

<style scoped lang="scss">
.home {
    &__title {
        font-size: 62px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    &__subtitle {
        font-size: 18px;
        font-weight: 300;
        color: var(--white);
        opacity: 0.5;
    }

    &__game-list {
        margin-top: 25px;
        display: grid;
        column-gap: 30px;
        row-gap: 30px;
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>