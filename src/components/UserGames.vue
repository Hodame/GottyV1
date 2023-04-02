<template>
	<div class="user-games">
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
					<RouterLink :to="{ name: routeNames.GamePage, params: { gameId:  game.gameId} }">
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
					<RouterLink :to="{ name: routeNames.GamePage, params: { gameId:  game.gameId} }">
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
					<RouterLink :to="{ name: routeNames.GamePage, params: { gameId:  game.gameId} }">
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { routeNames } from '../router/routeNames';

type GameInfo = Array<{
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

onMounted(async () => {
	try {
		if (currentUserId != null) {
			const want = await getDocs(collection(db, "users", currentUserId, "want"))
			want.forEach((doc) => {
				const game = {
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
	}
})

const dateRelease = (released: string) => {
    const date = released
    const arrDate = date.split("-")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 'Sep', "Oct", "Nov", "Dec"]
    const gameMonthDate = months[parseInt(arrDate[1].replace('0', "")) - 1]
    const gameDayDate = parseInt(arrDate[2].replace("0", ""))
    const gameDateRelease = gameMonthDate + " " + gameDayDate + ", " + arrDate[0]
    return gameDateRelease
}

</script>

<style scoped lang="scss">
.user-games {
	margin-top: 40px;

	li {
		cursor: pointer;
		list-style-type: none;
		width: 400px;
		border-radius: 20px;
		overflow: hidden;
		aspect-ratio: 16 / 9;
	}

	&__head {
		margin: 10px 0;
		display: flex;
		justify-content: space-between;

		h1 {
			font-size: 25px;
			font-weight: 800;
		}

		div {
			margin-left: 10px;
			flex: 1 1;
			display: flex;
			align-items: center;
		}

		img {
			width: 20px;
			margin-right: 5px;
		}

		span {
			font-size: 14px;
			font-weight: 300;
		}

		button {
			background-color: transparent;
			padding: 3px 5px;
			border-radius: 10px;
			color: var(--white);
			transition: 0.2s ease;

			&:hover {
				color: var(--lRed);
			}
		}
	}

	&__list {
		overflow: auto;
		display: flex;
		gap: 20px;
	}

	&__game {
		position: relative;

		&:hover {
			.user-games__background {
				filter: blur(2px);
			}

			.user-games__body {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}

	&__game-body {
		height: 100%;
		color: var(--white);
	}

	&__background {
		height: 100%;
		position: absolute;
		z-index: 1;
		transition: 0.4s ease;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__body {
		transition: 0.4s ease;
		opacity: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 100;
		padding: 0 0 30px 20px;
		transform: translateY(50%);
		background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(91, 91, 91, 0) 100%);
	}

	&__title {
		font-size: 24px;
		font-weight: 700;
	}

	&__metacritic {
		margin: 10px 0;
		font-size: 14px;
		padding: 1px 5px;
		border: 2px solid green;
		color: green;
		border-radius: 5px;
		width: 31px;
	}
}
</style>