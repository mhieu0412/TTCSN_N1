'use strict';
const mssql = require('mssql');
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // for secure connections
    trustServerCertificate: true
  }
};

const db = mssql.connect(config)
            .then(pool => {
                console.log('Connected to SQL Server');
            })
            .catch(err => {
                console.error(err);
            });

module.exports = {db, config};