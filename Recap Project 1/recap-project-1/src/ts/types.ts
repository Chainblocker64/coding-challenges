import type { Book, Isbn } from "../../types/book";
export type {
  Book,
  Publisher,
  Isbn,
  NumericalString,
  DollarPrice,
  CoverUrl,
} from "../../types/book";

import { updateFavoriteCount } from "./dom-functions.js";
export {
  renderBookRow,
  updateFavoriteCount,
  favoriteSvg,
  unfavoriteSvg,
  deleteFavoriteSvg,
  updateBookCount,
} from "./dom-functions.js";

//Should probably be moved to a .env file
export const bookmonkeyApi = "http://localhost:4730";

//Fetch all books that the API can return
export async function fetchAllBooks(url: string): Promise<Book[]> {
  const response = await fetch(`${url}/books`);
  const books = (await response.json()) as Book[];
  return books;
}

//Fetch single book by isbn
export async function fetchBook(url: string, isbn: Isbn): Promise<Book> {
  const response = await fetch(`${url}/books/${isbn}`);
  return (await response.json()) as Book;
}

//Filter an array of books by title
export function searchBooksByTitle(books: Book[], title: string): Book[] {
  // Make both strings upper case for comparison to make search case insensitive
  title = title.toUpperCase();
  const searchResult = books.filter((book) =>
    book.title.toUpperCase().includes(title),
  );
  return searchResult;
}

//Filter an array of books by publisher
export function filterBooksByPublisher(
  books: Book[],
  publisher: string,
): Book[] {
  const filterResult = books.filter((book) => book.publisher === publisher);
  return filterResult;
}

//Get a set of all distinct publishers from a set of books
export function getPublishers(books: Book[]): string[] {
  let publishers = books.map((book) => book.publisher);
  publishers = [...new Set(publishers)];
  return publishers;
}

//Filter an array of books for ones whose isbn is included in isbsns
export function filterBooksByIsbn(books: Book[], isbns: Isbn[]): Book[] {
  return books.filter((book) => isbns.includes(book.isbn));
}

export function isFavorite(book: Book): boolean {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(book.isbn);
}

//Adds or removes a book from favorites
export function toggleFavorite(isbn: Isbn): void {
  let favorites = getFavorites();

  if (favorites.includes(isbn)) {
    //Remove isbn from array
    favorites.splice(favorites.indexOf(isbn), 1);
  } else {
    favorites.push(isbn);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoriteCount();
}

//Get an array of isbns of favorized books
export function getFavorites(): Isbn[] {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

//TODO check
/**
 * With the intended function purpose we can not predict the return type properly (?)
 * 
//Get set of values from an array of objects
export function getObjValues<T>(objects: T[], key: keyof T) {
  let values = objects.map((object) => object[key]);

  //Remove duplicates
  values = [...new Set(values)];
  return values;
}

*****

export function filterObjectsByProperty<T, K extends keyof T>(
  objects: T[],
  key: K,
  filterValues: K[],
): T[] {
  const filterResult = objects.filter((object) => filterValues.includes(object[key]));
  return [];
}
*/
