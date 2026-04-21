console.log("ready");

const form = document.getElementById("search-form") as HTMLFormElement;
const list = document.getElementById("book-list") as HTMLUListElement;

const url = "https://www.dbooks.org/api/search/";

form.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  const formData = new FormData(formElement);
  const query = formData.get("query") as string;

  const books = await fetchBooks(query);
  listBooks(books);
});

interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  image: string;
  url: string;
}

interface SearchResult {
  status: string;
  total: string;
  books: Book[];
}

async function fetchBooks(term: string): Promise<Book[]> {
  const response = await fetch(`${url}${term}`);
  const data = (await response.json()) as SearchResult;
  if (!data.books) {
    return [];
  }
  return data.books;
}

function listBooks(books: Book[]): void {
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

function formatAuthors(authors: string): string {
  return authors.slice(0, authors.indexOf(","));
}
