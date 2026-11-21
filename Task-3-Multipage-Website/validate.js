const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  document.getElementById("nameError").textContent =
    name.length < 2 ? "Name must contain at least 2 characters." : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  document.getElementById("emailError").textContent =
    !emailPattern.test(email) ? "Enter a valid email address." : "";

  document.getElementById("messageError").textContent =
    message.length < 10 ? "Message must contain at least 10 characters." : "";

  if (name.length >= 2 && emailPattern.test(email) && message.length >= 10) {
    document.getElementById("success").textContent =
      "Your form is valid! (Demo only: no message was sent.)";
    form.reset();
  } else {
    document.getElementById("success").textContent = "";
  }
});
