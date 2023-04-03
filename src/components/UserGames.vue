<template>
	<div v-if="!loading" class="user-games">
		<div v-if="gamesWant.length > 0" class="user-games__want">
			<div class="user-games__head">
				<h1>Want</h1>
				<div>
					<img src="../assets/ico/profile/gamepad.svg" alt="">
					<span>{{ gamesWant.length }}</span>
				</div>
				<button>See all</button>
			</div>
			<ul class="user-games__list">
				<li v-for="(game, idx) in gamesWant" :key="idx" class="user-games__game">
					<RouterLink :to="{ name: routeNames.GamePage, params: { gameId: game.gameId } }">
						<div class="user-games__game-body">
							<div class="user-games__background">
								<img :src="game.gamePoster" alt="">
							</div>
							<div class="user-games__body">
								<button @click.prevent="deleteGameFromCollection(game.gameDocId, 'want')"
									class="user-games__delete">delete</button>
								<div class="user-games__title">{{ game.gameName }}</div>
								<span class="user-games__metacritic">{{ game.gameMetacritic }}</span>
								<div class="user-games__date">{{ dateRelease(game.gameDateRelease) }}</div>
							</div>
						</div>
					</RouterLink>
				</li>
			</ul>
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
			<ul class="user-games__list">
				<li v-for="(game, idx) in gamesPlaying" :key="idx" class="user-games__game">
					<RouterLink :to="{ name: routeNames.GamePage, params: { gameId: game.gameId } }">
						<div class="user-games__game-body">
							<div class="user-games__background">
								<img :src="game.gamePoster" alt="">
							</div>
							<div class="user-games__body">
								<div class="user-games__title">{{ game.gameName }}</div>
								<span class="user-games__metacritic">{{ game.gameMetacritic }}</span>
								<div class="user-games__date">{{ dateRelease(game.gameDateRelease) }}</div>
							</div>
						</div>
					</RouterLink>
				</li>
			</ul>
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
			<ul class="user-games__list">
				<li v-for="(game, idx) in gamesBeaten" :key="idx" class="user-games__game">
					<RouterLink :to="{ name: routeNames.GamePage, params: { gameId: game.gameId } }">
						<div class="user-games__game-body">
							<div class="user-games__background">
								<img :src="game.gamePoster" alt="">
							</div>
							<div class="user-games__body">
								<div class="user-games__title">{{ game.gameName }}</div>
								<span class="user-games__metacritic">{{ game.gameMetacritic }}</span>
								<div class="user-games__date">{{ dateRelease(game.gameDateRelease) }}</div>
							</div>
						</div>
					</RouterLink>
				</li>
			</ul>
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
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { routeNames } from '../router/routeNames';

type GameInfo = Array<{
	gameDocId: string,
	gameDateRelease: string,
	gameId: number,
	gameMetacritic: number | undefined,
	gameName: string,
	gamePoster: string | undefined,
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
				}
				gamesBeaten.value.unshift(game)
			})
		}
	}
	finally {
		loading.value = false
	}
})

const deleteGameFromCollection = async (id: string, collection: string) => {
	if (currentUserId != null) {
		await deleteDoc(doc(db, "users", currentUserId, collection, id))
	}
}

const dateRelease = (released: string) => {
	const arrDate = released.split("-")
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 'Sep', "Oct", "Nov", "Dec"]
	const gameMonthDate = months[parseInt(arrDate[1].replace('0', "")) - 1]
	const gameDayDate = parseInt(arrDate[2].replace("0", ""))
	const gameDateRelease = gameMonthDate + " " + gameDayDate + ", " + arrDate[0]
	return gameDateRelease
}

</script>
