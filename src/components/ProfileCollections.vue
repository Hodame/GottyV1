<template>
	<div class="collections">
		<h1>Collections</h1>
		<ul class="collections__items">
			<li class="collections__item">
				<!-- backgraund gradient -->
				<div :style=" { background: 'var(--lRed)'}" class="collections__background">
				</div>
				<div class="collections__info">
					<div class="collections__name">YouTube</div>
					<div class="collections__description">Games that i watched on YouTube</div>
					<div class="collections__games-count">10</div>
				</div>
			</li>
			<li class="collections__item">
				<div :style=" { background: 'var(--mRed)'}" class="collections__background">
				</div>
				<div class="collections__info">
					<div class="collections__name">YouTube</div>
					<div class="collections__description">Games that i watched on YouTube</div>
					<div class="collections__games-count">10</div>
				</div>
			</li>
		</ul>
	</div>
</template>