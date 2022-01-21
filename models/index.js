import Sequelize from "sequelize";
import CommentModel from "./comment.model.js";
import { default as dbConfig } from "../config/db.config.js"

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     logging: dbConfig.LOGGING,
//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     },
// });
const sequelize = new Sequelize(
    "postgres://ayztrtrlucbmoc:06b8fffd8a04a73ad18f64edf5bd4376f96cf47eaad03a99ceb9552c75fbae51@ec2-54-198-213-75.compute-1.amazonaws.com:5432/d7jn1jenkjed88\n",
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

const db = {};

db.Comment = CommentModel(sequelize, Sequelize.DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;