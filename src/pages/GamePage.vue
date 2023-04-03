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
                <div @click="popupOpened = !popupOpened" class="game-page__button add-mygames">
                    <p>{{ gameInUserCollection.collection != '' ? gameInUserCollection.collection : 'Add to my games' }}</p>
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
    <div v-show="popupOpened" class="add-mygames__popup" ref="addGameToCollectionPopup">
        <h1>Add to</h1>
        <form class="add-mygames__form">
            <ul class="add-mygames__options">
                <label for="want">
                    <li :style="{ backgroundColor: selectedCollection === 'want' ? 'var(--lRed)' : '' }">
                        <input v-model="selectedCollection" value="want" type="radio" name="collection" id="want">
                        <img src="" alt="">
                        <div>
                            <p>Want</p>
                            <span>Wishlist</span>
                        </div>
                    </li>
                </label>
                <label for="playing">
                    <li :style="{ backgroundColor: selectedCollection === 'playing' ? 'var(--lRed)' : '' }">
                        <input v-model="selectedCollection" value="playing" type="radio" name="collection" id="playing">
                        <img src="" alt="">
                        <div>
                            <p>Playing</p>
                            <span>Currently playing</span>
                        </div>
                    </li>
                </label>
                <label for="beaten">
                    <li :style="{ backgroundColor: selectedCollection === 'beaten' ? 'var(--lRed)' : '' }">
                        <input v-model="selectedCollection" value="beaten" type="radio" name="collection" id="beaten">
                        <img src="" alt="">
                        <div>
                            <p>Playing</p>
                            <span>Currently playing</span>
                        </div>
                    </li>
                </label>
            </ul>
        </form>
        <div class="add-mygames__rating">
            <h2>Rating</h2>
            <ul class="add-mygames__rating-values">
                <label @click="log" v-for="(rating, idx) in ratings" :key="idx" :for="rating.rating + 'Rating'">
                    <li :style="{ backgroundColor: selectedRating == rating.rating ? 'var(--lRed)' : '' }">
                        <input v-model="selectedRating" type="radio" name="rating" :value="rating.rating"
                            :id="rating.rating + 'Rating'">
                        <span>{{ rating.rating }}</span>
                    </li>
                </label>
            </ul>
        </div>
        <div class="add-mygames__review">
            <textarea v-model="userReview" placeholder="write a review" name="review" id=""></textarea>
        </div>
        <button v-if="gameInUserCollection.collection === ''" @click="addToUserCollection(selectedCollection, selectedRating)"
            class="add-mygames__add-to-collection">Add</button>
        <button v-else @click="updateUserCollection(selectedCollection, selectedRating)"
            class="add-mygames__add-to-collection">Add</button>
    </div>
</template>

<script setup lang="ts">
import LinixIcon from '../assets/ico/gameCard/LinixIcon.vue';
import PlaystationIcon from '../assets/ico/gameCard/PlaystationIcon.vue'
import XboxIcon from '../assets/ico/gameCard/XboxIcon.vue'
import WindowsIcon from '../assets/ico/gameCard/WindowsIcon.vue'
import SwitchIcon from '../assets/ico/gameCard/SwitchIcon.vue'

import { onClickOutside } from '@vueuse/core';
import { addDoc, collection, getDocs, query, updateDoc } from 'firebase/firestore';
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
        image: "",
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
const ratings = ref([
    {
        rating: "No"
    },
    {
        rating: "10",
    },
    {
        rating: "9",
    },
    {
        rating: "8"
    },
    {
        rating: "7",
    },
    {
        rating: "6"
    },
    {
        rating: "5",
    },
    {
        rating: "4"
    },
    {
        rating: "3",
    },
    {
        rating: "2"
    },
    {
        rating: "1",
    }
])
const gameHasInUserCollection = ref<Array<{ gameId: number, collection: string, userRating: string, userReview: string }>>([
    {
        userRating: "",
        userReview: "",
        gameId: 0,
        collection: "",
    }
])
const gameInUserCollection = ref<{ userRating: string, collection: string, userReview: string}>({
    userRating: "",
    collection: "",
    userReview: ""
})
const readMoreValue = ref(false)
const API_KEY = "e0bd00b887d44e569f95cce1824ffd92"
const currentUserId = ref(auth.currentUser?.uid)
const selectedCollection = ref("")
const selectedRating = ref("No")
const userReview = ref("")
const popupOpened = ref(false)
const addGameToCollectionPopup = ref<HTMLDivElement>()
const loading = ref(true)

