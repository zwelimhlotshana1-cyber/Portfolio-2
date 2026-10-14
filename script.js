var extraStyle = document.createElement("style");
extraStyle.textContent = `
      @media (prefers-reduced-motion: no-preference) {
        html { scroll-behavior: smooth; }
      }
      nav .links a.active { border-bottom: 2px solid var(--accent); }

      .float-btn {
        position: fixed;
        right: 20px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid var(--line);
        background: var(--card);
        color: var(--ink);
        font-size: 1.2rem;
        cursor: pointer;
      }
      .float-btn:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
      #theme-btn { bottom: 20px; }
      #top-btn { bottom: 74px; display: none; }

      :root.dark {
        --bg: #12191b;
        --ink: #e6eeee;
        --muted: #9fb0b3;
        --line: #2b3a3d;
        --accent: #5fc4c4;
        --card: #1b2629;
      }
      :root.dark .btn:not(.plain) { color: #0b1a1a; }
    `;
document.head.appendChild(extraStyle);

var themeBtn = document.createElement("button");
themeBtn.id = "theme-btn";
themeBtn.className = "float-btn";
themeBtn.setAttribute("aria-label", "Switch between light and dark mode");
document.body.appendChild(themeBtn);

function setTheme(isDark) {
  if (isDark == true) {
    document.documentElement.classList.add("dark");
    themeBtn.textContent = "☀";
  } else {
    document.documentElement.classList.remove("dark");
    themeBtn.textContent = "☾";
  }
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {
    // storage not available, that's fine
  }
}

var startDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
try {
  var saved = localStorage.getItem("theme");
  if (saved == "dark") {
    startDark = true;
  }
  if (saved == "light") {
    startDark = false;
  }
} catch (e) {}
setTheme(startDark);

themeBtn.addEventListener("click", function () {
  var nowDark = document.documentElement.classList.contains("dark");
  setTheme(!nowDark);
});

var topBtn = document.createElement("button");
topBtn.id = "top-btn";
topBtn.className = "float-btn";
topBtn.textContent = "↑";
topBtn.setAttribute("aria-label", "Back to top");
document.body.appendChild(topBtn);

topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0 });
});

var navLinks = document.querySelectorAll("nav .links a");
var sections = document.querySelectorAll("main section");

function onScroll() {
  // back-to-top button
  if (window.scrollY > 400) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }

  var current = "";
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top <= 120) {
      current = sections[i].id;
    }
  }

  for (var j = 0; j < navLinks.length; j++) {
    if (navLinks[j].getAttribute("href") == "#" + current) {
      navLinks[j].classList.add("active");
    } else {
      navLinks[j].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", onScroll);
onScroll();
