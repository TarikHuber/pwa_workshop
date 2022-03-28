if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((registration) => {
      console.log("default registration", registration);
    });

    navigator.serviceWorker
      .register("/sw2.js", { scope: "deep_link_scope" })
      .then((registration) => {
        console.log("scope registration", registration);
      });
  });
}
