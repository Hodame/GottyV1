<template>
    <div v-if="!loading" class="game-page">
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
                <template v-if="!currentUser.unLogged">
                    <div @click="popupOpened = !popupOpened" :class="{ 'not-in-collection': !deleteButtonShow }"
                        class="game-page__button add-mygames">
                        <p>{{ gameInUserCollection.collection != '' ? selectedCollection : 'Add to my games' }}</p>
                    </div>
                    <button v-show="deleteButtonShow" @click="removeGameFromCollection" class="game-page__remove">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                        </svg>
                    </button>
                </template>
                <template v-else>
                    <div @click="redirectToAuth" class="game-page__button add-mygames unlogged">
                        <p>Add to my games</p>
                    </div>
                </template>
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
    <template v-else>
        <div class='tetrominos'>
            <div class='tetromino box1'></div>
            <div class='tetromino box2'></div>
            <div class='tetromino box3'></div>
            <div class='tetromino box4'></div>
        </div>
    </template>
    <div v-if="popupOpened" class="add-mygames__popup" ref="addGameToCollectionPopup">
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
                            <p>Beaten</p>
                            <span>Finished games</span>
                        </div>
                    </li>
                </label>
            </ul>
        </form>
        <div class="add-mygames__rating">
            <h2>Rating</h2>
            <ul class="add-mygames__rating-values">
                <label v-for="(rating, idx) in ratings" :key="idx" :for="rating.rating + 'Rating'">
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
        <button v-if="gameInUserCollection.collection === ''"
            @click="addToUserCollection(selectedCollection, selectedRating)" class="add-mygames__button">
            <p v-if="!buttonLoading">Add</p>
            <div v-else class="add-mygames__button-loader">
                <div class="loader loader--style6">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="25px"
                        viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                        <rect x="0" y="13" width="4" height="5" :fill="'var(--lRed)'">
                            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s"
                                repeatCount="indefinite" />
                            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s"
                                repeatCount="indefinite" />
                        </rect>
                        <rect x="10" y="13" width="4" height="5" :fill="'var(--lRed)'">
                            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s"
                                repeatCount="indefinite" />
                            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s"
                                repeatCount="indefinite" />
                        </rect>
                        <rect x="20" y="13" width="4" height="5" :fill="'var(--lRed)'">
                            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s"
                                repeatCount="indefinite" />
                            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s"
                                repeatCount="indefinite" />
                        </rect>
                    </svg>
                </div>

            </div>
        </button>
        <button v-else @click="updateUserCollection(selectedCollection, selectedRating)" class="add-mygames__button">
            <p v-if="!buttonLoading">Add update</p>
            <div v-else class="add-mygames__button-loader">
                <div class="loader loader--style6">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="25px"
                        viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                        <rect x="0" y="13" width="4" height="5" :fill="'var(--lRed)'">
                            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s"
                                repeatCount="indefinite" />
                            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s"
                                repeatCount="indefinite" />
                        </rect>
                        <rect x="10" y="13" width="4" height="5" :fill="'var(--lRed)'">
                            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s"
                                repeatCount="indefinite" />
                            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s"
                                repeatCount="indefinite" />
                        </rect>
                        <rect x="20" y="13" width="4" height="5" :fill="'var(--lRed)'">
                            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s"
                                repeatCount="indefinite" />
                            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s"
                                repeatCount="indefinite" />
                        </rect>
                    </svg>
                </div>
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import LinixIcon from '../assets/ico/gameCard/LinixIcon.vue';
import PlaystationIcon from '../assets/ico/gameCard/PlaystationIcon.vue'
import XboxIcon from '../assets/ico/gameCard/XboxIcon.vue'
import WindowsIcon from '../assets/ico/gameCard/WindowsIcon.vue'
import SwitchIcon from '../assets/ico/gameCard/SwitchIcon.vue'

