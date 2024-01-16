import { Job } from './models'


const dev_env = 'true';

const dbInit = () => {
  Job.sync({ alter: dev_env })
}
export default dbInit 