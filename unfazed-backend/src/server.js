import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { initChatSocket } from './sockets/chatSocket.js';

dotenv.config();
connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

initChatSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[Server] unfazed-backend is active on http://localhost:${PORT}`);
});
