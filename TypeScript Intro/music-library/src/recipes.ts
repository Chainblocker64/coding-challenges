type ingredient = {
  name: string;
  amountGrams: number;
};

type Recipe = {
  name: string;
  servings: number;
  vegetarian: boolean;
  ingredients: ingredient[];
};

/**
 * Inaccurate to test cases
 */
const friedPotatoes: Recipe = {
  name: "fried potatoes",
  servings: 2,
  vegetarian: true,
  ingredients: [
    {
      name: "potatoes",
      amountGrams: 400,
    },
    {
      name: "garlic",
      amountGrams: 15,
    },
  ],
};

const curry: Recipe = {
  name: "curry",
  servings: 8,
  vegetarian: false,
  ingredients: [
    {
      name: "rice",
      amountGrams: 500,
    },
    {
      name: "garlic",
      amountGrams: 30,
    },
    {
      name: "onions",
      amountGrams: 300,
    },
    {
      name: "curry paste",
      amountGrams: 30,
    },
    {
      name: "chickpeas",
      amountGrams: 250,
    },
    {
      name: "coconut milk",
      amountGrams: 400,
    },
  ],
};

function summarize(recipe: Recipe): string {
  return `To cook ${recipe.servings} servings of ${recipe.vegetarian ? "vegetarian " : ""}${recipe.name}, you will need ${listIngredients(recipe)}.`;
}

function listIngredients(recipe: Recipe): string {
  let output: string = "";
  recipe.ingredients.forEach((ingredient: ingredient, index: number) => {
    const isLast: boolean = index === recipe.ingredients.length - 1;
    const isSecondToLast = index === recipe.ingredients.length - 2;

    if (isLast && index > 0) {
      output += " and ";
    }

    output += `${ingredient.amountGrams} grams of ${ingredient.name}`;

    if (!isLast && !isSecondToLast) {
      output += ", ";
    }
  });

  return output;
}

console.log(summarize(friedPotatoes));
console.log(summarize(curry));
