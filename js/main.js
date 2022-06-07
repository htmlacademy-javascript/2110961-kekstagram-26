function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isLengthTrue(inputValue, maxLength) {
  if (inputValue.length <= maxLength) {
    return true;
  }
  return false;
}

getRandom(50, 150);

isLengthTrue('абвгдежзиклмнопр', 10);


