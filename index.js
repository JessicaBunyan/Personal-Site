window.addEventListener("DOMContentLoaded", e => {
  var l = document.querySelector("#scroller-left");
  var r = document.querySelector("#scroller-right");

  l.addEventListener("click", e => moveLeft(e));
  r.addEventListener("click", e => moveRight(e));
});

function moveLeft() {
  var active = document.querySelector(".testimonial.active");

  active.classList.add("right");
  active.classList.remove("active");

  var next = active.previousElementSibling;
  next.classList.add("active");
  next.classList.remove("left");

  console.log(active);
}

function moveRight() {
  var active = document.querySelector(".testimonial.active");

  active.classList.add("left");
  active.classList.remove("active");

  var next = active.nextElementSibling;
  next.classList.add("active");
  next.classList.remove("right");

  console.log(active);
}
