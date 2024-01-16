import { JobOutput } from '../models/job';


export function serializeJobOutput(job: JobOutput): any {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    data: job.data,
    runAt: job.runAt.toISOString(),
    createdAt: job.createdAt?.toISOString(),
    updatedAt: job.updatedAt?.toISOString(),
    deletedAt: job.deletedAt?.toISOString()
  };
}
