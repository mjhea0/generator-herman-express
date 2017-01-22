(() => {

  // *** helpers *** //

  function sumWithCallback(num1, num2, callback) {
    const total = num1 + num2;
    setTimeout(() => {
      if (isNaN(total)) {
        callback('Something went wrong!');
      } else {
        callback(null, total);
      }
    }, 1000);
  }

  function sumSync(num1, num2) {
    const total = parseInt(num1, 10) + parseInt(num2, 10);
    if (isNaN(total)) {
      throw new Error('Something went wrong!');
    } else {
      return total;
    }
  }

  function sumWithPromise(num1, num2) {
    return new Promise((resolve, reject) => {
      const total = num1 + num2;
      setTimeout(() => {
        if (isNaN(total)) {
          reject('Something went wrong!');
        } else {
          resolve(total);
        }
      }, 1000);
    });
  }

  // *** public *** //
  module.exports = {
    sumSync,
    sumWithCallback,
    sumWithPromise,
  };

})();
