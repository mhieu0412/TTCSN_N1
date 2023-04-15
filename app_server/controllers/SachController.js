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
        let {TenSach, Website, GhiChu, NamXB, TenNXB, DiaChi, Email, NguoiDaiDien, TenTheLoai} = req.body;
        let MaSach = req.params.MaSach;
        let sql = `UPDATE TenSach, Website, GhiChu, NamXB, TenNXB, DiaChi, Email, NguoiDaiDien, TenTheLoai
                    FROM Sach 
                    INNER JOIN TacGia ON Sach.MaTacGia = TacGia.MaTacGia
                    INNER JOIN TheLoai ON Sach.MaTheLoai = TheLoai.MaTheLoai
                    INNER JOIN NhaXuatBan ON Sach.MaNXB = NhaXuatBan.MaNXB
                    SET TenSach = @TenSach, Website = @Website, GhiChu = @GhiChu, NamXB = @NamXB,
                    TenNXB = @TenNXB, DiaChi =@DiaChi, Email = @Email, NguoiDaiDien = @NguoiDaiDien, TenTheLoai = @TenTheLoai
                    WHERE MaSach = @MaSach`
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request().query(sql);
            if (result.rowsAffected[0] === 1) {
                res.send(result);
            } else {
                res.status(404).send('Book not found');
            }
        }
        catch {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    store: async (req, res) => {
        let {TenSach, Website, GhiChu, NamXB, TenNXB, DiaChi, Email, NguoiDaiDien, TenTheLoai} = req.body;
        let sql = 'INSERT INTO Sach VALUES (@bookId, @bookName); SELECT SCOPE_IDENTITY() AS BookId';
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request().query(sql);
            res.json({message: 'Insert success!'}, result);
          } 
        catch (err) {
            console.error(err);
            res.status(500).send('Server error');
          }
    },
    delete: async (req, res) => {
        const { bookId } = req.body;
        let sql = 'DELETE FROM Books WHERE BookId = @bookId';
        try {
            const pool = await mssql.connect(config);
            const result = await pool.request().query(sql);
            if (result.rowsAffected[0] === 1) {
              res.send('Book deleted');
            } else {
              res.status(404).send('Book not found');
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Server error');
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