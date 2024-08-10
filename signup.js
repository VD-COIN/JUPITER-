import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC8sGSHAWIkG7Jq7DPXg7II1dgFCXZ4_TU",
    authDomain: "train-e7f95.firebaseapp.com",
    databaseURL: "https://shool-70ffb-default-rtdb.firebaseio.com/",
    projectId: "train-e7f95",
    storageBucket: "train-e7f95.appspot.com",
    messagingSenderId: "1052862647968",
    appId: "1:1052862647968:web:0d67b008281f1919ca43c5",
    measurementId: "G-925WN7STJZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const userId = Date.now(); // Simplistic ID generation
    
    set(ref(database, 'users/' + userId), {
        username: username,
        email: email,
        password: password
    }).then(() => {
        window.location.href = 'dashboard.html';
    }).catch((error) => {
        console.error('Error writing to database:', error);
    });
});