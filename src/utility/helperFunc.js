exports.generateRandomString = (len) => {
  let text = ''
  const possible = '123456789'

  for (let i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
