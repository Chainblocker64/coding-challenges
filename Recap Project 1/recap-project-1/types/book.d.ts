export type Isbn = string;
export type Publisher = string;
export type NumericalString = `${number}` | number;
export type DollarPrice = `$${NumericalString}.${NumericalString}`;
export type CoverUrl = `http://${string}.png`;

export interface Book {
  title: string;
  subtitle: string;
  isbn: Isbn;
  abstract: string;
  numPages: number;
  author: string;
  publisher: string;
  price: DollarPrice;
  cover: CoverUrl;
}
