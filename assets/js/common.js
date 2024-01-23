const header = document.querySelector("header");
const nav = document.querySelector("nav");
const menuIcon = document.querySelector(".fa-bars");
const BASE_URL = "http://localhost:8080";
window.addEventListener("scroll", function () {
  header.classList.toggle("header-scroll", window.scrollY > 0);
});

menuIcon.addEventListener("click", function () {
  nav.classList.toggle("show");
  menuIcon.classList.contains("fa-bars")
    ? (menuIcon.className = "fa-solid fa-x")
    : (menuIcon.className = "fa-solid fa-bars");
});

function setLocaleProduct(favs) {
  localStorage.setItem("fav", JSON.stringify(favs));
}
function getLocaleProduct() {
  return JSON.parse(localStorage.getItem("fav")) ?? [];
}
