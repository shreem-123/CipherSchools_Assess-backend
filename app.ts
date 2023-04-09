import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = 3000 || process.env.PORT;
const MONGODB_URL = "mongodb://localhost:27017/users" || process.env.MONGODB_URL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true
} as any).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now', err);
  process.exit();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hi Mom');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
