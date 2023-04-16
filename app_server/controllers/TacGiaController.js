'use strict'
const mssql = require('mssql');
const {config} = require('../config/dbconfig');

module.exports = {
    store: async (req, res) => {
        const { MaTacGia, TenTacGia, Website, GhiChu } = req.body;
        
        try {
          const pool = await mssql.connect(config);
          const result = await pool.request()
            .input('MaTacGia', mssql.NChar, MaTacGia)
            .input('TenTacGia', mssql.NVarChar, TenTacGia)
            .input('Website', mssql.NVarChar, Website)
            .input('GhiChu', mssql.NVarChar, GhiChu)
            .query(`
              INSERT INTO TacGia (MaTacGia, TenTacGia, Website, GhiChu)
              VALUES (@MaTacGia, @TenTacGia, @Website, @GhiChu)
            `);
          res.json(result.recordset);
        } catch (err) {
          res.status(500);
          res.send(err.message);
        }
    },
    get: async (req, res) => {
        
        try {
          const pool = await mssql.connect(config);
          const result = await pool.request()
            .query('SELECT * FROM TacGia');
          res.json(result.recordset);
        } catch (err) {
          res.status(500);
          res.send(err.message);
        }
    },
    update: async (req, res) => {
        const { MaTacGia } = req.params;
        const { TenTacGia, Website, GhiChu } = req.body;
        
        try {
          const pool = await mssql.connect(config);
          const result = await pool.request()
            .input('MaTacGia', mssql.NChar, MaTacGia)
            .input('TenTacGia', mssql.NVarChar, TenTacGia)
            .input('Website', mssql.NVarChar, Website)
            .input('GhiChu', mssql.NVarChar, GhiChu)
            .query(`
              UPDATE TacGia
              SET TenTacGia = @TenTacGia, Website = @Website, GhiChu = @GhiChu
              WHERE MaTacGia = @MaTacGia
            `);
          res.json(result.recordset);
        } catch (err) {
          res.status(500);
          res.send(err.message);
        }
    },
    delete: async (req, res) => {
        const { MaTacGia } = req.params;
        
        try {
          const pool = await mssql.connect(config);
          const result = await pool.request()
            .input('MaTacGia', mssql.NChar, MaTacGia)
            .query(`
              DELETE FROM TacGia
              WHERE MaTacGia = @MaTacGia
            `);
          res.json(result.rowsAffected);
        } catch (err) {
          res.status(500);
          res.send(err.message);
        }
    }
}