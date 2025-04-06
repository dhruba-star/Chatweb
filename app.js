// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMRHrK2K7PkHd01fDruR4UqlXtv0fbs_g",
  authDomain: "chatweb-2afa3.firebaseapp.com",
  databaseURL: "https://chatweb-2afa3-default-rtdb.firebaseio.com/",
  projectId: "chatweb-2afa3",
  storageBucket: "chatweb-2afa3.firebasestorage.app",
  messagingSenderId: "161768363447",
  appId: "1:161768363447:web:20c89a89d105c04c41c432",
  measurementId: "G-9DV4FHVP0P"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

// DOM Elements
const roomInput = document.getElementById('roomCode');
const joinButton = document.getElementById('joinRoom');
const sendButton = document.getElementById('sendMessage');
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messages');

// Variables
let roomCode = "";
let currentRoomRef;

// Create a new room (generate a unique code)
function createRoom() {
  const code = Math.random().toString(36).substr(2, 8); // Random 8-character string
  roomCode = code;
  roomInput.value = roomCode; // Display the generated room code in the input field
  currentRoomRef = firebase.database().ref('rooms/' + roomCode + '/messages');

  // Set room in the database
  firebase.database().ref('rooms/' + roomCode).set({
    code: roomCode,
  });

  // Listen for incoming messages
  currentRoomRef.on('value', (snapshot) => {
    messagesContainer.innerHTML = ''; // Clear existing messages
    const messages = snapshot.val();
    if (messages) {
      Object.values(messages).forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<span class="sender">${message.sender}</span>: <span class="text">${message.text}</span>`;
        messagesContainer.appendChild(messageElement);
      });
    }
  });
}

// Join a room by its code
joinButton.addEventListener('click', () => {
  roomCode = roomInput.value;
  currentRoomRef = firebase.database().ref('rooms/' + roomCode + '/messages');

  // Check if the room exists
  const roomRef = firebase.database().ref('rooms/' + roomCode);
  roomRef.once('value').then((snapshot) => {
    if (snapshot.exists()) {
      // Listen for incoming messages
      currentRoomRef.on('value', (snapshot) => {
        messagesContainer.innerHTML = ''; // Clear existing messages
        const messages = snapshot.val();
        if (messages) {
          Object.values(messages).forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `<span class="sender">${message.sender}</span>: <span class="text">${message.text}</span>`;
            messagesContainer.appendChild(messageElement);
          });
        }
      });
    } else {
      alert("Room does not exist.");
    }
  });
});

// Send a message
sendButton.addEventListener('click', () => {
  const messageText = messageInput.value;
  const sender = "User"; // You can replace this with real user authentication if needed

  if (messageText.trim() !== "") {
    const newMessageRef = firebase.database().ref('rooms/' + roomCode + '/messages').push();
    newMessageRef.set({
      sender: sender,
      text: messageText,
    });
    messageInput.value = ""; // Clear the input field
  }
});

// On page load, create a room if no room code is present
window.onload = () => {
  if (!roomCode) {
    createRoom();
  }
};
