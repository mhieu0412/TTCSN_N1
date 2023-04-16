'use strict'
const mssql = require('mssql');
const {config} = require('../config/dbconfig');

module.exports = {
    get: async (req, res) => {
        let sql = `SELECT * FROM Sach 
                    INNER JOIN TacGia ON Sach.MaTacGia = TacGia.MaTacGia
                    INNER JOIN TheLoai ON Sach.MaTheLoai = TheLoai.MaTheLoai
                    INNER JOIN NhaXuatBan ON Sach.MaNXB = NhaXuatBan.MaNXB`;
        try {
          const pool = await mssql.connect(config);
          const result = await pool.request().query(sql);
          res.send(result.recordset);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
    },
    detail: async (req, res) => {
        let sql = `SELECT * FROM Sach 
                    INNER JOIN TacGia ON Sach.MaTacGia = TacGia.MaTacGia
                    INNER JOIN TheLoai ON Sach.MaTheLoai = TheLoai.MaTheLoai
                    INNER JOIN NhaXuatBan ON Sach.MaNXB = NhaXuatBan.MaNXB
                    WHERE MaSach = @MaSach`;
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request().input('MaSach', mssql.VarChar, req.params.MaSach).query(sql);
            if (result.recordset.length > 0) {
            res.send(result.recordset[0]);
            } else {
            res.status(404).send('Book not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    update: async (req, res) => {
        const MaSach = req.params.MaSach;
        const { TenSach, MaTacGia, MaTheLoai, MaNXB, NamXB } = req.body;

        try {
            let pool = await mssql.connect(config);

            const result = await pool.request()
                .input('MaSach', mssql.NChar(10), MaSach)
                .input('TenSach', mssql.NVarChar(30), TenSach)
                .input('MaTacGia', mssql.NChar(10), MaTacGia)
                .input('MaTheLoai', mssql.NChar(10), MaTheLoai)
                .input('MaNXB', mssql.NChar(10), MaNXB)
                .input('NamXB', mssql.Int, NamXB)
                .query(`UPDATE Sach 
                SET TenSach = @TenSach, MaTacGia = @MaTacGia, 
                MaTheLoai = @MaTheLoai, MaNXB = @MaNXB, NamXB = @NamXB 
                WHERE MaSach = @MaSach`);

            if (result.rowsAffected[0] === 0) {
                // Record not found
                res.sendStatus(404);
            } else {
                // Record updated successfully
                res.sendStatus(200);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    store: async (req, res) => {
        const { MaSach, TenSach, MaTacGia, MaTheLoai, MaNXB, NamXB } = req.body;

            try {
                let pool = await mssql.connect(config);
                const result = await pool.request()
                    .input('MaSach', mssql.NChar(10), MaSach)
                    .input('TenSach', mssql.NVarChar(30), TenSach)
                    .input('MaTacGia', mssql.NChar(10), MaTacGia)
                    .input('MaTheLoai', mssql.NChar(10), MaTheLoai)
                    .input('MaNXB', mssql.NChar(10), MaNXB)
                    .input('NamXB', mssql.Int, NamXB)
                    .query(`INSERT INTO Sach (MaSach, TenSach, MaTacGia, MaTheLoai, MaNXB, NamXB) 
                    VALUES (@MaSach, @TenSach, @MaTacGia, @MaTheLoai, @MaNXB, @NamXB)`);

                res.status(201).json({ message: 'Sach created successfully' });
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
        }
    },
    delete: async (req, res) => {
        const MaSach = req.params.MaSach;
        try {
            let pool = await mssql.connect(config);

            const result = await pool.request()
                .input('MaSach', mssql.NChar(10), MaSach)
                .query('DELETE FROM Sach WHERE MaSach = @MaSach');

            if (result.rowsAffected[0] === 0) {
                // Record not found
                res.sendStatus(404);
            } else {
                // Record deleted successfully
                res.sendStatus(200);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    getCode: async (req, res) => {
        let sql = 'SELECT MAX(MaSach) From Sach'
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request().query(sql);
            if (result.recordset.length > 0) {
                res.send(result.recordset[0]);
            } else {
                res.status(404).send('DB has not data');
            }
          } 
        catch (err) {
            console.error(err);
            res.status(500).send('Server error');
          }
    }
}