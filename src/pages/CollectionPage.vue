<template>
    <div class="collection-page">
        <div class="collection-page__head">
            <div class="collection-page__info">
                <h1>{{ userCollection.collectionName }}</h1>
                <div class="collection-page__description">{{ userCollection.collectionDescription }}</div>
            </div>
            <div class="collection-page__background">
                <div :style="{ background: userCollection.collectionColor.color }"><img v-if="userCollection.backgroundIMG"
                        :src="userCollection.backgroundIMG" alt=""></div>
            </div>
        </div>
        <div class="collection-page__games">
            <h2>Games {{ 20 }}</h2>
            <ul class="collection-page__list">
                <!-- <li class="user-games__list">
                    <div v-for="(game, idx) in collectionGames" :key="idx" class="user-games__game">
                        <RouterLink :to="{ name: routeNames.GamePage, params: { gameId: game.gameId } }">
                            <div class="user-games__game-body">
                                <div class="user-games__background">
                                    <img :src="game.gamePoster" alt="">
                                </div>
                                <div v-if="game.userRating != 'No'" class="user-games__rating"><span>{{ game.userRating
                                }}</span></div>
                                <div class="user-games__body">
                                    <div class="user-games__title">{{ game.gameName }}</div>
                                    <span v-if="game.gameMetacritic" class="user-games__metacritic">{{ game.gameMetacritic
                                    }}</span>
                                    <div class="user-games__date">{{ dateRelease(game.gameDateRelease) }}</div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { db } from '../firebase/config';
import { getCurrentUserData } from '../helpers';
import { useRoute } from 'vue-router';
import { routeNames } from '../router/routeNames';

type UserCollection = {
    collectionName: string,
    collectionDescription: string,
    collectionColor: {
        color: string,
        id: string
    },
    backgroundIMG: string | null,
    postLifeTime: number,
    collectionUid: string
}

const route = useRoute()
const userCollection = ref<UserCollection>(
    {
        collectionName: "",
        collectionDescription: "",
        collectionColor: {
            color: "",
            id: ''
        },
        backgroundIMG: "",
        postLifeTime: 0,
        collectionUid: ""
    }
)

const currentUser = getCurrentUserData()
onMounted(async () => {
    try {
        console.log(route.params.collectionName);

        if (currentUser.get().uid != null) {
            const queryRef = query(collection(db, "users", currentUser.get().uid, "collections"), where("collectionName", "==", route.params.collectionName))
            const collectionPage = await getDocs(queryRef)
            collectionPage.forEach((doc) => {
                const response = {
                    collectionName: doc.data().collectionName,
                    collectionDescription: doc.data().collectionDescription,
                    collectionColor: doc.data().collectionColor,
                    backgroundIMG: doc.data().backgroundIMG,
                    postLifeTime: doc.data().postLifeTime,
                    collectionUid: doc.data().collectionUid
                }
                userCollection.value = response
            })
        }
    }
    finally {

    }
})

</script>