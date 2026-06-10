const revealItems = document.querySelectorAll(".reveal");
const themeToggle = document.querySelector(".theme-toggle");
const themeImages = document.querySelectorAll("[data-light-src][data-dark-src]");
const themeStorageKey = "theme";

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

document.querySelectorAll(".project-card").forEach((card) => {
  const action = card.querySelector(".project-action");

  if (!action) {
    return;
  }

  const links = [
    ["demo", "Ver demo"],
    ["repo", "Ver repositorio"],
    ["docs", "Ver documentación"],
  ];
  const available = links.find(([key]) => card.dataset[key]);

  if (!available) {
    action.textContent = "Próximamente";
    action.classList.add("upcoming");
    return;
  }

  const [key, label] = available;
  const href = card.dataset[key];

  if (action instanceof HTMLAnchorElement) {
    action.textContent = label;
    action.href = href;
    action.classList.remove("upcoming");
    return;
  }

  const link = document.createElement("a");
  link.className = action.className.replace("upcoming", "").trim();
  link.classList.add("project-action");
  link.href = href;
  link.textContent = label;
  action.replaceWith(link);
});
