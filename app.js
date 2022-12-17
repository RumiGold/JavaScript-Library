const nameInput = document.getElementById("book-name");
const authorInput = document.getElementById("book-author");
const pagesInput = document.getElementById("book-pages");
const readStatus = document.getElementById("book-read");
const addButton = document.getElementById("add-button");
let library = document.getElementById("library");

let currentBooks = localStorage.getItem("books")
  ? JSON.parse(localStorage.getItem("books"))
  : [];

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("books", JSON.stringify(currentBooks));
  displayItems();
});

class Book {
  constructor(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (nameInput.value === "") return;
  if (authorInput.value === "") return;
  if (pagesInput.value === "") return;

  let bookName = nameInput.value;
  let authorName = authorInput.value;
  let numberOfPages = pagesInput.value;
  let status = readStatus.checked;
  let book = new Book(bookName, authorName, numberOfPages, status);

  storeNewItem(book);
  displayItems();

  nameInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
});

function storeNewItem(book) {
  let current = JSON.parse(localStorage.getItem("books"));
  current.push(book);
  localStorage.setItem("books", JSON.stringify(current));
}

function displayItems() {
  library.innerHTML = "";
  let storedBooks = JSON.parse(localStorage.getItem("books"));
  storedBooks.map((book) => {
    let b = document.createElement("div");
    b.innerHTML = `
    <div
    class="cursor-pointer relative mt-5 border border-2 shadow-lg p-5 border-t-8 border-t-${
      book.status ? "green" : "red"
    }-500"
  >
    <div class="flex m-1">
      <p class="font-bold">Book :</p>
      <p class="italic ml-3">${book.name}</p>
    </div>

    <div class="flex m-1">
      <p class="font-bold">Author :</p>
      <p class="italic ml-3">${book.author}</p>
    </div>

    <div class="flex m-1">
      <p class="font-bold">Pages :</p>
      <p class="italic ml-3">${book.pages}</p>
    </div>

    <div class="flex m-1">
      <p class="font-bold">Status :</p>
      <p class="ml-3 text-${book.status ? "green" : "red"}-600 font-bold">
      ${book.status ? "READ" : "NOT READ"}
      </p>
    </div>

    <div class="mt-12">
    <button
    onclick="removeBook('${book.name}')"
    class="absolute right-5 bottom-5 border px-2 py-1 rounded bg-red-500 text-white font-medium">Delete Book</button>

    <button
    onclick="changeStatus('${book.name}')"
    class="absolute left-5 bottom-5 border px-2 py-1 rounded bg-yellow-500 text-white font-medium">Change Stats</button>
    </div>
  </div>
    `;

    library.innerHTML += b.innerHTML;
  });
}

function removeBook(name) {
  let currentBooks = JSON.parse(localStorage.getItem("books"));
  let filtered = [];
  currentBooks.forEach((b) => {
    if (b.name !== name) filtered.push(b);
  });
  localStorage.setItem("books", JSON.stringify(filtered));
  displayItems();
}

function changeStatus(name) {
  let currentBooks = JSON.parse(localStorage.getItem("books"));
  currentBooks.forEach((b) => {
    if (b.name === name) {
      b.status = !b.status;
    }
  });

  localStorage.setItem("books", JSON.stringify(currentBooks));
  displayItems();
}
