import type { Book } from "../../types/book";

export type { Book, NumericalString } from "../../types/book";

//Should probably be moved to a .env file
export const bookmonkeyApi = "http://localhost:4730";

export async function fetchAllBooks(url: string): Promise<Book[]> {
  const response = await fetch(`${url}/books`);
  const books = (await response.json()) as Book[];
  return books;
}

export async function fetchBook(url: string, isbn: string): Promise<Book> {
  const response = await fetch(`${url}/books/${isbn}`);
  return (await response.json()) as Book;
}

export function searchBooksByTitle(books: Book[], title: string): Book[] {
  // Make both strings upper case for comparison to make search case insensitive
  title = title.toUpperCase();
  const searchResult = books.filter((book) =>
    book.title.toUpperCase().includes(title),
  );
  return searchResult;
}

export function filterBooksByPublisher(
  books: Book[],
  publisher: string,
): Book[] {
  const publishers = getPublishers(books);
  if (!publishers.includes(publisher)) {
    return books;
  }
  const filterResult = books.filter((book) => book.publisher === publisher);
  return filterResult;
}

export function getPublishers(books: Book[]): string[] {
  let publishers = books.map((book) => book.publisher);
  publishers = [...new Set(publishers)];
  return publishers;
}
