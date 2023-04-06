<template>
	<div class="profile-settings">
		<div class="profile-settings__avatar">
			<h1>Avatar</h1>
			<div class="profile-settings__avatar-body">
				<div class="profile-settings__img">
					<img :src="avatar.get()" alt="">
				</div>
				<input @change="changeAvatar" type="file" name="uploadFile" id="file">
				<label for="file" class="profile-settings__change">
					Change
				</label>

			</div>

		</div>
		<div class="profile-settings__names">
			<div class="profile-settings__input-box">
				<input placeholder="Name" v-model="userNameField" type="text" name="name">
			</div>
			<div class="profile-settings__input-box">
				<input placeholder="Nickname" v-model="currentUser.displayName" type="text" name="nickname">
			</div>

		</div>
		<div class="profile-settings__bio">
			<textarea v-model="userBioField" placeholder="Bio" name="" id="" cols="30" rows="10"></textarea>
		</div>
		<button @click="saveChanges" :class="{ loading: loadingBtn }" class="profile-settings__save">{{ loadingBtn
			? '' : 'Save changes' }}
			<svg v-show="loadingBtn" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 50 50"
				style="enable-background:new 0 0 50 50;" xml:space="preserve">
				<path fill="#fff"
					d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
					<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25"
						to="360 25 25" dur="0.6s" repeatCount="indefinite" />
				</path>
			</svg></button>

	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ref as storageRef, uploadString, getDownloadURL } from "firebase/storage"
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { auth, storage, db } from '../firebase/config';
import { useAvatar } from '../assets/utils';

const avatar = useAvatar()

const currentUser = ref<{ displayName: string | null, photoUrl: string | undefined, uid: string }>({
	displayName: "",
	photoUrl: "",
	uid: ""
})
const userAvatar = ref()
const userAvatarFile = ref()
const userNameField = ref('...')
const userBioField = ref('...')
const loadingBtn = ref(false)

onAuthStateChanged(auth, async (user) => {
	if (user) {
		currentUser.value.displayName = user.displayName
		if (user.photoURL != null) {
			currentUser.value.uid = user.uid
			avatar.set(user.photoURL)
			const userDoc = await getDoc(doc(db, "users", currentUser.value.uid))
			userNameField.value = userDoc?.data()?.userName
			userBioField.value = userDoc?.data()?.userBio

		}
	}
})

watch(userAvatarFile, () => {
	onAuthStateChanged(auth, async (user) => {
		const uploadedAvatar = storageRef(storage, currentUser.value.displayName + "UserAvatar.jpg")
		uploadString(uploadedAvatar, userAvatarFile.value, "data_url")
		if (user) {
			getDownloadURL(uploadedAvatar)
				.then(async (newAvatar) => {
					await updateProfile(user, {
						photoURL: newAvatar
					})
					await updateDoc(doc(db, "users", currentUser.value.uid), {
						avatar: newAvatar
					})
						.then(() => avatar.set(newAvatar))
				})
		}
	})
})

function changeAvatar(e: Event) {
	if (e.target != null) {
		userAvatar.value = (<HTMLInputElement>e.target).files
		let fileReader = new FileReader()
		fileReader.onload = function (event) {
			if (event.target != null) {
				userAvatarFile.value = event.target.result
			}
		}
		fileReader.readAsDataURL(userAvatar.value[0])
	}
}

async function saveChanges() {
	try {
		loadingBtn.value = true
		await updateDoc(doc(db, "users", currentUser.value.uid), {
			userName: userNameField.value,
			userBio: userBioField.value
		})
	}
	catch {

	}
	finally {
		loadingBtn.value = true
		setTimeout(() => {
			loadingBtn.value = false
		}, 500);
	}

}
</script>

<style scoped lang="scss"> .profile-settings {

 	&__avatar {
 		h1 {
 			margin-bottom: 20px;
 			font-size: 14px;
 		}
 	}

 	&__avatar-body {
 		display: flex;
 		align-items: center;
 		margin-bottom: 20px;

 		input {
 			width: 0;
 			height: 0;
 		}
 	}

 	&__img {
 		width: 100px;
 		height: 100px;
 		border-radius: 50%;
 		overflow: hidden;

 		img {
 			object-fit: cover;
 			width: 100%;
 			height: 100%;
 		}
 	}

 	&__change {
 		cursor: pointer;
 		margin-left: 15px;
 		color: var(--white);
 		transition: 0.2s ease;
 		position: relative;
 		font-size: 30px;

 		&::after {
 			content: "";
 			width: 100%;
 			height: 2px;
 			top: 100%;
 			position: absolute;
 			background-color: var(--white);
 			left: 0;
 			transition: 0.2s ease;
 			cursor: default;
 		}

 		&:hover {
 			color: var(--lRed);

 			&::after {
 				background-color: var(--lRed);
 			}
 		}
 	}

 	&__names {
 		display: flex;
 		gap: 20px;
 	}

 	&__input-box {
 		flex: 0 0 calc(50% - 10px);
 		background-color: var(--mBlack);
 		border-radius: 5px;

 		input {
 			color: var(--white);
 			padding: 15px 20px;
 			font-size: 18px;
 			width: 100%;
 			background-color: transparent;
 		}
 	}

 	&__bio {
 		margin-top: 20px;
 		background-color: var(--mBlack);
 		border-radius: 5px;

 		textarea {
 			color: var(--white);
 			padding: 15px 20px;
 			font-size: 18px;
 			background-color: transparent;
 			width: 100%;
 			resize: none;
 		}
 	}

 	&__save {
 		margin-top: 20px;
 		cursor: pointer;
 		padding: 10px 20px;
 		font-size: 16px;
 		font-weight: 500;
 		border-radius: 5px;
		background-color: var(--white);
		color: var(--black);
		transition: 0.5s ease background-color;
 		&.loading {
 			display: flex;
 			align-items: center;
 			justify-content: center;
 			background-color: rgb(39, 148, 39);
 			color: var(--white);
 			width: 146.7px;
 			height: 40px;
 			padding: 0;
 		}
 	}
 }
</style>