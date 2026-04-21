"use strict";
console.log("ready");
const form = document.getElementById("search-form");
const list = document.getElementById("book-list");
const url = "https://www.dbooks.org/api/search/";
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formElement = e.target;
    const formData = new FormData(formElement);
    const query = formData.get("query");
    const books = await fetchBooks(query);
    listBooks(books);
});
async function fetchBooks(term) {
    const response = await fetch(`${url}${term}`);
    const data = (await response.json());
    if (!data.books) {
        return [];
    }
    return data.books;
}
function listBooks(books) {
    list.innerHTML = "";
    if (!books.length) {
        const noBooks = document.createElement("span");
        noBooks.innerHTML = "No books found!";
        list.append(noBooks);
    }
    books.forEach((book) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <h2>${book.title}</h2>
        <span>Author: ${formatAuthors(book.authors)}</span>
    `;
        list.append(li);
    });
}
function formatAuthors(authors) {
    return authors.slice(0, authors.indexOf(","));
}
//# sourceMappingURL=main.js.map