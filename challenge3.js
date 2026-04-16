function sortByNumber(input) {
  let output = "";
  if (typeof input !== "string" || !input) {
    return output;
  }

  //Split string into array of single words / divide by spaces
  const words = input.split(" ");

  let sortedWords = [];

  words.forEach((word) => {
    //Filter out only the number in the word
    const number = word.replace(/\D/g, "");

    //Put words into separate array, using their number -1 as index, making them sorted by number
    sortedWords[number - 1] = word;

    //If numbers were not guaranteed to be consecutive, we would loop over the array again, setting indexes manually to remove empty slots
  });

  //Combine array of sorted words into a string again
  output = sortedWords.join(" ");

  return output;
}
