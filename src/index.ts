import express from 'express';
import bodyParser from 'body-parser';
import { addJobs } from './modules/producer';

require('dotenv').config();

const app = express();
const port: number = Number(process.env.PORT) ?? 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/add-jobs', async (req, res) => {
  try {
    const { name, point, location } = req.body;
    const job = await addJobs(name, { point, location });

    res.status(201).json({
      data: job,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
