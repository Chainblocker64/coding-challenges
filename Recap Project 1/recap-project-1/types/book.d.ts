export interface Book {
  title: string;
  subtitle: string;
  isbn: string;
  abstract: string;
  numPages: number;
  author: string;
  publisher: string;
  price: `$${NumericalString}.${NumericalString}`;
  cover: `http://${string}.png`;
}

export type NumericalString = `${number}` | number;
