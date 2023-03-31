<template>
	<div class="user-games">
		<div class="user-games__want">
			<div class="user-games__head">
				<h1>Want</h1>
				<div>
					<img src="../assets/ico/profile/gamepad.svg" alt="">
					<span>34</span>
				</div>
				<button>See all</button>
			</div>
			<ul class="user-games__list">
				<li class="user-games__game">
					<div class="user-games__background">
						<img src="https://media.rawg.io/media/games/044/044b2ee023930ca138deda151f40c18c.jpg" alt="">
					</div>
					<div class="user-games__body">
						<div class="user-games__title">Hogwarts legacy</div>
						<span class="user-games__metacritic">85</span>
						<div class="user-games__date">Feb 10, 2023</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="user-games__playing">
			<div class="user-games__head">
				<h1>Playing</h1>
				<div>
					<img src="../assets/ico/profile/gamepad.svg" alt="">
					<span>34</span>
				</div>
				<button>See all</button>
			</div>
			<ul class="user-games__list">
				<li class="user-games__game">
					<div class="user-games__background">
						<img src="https://media.rawg.io/media/games/044/044b2ee023930ca138deda151f40c18c.jpg" alt="">
					</div>
					<div class="user-games__body">
						<div class="user-games__title">Hogwarts legacy</div>
						<span class="user-games__metacritic">85</span>
						<div class="user-games__date">Feb 10, 2023</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="user-games__beaten">
			<div class="user-games__head">
				<h1>Beaten</h1>
				<div>
					<img src="../assets/ico/profile/gamepad.svg" alt="">
					<span>34</span>
				</div>
				<button>See all</button>
			</div>
			<ul class="user-games__list">
				<li class="user-games__game">
					<div class="user-games__background">
						<img src="https://media.rawg.io/media/games/044/044b2ee023930ca138deda151f40c18c.jpg" alt="">
					</div>
					<div class="user-games__body">
						<div class="user-games__title">Hogwarts legacy</div>
						<span class="user-games__metacritic">85</span>
						<div class="user-games__date">Feb 10, 2023</div>
					</div>
				</li>
			</ul>
		</div>

	</div>
</template>

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

	&__background {
		position: absolute;
		z-index: 1;
		transition: 0.4s ease;

		img {
			width: 100%;
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