'use strict'
const mssql = require('mssql');
const {config} = require('../config/dbconfig');

module.exports = {
    get: async (req, res) => {
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request().query("SELECT * FROM DocGia");
            res.send(result.recordset);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    store: async (req, res) => {
        const { MaDocGia, TenDocGia, DiaChi, SoThe } = req.body;
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request()
                .input('MaDocGia', mssql.NVarChar(10), MaDocGia)
                .input('TenDocGia', mssql.NVarChar(30), TenDocGia)
                .input('DiaChi', mssql.NVarChar(50), DiaChi)
                .input('SoThe', mssql.NVarChar(10), SoThe || null)
                .query(`INSERT INTO DocGia (MaDocGia, TenDocGia, DiaChi, SoThe)
                VALUES (@MaDocGia, @TenDocGia, @DiaChi, @SoThe)`)

            res.status(201).json({ message: 'Doc gia created successfully' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    detail: async (req, res) => {

        try {
            const pool = await mssql.connect(config);
            const result = await pool.request()
                .input("MaDocGia", mssql.NVarChar(10), req.params.MaDocGia)
                .query("SELECT * FROM DocGia WHERE MaDocGia = @MaDocGia")
            if (result.recordset.length > 0) {
                res.send(result.recordset[0]);
            } 
            else {
                res.status(404).send('Doc gia not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    delete: async (req, res) => {
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request()
                .input("MaDocGia", mssql.NVarChar(10), req.params.MaDocGia)
                .query("DELETE FROM DocGia WHERE MaDocGia = @MaDocGia")
            if (result.rowsAffected[0] === 0) {
                // Record not found
                res.sendStatus(404);
            } 
            else {
                // Record deleted successfully
                res.sendStatus(200);
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    update: async (req, res) => {
        const { TenDocGia, DiaChi, SoThe } = req.body;
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request()
                .input('MaDocGia', mssql.NVarChar(10), req.params.MaDocGia)
                .input('TenDocGia', mssql.NVarChar(30), TenDocGia)
                .input('DiaChi', mssql.NVarChar(50), DiaChi)
                .input('SoThe', mssql.NVarChar(10), SoThe || null)
                .query(`UPDATE DocGia SET TenDocGia = @TenDocGia, 
                            DiaChi = @DiaChi, SoThe = @SoThe 
                            WHERE MaDocGia = @MaDocGia`)
            if (result.rowsAffected[0] === 0) {
                // Record not found
                res.sendStatus(404);
            } else {
                // Record updated successfully
                res.sendStatus(200);
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}