<template>
    <div class="game-page">
        <div class="game-page__background" :style='{
            background: "url(" + gameInfo.background_image + ")" + "no-repeat center / cover",
        }'></div>
        <div class="game-page__game-info">
            <div class="game-page__head">
                <div class="game-page__date-release">{{ dateRelease(gameInfo.released) }}</div>
                <div class="game-page__platforms">
                    <div v-if="getGamePlatform(1)">
                        <WindowsIcon />
                    </div>
                    <div v-if="getGamePlatform(2)">
                        <PlaystationIcon />
                    </div>
                    <div v-if="getGamePlatform(3)">
                        <XboxIcon />
                    </div>
                    <div v-if="getGamePlatform(7)">
                        <SwitchIcon />
                    </div>
                    <div v-if="getGamePlatform(6)">
                        <LinixIcon />
                    </div>
                </div>
            </div>
            <div class="game-page__title">{{ gameInfo.name }}</div>
            <div class="game-page__buttons">
                <div class="game-page__button add-mygames">
                    <p>Add to My games</p>
                    <span></span>
                    <ul class="add-mygames__body">
                        <li @click="addToUserWantCollection">Want</li>
                        <li @click="addToUserPlayingCollection">Playing</li>
                        <li @click="addToUserBeatenCollection">Beaten</li>
                    </ul>

                </div>
                <div class="game-page__button">
                    Add to Wishlist
                </div>
                <div class="game-page__button">
                    Save to collection
                </div>
            </div>
            <div class="game-page__about">
                <h1>About</h1>
                <div v-if="gameInfo.description_raw.length > 562" class="game-page__description">
                    <div v-if="!readMoreValue">
                        {{ readMore(gameInfo.description_raw) }}
                    </div>
                    <div v-else v-html="gameInfo.description">
                    </div>
                    <span @click="readMoreValue = !readMoreValue">{{ readMoreValue ? "Show less" : "Read more" }}</span>
                </div>
                <div v-else class="game-page__description-raw">
                    <div v-html="gameInfo.description_raw">
                    </div>
                </div>
            </div>
        </div>
        <div class="game-page__screens">
            <div v-for="(screen, idx) in gameScreens.results" :key="idx" class="game-page__screen">
                <img :src='screen.image' alt="" width="174" height="98">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LinixIcon from '../assets/ico/gameCard/LinixIcon.vue';
import PlaystationIcon from '../assets/ico/gameCard/PlaystationIcon.vue'
import XboxIcon from '../assets/ico/gameCard/XboxIcon.vue'
import WindowsIcon from '../assets/ico/gameCard/WindowsIcon.vue'
import SwitchIcon from '../assets/ico/gameCard/SwitchIcon.vue'

import { doc, addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { auth, db } from '../firebase/config';

type GameInfo = {
    background_image: string,
    parent_platforms: Array<{
        platform: {
            id: number
        }
    }>,
    id: number,
    metacritic: number,
    name: string,
    description: string,
    description_raw: string,
    released: string,
    genres?: Array<{
        name: string
    }>,
}

type gameScreen = {
    results: Array<{
        image: string,
    }>
}

const route = useRoute()
const gameScreens = ref<gameScreen>({
    results: [{
        image: "fsd",
    }]
})
const gameInfo = ref<GameInfo>({
    background_image: "",
    parent_platforms: [{
        platform: {
            id: 0
        }
    },],
    id: 0,
    description: "",
    description_raw: "",
    metacritic: 0,
    name: "",
    released: "0000-00-00",
})
const readMoreValue = ref(false)
const readMoreLess = ref("Read more")
const API_KEY = "e0bd00b887d44e569f95cce1824ffd92"
const currentUserId = auth.currentUser?.uid
onMounted(async () => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${route.params.gameId}?key=${API_KEY}`)
        gameInfo.value = await response.json()
        const responseScreen = await fetch(`https://api.rawg.io/api/games/${route.params.gameId}/screenshots?key=${API_KEY}`)
        gameScreens.value = await responseScreen.json()
    }
    finally {
        console.log("date ", gameInfo.value)
    }
})

const getGamePlatform = (id: number) => {
    return gameInfo.value.parent_platforms.find(thePlatform => thePlatform.platform.id === id)
}

const dateRelease = (released: string) => {
    const date = released
    const arrDate = date.split("-")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 'Sep', "Oct", "Nov", "Dec"]
    const gameMonthDate = months[parseInt(arrDate[1].replace('0', "")) - 1]
    const gameDayDate = parseInt(arrDate[2].replace("0", ""))
    const gameDateRelease = gameMonthDate + " " + gameDayDate + ", " + arrDate[0]
    return gameDateRelease
}

const readMore = (text: string) => {
    return text.substring(0, 562).trimEnd() + "..."
}


const addToUserWantCollection = async () => {        
    if (currentUserId != null) {
        await addDoc(collection(db, "users", currentUserId, "want"), {
            gameName: gameInfo.value.name,
            gameId: gameInfo.value.id,
            gameDateRelease: gameInfo.value.released, 
            gamePoster: gameInfo.value.background_image,
            gameMetacritic: gameInfo.value.metacritic,
        })
    } 
    else if (currentUserId === null) {
        alert("You need to login first")
    }
    else if (currentUserId === undefined) {
        alert("You need to login first")
    }    
}

const addToUserPlayingCollection = async () => {        
    if (currentUserId != null) {
        await addDoc(collection(db, "users", currentUserId, "playing"), {
            gameName: gameInfo.value.name,
            gameId: gameInfo.value.id,
            gameDateRelease: gameInfo.value.released, 
            gamePoster: gameInfo.value.background_image,
            gameMetacritic: gameInfo.value.metacritic,
        })
    } 
    else if (currentUserId === null) {
        alert("You need to login first")
    }
}

const addToUserBeatenCollection = async () => {        
    if (currentUserId != null) {
        await addDoc(collection(db, "users", currentUserId, "beaten"), {
            gameName: gameInfo.value.name,
            gameId: gameInfo.value.id,
            gameDateRelease: gameInfo.value.released, 
            gamePoster: gameInfo.value.background_image,
            gameMetacritic: gameInfo.value.metacritic,
        })
    } 
    else if (currentUserId === null) {
        alert("You need to login first")
    }
}
</script> 

<style scoped lang="scss">
.game-page {
    display: grid;
    grid-template-columns: 530px 358px;
}
</style>