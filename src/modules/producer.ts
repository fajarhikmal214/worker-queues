import { Queue } from 'bullmq';
import { QueueName } from '../config/queue-name';
import { redisOption } from '../config/redis-config';
import { addJobsInterface } from '../interfaces/add-jobs.interfaces';

const myQueue = new Queue(QueueName, {
  connection: redisOption,
});

export const addJobs = async (name: string, data: addJobsInterface) => {
  return await myQueue.add(name, data);
};
