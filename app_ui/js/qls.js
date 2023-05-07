let Api = 'http://localhost:3000/users/'

function start() {
    getBooks(renderBooks);
    handleCreateForm();
}

start()

function getBooks(callback) {
    fetch(Api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function renderBooks(books) {
    let listBooks = document.querySelector('.list-books');
    let htmls = books.map(function (book) {
        return `
          <tr class="book-item-${book.id} list-item">
              <td class ="book-item-code-${book.id}">${book.id}</td>
              <td class ="book-item-name-${book.id}">${book.name}</td>
              <td class ="book-item-author-${book.id}">${book.author}</td>
              <td class ="book-item-publisher-${book.id}">${book.publisher}</td>
              <td class ="book-item-amount-${book.id}">${book.amount}</td>
              <td class = "">
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"">Xóa</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Bạn chắc chắn muốn xóa trường này?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="handleDelete(${book.id})">Xóa</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="handleUpdate(${book.id})">Sửa</button>
              </td>
          </tr>`
    })
    htmls.reverse();
    listBooks.innerHTML = htmls.join('');
}

function createBook(data, callback) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(Api, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}
function handleCreateForm() {
    let createBtn = document.querySelector('.create')
    createBtn.onclick = function () {
        let name = document.querySelector('input[name="name"]').value
        let author = document.querySelector('input[name="author"]').value
        let publisher = document.querySelector('input[name="publisher"]').value
        let amount = document.querySelector('input[name="amount"]').value
        const formData = { name, author, publisher, amount }
        console.log(document.querySelector('input[name="name"]').value);
        createBook(formData, getBooks(renderBooks))
        getBooks(renderBooks)
    }
}


function handleDelete(id) {
    let options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(Api + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            document.querySelector(`.book-item-${id}`).remove();
        })
}

function handleUpdate(id) {
    updateBtn = document.querySelector('.update')
    document.querySelector('.update').style.display = 'inline-block'
    document.querySelector('.create').style.display = 'none'
    let name = document.querySelector(`.book-item-name-${id}`).innerText;
    let author = document.querySelector(`.book-item-author-${id}`).innerText;
    let publisher = document.querySelector(`.book-item-publisher-${id}`).innerText;
    let amount = document.querySelector(`.book-item-amount-${id}`).innerText;
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="author"]').value = author;
    document.querySelector('input[name="publisher"]').value = publisher;
    document.querySelector('input[name="amount"]').value = amount;
    updateBtn.onclick = () => {
        let name = document.querySelector('input[name="name"]').value;
        let author = document.querySelector('input[name="author"]').value;
        let publisher = document.querySelector('input[name="publisher"]').value;
        let amount = document.querySelector('input[name="amount"]').value;
        editBook({ id, name, author, publisher, amount });
        console.log(editBook())
    }

    function editBook({ id, ...book }) {
        fetch(Api + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                document.querySelector('input[name="name"]').value = ""
                document.querySelector('input[name="author"]').value = ""
                document.querySelector('input[name="publisher"]').value = "";
                document.querySelector('input[name="amount"]').value = "";
                getBooks(renderBooks)
            })
    }
}

document.querySelector('.add-book').onclick = function () {
    document.querySelector('.update').style.display = 'none'
    document.querySelector('.create').style.display = 'inline-block'
    document.querySelector('input[name="name"]').value = ""
    document.querySelector('input[name="author"]').value = ""
    document.querySelector('input[name="publisher"]').value = "";
    document.querySelector('input[name="amount"]').value = "";
}

function logout() {
    // Xoá thông tin đăng nhập trong session storage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');

    // Chuyển hướng đến trang đăng nhập
    window.location.href = 'login.html';
}


