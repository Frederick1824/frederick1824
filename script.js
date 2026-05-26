const revealItems = document.querySelectorAll(".reveal");

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
