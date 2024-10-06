function calculateProgress(promises, callback) {
  let progress = 0;
  return Promise.all(
    promises.map((promise) => {
      return promise.then((result) => {
        progress++;
        let progressInPercent = (progress / promises.length) * 100;
        callback(+progressInPercent.toFixed(2));

        if (progressInPercent >= 100) {
          setTimeout(() => {
            callback(0);
          }, 250);
        }
        return result;
      });
    })
  );
}

export default calculateProgress;
