<template>
	<div class="collections">
		<h1>Collections</h1>
		<div class="collections__create">
			<h2>Create a new collection</h2>
			<div class="collections__inputs">
				<div class="collections__input-box">
					<input placeholder="Name" type="text" name="create" id="create">
				</div>
				<div class="collections__input-box">
					<input placeholder="Description" type="text" name="create" id="create">
				</div>
			</div>
			<div class="collections__costomize">
				<ul class="collections__choose-bg">
					<li @click="selectedColor = color.id" v-for="(color, idx) in colors"
						:class="{ selected: selectedColor == color.id }" :key="idx">
						<div>
							<span :style="{ backgroundColor: color.color }"></span>
						</div>
					</li>
				</ul>
				<div class="collections__upload-img">
					<input type="file" name="bg" id="bg">
					<label for="bg">
						<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 512 512">
							<path :fill="'var(--lRed)'"
								d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
						</svg>
					</label>
				</div>
			</div>

			<button>Create collection</button>
		</div>

		<ul class="collections__items">
			<li class="collections__item">
				<!-- backgraund gradient -->
				<div :style="{ background: 'var(--lRed)' }" class="collections__background">
				</div>
				<div class="collections__info">
					<div class="collections__name">YouTube</div>
					<div class="collections__description">Games that i watched on YouTube</div>
					<div class="collections__games-count">10</div>
				</div>
			</li>
			<li class="collections__item">
				<div :style="{ background: 'var(--mRed)' }" class="collections__background">
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

<script setup lang="ts">
import { ref } from 'vue';


const colors = ref([
	{
		color: '#ffbe0b',
		id: "0"
	},
	{
		color: '#fb5607',
		id: "1"
	},
	{
		color: '#ff006e',
		id: "2"
	},
	{
		color: '#8338ec',
		id: "3"
	},
	{
		color: '#3a86ff',
		id: "4"
	},
])
const selectedColor = ref("")
</script>