import { Job } from "../../api/models";

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => {
  Job.sync({ force: isTest, alter: isDev || isTest });
};
export default dbInit;
