<style scoped lang="scss"></style>

<template>
    <div class="navigation">
        <div class="navigation__logo">
            <img src="../assets/ico/navigation/mainLogo.svg" alt="">
            <p>Gotty</p>
        </div>
        <div class="navigation__search-bar" ref="search_box">
            <img class="navigation__search-icon" src="../assets/ico/navigation/searchIcon.svg" alt="">
            <input v-model="searchValue" type="text" placeholder="Search" class="navigation__search">
            <div class="navigation__search-result search-result" v-if="searchValue.length > 0">
                <div v-if="!loading" class="search-result__body">
                    <div class="search-result__games">
                        <h1>Games {{ searchResult.length }}</h1>
                        <ul class="search-result__games-list">
                            <li v-for="(game, idx) in searchResult" :key="idx" @click="pushToGamePage(game.id)">
                                <div class="search-result__game-poster">
                                    <img :src="game.background_image" alt="">
                                </div>
                                <div class="search-result__game-text">
                                    <div class="search-result__game-name">{{ game.name }}</div>
                                    <div class="search-result__game-platfroms">
                                        <div v-if="getGamePlatform(game, 1)">
                                            <WindowsIcon />
                                        </div>
                                        <div v-if="getGamePlatform(game, 2)">
                                            <PlaystationIcon />
                                        </div>
                                        <div v-if="getGamePlatform(game, 3)">
                                            <XboxIcon />
                                        </div>
                                        <div v-if="getGamePlatform(game, 7)">
                                            <SwitchIcon />
                                        </div>
                                        <div v-if="getGamePlatform(game, 6)">
                                            <LinixIcon />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else class="search-result__placeholder">
                    <div class="search-result__loader loader--style5" title="4">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="60px"
                            viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                            <rect x="0" y="13" width="4" height="5" fill="#333">
                                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s"
                                    repeatCount="indefinite" />
                                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s"
                                    repeatCount="indefinite" />
                            </rect>
                            <rect x="10" y="13" width="4" height="5" fill="#333">
                                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s"
                                    repeatCount="indefinite" />
                                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s"
                                    repeatCount="indefinite" />
                            </rect>
                            <rect x="20" y="13" width="4" height="5" fill="#333">
                                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s"
                                    repeatCount="indefinite" />
                                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s"
                                    repeatCount="indefinite" />
                            </rect>
                        </svg>
                    </div>
                </div>

            </div>
        </div>
        <div class="navigation__user">
            <div v-if="logged" class="navigation__user-profile">
                <RouterLink :to="{ name: routeNames.Profile}">
                    <div>
                        <img :src="currentUser.photoURL" alt="avatar">
                        <p>My games</p>
                    </div>
                </RouterLink>
            </div>
            <div v-else class="navigation__auth">
                <RouterLink :to="{ name: routeNames.Auth }">
                    <button class="navigation__login">Login</button>
                </RouterLink>
                <RouterLink :to="{ name: routeNames.Register }">
                    <button class="navigation__sign-up">Sign up</button>

                </RouterLink>
            </div>
            <div class="navigation__settings">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z"
                        fill="#fff" />
                    <path
                        d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"
                        fill="#fff" />
                    <path
                        d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
                        fill="#fff" />
                </svg>
                <div v-if="logged" class="navigation__settings-popup">
                    <button @click="logOut">Log out</button>
                </div>

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

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { onClickOutside } from '@vueuse/core'
import { useRouter } from "vue-router";
import { ref, watchEffect } from 'vue';
import { routeNames } from '../router/routeNames';
import { auth } from '../firebase/config';
import router from '../router/router';

type CurrentUser = {
    photoURL: string | undefined
}

type gameList = Array<{
    background_image: string,
    name: string,
    id: number,
    parent_platforms: Array<{
        platform: {
            id: number
        }
    }>,
}>

type game = {
    parent_platforms: Array<{
        platform: {
            id: number
        }
    }>,
}

const route = useRouter()
const searchValue = ref('')
const API_KEY = "e0bd00b887d44e569f95cce1824ffd92"
const search_box = ref<HTMLDivElement>()
const loading = ref(true)
const logged = ref(false)
const currentUser = ref<CurrentUser>({
    photoURL: "",
})
const searchResult = ref<gameList>([
    {
        background_image: "",
        name: "",
        id: 0,
        parent_platforms: [{
            platform: {
                id: 0
            }
        },],
    }
])

watchEffect((onInvalidate) => {
    if (searchValue.value.length > 0) {
        loading.value = true
        const search = setTimeout(async () => {
            try {
                let data
                const searchResponse = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${searchValue.value}&page_size=10`)
                data = await searchResponse.json()
                searchResult.value = data.results
                console.log(searchResult.value)
            }
            finally {
                loading.value = false
            }
        }, 600)

        onInvalidate(() => {
            clearInterval(search)
        })
    }
    else {
        searchResult.value = [
            {
                background_image: "",
                name: "",
                id: 0,
                parent_platforms: [{
                    platform: {
                        id: 0
                    }
                },],
            }
        ]
    }
})

const pushToGamePage = (id: number) => {
    route.replace({ name: routeNames.GamePage, params: { gameId: id } })
    searchValue.value = ""
}

const getGamePlatform = (game: game, id: number) => {
    return game.parent_platforms.find(thePlatform => thePlatform.platform.id === id)
}

const logOut = () => {
    signOut(auth).then(() => {
        router.replace({ path: "/" })
    })
        .catch((error) => {
            alert(error)
        })
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (user.photoURL != null) {
            currentUser.value.photoURL = user.photoURL
        }
        logged.value = true
    } else {
        logged.value = false
    }
})


onClickOutside(search_box, () => searchValue.value ? searchValue.value = "" : undefined)
</script>
