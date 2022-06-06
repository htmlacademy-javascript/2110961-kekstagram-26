function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isLengthTrue(inputLength, maxLength) {
  if (inputLength <= maxLength) {
    return true;
  }
  return false;
}