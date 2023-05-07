'use strict'
const mssql = require('mssql');
const {config} = require('../config/dbconfig');

module.exports = {
    get: async (req, res) => {
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request().query("SELECT * FROM TheThuVien");
            res.send(result.recordset);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    store: async (req, res) => {
        const { SoThe, NgayBatDau, NgayKetThuc, GhiChu } = req.body;
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request()
                .input("SoThe", mssql.NVarChar(10), SoThe)
                .input("NgayBatDau", mssql.Date, NgayBatDau)
                .input("NgayKetThuc", mssql.Date, NgayKetThuc)
                .input("GhiChu", mssql.NVarChar(mssql.MAX), GhiChu)
                .query("INSERT INTO TheThuVien (SoThe, NgayBatDau, NgayKetThuc, GhiChu) VALUES (@SoThe, @NgayBatDau, @NgayKetThuc, @GhiChu)")

            res.status(201).json({ message: 'The thu vien created successfully' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    detail: async (req, res) => {

        try {
            const pool = await mssql.connect(config);
            const result = await pool.request()
                .input("SoThe", mssql.NVarChar(10), req.params.SoThe)
                .query("SELECT * FROM TheThuVien WHERE SoThe = @SoThe")
            if (result.recordset.length > 0) {
                res.send(result.recordset[0]);
            } 
            else {
                res.status(404).send('The thu vien not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    delete: async (req, res) => {
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request()
                .input("SoThe", mssql.NVarChar(10), req.params.SoThe)
                .query("DELETE FROM TheThuVien WHERE SoThe = @SoThe")
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
        const { NgayBatDau, NgayKetThuc, GhiChu } = req.body;
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request()
                .input("SoThe", mssql.NVarChar(10), req.params.SoThe)
                .input("NgayBatDau", mssql.Date, NgayBatDau)
                .input("NgayKetThuc", mssql.Date, NgayKetThuc)
                .input("GhiChu", mssql.NVarChar(mssql.MAX), GhiChu)
                .query(`UPDATE TheThuVien 
                SET NgayBatDau = @NgayBatDau, 
                NgayKetThuc = @NgayKetThuc, 
                GhiChu = @GhiChu 
                WHERE SoThe = @SoThe`)
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