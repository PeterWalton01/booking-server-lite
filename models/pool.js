/*
 * Use environment settings to setup pool of database
 * connections. Two methods are provided, values and 
 * connection string. 

 */

// const { Pool } = require("pg");
// require("dotenv").config();

// // Provide pool for database

// let pool;

// if (process.env.NODE_ENV === "production") {
//   const connectionString = process.env.DATABASE_URL;
//   pool = new Pool({
//     // create connection to database
//     connectionString: connectionString,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });
// } else {
//   pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//   });
// }

// module.exports = pool;


const knex = require('knex');

const pool = knex({
    client: "sqlite3",
    connection: {
        filename: "appointments.sqlite3"
    },
    useNullAsDefault: true
})
 
module.exports = pool
