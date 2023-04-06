<template>
	<div class="user-page">
		<div class="user-page__info">
			<div class="user-page__avatar">
				<img v-show="userProflie.avatar" :src="userProflie.avatar" alt="">
			</div>
			<div class="user-page__id">@{{ userProflie.displayName }}</div>
		</div>
		<div class="user-page__tabs">
			<div :style="{ color: route.name === routeNames.UserGames ? 'var(--lRed)' : '' }" class="user-page__tab">Games
			</div>
			<div :style="{ color: route.name === routeNames.ProfileSettings ? 'var(--lRed)' : '' }" class="user-page__tab">
				Collection</div>
			<div :style="{ color: route.name === routeNames.ProfileSettings ? 'var(--lRed)' : '' }" class="user-page__tab">
				Reviews</div>
		</div>
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { routeNames } from '../router/routeNames';
import { useRoute } from 'vue-router';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

type User = {
	avatar: string,
	displayName: string,
	uid: string,
	userBio?: string,
	userName?: string,

}
const userProflie = ref<User>({
	avatar: "",
	displayName: "...",
	uid: ""
})
const route = useRoute()
const loadContent = async () => {
	try {
		const userQuery = query(collection(db, "users"), where("displayName", "==", route.params.userId))
		const results = await getDocs(userQuery)
		results.forEach((doc) => {
			const user = {
				avatar: doc.data().avatar,
				displayName: doc.data().displayName,
				userBio: doc.data().userBio,
				userName: doc.data().userName,
				uid: doc.data().uid
			}
			userProflie.value = user
		})

	}
	finally {
	}
}

onMounted(loadContent)

watch(() => route.params.userId, loadContent)

</script>

<style scoped lang="scss">
.user-page {
	max-width: 1200px;
	margin: 0 auto;
	width: 100%;

	&__info {
		display: flex;
		align-items: center;
	}

	&__id {
		font-size: 32px;
		margin-left: 15px;
		flex: 1 1;
	}

	&__avatar {
		background-color: var(--mBlack);
		border-radius: 50%;
		width: 100px;
		height: 100px;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__settings {
		span {
			cursor: pointer;
			padding: 10px 20px;
			background-color: var(--white);
			color: var(--black);
			border-radius: 3px;
		}
	}

	&__tabs {
		margin: 20px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__tab {
		font-size: 20px;
		font-weight: 500;
		width: 100%;
		text-align: center;
		position: relative;
		color: var(--white);
		padding: 20px 0;
		cursor: pointer;
		transition: 0.2s ease;

		&::after {
			content: "";
			height: 2px;
			background-color: var(--lRed);
			width: calc(100% - 20px);
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}

		&:hover {
			color: var(--lRed);
		}
	}
}
</style>