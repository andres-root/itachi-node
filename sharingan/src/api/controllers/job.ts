import * as jobDal from '../db/dal/job'
import { GetAllJobsFilter } from '../db/dal/types'
import {JobInput, JobOutput} from '../db/models/job'


export const create = (payload: JobInput): Promise<JobOutput> => {
    return jobDal.createJob(payload)
}
export const update = (id: number, payload: Partial<JobInput>): Promise<JobOutput> => {
    return jobDal.updateJob(id, payload)
}
export const getById = (id: number): Promise<JobOutput> => {
    return jobDal.getJobById(id)
}
export const deleteById = (id: number): Promise<boolean> => {
    return jobDal.deleteJobById(id)
}
export const getAll = (filters: GetAllJobsFilter): Promise<JobOutput[]> => {
    return jobDal.getAllJobs(filters)
}