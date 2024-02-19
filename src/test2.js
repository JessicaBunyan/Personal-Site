function rand(min, max) {
  // min and max included
  return Math.random() * (max - min + 1) + min;
}

console.log(rand(500, 100));
