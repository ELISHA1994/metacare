import Sequelize from "sequelize";
import CommentModel from "./comment.model.js";
import { default as dbConfig } from "../config/db.config.js"

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: dbConfig.LOGGING,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});
// const sequelize = new Sequelize(
//     process.env.DB_URL, // your database url
//     {
//         dialect: 'postgres',
//         protocol: 'postgres',
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//         }
//     }
// );

const db = {};

db.Comment = CommentModel(sequelize, Sequelize.DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;