window.addEventListener("DOMContentLoaded", e => {
  var l = document.querySelector("#scroller-left");
  var r = document.querySelector("#scroller-right");

  l.addEventListener("click", e => moveLeft(e));
  r.addEventListener("click", e => moveRight(e));
});

function moveLeft() {
  var active = document.querySelector(".testimonial.active");

  var next = active.previousElementSibling;

  if (!next) {
    return;
  }

  active.classList.add("right");
  active.classList.remove("active");
  next.classList.add("active");
  next.classList.remove("left");
}

function moveRight() {
  var active = document.querySelector(".testimonial.active");

  var next = active.nextElementSibling;

  console.log(next);
  if (!next) {
    return;
  }

  active.classList.add("left");
  active.classList.remove("active");
  next.classList.add("active");
  next.classList.remove("right");
}
