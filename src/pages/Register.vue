<template>
    <div class="auth">
        <div class="auth__body">
            <div class="auth__wrapper">
                <div class="auth__logo">
                    <img src="../assets/ico/navigation/mainLogo.svg" alt="">
                    <span>Gotty</span>
                </div>
                <div class="auth__title">
                    <h1>Register</h1>
                </div>
                <form class="auth__form">
                    <div class="auth__input-box">
                        <input v-model="userName" placeholder="Username" type="text" name="username" id="userName">
                    </div>
                    <div class="auth__input-box">
                        <input v-model="email" placeholder="Email" type="email" name="email" id="email">
                    </div>
                    <div class="auth__input-box">
                        <input v-model="password" placeholder="password" type="password" name="password" id="password">
                    </div>
                    <div class="auth__input-box">
                        <button @click="register" type="button">Register</button>
                    </div>
                </form>
                <div class="auth__buttons">
                    <RouterLink :to="{ name: routeNames.Login }">
                        <div class="auth__password">
                            <p>Go back</p>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="auth__decor"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { routeNames } from '../router/routeNames';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc} from "firebase/firestore"
import { auth, db } from '../firebase/config';
import router from '../router/router';

const email = ref("")
const password = ref("")
const userName = ref("")
const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((user) => {
            onAuthStateChanged(auth, (userLogged) => {
                if (userLogged) {
                    updateProfile(userLogged, {
                        displayName: userName.value,
                        photoURL: "https://cdn-icons-png.flaticon.com/512/10264/10264490.png"
                    }).then(() => {router.replace({ path: "/" })})
                    
                } else {
                    console.log("error");
                }
            })
            const u = setDoc(doc(db, "users", user.user.uid), {
                email: user.user.email,
                displayName: userName.value,
                avatar: "https://cdn-icons-png.flaticon.com/512/10264/10264490.png",
                uid: user.user.uid,
            })
        })
        .catch((error) => {
            console.log('Error', error);
            alert(error)
        })
}
</script>