import {
  Book,
  fetchAllBooks,
  getPublishers,
  bookmonkeyApi,
  searchBooksByTitle,
  filterBooksByPublisher,
  updateFavoriteCount,
  renderBookRow,
  toggleFavorite,
  isFavorite,
  favoriteSvg,
  unfavoriteSvg,
  updateBookCount,
} from "./types.js";

updateFavoriteCount();

const allBooks = (await fetchAllBooks(bookmonkeyApi)) as Book[];
const allPublishers = getPublishers(allBooks);

initSearch();
initPublisherFilter();
applyBookFilters();

/**
 * Functions
 */

//Listen to changes in the search field
export function initSearch(): void {
  const search = document.getElementById("search") as HTMLInputElement;
  search.addEventListener("input", (event: InputEvent) => {
    applyBookFilters();
  });
}

//Populate publisher select and listen to changes
export function initPublisherFilter(): void {
  const publisherSelect = document.getElementById(
    "by-publisher",
  ) as HTMLSelectElement;

  let publishers = allPublishers;

  // Fill select options with all publishers
  publisherSelect.innerHTML = "";

  const none = document.createElement("option") as HTMLOptionElement;
  none.value = "-";
  none.textContent = "-";
  publisherSelect.append(none);

  publishers.forEach((publisher) => {
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

/**
 * Tried sharing common functions with favorite.ts by defining it in a module, dependency on allPublishers and therefore
 * on allBooks needs me to fetch allBooks first, error said I can't use the variable before it's instantiated
 * Also dragging parameters like allBooks and mode through initSearch and initPublisherFilter was a bit ugly
 */

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
    row.innerHTML = renderBookRow(book);

    //Add functionality to favorite toggle button
    const favoriteButton = row.querySelector(".fav-btn") as HTMLButtonElement;

    favoriteButton.addEventListener("click", (event: MouseEvent) => {
      toggleFavorite(book.isbn);

      favoriteButton.innerHTML = isFavorite(book)
        ? favoriteSvg()
        : unfavoriteSvg();
    });

    booksTable.append(row);
  });
  //Update book count display
  updateBookCount(books.length);
}
