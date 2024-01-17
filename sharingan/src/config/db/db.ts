import { Dialect, Sequelize } from 'sequelize'

const dbName = 'postgres';
const dbUser = 'postgres'
const dbHost = 'db'
const dbDriver = 'postgres';
const dbPassword = 'postgres';

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
})

export default db
