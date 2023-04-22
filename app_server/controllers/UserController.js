'use strict'
const mssql = require('mssql');
const bcrypt = require('bcrypt');
const {config} = require('../config/dbconfig');

module.exports = {
    register: async (req, res) => {
        const { username, password, email } = req.body;
        
        try {
            const pool = await mssql.connect(config);

            const saltRounds = 10;
            const passwordHash = bcrypt.hashSync(password, saltRounds);
            console.log(passwordHash.length);

            const result = await pool.request()
              .input('username', mssql.NChar, username)
              .input('passwordHash', mssql.NVarChar, passwordHash)
              .input('email', mssql.NVarChar, email)
              .query(`
                INSERT INTO users (username, passwordHash, email)
                VALUES (@username, @passwordHash, @email)
              `);
            res.status(200).send('Registration successful!');
          } catch (err) {
            res.status(500).send(err.message);
          }
    },
    login: async (req, res) => {
        const { username, password} = req.body;
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request()
              .input('username', mssql.NChar, username)
              .query(`
                SELECT * FROM users WHERE username = @username
              `);
            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                const match = await bcrypt.compare(password, user.passwordHash);

                if(match) {
                    res.status(200).send({ message: "Login success !"})
                } else {
                    res.status(500).send({ message: "Login failed !"});
                }

              } else {
                res.status(200).send({ message: "User not found !"})
              }
          } catch (err) {
            res.status(500).send('An error occurred while login');
          }
    }
}