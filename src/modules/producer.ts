import { Queue, QueueOptions, JobsOptions } from 'bullmq';
import { QueueName } from '../config/queue-name';
import { redisOption } from '../config/redis-config';
import { addJobsInterface } from '../interfaces/jobs.interfaces';

const queueOptions: QueueOptions = {
  connection: redisOption,
};

export const queues = new Queue(QueueName, queueOptions);

const jobOptions: JobsOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000, // 2, 4, 8 seconds
  },
};

export const addJobs = async (job: addJobsInterface) => {
  await queues.add(job.type, job);
};

export const addJobsWithOptions = async (job: addJobsInterface) => {
  await queues.add(job.type, job, jobOptions);
};
