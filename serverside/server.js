import {WebSocketServer} from "ws";

const wss = new WebSocketServer({port: 3000});

wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        const data = JSON.parse(msg);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === client.OPEN) {
                client.send(JSON.stringify(data));
            }
        })
    })
});

wss

setInterval