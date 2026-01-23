const bulb = document.getElementById("bulb-toggle");
const bulbIcon = document.getElementById("bulb-icon");
const htmlElement = document.documentElement;

// Check for saved theme preference or use system preference
const getSavedTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    return saved;
  }
  // Check system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// Apply theme
const applyTheme = (theme) => {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    htmlElement.classList.add("dark");
    // bulb visual update only if present
    if (bulbIcon) {
      bulbIcon.classList.remove('lit');
      bulbIcon.classList.add('unlit');
      bulbIcon.setAttribute('aria-hidden', 'false');
    }
    if (bulb) {
      bulb.setAttribute('aria-pressed', 'true');
    }
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    htmlElement.classList.remove("dark");
    // bulb visual update only if present
    if (bulbIcon) {
      bulbIcon.classList.add('lit');
      bulbIcon.classList.remove('unlit');
      bulbIcon.setAttribute('aria-hidden', 'false');
    }
    if (bulb) {
      bulb.setAttribute('aria-pressed', 'false');
    }
    localStorage.setItem("theme", "light");
  }
};

// Initialize theme on page load
const initialTheme = getSavedTheme();
applyTheme(initialTheme);

// Toggle theme on button click (only if toggle exists)
if (bulb) {
  bulb.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  });
}

// Listen for system theme changes
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
if (prefersDark.addEventListener) {
  prefersDark.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
} else if (prefersDark.addListener) {
  // Safari fallback
  prefersDark.addListener((e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}

// Hamburger menu toggle
const hamburgerToggle = document.getElementById("hamburger-toggle");
const mobileNav = document.getElementById("mobile-nav");

if (hamburgerToggle && mobileNav) {
  hamburgerToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });
}

// Close mobile menu when clicking on a link
if (mobileNav) {
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add("hidden");
    });
  });
}

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
