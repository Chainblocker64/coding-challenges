function missingLetter(input) {
  //Sort input alphabetically
  input.sort();

  //Check if upper- or lowercase
  const upperCase = input[0] === input[0].toUpperCase();

  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  if (upperCase) {
    alphabet = alphabet.toUpperCase();
  }

  let alphabetArray = alphabet.split("");

  //Cut down alphabet array to start with the same letter as the input
  alphabetArray.forEach((letter, index) => {
    if (letter == input[0]) {
      alphabetArray = alphabetArray.slice(index);
    }
  });

  /*
   * Only keep letters that are not included in the input array.
   * Our alphabet starts with the same letter as the input and the input is alphabetically sorted.
   * If we now remove all the letters from the input from the alphabet, the first letter remaining in the alphabet will be the missing one
   */
  alphabetArray = alphabetArray.filter((letter) => !input.includes(letter));

  return alphabetArray[0];
}
