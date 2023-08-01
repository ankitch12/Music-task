exports.generateRandomString = (len) => {
  let text = "";
  let possible = "123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
