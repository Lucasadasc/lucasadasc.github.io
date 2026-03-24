


import "./glight.js"

const header = document.querySelector(".site-header");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const SCROLLED_ON = 80;
const SCROLLED_OFF = 20;
let headerIsScrolled = window.scrollY >= SCROLLED_ON;
let activeSectionId = null;
let ticking = false;

const setHeaderState = (scrollY) => {
  if (!header) return;

  // Histerese evita alternancia rapida no limiar do topo.
  if (!headerIsScrolled && scrollY >= SCROLLED_ON) {
    headerIsScrolled = true;
  } else if (headerIsScrolled && scrollY <= SCROLLED_OFF) {
    headerIsScrolled = false;
  }

  header.classList.toggle("is-scrolled", headerIsScrolled);
};

const setActiveLink = (scrollY) => {
  const scrollPos = scrollY + 100;
  let currentSectionId = null;

  for (const sec of sections) {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      currentSectionId = sec.id;
      break;
    }
  }

  if (currentSectionId === activeSectionId) return;

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSectionId}`;
    link.classList.toggle("active", isActive);
  });

  activeSectionId = currentSectionId;
};

const handleScroll = () => {
  const scrollY = window.scrollY;
  setHeaderState(scrollY);
  setActiveLink(scrollY);
  ticking = false;
};

const onScroll = () => {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(handleScroll);
};

// Smooth Scroll
document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});

window.addEventListener("scroll", onScroll, { passive: true });
handleScroll();
