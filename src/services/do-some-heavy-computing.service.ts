import { setTimeout } from 'timers/promises';
import { DoSomeHeavyComputingJob } from '../interfaces/jobs.interfaces';

export const DoSomeHeavyComputingUseCase = async (
  job: DoSomeHeavyComputingJob,
) => {
  await setTimeout(job.data.magicNumber * 1000, () => {
    return true;
  });
};
