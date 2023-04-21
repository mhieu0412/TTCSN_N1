

let Api = 'http://localhost:3000/users/' 
let cancelBtn = document.querySelector('#cancel')
let updateBtn = document.querySelector('#update')

function start() {
    cancelBtn.style.display = 'inline-block';
    updateBtn.style.display = 'none';
    getBooks(renderBooks);
    handleCreateForm();
}

start()

function getBooks(callback) {
    fetch(Api)
        .then(function(response) {
          return response.json();
        })
        .then(callback)
}

function renderBooks(books) {
  let listBooks= document.querySelector('.list-books');
  let htmls = books.map(function(book){
      return `
          <tr class="book-item-${book.id} list-item">
              <td class ="book-item-code-${book.id}">${book.id}</td>
              <td class ="book-item-name-${book.id}">${book.name}</td>
              <td class ="book-item-author-${book.id}">${book.author}</td>
              <td class ="book-item-publisher-${book.id}">${book.publisher}</td>
              <td class ="book-item-amount-${book.id}">${book.amount}</td>
              <td>
                <button onclick="handleDelete(${book.id})">Xóa</button>
                <button onclick="handleUpdate(${book.id})">Sửa</button>
              </td>
          </tr>`
  })
  htmls.reverse();
  listBooks.innerHTML = htmls.join('');
}

function createBook(data, callback) {
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch(Api, options)
        .then(function(response) {
          return response.json();
        })
        .then(callback)
}
function handleCreateForm() {
  let createBtn = document.querySelector('#create')
    createBtn.onclick = function() {
      let name = document.querySelector('input[name="name"]').value
      let author = document.querySelector('input[name="author"]').value
      let publisher = document.querySelector('input[name="publisher"]').value
      let amount = document.querySelector('input[name="amount"]').value
      const formData = { name, author, publisher, amount }
      createBook(formData,getBooks(renderBooks))
      getBooks(renderBooks)
      document.querySelector(".overlay").style.display = "none"
  }
}
let addBookBtn = document.querySelector(".add-book");
addBookBtn.onclick = function(){
  document.querySelector(".overlay").style.display = "flex"
  document.querySelector('#cancel').style.display = "inline-block"
  document.querySelector('#create').style.display = 'inline-block'
  updateBtn.style.display = 'none'
}

function handleDelete(id) {
    let options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }

    fetch(Api + id, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(){
        document.querySelector(`.book-item-${id}`).remove();
      })
}


function handleUpdate(id) {
    document.querySelector(".overlay").style.display = "flex";
    document.querySelector('#create').style.display = "none"
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
      editBook({id, name, author, publisher, amount});
    }
    showBtnUpdate(true)

    function editBook({id, ...book}) {
      fetch(Api + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(){
          document.querySelector('input[name="name"]').value =""
          document.querySelector('input[name="author"]').value =""
          document.querySelector('input[name="publisher"]').value = "";
          document.querySelector('input[name="amount"]').value = "";
          showBtnUpdate(!true)
          getBooks(renderBooks)
        })
    } 
}
cancelBtn.onclick = function(){
  showBtnUpdate(!true)
  document.querySelector('input[name="name"]').value ="";
  document.querySelector('input[name="author"]').value ="";
  document.querySelector('input[name="publisher"]').value = "";
  document.querySelector('input[name="amount"]').value = "";
}
function showBtnUpdate(isCheckBtn) {
  if(isCheckBtn){
      document.querySelector('#create').style.display = 'none'
      cancelBtn.style.display = 'inline-block'
      updateBtn.style.display = 'inline-block'
  } else{
    document.querySelector(".overlay").style.display = "none";
  }
}
let search = document.querySelector('#search')
search.onchange =function(e){
  fetch(Api)
        .then(function(response) {
          return response.json();
        })
        .then(function(listBooks){
          const test = listBooks.forEach(function(book){
            if(book.name === e.target.value||e.target.value===''){
              document.querySelector(`.book-item-${book.id}`).classList.remove("none")
            }else{
              document.querySelector(`.book-item-${book.id}`).classList.add("none")
            }
            
          })   
        })

}
