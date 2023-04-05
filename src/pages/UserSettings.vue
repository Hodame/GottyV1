<template>
	<div class="user-settings">
		<div class="user-settings__title">
			<h1>Settings</h1>
		</div>
		<div class="user-settings__tabs">
			<div :style="{ color: route.name === routeNames.ProfileSettings ? 'var(--lRed)' : ''}" class="user-settings__tab">
				<p>Profile</p>
			</div>
			<div :style="{ color: route.name === routeNames.EmailSettings ? 'var(--lRed)' : ''}" class="user-settings__tab">
				<p>My email</p>
			</div>
			<div :style="{ color: route.name === routeNames.PasswordSettings ? 'var(--lRed)' : ''}" class="user-settings__tab">
				<p>My passowrd</p>
			</div>
		</div>
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { routeNames } from "../router/routeNames";

const route = useRoute()
console.log(route.name);

</script>

<style scoped lang="scss">
.user-settings {
	max-width: 1200px;
	margin: 0 auto;
	width: 100%;

	&__title {
		margin-bottom: 20px;

		h1 {
			font-size: 44px;
			font-weight: 600;
		}
	}

	&__tabs {
		margin: 20px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
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