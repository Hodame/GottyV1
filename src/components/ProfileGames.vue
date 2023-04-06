<template>
	<div v-if="!loading" class="user-games">
		<template v-if="gamesWant.length === 0 && gamesBeaten.length === 0 && gamesPlaying.length === 0">
			<div class="user-games__no-games">
				<p>Add some games first!</p>
			</div>
		</template>
		<div class="user-games__results-body">
			<div v-if="gamesWant.length > 0" class="user-games__want">
				<div class="user-games__head">
					<h1>Want</h1>
					<div>
						<img src="../assets/ico/profile/gamepad.svg" alt="">
						<span>{{ gamesWant.length }}</span>
					</div>
					<button>See all</button>
				</div>
				<swiper :slides-per-view="3" :space-between="20" @swiper="onSwiper" @slideChange="onSlideChange"
					class="user-games__list">
					<swiper-slide v-for="(game, idx) in gamesWant" :key="idx" class="user-games__game">
						<RouterLink :to="{ name: routeNames.GamePage, params: { gameId: game.gameId } }">
							<div class="user-games__game-body">
								<div class="user-games__background">
									<img :src="game.gamePoster" alt="">
								</div>
								<div v-if="game.userRating != 'No'" class="user-games__rating"><span>{{ game.userRating }}</span></div>
								<div class="user-games__body">
									<div class="user-games__title">{{ game.gameName }}</div>
									<span v-if="game.gameMetacritic" class="user-games__metacritic">{{ game.gameMetacritic
									}}</span>
									<div class="user-games__date">{{ dateRelease(game.gameDateRelease) }}</div>
								</div>
							</div>
						</RouterLink>
					</swiper-slide>
				</swiper>
			</div>
			<div v-if="gamesPlaying.length > 0" class="user-games__playing">
				<div class="user-games__head">
					<h1>Playing</h1>
					<div>
						<img src="../assets/ico/profile/gamepad.svg" alt="">
						<span>{{ gamesPlaying.length }}</span>
					</div>
					<button>See all</button>
				</div>
				<swiper :slides-per-view="3" :space-between="20" @swiper="onSwiper" @slideChange="onSlideChange"
					class="user-games__list">
					<swiper-slide v-for="(game, idx) in gamesPlaying" :key="idx" class="user-games__game">
						<RouterLink :to="{ name: routeNames.GamePage, params: { gameId: game.gameId } }">
							<div class="user-games__game-body">
								<div class="user-games__background">
									<img :src="game.gamePoster" alt="">
								</div>
								<div v-if="game.userRating != 'No'" class="user-games__rating"><span>{{ game.userRating }}</span></div>
								<div class="user-games__body">
									<div class="user-games__title">{{ game.gameName }}</div>
									<span v-if="game.gameMetacritic" class="user-games__metacritic">{{ game.gameMetacritic
									}}</span>
									<div class="user-games__date">{{ dateRelease(game.gameDateRelease) }}</div>
								</div>
							</div>
						</RouterLink>
					</swiper-slide>
				</swiper>
			</div>
			<div v-if="gamesBeaten.length > 0" class="user-games__beaten">
				<div class="user-games__head">
					<h1>Beaten</h1>
					<div>
						<img src="../assets/ico/profile/gamepad.svg" alt="">
						<span>{{ gamesBeaten.length }}</span>
					</div>
					<button>See all</button>
				</div>
				<swiper :slides-per-view="3" :space-between="20" @swiper="onSwiper" @slideChange="onSlideChange"
					class="user-games__list">
					<swiper-slide v-for="(game, idx) in gamesBeaten" :key="idx" class="user-games__game">
						<RouterLink :to="{ name: routeNames.GamePage, params: { gameId: game.gameId } }">
							<div class="user-games__game-body">
								<div class="user-games__background">
									<img :src="game.gamePoster" alt="">
								</div>
								<div v-if="game.userRating != 'No'" class="user-games__rating"><span>{{ game.userRating }}</span></div>
								<div class="user-games__body">
									<div class="user-games__title">{{ game.gameName }}</div>
									<span v-if="game.gameMetacritic" class="user-games__metacritic">{{ game.gameMetacritic
									}}</span>
									<div class="user-games__date">{{ dateRelease(game.gameDateRelease) }}</div>
								</div>
							</div>
						</RouterLink>
					</swiper-slide>
				</swiper>
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { collection, getDocs, } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { routeNames } from '../router/routeNames';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

type GameInfo = Array<{
	gameDocId: string,
	gameDateRelease: string,
	gameId: number,
	gameMetacritic: number | undefined,
	gameName: string,
	gamePoster: string | undefined,
	userRating: string
}>

const gamesWant = ref<GameInfo>([
])
const gamesPlaying = ref<GameInfo>([
])
const gamesBeaten = ref<GameInfo>([
])
const currentUserId = auth.currentUser?.uid
const loading = ref(true)
onMounted(async () => {
	try {
		if (currentUserId != null) {
			const want = await getDocs(collection(db, "users", currentUserId, "want"))
			want.forEach((doc) => {
				const game = {
					gameDocId: doc.id,
					gameDateRelease: doc.data().gameDateRelease,
					gameId: doc.data().gameId,
					gameMetacritic: doc.data().gameMetacritic,
					gameName: doc.data().gameName,
					gamePoster: doc.data().gamePoster,
					userRating: doc.data().userRating
				}
				gamesWant.value.unshift(game)
			})
			const playing = await getDocs(collection(db, "users", currentUserId, "playing"))
			playing.forEach((doc) => {
				const game = {
					gameDocId: doc.id,
					gameDateRelease: doc.data().gameDateRelease,
					gameId: doc.data().gameId,
					gameMetacritic: doc.data().gameMetacritic,
					gameName: doc.data().gameName,
					gamePoster: doc.data().gamePoster,
					userRating: doc.data().userRating
				}
				gamesPlaying.value.unshift(game)
			})
			const beaten = await getDocs(collection(db, "users", currentUserId, "beaten"))
			beaten.forEach((doc) => {
				const game = {
					gameDocId: doc.id,
					gameDateRelease: doc.data().gameDateRelease,
					gameId: doc.data().gameId,
					gameMetacritic: doc.data().gameMetacritic,
					gameName: doc.data().gameName,
					gamePoster: doc.data().gamePoster,
					userRating: doc.data().userRating
				}
				gamesBeaten.value.unshift(game)
			})
		}
	}
	finally {
		console.log(gamesWant.value.length, gamesPlaying.value.length, gamesBeaten.value.length);

		loading.value = false
	}
})

const onSwiper = (swiper: {}) => {
	console.log(swiper);
};

const onSlideChange = () => {
	console.log('slide change');
};

const dateRelease = (released: string) => {
    const arrDate = released.split("-")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 'Sep', "Oct", "Nov", "Dec"]
    const gameMonthDate = months[parseInt(arrDate[1].replace('0', "")) - 1]
    let gameDayDate
    if (arrDate[2] === '10' || arrDate[2] === '20' || arrDate[2] === '30') {
        gameDayDate = parseInt(arrDate[2])
    } else {
        gameDayDate = parseInt(arrDate[2].replace("0", ""))
    }
    const gameDateRelease = gameMonthDate + " " + gameDayDate + ", " + arrDate[0]
    return gameDateRelease
}


</script>