import { onClickOutside } from '@vueuse/core';
import { addDoc, collection, getDocs, query, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { auth, db } from '../firebase/config';
import { routeNames } from '../router/routeNames';
import router from '../router/router';

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

type ifGameInUserCollection = Array<{
    gameId: number,
    collection: string,
    userRating: string,
    userReview: string,
    docUid: string
}>

type gameInUserCollectionType = {
    collection: string,
    userRating: string,
    userReview: string,
    docUid: string,
    gameName?: string,
    gameId?: number,
    gameDateRelease?: string,
    gamePoster?: string,
    gameMetacritic?: number | null,
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
const ifGameHasInUserCollection = ref<ifGameInUserCollection>([
    {
        docUid: "",
        userRating: "",
        userReview: "",
        gameId: 0,
        collection: "",
    }
])
const gameInUserCollection = ref<gameInUserCollectionType>({
    gameName: "",
    gameId: 0,
    gameDateRelease: "",
    gamePoster: "",
    gameMetacritic: 0,
    userRating: "",
    collection: "",
    userReview: "",
    docUid: ""
})
const readMoreValue = ref(false)
const API_KEY = "e0bd00b887d44e569f95cce1824ffd92"
const currentUser = ref<{ uid?: string, unLogged?: boolean }>({
    unLogged: true
})
const selectedCollection = ref("")
const selectedRating = ref("No")
const userReview = ref("")
const popupOpened = ref(false)
const addGameToCollectionPopup = ref<HTMLDivElement>()
const loading = ref(true)
const buttonLoading = ref(false)
const deleteButtonShow = ref(false)
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser.value = user
    } else {
        console.log("unlogged");

        currentUser.value = {
            unLogged: true
        }
    }
})

