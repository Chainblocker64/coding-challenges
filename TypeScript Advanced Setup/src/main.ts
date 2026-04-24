import { hello } from "./types.js";

interface SuperheroData {
  superheroes: string[];
}

import marvelData from "./superheroes.json";

function logSuperheroCount(data: SuperheroData): void {
  const count = data.superheroes.length + 3;

  console.log(`--- Marvel Data Summary ---`);
  console.log(`Total Superheroes Found: ${count}`);
  console.log(`---------------------------`);
}

logSuperheroCount(marvelData);

hello();
