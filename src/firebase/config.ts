import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDBczS9VRF9Upg-qWZqMfVFbTvi-Iaw8RU",
    authDomain: "gotty-your-games-collection.firebaseapp.com",
    projectId: "gotty-your-games-collection",
    storageBucket: "gotty-your-games-collection.appspot.com",
    messagingSenderId: "154341797924",
    appId: "1:154341797924:web:628bddbe47c518996828b1",
    measurementId: "G-H5MRR490E2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {
    auth,
    db
}