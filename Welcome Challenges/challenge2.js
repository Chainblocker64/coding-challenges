function maskify(input) {
  if (typeof input !== "string") {
    return "";
  }

  let output = input;

  //Define parameters to configure maskification
  const keepLastCharacters = 4;
  const censor = "#";

  //Get difference of characters to censor and full length to know how many characters to censor
  const inputLength = input.length;
  const censorAmount = inputLength - keepLastCharacters;

  let censored = "";

  //Add amount of censored characters to last X characters of the input
  if (censorAmount > 0) {
    censored = censor.repeat(censorAmount);
    output = censored + input.slice(-keepLastCharacters);
  }

  return output;
}
