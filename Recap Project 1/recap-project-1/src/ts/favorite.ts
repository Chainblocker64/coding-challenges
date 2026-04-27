import {
  Book,
  fetchAllBooks,
  getPublishers,
  bookmonkeyApi,
  searchBooksByTitle,
  filterBooksByPublisher,
  getFavorites,
  filterBooksByIsbn,
  updateFavoriteCount,
  renderBookRow,
  toggleFavorite,
  updateBookCount,
} from "./types.js";

const listingMode = 1;

updateFavoriteCount();

let allBooks = (await fetchAllBooks(bookmonkeyApi)) as Book[];
const allPublishers = getPublishers(allBooks);

initSearch();
initPublisherFilter();
applyBookFilters();

/**
 * Functions
 */

//Listen to changes in the search field
function initSearch(): void {
  const search = document.getElementById("search") as HTMLInputElement;
  search.addEventListener("input", (event: InputEvent) => {
    applyBookFilters();
  });
}

//Populate publisher select and listen to changes
function initPublisherFilter(): void {
  const publisherSelect = document.getElementById(
    "by-publisher",
  ) as HTMLSelectElement;

  // Fill select options with all publishers
  publisherSelect.innerHTML = "";

  const none = document.createElement("option") as HTMLOptionElement;
  none.value = "-";
  none.textContent = "-";
  publisherSelect.append(none);

  allPublishers.forEach((publisher) => {
    const option = document.createElement("option") as HTMLOptionElement;
    option.value = publisher;
    option.textContent = publisher;
    publisherSelect.append(option);
  });

  // Add change listener to select
  publisherSelect.addEventListener("change", (event: Event) => {
    applyBookFilters();
  });
}

//Apply all instances of filters to the book list and display book info
function applyBookFilters(books: Book[] = allBooks): Book[] {
  //Apply search filter
  const search = document.getElementById("search") as HTMLInputElement;
  const searchTerm = search.value;
  //Apply publisher filter
  const publisherSelect = document.getElementById(
    "by-publisher",
  ) as HTMLSelectElement;
  const publisher = publisherSelect.value;
  books = searchBooksByTitle(books, searchTerm);
  if (allPublishers.includes(publisher)) {
    books = filterBooksByPublisher(books, publisher);
  }
  //Apply favorites filter
  books = filterBooksByIsbn(books, getFavorites());

  refreshBookListing(books);
  return books;
}

//Display book listing
function refreshBookListing(books: Book[]): void {
  const booksTable = document.getElementById(
    "book-listing",
  ) as HTMLTableElement;

  booksTable.innerHTML = "";

  //Render table row for each book
  books.forEach((book: Book) => {
    const row = document.createElement("tr") as HTMLTableRowElement;

    //Render table row for each book
    row.innerHTML = renderBookRow(book, listingMode);

    //Add functionality to favorite toggle button
    const deleteButton = row.querySelector(".fav-btn") as HTMLButtonElement;
    deleteButton.addEventListener("click", (event: MouseEvent) => {
      //Remove book from favorites and reload listing
      toggleFavorite(book.isbn);
      refreshBookListing(applyBookFilters());
    });
    booksTable.append(row);
  });

  updateBookCount(books.length);
}
