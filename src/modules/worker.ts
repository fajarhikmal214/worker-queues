import { Job, Worker, WorkerOptions } from 'bullmq';
import { QueueName } from '../config/queue-name';
import { redisOption } from '../config/redis-config';
import { addJobsInterface } from '../interfaces/jobs.interfaces';
import { DoSomeHeavyComputingUseCase } from '../services/do-some-heavy-computing.service';

const workerHandler = async (job: Job<addJobsInterface>) => {
  switch (job.data.type) {
    case 'PrintHelloWorld': {
      console.log(`Hello world!`, job.data);

      job.updateProgress(100);
      return;
    }

    case 'DoSomeHeavyComputing': {
      console.log('Starting job:', job.name);
      job.updateProgress(10);

      await DoSomeHeavyComputingUseCase(job.data);

      job.updateProgress(100);
      console.log('Finished job:', job.name);
      return;
    }

    case 'MayFailOrNot': {
      if (Math.random() > 0.3) {
        console.log(`FAILED!`);
        throw new Error('Something went wrong');
      }

      console.log(`COMPLETED!`);

      job.updateProgress(100);
      return 'Done!';
    }
  }
};

const workerOptions: WorkerOptions = {
  connection: redisOption,
};

new Worker(QueueName, workerHandler, workerOptions);

console.log('Worker Started!');
