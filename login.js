import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // For simplicity, use email as a key. Real implementation should use authentication methods.
    get(ref(database, 'users')).then((snapshot) => {
        const users = snapshot.val();
        let userFound = false;
        for (const userId in users) {
            if (users[userId].email === email && users[userId].password === password) {
                userFound = true;
                break;
            }
        }
        if (userFound) {
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid email or password.');
        }
    }).catch((error) => {
        console.error('Error reading from database:', error);
    });
});