import { Book } from "../../types/book";

const bookmonkeyApi = "http://localhost:4730/";

const booksTable = document.getElementById("book-listing") as HTMLTableElement;
const search = document.getElementById("search") as HTMLInputElement;
const publisherSelect = document.getElementById(
  "by-publisher",
) as HTMLSelectElement;
const bookCount = document.getElementById("book-count") as HTMLSpanElement;

const allBooks = (await fetchAllBooks()) as Book[];
const allPublishers = getPublishers(allBooks);

const currentBooks = applyBookFilters(allBooks);

initSearch();
initPublisherFilter();

/**
 * Functions
 */

async function fetchAllBooks(): Promise<Book[]> {
  const response = await fetch(`${bookmonkeyApi}books`);
  const books = (await response.json()) as Book[];
  return books;
}

function refreshBookListing(books: Book[]): void {
  booksTable.innerHTML = "";
  books.forEach((book: Book) => {
    const row = document.createElement("tr") as HTMLTableRowElement;
    //Render table row for each book
    row.innerHTML = renderBookRow(book);
    booksTable.append(row);
  });
  //Update book count display
  updateBookCount(books.length);
}

function initSearch(): void {
  search.addEventListener("input", (event: InputEvent) => {
    applyBookFilters();
  });
}

function initPublisherFilter(): void {
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

function searchBooksByTitle(books: Book[], title: string): Book[] {
  // Make both strings upper case for comparison to make search case insensitive
  title = title.toUpperCase();
  const searchResult = books.filter((book) =>
    book.title.toUpperCase().includes(title),
  );
  return searchResult;
}

function filterBooksByPublisher(books: Book[], publisher: string) {
  if (!allPublishers.includes(publisher)) {
    return books;
  }
  const filterResult = books.filter((book) => book.publisher === publisher);
  return filterResult;
}

function renderBookRow(book: Book): string {
  return `
    <td>
        <button class="button button-clear fav-btn">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="fav"
        >
            <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
            />
        </svg>
        </button>
    </td>
    <td>${book.title}</td>
    <td>${book.isbn}</td>
    <td>${book.author}</td>
    <td>${book.publisher}</td>
    <td>
        <button
        class="button"
        onclick="location.href = 'detail.html'"
        >
        Detail
        </button>
    </td>
  `;
}

function updateBookCount(count: number): void {
  bookCount.textContent = String(count);
}

function applyBookFilters(books: Book[] = allBooks): Book[] {
  // Apply search
  const searchTerm = search.value;
  const publisher = publisherSelect.value;
  books = searchBooksByTitle(books, searchTerm);
  books = filterBooksByPublisher(books, publisher);

  refreshBookListing(books);
  return books;
}

function getPublishers(books: Book[]): string[] {
  let publishers = books.map((book) => book.publisher);
  publishers = [...new Set(publishers)];
  return publishers;
}
