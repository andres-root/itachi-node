import { JobAttributes, JobInput, JobOutput } from "../../core/models/job";
import { JobInterface } from "../../adapters/input/rest/serializers/job";


export interface JobInputPort {
  getAllJobs(): Promise<JobInterface[]>;
  createJob(payload: JobAttributes): Promise<JobInterface>;
  updateJob(id: number, payload: Partial<JobInput>): Promise<JobInterface>;
  getJobById(id: number): Promise<JobInterface>;
  deleteJobById(id: number): Promise<boolean>;
}
