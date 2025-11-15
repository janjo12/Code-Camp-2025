

//const socket = new WebSocket("ws://localhost:3000");

const socket = new WebSocket("ws://10.236.122.67:3000"); // my ip address:3000


socket.onopen = (event) => {
    console.log("It's open!!!!!!!!!!!!!");
}

socket.OPEN;