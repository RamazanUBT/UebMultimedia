document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.querySelectorAll(".buttons a");

  buttons.forEach(function (button) {
    let color = button.dataset.color;

    button.addEventListener("mouseenter", function () {
      button.style.backgroundColor = color;
    });
    button.addEventListener("mouseleave", function () {
      button.style.backgroundColor = "#7b844d";
    });
  });
});
