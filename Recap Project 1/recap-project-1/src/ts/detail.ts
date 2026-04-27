import type { Book } from "./types.js";
import { bookmonkeyApi, fetchBook, updateFavoriteCount } from "./types.js";

const titleElement = document.getElementById(
  "book-title",
) as HTMLHeadingElement;
const abstractElement = document.getElementById(
  "abstract",
) as HTMLParagraphElement;
const authorElement = document.getElementById("author") as HTMLSpanElement;
const publisherElement = document.getElementById(
  "publisher",
) as HTMLSpanElement;
const pagesElement = document.getElementById("pages") as HTMLSpanElement;
const cover = document.getElementById("cover") as HTMLImageElement;

let params = new URLSearchParams(document.location.search);
const isbn = params.get("isbn") || "";

updateFavoriteCount();

if (isbn) {
  const book = await fetchBook(bookmonkeyApi, isbn);

  titleElement.innerHTML = renderTitle(book);
  abstractElement.innerHTML = book.abstract;
  authorElement.innerHTML = book.author;
  publisherElement.innerHTML = book.publisher;
  pagesElement.innerHTML = String(book.numPages);
  cover.src = book.cover;
}

//Return HTML for the h1
function renderTitle(book: Book): string {
  return `
        <h1>
        ${book.title}<br />
            <small>${book.subtitle}
            </small>
        </h1>
    `;
}
