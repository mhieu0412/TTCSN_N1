
let Api = 'http://localhost:3000/users/'

function getReaders(callback) {
    fetch(Api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function renderReaders(readers) {
    let listReaders = document.querySelector('#data-table');
    let htmls = readers.map(function (reader) {
        return `
          <tr class="reader-item-${reader.id} list-item">
              <td class ="reader-item-id-${reader.id}">${reader.id}</td>
              <td class ="reader-item-fullName-${reader.id}">${reader.fullName}</td>
              <td class ="reader-item-email-${reader.id}">${reader.email}</td>
              <td class ="reader-item-phone-${reader.id}">${reader.phone}</td>
              <td class ="reader-item-address-${reader.id}">${reader.address}</td>
              <td class ="reader-item-dob-${reader.id}">${reader.dob}</td>
              <td class ="reader-item-gender-${reader.id}">${reader.gender}</td>
          </tr>`
    })
    htmls.reverse();
    console.log(htmls)
    listReaders.innerHTML = htmls.join('');
}


getReaders(renderReaders);