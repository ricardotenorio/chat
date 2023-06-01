import express, {Express} from 'express';
import {config} from 'dotenv';
import cors from 'cors';

import router from './routes';
import connect from './db/connection';
import {init} from './db/init';

config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(router);

connect();

init();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
