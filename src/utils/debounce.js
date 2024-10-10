function debounce(callback, delay = 300) {
  let timeOutId;
  return (...args) => {
    console.log(timeOutId);
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export default debounce;
