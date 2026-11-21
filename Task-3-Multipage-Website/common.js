// Mobile navigation menu
const menuButton = document.querySelector(".menu");
const navigation = document.querySelector("nav");
menuButton.addEventListener("click", function () {
  navigation.classList.toggle("open");
});

// Save dark or light mode
const themeButton = document.querySelector("#themeButton");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  const mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});
