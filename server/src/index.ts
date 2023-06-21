import express, {Express} from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {config} from 'dotenv';
import cors from 'cors';

import router from './routes';
import connect from './db/connection';
// import {init} from './db/init';
import socket from './webSocket';

config();

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
});
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(router);

connect();

// init();

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);

  socket({io});
});
