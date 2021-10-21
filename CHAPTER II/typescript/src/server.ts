import express from 'express';
import { createCourse } from './routes';
const server = express();
const port = 3333;

server.get('/', createCourse)

server.listen(port);