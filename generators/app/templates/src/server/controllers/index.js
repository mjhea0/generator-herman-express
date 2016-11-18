function sum(num1, num2, callback) {
  const total = num1 + num2;
  if (isNaN(total)) {
    callback('Something went wrong!');
  } else {
    callback(null, total);
  }
}

module.exports = {
  sum
};