onMounted(async () => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${route.params.gameId}?key=${API_KEY}`)
        gameInfo.value = await response.json()
        const responseScreen = await fetch(`https://api.rawg.io/api/games/${route.params.gameId}/screenshots?key=${API_KEY}`)
        gameScreens.value = await responseScreen.json()

        if (auth.currentUser != null) {
            const checkWantCollection = await getDocs(query(collection(db, "users", auth.currentUser.uid, "want")))
            checkWantCollection.forEach((game) => {
                const gameRes = {
                    collection: 'want',
                    gameId: game.data().gameId,
                    gameName: game.data().gameName,
                    userRating: game.data().userRating,
                    userReview: game.data().userReview,
                }
                gameHasInUserCollection.value.push(gameRes)
            })
            const checkPlayingCollection = await getDocs(query(collection(db, "users", auth.currentUser.uid, "playing")))
            checkPlayingCollection.forEach((game) => {
                const gameRes = {
                    collection: 'playing',
                    gameId: game.data().gameId,
                    gameName: game.data().gameName,
                    userRating: game.data().userRating,
                    userReview: game.data().userReview,
                }
                gameHasInUserCollection.value.push(gameRes)
            })
            const checkBeatenCollection = await getDocs(query(collection(db, "users", auth.currentUser.uid, "beaten")))
            checkBeatenCollection.forEach((game) => {
                const gameRes = {
                    collection: 'beaten',
                    gameId: game.data().gameId,
                    gameName: game.data().gameName,
                    userRating: game.data().userRating,
                    userReview: game.data().userReview,
                }
                gameHasInUserCollection.value.push(gameRes)
            })
        }

        if (typeof route.params.gameId === "string") {
        const gameId = route.params.gameId
        const gameIdRef = gameHasInUserCollection.value.find(object => object.gameId === parseInt(gameId))
        if (gameIdRef) {
            gameInUserCollection.value = gameIdRef
            selectedRating.value = gameInUserCollection.value.userRating
            userReview.value = gameInUserCollection.value.userReview
            console.log(selectedRating.value);
            console.log('click');

            return gameIdRef.collection
        } else return "Add to my games"
    }
    }
    finally {
        loading.value = false
    }
})

const getGamePlatform = (id: number) => {
    return gameInfo.value.parent_platforms.find(thePlatform => thePlatform.platform.id === id)
}

const dateRelease = (released: string) => {
    const arrDate = released.split("-")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 'Sep', "Oct", "Nov", "Dec"]
    const gameMonthDate = months[parseInt(arrDate[1].replace('0', "")) - 1]
    const gameDayDate = parseInt(arrDate[2].replace("0", ""))
    const gameDateRelease = gameMonthDate + " " + gameDayDate + ", " + arrDate[0]
    return gameDateRelease
}

const readMore = (text: string) => {
    return text.substring(0, 562).trimEnd() + "..."
}

const addToUserCollection = async (selectedUserCollection: string, rating: string) => {
    if (auth.currentUser != null) {
        await addDoc(collection(db, "users", auth.currentUser.uid, selectedUserCollection), {
            gameName: gameInfo.value.name,
            gameId: gameInfo.value.id,
            gameDateRelease: gameInfo.value.released,
            gamePoster: gameInfo.value.background_image,
            gameMetacritic: gameInfo.value.metacritic,
            userRating: rating,
            userReview: userReview.value
        })
    }
    else if (currentUserId === null) {
        alert("null error")
    }
    else if (currentUserId === undefined) {
        alert("undefined error")
    }
}

const updateUserCollection = async (selectedUserCollection: string, rating: string) => {
    if (auth.currentUser != null) {
        await updateDoc(doc(db, 'users', auth.currentUser.uid,))
}

const log = () => {
    console.log(selectedRating.value);
    
}

// const checkIfGameHasInCollections = () => {
//     if (typeof route.params.gameId === "string") {
//         const gameId = route.params.gameId
//         const gameIdRef = gameHasInUserCollection.value.find(object => object.gameId === parseInt(gameId))
//         if (gameIdRef) {
//             gameHasInUserCollection.value[0].userRating = gameIdRef.userRating
//             gameHasInUserCollection.value[0].userReview = gameIdRef.userReview
//             console.log(selectedRating.value);
//             console.log('click');

//             return gameIdRef.collection
//         } else return "Add to my games"
//     }
// }

onClickOutside(addGameToCollectionPopup, () => popupOpened.value = false)
</script> 

<style scoped lang="scss">
.game-page {
    display: grid;
    grid-template-columns: 530px 358px;
}
</style>