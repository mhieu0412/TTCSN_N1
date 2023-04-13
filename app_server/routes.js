'use strict';
module.exports = function(app) {
  let booksCtrl = require('./controllers/BooksController');

  
  app.route('/books')
  // Lấy ra tất cả sách trong db
    .get(booksCtrl.get)
  // Thêm một quyển sách vào db
    .post(booksCtrl.store);

  app.route('/books/:bookId')
  // lấy thông tin một quyển sách trong db
    .get(booksCtrl.detail)
  // Sửa thông tin một quyển sách trong db
    .put(booksCtrl.update)
  // Xóa một quyển sách trong db
    .delete(booksCtrl.delete);
};