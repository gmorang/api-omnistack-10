module.exports = function parseStringAsArray(arrayAsString) {
  const newArray = arrayAsString.split(',').map(tech => tech.trim())

  return newArray;
}
