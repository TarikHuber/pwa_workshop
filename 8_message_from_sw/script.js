const butSend = document.getElementById("butSend");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", function (event) {
    console.log(event.data);
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

butSend.addEventListener("click", function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.controller.postMessage({
      name: "Tarik",
      surname: "Huber",
      title: "babo",
    });
  }
});
