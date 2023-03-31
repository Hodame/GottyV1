<template>
	<div class="user-page">
		<div class="user-page__info">
			<div class="user-page__id">@hodame</div>
			<div class="user-page__avatar">
				<img src="https://cdn-icons-png.flaticon.com/512/727/727399.png" alt="">
			</div>
			<div class="user-page__settings">
				<span>Settings</span>
			</div>
		</div>
		<div class="user-page__tabs">
			<div class="user-page__tab">Games</div>
			<div class="user-page__tab">Collection</div>
			<div class="user-page__tab">Reviews</div>
		</div>
		<RouterView />
	</div>
</template>

<script setup lang="ts">

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
		margin-right: 10px;
	}

	&__avatar {
		flex: 1 1;

		img {
			width: 50px;
			height: 50px;
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