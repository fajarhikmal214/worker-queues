require('dotenv').config();

const queueName = process.env.QUEUE_NAME ?? 'QueueTest';

export const QueueName: string = queueName;
