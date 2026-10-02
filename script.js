document.getElementById("year").textContent = new Date().getFullYear();

const root = document.documentElement;
const themeBtn = document.getElementById("theme");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(saved || (prefersDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const words = ["Slack bots", "small websites", "things that work"];
const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typed.textContent = words[0];
} else {
  let w = 0, c = 0, deleting = false;
  (function tick() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (!deleting && c === word.length) {
      deleting = true;
      return setTimeout(tick, 1500);
    }
    if (deleting && c === 0) {
      deleting = false;
      w = (w + 1) % words.length;
    }
    c += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 40 : 90);
  })();
}
