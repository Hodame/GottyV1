<template>
	<div class="user-page">
		<div class="user-page__info">
			<div class="user-page__avatar">
				<img :src="avatar.get()" alt="">
			</div>
			<div class="user-page__id">@{{ currentUser.displayName }}</div>
			<RouterLink :to="{ name: routeNames.Settings }">
				<div class="user-page__settings">
					<span>Settings</span>
				</div>
			</RouterLink>
		</div>
		<div class="user-page__tabs">
			<RouterLink :to="{ name: routeNames.ProfileGames }">
				<div :style="{ color: route.name === routeNames.ProfileGames ? 'var(--lRed)' : '' }" class="user-page__tab">Games
				</div>
			</RouterLink>
			<RouterLink :to="{ name: routeNames.ProfileCollections}">
				<div :style="{ color: route.name === routeNames.ProfileCollections ? 'var(--lRed)' : '' }"
					class="user-page__tab">Collection</div>
			</RouterLink>
			<div :style="{ color: route.name === routeNames.ProfileSettings ? 'var(--lRed)' : '' }" class="user-page__tab">
				Reviews</div>
		</div>
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { ref } from 'vue';
import { routeNames } from '../router/routeNames';
import { useAvatar } from '../assets/utils';
import { useRoute } from 'vue-router';
type CurrentUser = {
	displayName: string | null,
	photoURL: string | undefined
}

const avatar = useAvatar()
const route = useRoute()
const logged = ref(false)
const currentUser = ref<CurrentUser>({
	displayName: "",
	photoURL: "",
})
onAuthStateChanged(auth, (user) => {
	if (user) {
		currentUser.value.displayName = user.displayName
		if (user.photoURL != null) {
			avatar.set(user.photoURL)
		}
		logged.value = true
	} else {
		console.log("error");
		logged.value = false
	}
})
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
		img {
			border-radius: 50%;
			overflow: hidden;
			width: 100px;
			height: 100px;
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
		a {
			width: 100%;
		}
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
}</style>