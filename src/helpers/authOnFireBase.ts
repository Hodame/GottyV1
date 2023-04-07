import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config"
import { ref } from "vue"

type CurrentUser = {
	uid: string ,
	photoURL: string | null,
	displayName: string | null,
	email: string | null,
	phoneNumber: string | null,
}

function userAuth() {
	const currentUser = ref<CurrentUser>({
		uid: "",
		photoURL: "",
		displayName: "",
		email: "",
		phoneNumber: "",
	})
	onAuthStateChanged(auth, (user) => {
		if (user) {
			const userRef = {
				uid: user.uid,
				photoURL: user.photoURL,
				displayName: user.displayName,
				email: user.email,
				phoneNumber: user.phoneNumber,
			}
			currentUser.value = userRef
		}
	})
	const get = () => currentUser.value
	return () => ({ get })
}

export const getCurrentUserData = userAuth()