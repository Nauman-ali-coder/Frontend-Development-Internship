const cards = document.querySelectorAll(".card");

// Change prices when Monthly or Yearly is clicked
document.getElementById("monthly").addEventListener("click", function () {
  cards.forEach(function (card) {
    card.querySelector(".price").textContent = card.dataset.month;
    card.querySelector(".period").textContent = "/ month";
  });
});

document.getElementById("yearly").addEventListener("click", function () {
  cards.forEach(function (card) {
    card.querySelector(".price").textContent = card.dataset.year;
    card.querySelector(".period").textContent = "/ year";
  });
});

// Filter cards
document.querySelectorAll(".filter").forEach(function (button) {
  button.addEventListener("click", function () {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    cards.forEach(function (card) {
      const category = button.dataset.type;
      card.style.display = (category === "all" || card.dataset.category === category) ? "block" : "none";
    });
  });
});

// Choose plan button
document.querySelectorAll(".choose").forEach(function (button) {
  button.addEventListener("click", function () {
    document.getElementById("message").textContent = "You selected a plan!";
  });
});
