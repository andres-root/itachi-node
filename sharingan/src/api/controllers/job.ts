import * as jobDal from "../models/dal/job";
import { GetAllJobsFilter } from "../models/dal/types";
import { JobInput, JobOutput, JobAttributes } from "../models/job";
import { serializeJobOutput, JobInterface } from "../serializers/job";


export const getAllJobsController = async (): Promise<JobInterface[]> => {
  return (await jobDal.getAllJobs()).map(serializeJobOutput);
};

export const createJobController = async (payload: JobAttributes): Promise<JobInterface> => {
  return serializeJobOutput(await jobDal.createJob(payload));
};

export const updateJobController = async (id: number, payload: Partial<JobInput>): Promise<JobOutput> => {
    return await jobDal.updateJob(id, payload);
}

export const getJobByIdController = async (id: number): Promise<JobOutput> => {
    return await jobDal.getJobById(id);
}

export const deleteByIdController = async (id: number): Promise<boolean> => {
    return await jobDal.deleteJobById(id);
}

