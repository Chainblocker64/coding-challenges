function likesText(users) {
  let output = "";
  const amount = users.length;

  switch (amount) {
    case 0:
      users[0] = "no one";
    case 1:
      output = users[0] + " likes this";
      break;
    case 2:
      output = users[0] + " and " + users[1] + " like this";
      break;
    default:
      let usersText = users[0] + ", " + users[1] + " and ";

      //Get amount of users to be displayed as number only
      const count = amount - 2;

      //In case of exactly 3 users, list 3rd name instead of number
      if (count > 1) {
        usersText += count + " others";
      } else {
        usersText += users[2];
      }
      output = usersText + " like this";
  }

  return output;
}
