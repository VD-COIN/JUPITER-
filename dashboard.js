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
    // Load notifications
    const notificationsDiv = document.getElementById('notifications');
    // Example for adding notifications - customize this based on your needs
    const notifications = [
        "Welcome to JUPITER!",
        "You have 3 new messages."
    ];
    notifications.forEach(notification => {
        const p = document.createElement('p');
        p.textContent = notification;
        notificationsDiv.appendChild(p);
    });

    // Create Group
    document.getElementById('createGroup').addEventListener('click', () => {
        const groupName = prompt('Enter the group name:');
        if (groupName) {
            const groupId = Date.now(); // Simplistic ID generation
            set(ref(database, 'groups/' + groupId), {
                name: groupName,
                members: []
            }).then(() => {
                alert('Group created successfully!');
                // Refresh the group list
                loadGroups();
            }).catch((error) => {
                console.error('Error creating group:', error);
            });
        }
    });

    // Load Groups
    function loadGroups() {
        get(ref(database, 'groups')).then((snapshot) => {
            const groups = snapshot.val();
            const groupListDiv = document.getElementById('groupList');
            groupListDiv.innerHTML = ''; // Clear existing list
            for (const groupId in groups) {
                const group = groups[groupId];
                const div = document.createElement('div');
                div.classList.add('group');
                div.innerHTML = `<h3>${group.name}</h3><a href="group.html?id=${groupId}" class="btn">View Group</a>`;
                groupListDiv.appendChild(div);
            }
        }).catch((error) => {
            console.error('Error loading groups:', error);
        });
    }
    
    loadGroups();
});