onMounted(async () => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${route.params.gameId}?key=${API_KEY}`)
        gameInfo.value = await response.json()
        const responseScreen = await fetch(`https://api.rawg.io/api/games/${route.params.gameId}/screenshots?key=${API_KEY}`)
        gameScreens.value = await responseScreen.json()

        if (currentUser.value != null && currentUser.value.uid != undefined) {
            try {
                const checkWantCollection = await getDocs(query(collection(db, "users", currentUser.value.uid, "want")))
                checkWantCollection.forEach((game) => {
                    const gameRes = {
                        collection: 'want',
                        gameId: game.data().gameId,
                        gameName: game.data().gameName,
                        userRating: game.data().userRating,
                        userReview: game.data().userReview,
                        docUid: game.data().docUid
                    }
                    ifGameHasInUserCollection.value.push(gameRes)
                })
                const checkPlayingCollection = await getDocs(query(collection(db, "users", currentUser.value.uid, "playing")))
                checkPlayingCollection.forEach((game) => {
                    const gameRes = {
                        collection: 'playing',
                        gameId: game.data().gameId,
                        gameName: game.data().gameName,
                        userRating: game.data().userRating,
                        userReview: game.data().userReview,
                        docUid: game.data().docUid
                    }
                    ifGameHasInUserCollection.value.push(gameRes)
                })
                const checkBeatenCollection = await getDocs(query(collection(db, "users", currentUser.value.uid, "beaten")))
                checkBeatenCollection.forEach((game) => {
                    const gameRes = {
                        collection: 'beaten',
                        gameId: game.data().gameId,
                        gameName: game.data().gameName,
                        userRating: game.data().userRating,
                        userReview: game.data().userReview,
                        docUid: game.data().docUid
                    }
                    ifGameHasInUserCollection.value.push(gameRes)
                })

            }
            catch (error) {
                console.log("Erorr" + error);
            }
        }

        if (typeof route.params.gameId === "string") {
            const gameId = route.params.gameId
            const gameIdRef = ifGameHasInUserCollection.value.find(object => object.gameId === parseInt(gameId))
            if (gameIdRef) {
                gameInUserCollection.value = gameIdRef
                selectedRating.value = gameInUserCollection.value.userRating
                selectedCollection.value = gameInUserCollection.value.collection
                userReview.value = gameInUserCollection.value.userReview
                deleteButtonShow.value = true
            }
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
    if (currentUser.value != null && currentUser.value.uid != undefined) {
        try {
            buttonLoading.value = true
            await addDoc(collection(db, "users", currentUser.value.uid, selectedUserCollection), {
                gameName: gameInfo.value.name,
                gameId: gameInfo.value.id,
                gameDateRelease: gameInfo.value.released,
                gamePoster: gameInfo.value.background_image,
                gameMetacritic: gameInfo.value.metacritic,
                userRating: rating,
                userReview: userReview.value,
                collection: selectedUserCollection,
            })
                .then(async (docRef) => {
                    if (currentUser.value.uid != null) {
                        await updateDoc(doc(db, 'users', currentUser.value.uid, selectedCollection.value, docRef.id), {
                            docUid: docRef.id
                        })
                        popupOpened.value = false
                        deleteButtonShow.value = true
                        gameInUserCollection.value = {
                            docUid: docRef.id,
                            gameName: gameInfo.value.name,
                            gameId: gameInfo.value.id,
                            gameDateRelease: gameInfo.value.released,
                            gamePoster: gameInfo.value.background_image,
                            gameMetacritic: gameInfo.value.metacritic,
                            userRating: rating,
                            userReview: userReview.value,
                            collection: selectedUserCollection,
                        }
                    }
                })
        }
        catch (error) {
            console.log("Erorr" + error);
        }
        finally {
            buttonLoading.value = false
        }
    }
    else {
    }
}

const updateUserCollection = async (selectedUserCollection: string, rating: string) => {
    if (currentUser.value != null && currentUser.value.uid != undefined) {
        try {
            buttonLoading.value = true
            if (selectedUserCollection === gameInUserCollection.value.collection) {
                await updateDoc(doc(db, 'users', currentUser.value.uid, selectedUserCollection, gameInUserCollection.value.docUid), {
                    userRating: rating,
                    collection: selectedCollection.value
                })
                    .then(() => popupOpened.value = false)
            }

            else {
                await addDoc(collection(db, "users", currentUser.value.uid, selectedUserCollection), {
                    gameName: gameInfo.value.name,
                    gameId: gameInfo.value.id,
                    gameDateRelease: gameInfo.value.released,
                    gamePoster: gameInfo.value.background_image,
                    gameMetacritic: gameInfo.value.metacritic,
                    userRating: rating,
                    userReview: userReview.value,
                    collection: selectedUserCollection,
                })
                    .then(async (docRef) => {
                        if (currentUser.value.uid != undefined) {
                            await updateDoc(doc(db, 'users', currentUser.value.uid, selectedCollection.value, docRef.id), {
                                docUid: docRef.id
                            })
                                .then(async () => {
                                    const userId = currentUser.value.uid
                                    if (userId != undefined) {
                                        await deleteDoc(doc(db, "users", userId, gameInUserCollection.value.collection, gameInUserCollection.value.docUid))
                                        popupOpened.value = false
                                        gameInUserCollection.value = {
                                            docUid: docRef.id,
                                            gameName: gameInfo.value.name,
                                            gameId: gameInfo.value.id,
                                            gameDateRelease: gameInfo.value.released,
                                            gamePoster: gameInfo.value.background_image,
                                            gameMetacritic: gameInfo.value.metacritic,
                                            userRating: rating,
                                            userReview: userReview.value,
                                            collection: selectedUserCollection,
                                        }
                                    }
                                })
                        }
                    })
            }
        }
        catch (error) {
            console.log("Erorr" + error);
        }
        finally {
            buttonLoading.value = false
        }
    } else {
    }
}

const removeGameFromCollection = async () => {
    if (currentUser.value != null && currentUser.value.uid != undefined) {
        await deleteDoc(doc(db, "users", currentUser.value.uid, gameInUserCollection.value.collection, gameInUserCollection.value.docUid))
            .then(() => {
                gameInUserCollection.value = {
                    gameName: "",
                    gameId: 0,
                    gameDateRelease: "",
                    gamePoster: "",
                    gameMetacritic: 0,
                    userRating: "",
                    collection: "",
                    userReview: "",
                    docUid: ""
                }
                selectedCollection.value = ""
                selectedRating.value = "No"
                deleteButtonShow.value = false
            })
    }
}

const redirectToAuth = () => {
    router.replace({ name: routeNames.Auth })
}

onClickOutside(addGameToCollectionPopup, () => popupOpened.value = false)
</script> 

<style scoped lang="scss">
.game-page {
    display: grid;
    grid-template-columns: 530px 358px;
}
</style>