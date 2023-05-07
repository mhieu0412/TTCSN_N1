const form = document.querySelector('#myForm');
const formData = {};


console.log(formData)
let Api = 'http://localhost:3000/users/'


function createReader(data) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(Api, options)
        .then(function (response) {
            return response.json();
        })
}
function handleCreateForm() {
    let createBtn = document.querySelector('.create')
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn chặn submit form

        // Lấy dữ liệu từ các trường nhập liệu và lưu vào biến data
        formData.fullName = form.elements.fullName.value;
        formData.email = form.elements.email.value;
        formData.phone = form.elements.phone.value;
        formData.address = form.elements.address.value;
        formData.dob = form.elements.dob.value;
        formData.gender = form.elements.gender.value;
        createReader(formData)
        console.log(formData); // Hiển thị dữ liệu nhập vào trong console
    })

}
handleCreateForm();
