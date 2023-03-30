<style scoped lang="scss">
.navigation {
    position: relative;
    margin-bottom: 30px;
    padding: 20px 0;
    display: flex;
    gap: 30px;
    justify-content: space-between;
    align-items: center;

    &__logo {
        display: flex;
        align-items: center;

        img {
            margin-right: 10px;
            width: 40px;
            height: 40px;
        }

        p {
            font-weight: 900;
            font-size: 28px;
        }
    }

    &__search-bar {
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 9999px;
        flex: 1 1 100%;
        background-color: var(--white);
    }

    &__search-icon {
        z-index: 1;
        position: absolute;
        left: 15px;
        width: 20px;
        height: 20px;
    }

    &__search {
        position: relative;
        z-index: 20;
        width: 100%;
        font-weight: 500;
        font-size: 18px;
        padding: 15px 30px 15px 45px;
        background-color: transparent;
    }

    &__user {
        display: flex;
    }

    &__user-profile {
        display: flex;
        align-items: center;

        img {
            cursor: pointer;
            width: 50px;
            height: 50px;
        }

        p {
            cursor: pointer;
            margin-left: 10px;
            white-space: nowrap;
            font-weight: 500;
            font-size: 18px;
            transition: 0.3s ease;

            &:hover {
                color: var(--lRed);
            }
        }
    }

    &__settings {
        margin-left: 15px;
        display: flex;
        align-items: center;
        cursor: pointer;

        svg {
            path {
                transition: 0.3s ease;
            }

            &:hover {
                path {
                    fill: var(--lRed);
                }
            }
        }
    }
}

.search-result {
    position: absolute;
    top: calc(100% + 10px);
    width: 100%;
    z-index: 9999;

    &__body {
        overflow: auto;
        max-height: 700px;
        background-color: var(--grey);
        border-radius: 20px;
        padding: 20px;
    }

    &__games {
        width: 100%;

        h1 {
            font-size: 18px;
        }
    }

    &__games-list {
        list-style-type: none;

        li {
            border-radius: 20px;
            cursor: pointer;
            display: flex;
            padding: 10px;
            margin: 5px 0;

            &:hover {
                background-color: var(--brown);
            }
        }
    }

    &__game-poster {
        width: 60px;
        aspect-ratio: 4 / 5;

        img {
            border-radius: 9px;
            object-fit: cover;
            max-width: 100%;
            height: 100%;
        }
    }

    &__game-text {
        margin-left: 13px;
    }

    &__game-platfroms {
        margin-top: 10px;
        display: flex;

        div {
            margin-right: 10px;
        }
    }

    &__game-name {
        font-size: 18px;
    }
}
</style>

<template>
    <div class="navigation">
        <div class="navigation__logo">
            <img src="../assets/ico/navigation/mainLogo.svg" alt="">
            <p>Gotty</p>
        </div>
        <div class="navigation__search-bar">
            <img class="navigation__search-icon" src="../assets/ico/navigation/searchIcon.svg" alt="">
            <input v-model="searchValue" type="text" placeholder="Search" class="navigation__search">
            <div class="navigation__search-result search-result" v-if="searchValue.length > 0">
                <div class="search-result__body">
                    <div class="search-result__games">
                        <h1>Games 424</h1>
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
            </div>
        </div>
        <div class="navigation__user">
            <div class="navigation__user-profile">
                <img src="https://cdn-icons-png.flaticon.com/512/727/727399.png" alt="">
                <p>My collection</p>
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

import { useRouter } from "vue-router";
import { ref, watchEffect } from 'vue';
import { routeNames } from '../router/routeNames';

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
        console.log("searching....")

        const search = setTimeout(async () => {
            let data
            const searchResponse = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&search=${searchValue.value}&page_size=10`)
            data = await searchResponse.json()
            searchResult.value = data.results
            console.log(searchResult.value)
        }, 1000)

        onInvalidate(() => {
            clearInterval(search)
        })
    } else {
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
    route.push({ name: routeNames.GamePage, params: { gameId: id}})
    searchValue.value = ""
}

const getGamePlatform = (game: game, id: number) => {
    return game.parent_platforms.find(thePlatform => thePlatform.platform.id === id)
}
</script>
