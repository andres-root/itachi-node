import { Op } from 'sequelize';
import { Job } from '..';
import { JobInput, JobOutput } from '../job';
import { GetAllJobsFilter } from './types'


export const createJob = async (job: JobInput): Promise<JobOutput> => {
  const newJob = await Job.create(job);
  return newJob;
};

export const updateJob = async (id: number, payload: Partial<JobInput>): Promise<JobOutput> => {
  const job = await Job.findByPk(id)
  if (!job) {
      throw new Error('job not found');
  }
  const updatedJob = await (job as Job).update(payload);
  return updatedJob;
};

export const getJobById = async (id: number): Promise<JobOutput> => {
  const job = await Job.findByPk(id)
  if (!job) {
      // @todo throw custom error
      throw new Error('job not found');
  }
  return job;
}

export const deleteJobById = async (id: number): Promise<boolean> => {
  const deletedJobCount = await Job.destroy({
      where: {id}
  });
  return !!deletedJobCount;
}

export const getAllJobs = async (filter: GetAllJobsFilter): Promise<JobOutput[]> => {
  const where = {
      isDeleted: filter.includeDeleted ? undefined : false,
      ...filter.isDeleted !== undefined && {isDeleted: filter.isDeleted}
  };
  const jobs = await Job.findAll({
      where
  });
  return jobs;
};
