'use strict';
module.exports = function(app) {
    let sachCtrl = require('./controllers/SachController');
    let tacGiaCtrl = require('./controllers/TacGiaController');
    
    app.route('/api/sach')
    // Lấy ra tất cả sách trong db
        .get(sachCtrl.get)
    // Thêm một quyển sách vào db
        .post(sachCtrl.store);

    app.route('/api/sach/:MaSach')
    // lấy thông tin một quyển sách trong db
        .get(sachCtrl.detail)
    // Sửa thông tin một quyển sách trong db
        .put(sachCtrl.update)
    // Xóa một quyển sách trong db
        .delete(sachCtrl.delete);

    app.route('/api/tacgia')
        .get(tacGiaCtrl.get)
        .post(tacGiaCtrl.store);
  
    app.route('/api/tacgia/:MaTacGia')
        .put(tacGiaCtrl.update)
        .delete(tacGiaCtrl.delete);

    
};