const toBase64 = (string) => {
  return Buffer.from(string).toString('base64')
}

module.exports = {
  toBase64
}