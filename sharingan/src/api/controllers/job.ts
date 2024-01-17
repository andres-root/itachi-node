import * as jobDal from "../models/dal/job";
import { GetAllJobsFilter } from "../models/dal/types";
import { JobInput, JobOutput, JobAttributes } from "../models/job";
import { serializeJobOutput, JobInterface } from "../serializers/job";

export const createJobController = async (payload: JobAttributes): Promise<JobInterface> => {
  return serializeJobOutput(await jobDal.createJob(payload));
};

// export const update = (id: number, payload: Partial<JobInput>): Promise<JobOutput> => {
//     return jobDal.updateJob(id, payload)
// }

// export const getById = (id: number): Promise<JobOutput> => {
//     return jobDal.getJobById(id)
// }

// export const deleteById = (id: number): Promise<boolean> => {
//     return jobDal.deleteJobById(id)
// }

export const getAllJobsController = async (filters: GetAllJobsFilter): Promise<JobInterface[]> => {
  return (await jobDal.getAllJobs(filters)).map(serializeJobOutput);
};
