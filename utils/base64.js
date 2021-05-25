const toBase64 = (string) => {
  return Buffer.from(string, 'base64')
}

module.exports = {
  toBase64
}