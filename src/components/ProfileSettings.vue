<template>
	<div class="profile-settings">
		<div class="profile-settings__avatar">
			<h1>Avatar</h1>
			<div class="profile-settings__avatar-body">
				<div class="profile-settings__img">
					<img :src="currentUser.photoUrl" alt="">
				</div>
				<input @change="changeAvatar" type="file" name="uploadFile" id="file">
				<label for="file" class="profile-settings__change">
					Change
				</label>

			</div>

		</div>
		<div class="profile-settings__names">
			<div class="profile-settings__input-box">
				<input placeholder="Name" type="text" name="name">
			</div>
			<div class="profile-settings__input-box">
				<input placeholder="Nickname" v-model="currentUser.displayName" type="text" name="nickname">
			</div>

		</div>
		<div class="profile-settings__bio">
			<textarea placeholder="Bio" name="" id="" cols="30" rows="10"></textarea>
		</div>
		<button class="profile-settings__save">Save changes</button>

	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { getDocs, collection } from 'firebase/firestore';
import { ref as storageRef, uploadString, getMetadata } from "firebase/storage"
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, storage } from '../firebase/config';

const currentUser = ref<{ displayName: string | null, photoUrl: string | undefined }>({
	displayName: "",
	photoUrl: ""
})
const userAvatar = ref()
const userAvatarFile = ref()

onAuthStateChanged(auth, (user) => {
	if (user) {
		currentUser.value.displayName = user.displayName
		if (user.photoURL != null) {
			currentUser.value.photoUrl = user.photoURL
		}
	}
})

function changeAvatar(e: Event) {
	if (e.target != null) {
		userAvatar.value = e.target.files
		let fileReader = new FileReader()
		fileReader.onload = function (event) {
			if (event.target != null) {
				userAvatarFile.value = event.target.result
			}
		}
		fileReader.readAsDataURL(userAvatar.value[0])
	}
}



watch(userAvatarFile, () => {
	onAuthStateChanged(auth, async (user) => {
		const uploadedAvatar = storageRef(storage, "userAvatar.jpg")
		uploadString(uploadedAvatar, userAvatarFile.value, "data_url").then((snapshot) => {
			console.log("hello");
		})
		if (user) {
			getMetadata(uploadedAvatar)
				.then(async (avatar) => {
					console.log(avatar);
					
					await updateProfile(user, {
						photoURL: avatar.fu
					})
				})
			await updateProfile(user, {
				photoURL: userAvatarFile.value

			})
		}
	})
})


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

 	}
 }
</style>