import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import Twilio from 'twilio';

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

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get('id');

    if (groupId) {
        // Load Group Info
        get(ref(database, 'groups/' + groupId)).then((snapshot) => {
            const group = snapshot.val();
            document.getElementById('groupInfo').innerHTML = `<h2>${group.name}</h2>`;
        }).catch((error) => {
            console.error('Error loading group info:', error);
        });

        // Send Message
        document.getElementById('sendMessage').addEventListener('click', () => {
            const message = document.getElementById('messageInput').value;
            if (message) {
                set(ref(database, 'groups/' + groupId + '/messages/' + Date.now()), {
                    content: message,
                    timestamp: new Date().toISOString()
                }).then(() => {
                    document.getElementById('messageInput').value = '';
                    loadMessages();
                }).catch((error) => {
                    console.error('Error sending message:', error);
                });
            }
        });

        // Load Messages
        function loadMessages() {
            get(ref(database, 'groups/' + groupId + '/messages')).then((snapshot) => {
                const messages = snapshot.val();
                const messagesDiv = document.getElementById('messages');
                messagesDiv.innerHTML = ''; // Clear existing messages
                for (const messageId in messages) {
                    const message = messages[messageId];
                    const p = document.createElement('p');
                    p.textContent = message.content;
                    messagesDiv.appendChild(p);
                }
            }).catch((error) => {
                console.error('Error loading messages:', error);
            });
        }
        
        loadMessages();
    }
});