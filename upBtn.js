const upButton = document.querySelector(".btn-up-arrow");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    upButton.classList.add("show");
  } else {
    upButton.classList.remove("show");
  }
});

upButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});