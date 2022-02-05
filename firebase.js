import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCghWLMGS6UOdHbLiw7QIHm2A6YHwDPPL0",
    authDomain: "instagram-clone-9bbdd.firebaseapp.com",
    projectId: "instagram-clone-9bbdd",
    storageBucket: "instagram-clone-9bbdd.appspot.com",
    messagingSenderId: "89513554530",
    appId: "1:89513554530:web:29be8fc8a147412fe9573b"
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };