import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../../config/db/db'


interface JobAttributes {
  id: number;
  title?: string;
  description?: string;
  data: string;
  runAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface JobInput extends Optional<JobAttributes, 'id' | 'title'> {}
export interface JobOutput extends Required<JobAttributes> {}


class Job extends Model<JobAttributes, JobInput> implements JobAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public data!: string;
  public runAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Job.init({
  id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
  },
  title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'not-specified'
  },
  description: {
      type: DataTypes.TEXT,
      allowNull: true
  },
  data: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  runAt: {
      type: DataTypes.DATE,
      allowNull: false
  }
  }, {
  sequelize: sequelizeConnection,
  timestamps: true,
  paranoid: true
});

export default Job;


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
