import 'reflect-metadata';
import './database';
import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (request, response) => {
    return response.json({ message: "Hello World - NLW04"});
});

app.post("/", (request, response) => {
   return response.json({message : "Os dados foram salvos com sucesso!"});
});

export { app };
