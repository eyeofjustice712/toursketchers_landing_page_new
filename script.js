const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const reveals = document.querySelectorAll(".reveal");


// Sticky header
window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


// Mobile menu
menuToggle.addEventListener("click", () => {

  mobileMenu.classList.toggle("open");

});


// Close mobile menu after clicking a link
mobileMenu.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });

});


// Scroll reveal
const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.15
  }
);


reveals.forEach(element => {
  observer.observe(element);
});


// Smooth anchor navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e) {

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


document.addEventListener("DOMContentLoaded", function () {

const carousel = document.querySelector(".testimonial-carousel");
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".testimonial-dot");

const prevButton = document.querySelector(".testimonial-prev");
const nextButton = document.querySelector(".testimonial-next");

let currentSlide = 0;

/*
3500 = 3.5 seconds
*/
const rotationSpeed = 3500;

let autoRotate;

function showSlide(index) {

if (index >= slides.length) {
  index = 0;
}

if (index < 0) {
  index = slides.length - 1;
}

currentSlide = index;


slides.forEach((slide, i) => {
  slide.classList.toggle(
    "is-active",
    i === currentSlide
  );
});


dots.forEach((dot, i) => {

  const active = i === currentSlide;

  dot.classList.toggle(
    "is-active",
    active
  );

  dot.setAttribute(
    "aria-selected",
    active ? "true" : "false"
  );

});

}

function nextSlide() {
showSlide(currentSlide + 1);
}

function startAutoRotate() {
stopAutoRotate();

autoRotate = setInterval(
  nextSlide,
  rotationSpeed
);

}

function stopAutoRotate() {
clearInterval(autoRotate);
}

/* NEXT */

nextButton.addEventListener("click", function () {
nextSlide();
startAutoRotate();
});

/* PREVIOUS */

prevButton.addEventListener("click", function () {
showSlide(currentSlide - 1);
startAutoRotate();
});

/* DOTS */

dots.forEach((dot, index) => {

dot.addEventListener("click", function () {
  showSlide(index);
  startAutoRotate();
});

});

/*
Pause while the user is interacting
with the carousel.
*/

carousel.addEventListener(
"mouseenter",
stopAutoRotate
);

carousel.addEventListener(
"mouseleave",
startAutoRotate
);

carousel.addEventListener(
"focusin",
stopAutoRotate
);

carousel.addEventListener(
"focusout",
function (event) {

  /*
    Only restart when focus has actually
    left the carousel.
  */
  if (!carousel.contains(event.relatedTarget)) {
    startAutoRotate();
  }

}

);

/* KEYBOARD */

document.addEventListener("keydown", function (event) {

/*
  Only respond to arrow keys when the
  carousel itself is focused/being used.
*/
if (!carousel.matches(":hover") &&
    !carousel.contains(document.activeElement)) {
  return;
}

if (event.key === "ArrowRight") {
  event.preventDefault();

  nextSlide();
  startAutoRotate();
}

if (event.key === "ArrowLeft") {
  event.preventDefault();

  showSlide(currentSlide - 1);
  startAutoRotate();
}

});

/* START */

showSlide(0);
startAutoRotate();

});
