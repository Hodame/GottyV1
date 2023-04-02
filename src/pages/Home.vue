<template>
    <div class="home">
        <h1 class="home__title">Popular now</h1>
        <h2 class="home__subtitle">Based on player counts and release date</h2>
        <div class="home__game-list">
            <template v-if="!loading">
                <GameCard v-for="(card, idx) in resData" @linkToGame="openGame(card)" :key="idx" :gameCard="card" />
            </template>
            <template v-else>
                <div class='tetrominos'>
                    <div class='tetromino box1'></div>
                    <div class='tetromino box2'></div>
                    <div class='tetromino box3'></div>
                    <div class='tetromino box4'></div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">

import GameCard from '../components/GameCard.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router"

type GCard = {
    id: number
}

const loading = ref(true)
const resData = ref({})
const router = useRouter()
const API_KEY = "e0bd00b887d44e569f95cce1824ffd92"

onMounted(async () => {
    try {
        const subtractDays = (date: Date, days: number) => {
            date.setDate(date.getDate() - days)
            return [date.getFullYear(), date.getMonth(), date.getDate()]
        }

        const date = [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()]
        const dateFrom = subtractDays(new Date(), 90)
        const dateIso = new Date(Date.UTC(date[0], date[1], date[2]))
        const todayDate = dateIso.toISOString().split('T')[0]
        const dateIsoFrom = new Date(Date.UTC(dateFrom[0], dateFrom[1], dateFrom[2]))
        const todayDateFrom = dateIsoFrom.toISOString().split('T')[0]

        type IRes = {
            results: {
                reviews_count: number
            }[]
        }

        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=${todayDateFrom},${todayDate}&ordering=-rating`)
        const data: IRes = await response.json()
        resData.value = data.results.sort((game1, game2) => game2.reviews_count - game1.reviews_count)
    }

    catch (e) { console.error(e) }

    finally {
        loading.value = false
    }


})

const openGame = (card: GCard) => {
    router.push({ name: "GamePage", params: { gameId: card.id } })
}
</script>

<style scoped lang="scss">
.home {
    height: 100%;
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

$w: 96px;
$h: 112px;
$xspace: $w/2;
$yspace: $h/4 - 1;
$speed: 1.5s;

.tetrominos {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.tetromino {
    width: $w;
    height: $h;
    position: absolute;
    transition: all ease .3s;
    background: url('data:image/svg+xml;utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 684"%3E%3Cpath fill="%23fff" d="M305.7 0L0 170.9v342.3L305.7 684 612 513.2V170.9L305.7 0z"/%3E%3Cpath fill="%23ff334d" d="M305.7 80.1l-233.6 131 233.6 131 234.2-131-234.2-131"/%3E%3C/svg%3E') no-repeat top center;
}

.box1 {
    animation: tetromino1 $speed ease-out infinite;
}

.box2 {
    animation: tetromino2 $speed ease-out infinite;
}

.box3 {
    animation: tetromino3 $speed ease-out infinite;
    z-index: 2;
}

.box4 {
    animation: tetromino4 $speed ease-out infinite;
}

@keyframes tetromino1 {

    0%,
    40% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate($xspace, -$yspace);
    }

    60%,
    100% {
        transform: translate($xspace*2, 0);
    }
}

@keyframes tetromino2 {

    0%,
    20% {
        transform: translate($xspace*2, 0px);
    }

    40%,
    100% {
        transform: translate($xspace*3, $yspace);
    }
}

@keyframes tetromino3 {
    0% {
        transform: translate($xspace*3, $yspace);
    }

    20%,
    60% {
        transform: translate($xspace*2, $yspace*2);
    }

    90%,
    100% {
        transform: translate($xspace, $yspace);
    }
}

@keyframes tetromino4 {

    0%,
    60% {
        transform: translate($xspace, $yspace);
    }

    90%,
    100% {
        transform: translate(0, 0);
    }
}</style>