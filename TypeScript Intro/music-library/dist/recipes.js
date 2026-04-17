"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Inaccurate to test cases
 */
const friedPotatoes = {
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
const curry = {
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
function summarize(recipe) {
    return `To cook ${recipe.servings} servings of ${recipe.vegetarian ? "vegetarian " : ""}${recipe.name}, you will need ${listIngredients(recipe)}.`;
}
function listIngredients(recipe) {
    let output = "";
    recipe.ingredients.forEach((ingredient, index) => {
        const isLast = index === recipe.ingredients.length - 1;
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
//# sourceMappingURL=recipes.js.map