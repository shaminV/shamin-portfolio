const profileLinks = {
  linkedin: "",
  github: ""
};

const root = document.documentElement;
const header = document.getElementById("siteHeader");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const toast = document.getElementById("toast");

const savedTheme = localStorage.getItem("sv-theme");
if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
updateThemeIcon();

document.getElementById("year").textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuBtn.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("sv-theme", root.dataset.theme);
  updateThemeIcon();
});

function updateThemeIcon(){
  const isLight = root.dataset.theme === "light";
  themeIcon.textContent = isLight ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
}

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 18);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...nav.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

document.getElementById("copyEmail").addEventListener("click", async () => {
  const email = "shaminvihanga328@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied");
  } catch {
    showToast(email);
  }
});

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

document.querySelectorAll("[data-social]").forEach(link => {
  const key = link.dataset.social;
  const url = profileLinks[key];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.classList.remove("social-placeholder");
    link.removeAttribute("aria-disabled");
  } else {
    link.addEventListener("click", event => {
      event.preventDefault();
      showToast(`Add your ${key === "linkedin" ? "LinkedIn" : "GitHub"} URL in script.js`);
    });
  }
});
