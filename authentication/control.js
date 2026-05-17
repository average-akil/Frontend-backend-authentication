const myPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    new Promise((res) =>
      setTimeout(() => res("Operation completed successfully"), 3000),
    ).then((message) => {
      resolve(message);
    });
  } else {
    reject("The operation failed");
  }
});

myPromise
  .then((msg) => {
    console.log("Success" + msg);
  })
  .then((msg) => {
    console.log("This will run after the first time");
  })
  .catch((err) => {
    console.log("Error: " + err);
  })
  .finally(() => {
    console.log("This will run  regardless of the outcome");
  });
