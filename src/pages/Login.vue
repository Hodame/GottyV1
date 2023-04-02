<template>
    <div class="auth">
        <div class="auth__body">
            <div class="auth__wrapper">
                <div class="auth__logo">
                    <img src="../assets/ico/navigation/mainLogo.svg" alt="">
                    <span>Gotty</span>
                </div>
                <div class="auth__title">
                    <h1>Login</h1>
                </div>
                <form class="auth__form">
                    <div class="auth__input-box">
                        <input v-model="email" placeholder="Email" type="email" name="email">
                    </div>
                    <div class="auth__input-box">
                        <input v-model="password" placeholder="Password" type="password" name="password">
                    </div>
                    <div class="auth__input-box">
                        <button @click="login" type="button">Login</button>
                    </div>
                </form>
                <div class="auth__buttons">
                    <div class="auth__password">
                        <p>Forgot password?</p>
                    </div>
                    <RouterLink :to="{ name: routeNames.Register }">
                        <div class="auth__register">
                            <p>Register</p>
                        </div>
                    </RouterLink>
                </div>
                
            </div>
        </div>
        <div class="auth__decor"></div>
        <div class="auth__notification"></div>
        
    </div>
</template>

<script setup lang="ts">
import { routeNames } from '../router/routeNames';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/config"
import { ref } from 'vue';
import router from '../router/router';
const email = ref("")
const password = ref("")
const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((user) => {
            router.replace({ path: "/"})
        })
        .catch((error) => {
            console.log("Error", error);
            alert(error)
        })
}
</script>

<style scoped lang="scss"></style>