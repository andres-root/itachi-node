import { JobOutput } from "../models/job";

export interface JobInterface {
  id: number;
  title?: string;
  description?: string;
  data: string;
  runAt: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export function serializeJobOutput(job: JobOutput): JobInterface {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    data: job.data,
    runAt: job.runAt.toISOString(),
    createdAt: job.createdAt?.toISOString(),
    updatedAt: job.updatedAt?.toISOString(),
    deletedAt: job.deletedAt?.toISOString(),
  };
}
