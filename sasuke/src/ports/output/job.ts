import { JobInput, JobOutput } from "../../core/models/job";


export interface JobOutputPort {
  createJob(job: JobInput): Promise<JobOutput>;
  updateJob(id: number, payload: Partial<JobInput>): Promise<JobOutput>;
  getJobById(id: number): Promise<JobOutput>;
  deleteJobById(id: number): Promise<boolean>;
  getAllJobs(): Promise<JobOutput[]>;
}
