<template>
	<div class="collections">
		<h1>Collections</h1>
		<div class="collections__create">
			<h2>Create a new collection</h2>
			<div class="collections__inputs">
				<div class="collections__input-box">
					<input v-model="nameCollection" placeholder="Name (required)" type="text" name="create" id="create">
				</div>
				<div class="collections__input-box">
					<input v-model="descriptionCollection" placeholder="Description" type="text" name="create" id="create">
				</div>
			</div>
			<div class="collections__costomize">
				<div class="collections__bg-div">
					<h2>Select color</h2>
					<ul class="collections__choose-bg">
						<li @click="selectedColor == color ? selectedColor = { color: '', id: '' } : selectedColor = color"
							v-for="(color, idx) in colors" :class="{ selected: selectedColor.id == color.id }" :key="idx">
							<div>
								<span :style="{ backgroundColor: color.color }"></span>
							</div>
						</li>
					</ul>
				</div>
				<div class="collections__upload-img">
					<h2>Select background image</h2>
					<input @change="uploadedImg" type="file" name="bg" id="bg">
					<label for="bg">
						<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 512 512">
							<path :fill="'var(--lRed)'"
								d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
						</svg>
					</label>
				</div>
			</div>
			<button @click="addCollection">Create collection</button>
		</div>

		<ul class="collections__items">
			<li @click="openCollection(collection.collectionName)" v-for="(collection, idx) in userCollections" :key="idx"
				class="collections__item">
				<div :style="{ background: collection.collectionColor.color }" class="collections__background">
					<img v-if="collection.backgroundIMG" :src="collection.backgroundIMG" alt="">
				</div>
				<div class="collections__info">
					<div class="collections__name">{{ collection.collectionName }}</div>
					<div class="collections__description"><span>{{ collection.collectionDescription }}</span></div>
					<div class="collections__games-count"><img src="../assets/ico/profile/gamepad.svg"
							alt=""><span>10</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { db, storage } from '../firebase/config';
import { ref as refStorage, uploadString, getDownloadURL } from 'firebase/storage';
import { getCurrentUserData } from "../helpers/"
import router from '../router/router';
import { routeNames } from '../router/routeNames';

type UserCollections = Array<{
	collectionName: string,
	collectionDescription: string,
	collectionColor: {
		color: string,
		id: string
	},
	backgroundIMG: string | null,
	postLifeTime: number,
}>

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
const selectedColor = ref({
	id: "",
	color: ""
})
const nameCollection = ref("")
const descriptionCollection = ref("")
const collectionIMG = ref("")
const currentUser = getCurrentUserData()
const userCollections = ref<UserCollections>([
	{
		collectionName: "",
		collectionDescription: "",
		collectionColor: {
			color: "",
			id: ''
		},
		backgroundIMG: "",
		postLifeTime: 0,
	}
])

const uploadedImg = (e: Event) => {
	const image = (<HTMLInputElement>e.target).files
	let fileReader = new FileReader()

	fileReader.onload = function (event) {
		if (typeof event.target?.result === "string") {
			collectionIMG.value = event.target.result
		}
	}
	if (image != null) {
		fileReader.readAsDataURL(image[0])
	}
}

const uploadToFirebase = (ref: any) => uploadString(ref, collectionIMG.value, 'data_url')

const getCollections = () => {
	onSnapshot(collection(db, 'users', currentUser.get().uid, 'collections'), (collections) => {
		const results = <UserCollections>[]
		collections.forEach((doc) => {
			const result = {
				collectionName: doc.data().collectionName,
				collectionDescription: doc.data().collectionDescription,
				collectionColor: doc.data().collectionColor,
				backgroundIMG: doc.data().backgroundIMG,
				postLifeTime: doc.data().postLifeTime,
			}
			results.push(result)
		})
		userCollections.value = results.sort((collection, collection2) => collection2.postLifeTime - collection.postLifeTime)
	})
}

const addCollection = async () => {
	if (currentUser.get().uid != null) {
		if (typeof userCollections.value.find(obj => obj.collectionName == nameCollection.value) == "undefined") {
			if (nameCollection.value != "") {
				if (selectedColor.value.color != '' || collectionIMG.value != "") {
					const userUid = currentUser.get().uid
					const userCollectionImgRef = refStorage(storage, 'usersCollectionsBackgroundImages/' + currentUser.get().displayName + nameCollection.value + 'UserCollectionImgBg.jpg')
					if (collectionIMG.value != "") {
						await uploadToFirebase(userCollectionImgRef)
							.then(async () => {
								let image = await getDownloadURL(userCollectionImgRef)
								await addDoc(collection(db, "users", userUid, "collections"), {
									collectionName: nameCollection.value,
									collectionDescription: descriptionCollection.value,
									collectionColor: selectedColor.value,
									backgroundIMG: image,
									postLifeTime: new Date().getTime(),
								})
									.then(async (docRef) => {
										await updateDoc(doc(db, "users", currentUser.get().uid, "collections", docRef.id), {
											collectionUid: docRef.id
										})
										selectedColor.value = {
											id: "",
											color: ""
										}
										nameCollection.value = ""
										descriptionCollection.value = ""
										collectionIMG.value = ""
									})
							})
					} else {
						await addDoc(collection(db, "users", userUid, "collections"), {
							collectionName: nameCollection.value,
							collectionDescription: descriptionCollection.value,
							collectionColor: selectedColor.value,
							backgroundIMG: "",
							postLifeTime: new Date().getTime(),
						})
							.then(async (docRef) => {
								await updateDoc(doc(db, "users", currentUser.get().uid, "collections", docRef.id), {
									collectionUid: docRef.id
								})
								selectedColor.value = {
									id: "",
									color: ""
								}
								nameCollection.value = ""
								descriptionCollection.value = ""
								collectionIMG.value = ""
							})
					}
				} else {
					alert('choose color or image')
				}
				collectionIMG.value = ""
			} else {
				alert('please select name')
			}
		}
		else {
			alert("this collection name alredy exists")
		}
	}
}

const openCollection = (name: string) => {
	router.push({ name: routeNames.ProfileCollection, params: { collectionName: name } })
}

onMounted(getCollections)

</script>