import { Worker } from 'bullmq';
import { QueueName } from '../config/queue-name';
import { redisOption } from '../config/redis-config';

const worker = new Worker(
  QueueName,
  async (job) => {
    console.log(job.data);
  },
  {
    connection: redisOption,
  },
);

worker.on('completed', (job) => {
  console.log(`Job ID ${job.id} has completed! \n`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ID ${job.id} has failed with ${err.message} \n`);
});
