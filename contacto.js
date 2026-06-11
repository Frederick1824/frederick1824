const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
  const requiredFields = Array.from(contactForm.querySelectorAll("[required]"));

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      field.setCustomValidity("");
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    requiredFields.forEach((field) => {
      field.setCustomValidity(field.value.trim() ? "" : "Completá este campo.");
    });

    if (!contactForm.reportValidity()) {
      formStatus.textContent = "Revisá los campos obligatorios antes de continuar.";
      formStatus.className = "form-status is-error";
      return;
    }

    const formData = new FormData(contactForm);
    const nombre = String(formData.get("nombre")).trim();
    const telefono = String(formData.get("telefono")).trim();
    const email = String(formData.get("email")).trim();
    const mensaje = String(formData.get("mensaje")).trim();
    const subject = "Nueva consulta desde fedemontoro.com.ar";
    const body = [
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Email: ${email}`,
      "",
      "Mensaje:",
      mensaje,
    ].join("\n");
    const mailtoLink =
      `mailto:fede.montoro1824@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    formStatus.textContent = "Consulta preparada. Se abrirá tu cliente de correo.";
    formStatus.className = "form-status is-success";

    window.setTimeout(() => {
      window.location.href = mailtoLink;
    }, 100);
  });
}
