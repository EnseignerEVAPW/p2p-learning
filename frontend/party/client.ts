import PartySocket from "partysocket";

//conectarse al servidor party
const partySocket = new PartySocket({
    host : "localhost:1999",
    room: "my-room-p2p"
});

//send a message to the server
partySocket.send('Helloo everyone');

//print each incoming message from the server to console
partySocket.addEventListener('message', (e) => {
    console.log(e.data);
});