<template>
    <div class="game-page">
        <div class="game-page__game-info">
            <div class="game-page__head">
                <div class="game-page__date-release">{{ gameInfo.released }}</div>
                <div class="game-page__platforms">
                    <div v-if="getGamePlatform(1)" class="game-card__windows">
                        <WindowsIcon />
                    </div>
                    <div v-if="getGamePlatform(gameInfo, 2)" class="game-card__playstation">
                        <PlaystationIcon />
                    </div>
                    <div v-if="getGamePlatform(gameInfo, 3)" class="game-card__xbox">
                        <XboxIcon />
                    </div>
                    <div v-if="getGamePlatform(gameInfo, 7)" class="game-card__switch">
                        <SwitchIcon />
                    </div>
                    <div v-if="getGamePlatform(gameInfo, 6)" class="game-card__linux">
                        <LinixIcon />
                    </div>
                </div>
            </div>

        </div>
        <div class="game-page__screens">

        </div>

    </div>
</template>

<script setup lang="ts">
import LinixIcon from '../assets/ico/gameCard/LinixIcon.vue';
import PlaystationIcon from '../assets/ico/gameCard/PlaystationIcon.vue'
import XboxIcon from '../assets/ico/gameCard/XboxIcon.vue'
import WindowsIcon from '../assets/ico/gameCard/WindowsIcon.vue'
import SwitchIcon from '../assets/ico/gameCard/SwitchIcon.vue'

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

type GameInfo = {
    background_image: string,
    parent_platforms?: Array<{
        id: number
    }>,
    metacritic: number,
    name: string,
    released: string,
    genres?: Array<{
        name: string
    }>,
}

const getGamePlatform = (id: number) => {
    return gameInfo.parent_platforms.find((thePlatform) => thePlatform.platform.id === id)
}

const route = useRoute()
const gameInfo = ref<GameInfo>({
    background_image: "",
    parent_platforms: {
        id: 0,
    },
    metacritic: 0,
    name: "",
    released: "",
}
)
const API_KEY = "e0bd00b887d44e569f95cce1824ffd92"

onMounted(async () => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${route.params.gameId}?key=${API_KEY}`)
        gameInfo.value = await response.json()
    }
    finally {
        console.log("date ", gameInfo.value)
    }
})

</script>

<style scoped lang="scss">
.game-page {
    display: grid;
    grid-template-columns: 530px 358px;
}
</style>