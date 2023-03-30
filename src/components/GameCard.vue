<template>
    <div class="game-card" @click="$emit('linkToGame')">
        <div class="game-card__poster" :style='{
            background: "url(" + gameCard.background_image + ")" + "no-repeat center / cover"
        }'>
        </div>
        <div class="game-card__platforms-meta">
            <div class="game-card__platforms">
                <div v-if="getGamePlatform(gameCard, 1)" class="game-card__windows">
                    <WindowsIcon />
                </div>
                <div v-if="getGamePlatform(gameCard, 2)" class="game-card__playstation">
                    <PlaystationIcon />
                </div>
                <div v-if="getGamePlatform(gameCard, 3)" class="game-card__xbox">
                    <XboxIcon />
                </div>
                <div v-if="getGamePlatform(gameCard, 7)" class="game-card__switch">
                    <SwitchIcon />
                </div>
                <div v-if="getGamePlatform(gameCard, 6)" class="game-card__linux">
                    <LinixIcon />
                </div>
            </div>
            <div v-if="gameCard.metacritic" class="game-card__metacritic" :style="{
                border: '1px solid' + setColorRate(gameCard.metacritic)
            }">
                <span :style="{ color: setColorRate(gameCard.metacritic) }">{{ gameCard.metacritic }}</span>
            </div>
        </div>
        <div class="game-card__name">
            <p>{{ gameCard.name }}</p>
        </div>
        <!-- <div class="game-card__more-info">
            <div class="game-card__release-date">
                <p>Release date</p>
                <span>{{ gameCard.released }}</span>
            </div>
            <div class="game-card__genres">
                <p>Genres</p>
                <ul>
                    <li v-for="(genre, idx) in gameCard.genres" :key="idx">{{ genre.name }}</li>
                </ul>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import LinixIcon from '../assets/ico/gameCard/LinixIcon.vue';
import PlaystationIcon from '../assets/ico/gameCard/PlaystationIcon.vue'
import XboxIcon from '../assets/ico/gameCard/XboxIcon.vue'
import WindowsIcon from '../assets/ico/gameCard/WindowsIcon.vue'
import SwitchIcon from '../assets/ico/gameCard/SwitchIcon.vue'

type Props = {
    gameCard: {
        background_image: string,
        parent_platforms: Array<{
            platform: {
                id: number
            }
        }>,
        metacritic: number,
        name: string,
        released: string,
        genres: Array<{
            name: string
        }>,
    }
}

type gameCard = {
    background_image: string,
    parent_platforms: Array<{
        platform: {
            id: number
        }
    }>,
    metacritic: number,
    name: string,
    released: string,
    genres: Array<{
        name: string
    }>,
}

const props = defineProps<Props>()
const emits = defineEmits(['linkToGame'])

const getGamePlatform = (GCard: gameCard, id: number) => {
    return GCard.parent_platforms.find((thePlatform) => thePlatform.platform.id === id)
}

const setColorRate = (rate: any) => {
    if (rate >= 75) {
        return "#6dc849"
    }
    else if (rate >= 50) {
        return "#fdca52"
    }
    else if (rate < 50) {
        return "#fc4b37"
    }
    else if (rate < 0) {
        return "#ccc"
    }
}
</script>
