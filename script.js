const revealItems = document.querySelectorAll(".reveal");
const themeToggle = document.querySelector(".theme-toggle");
const themeImages = document.querySelectorAll("[data-light-src][data-dark-src]");
const themeStorageKey = "theme";
const cursorGlowQuery = window.matchMedia(
  "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
);

if (cursorGlowQuery.matches) {
  const cursorGlow = document.createElement("div");
  let cursorFrame = 0;
  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;

  cursorGlow.className = "cursor-glow";
  cursorGlow.setAttribute("aria-hidden", "true");
  document.body.prepend(cursorGlow);

  const updateCursorGlow = () => {
    cursorGlow.style.setProperty("--cursor-x", `${cursorX}px`);
    cursorGlow.style.setProperty("--cursor-y", `${cursorY}px`);
    cursorGlow.classList.add("is-active");
    cursorFrame = 0;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;

      if (!cursorFrame) {
        cursorFrame = requestAnimationFrame(updateCursorGlow);
      }
    },
    { passive: true },
  );

  document.documentElement.addEventListener("mouseleave", () => {
    cursorGlow.classList.remove("is-active");
  });
}

const preloadThemeImages = () => {
  themeImages.forEach((image) => {
    const lightImage = new Image();
    const darkImage = new Image();

    lightImage.src = image.dataset.lightSrc;
    darkImage.src = image.dataset.darkSrc;
  });
};

const updateThemeImages = (isDarkMode, animate = false) => {
  const imageUpdates = Array.from(themeImages, (image) => {
    const nextSource = isDarkMode ? image.dataset.darkSrc : image.dataset.lightSrc;

    return new Promise((resolve) => {
      const finishSwap = () => {
        image.removeEventListener("load", finishSwap);
        image.removeEventListener("error", finishSwap);
        image.classList.remove("is-switching");
        resolve();
      };

      if (!nextSource) {
        finishSwap();
        return;
      }

      if (image.getAttribute("src") === nextSource && image.complete) {
        finishSwap();
        return;
      }

      if (animate) {
        image.classList.add("is-switching");
      }

      image.addEventListener("load", finishSwap, { once: true });
      image.addEventListener("error", finishSwap, { once: true });
      image.src = nextSource;

      if (image.complete) {
        requestAnimationFrame(finishSwap);
      }
    });
  });

  return Promise.all(imageUpdates);
};

const updateThemeToggle = () => {
  if (!(themeToggle instanceof HTMLButtonElement)) {
    return;
  }

  const isDarkMode = document.body.classList.contains("dark-mode");
  const label = isDarkMode ? "Activar modo claro" : "Activar modo oscuro";

  themeToggle.setAttribute("aria-label", label);
  themeToggle.setAttribute("aria-pressed", String(isDarkMode));
  themeToggle.title = label;
};

const initialDarkMode = document.body.classList.contains("dark-mode");

updateThemeImages(initialDarkMode).finally(() => {
  document.body.classList.remove("theme-images-loading");
});
updateThemeToggle();
preloadThemeImages();

themeToggle?.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");

  try {
    localStorage.setItem(themeStorageKey, isDarkMode ? "dark" : "light");
  } catch (error) {
    // Theme switching still works for the current visit without storage.
  }

  updateThemeImages(isDarkMode, true);
  updateThemeToggle();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -60px 0px",
  },
);

revealItems.forEach((item) => observer.observe(item));
