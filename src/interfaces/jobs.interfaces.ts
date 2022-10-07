export interface HelloWorldJob {
  type: 'PrintHelloWorld';
  data: { hello: string };
}
export interface DoSomeHeavyComputingJob {
  type: 'DoSomeHeavyComputing';
  data: { magicNumber: number };
}
export interface MayFailOrNotJob {
  type: 'MayFailOrNot';
}

export type addJobsInterface =
  | HelloWorldJob
  | DoSomeHeavyComputingJob
  | MayFailOrNotJob;
