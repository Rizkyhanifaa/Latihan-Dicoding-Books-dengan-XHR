function main() {

  // ----- METHOD GET ----- 
  const getBook = () => {
    // membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
   
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderAllBooks(responseJson.books);
      }
    };
   
    xhr.onerror = function () {
      showResponseMessage();
    };
   
    // Membuat GET request dan menetapkan target URL
    xhr.open('GET', 'https://books-api.dicoding.dev/list');
   
    // Mengirimkan request
    xhr.send();
  };

// -----  METHOD POST ----- 
  const insertBook = (book) => {
    // Membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();
 
    // Menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();
    };
 
    xhr.onerror = function () {
      showResponseMessage();
    };
 
    // Membuat POST request dan menetapkan target URL
    xhr.open('POST', 'https://books-api.dicoding.dev/add');
 
    // Menetapkan properti Content-Type dan X-Auth-Token pada Header request
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');
 
    // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
    xhr.send(JSON.stringify(book));
  };

  // -----  METHOD PUT ----- 
  const updateBook = (book) => {
    const xhr = new XMLHttpRequest();
  
    xhr.onload = function () {
      console.log("Response update:", this.responseText);
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();
    };
  
    xhr.onerror = function () {
      showResponseMessage();
    };
  
    xhr.open('PUT', `https://books-api.dicoding.dev/edit/${book.id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');
  
    console.log("Mengirim data update:", book);
    xhr.send(JSON.stringify(book));
  };

  //  ----- METHOD DELETE ----- 
  const removeBook = (bookId) => {
    // Membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();
 
    //menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();
    };
 
    xhr.onerror = function () {
      showResponseMessage();
    };
 
    // Membuat DELETE request dan menetapkan target URL
    xhr.open('DELETE', `https://books-api.dicoding.dev/delete/${bookId}`);
 
    // Menetapkan properti Content-Type dan X-Auth-Token pada Header request
    xhr.setRequestHeader('X-Auth-Token', '12345');
 
    // Mengirimkan request
    xhr.send();
  };


  
  
  
  
  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.forEach(book => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        
        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {

    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };
      
      insertBook(book);
    });

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;