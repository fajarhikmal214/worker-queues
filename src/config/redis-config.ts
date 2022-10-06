require('dotenv').config();

type redisOption = {
  host: string | undefined;
  port: number | undefined;
};

export const redisOption: redisOption = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};
