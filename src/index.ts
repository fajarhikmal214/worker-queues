import express from 'express';
import bodyParser from 'body-parser';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { queues, addJobs, addJobsWithOptions } from './modules/producer';

require('dotenv').config();

const app = express();
const port: number = Number(process.env.PORT) ?? 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/hello-world', async (_req, res) => {
  await addJobs({
    type: 'PrintHelloWorld',
    data: {
      hello: 'Hello World!',
    },
  });

  res.json({ queued: true });
});

app.post('/heavy-computing', async (req, res) => {
  const { magicNumber } = req.body;

  await addJobs({
    type: 'DoSomeHeavyComputing',
    data: {
      magicNumber,
    },
  });

  res.json({ queued: true });
});

app.post('/retryable', async (_req, res) => {
  await addJobsWithOptions({
    type: 'MayFailOrNot',
  });

  res.json({ queued: true });
});

// BULL-BOARD SETUP (DASHGOARD)

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [new BullMQAdapter(queues)],
  serverAdapter: serverAdapter,
});

serverAdapter.setBasePath('/bull-board');

app.use('/bull-board', serverAdapter.getRouter());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(
    `Bull-board is available at: http://localhost:${port}/bull-board`,
  );
});
