const butShare = document.getElementById("butShare");

butShare.addEventListener("click", () => {
  if (navigator.share) {
    navigator
      .share({
        title: "Web Fundamentals",
        text: "Check out Web Fundamentals — it rocks!",
        url: "https://developers.google.com/web",
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  }
});
