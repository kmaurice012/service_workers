if (navigator.serviceWorker) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(
        "/home/byron/Projects/personal/Javascript/service_worker/serviceWorker.js"
      )
      .then((reg) => console.log("service worker registered"))
      .catch((err) => console.log(`Here is the error: ${err}`));
  });
}
