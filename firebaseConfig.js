// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPKirUPuDtGBggXGsy_3anFxIaDQslGSI",
    authDomain: "ansh-books.firebaseapp.com",
    projectId: "ansh-books",
    storageBucket: "ansh-books.appspot.com",
    messagingSenderId: "185895248517",
    appId: "1:185895248517:web:c805948e973eb595a67fec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
