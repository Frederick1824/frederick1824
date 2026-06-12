const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
  const requiredFields = Array.from(contactForm.querySelectorAll("[required]"));
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const submitButtonLabel =
    submitButton instanceof HTMLButtonElement ? submitButton.textContent : "Enviar consulta";

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      field.setCustomValidity("");

      if (formStatus.classList.contains("is-error")) {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }
    });
  });

  contactForm.addEventListener("submit", async (event) => {
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

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    contactForm.setAttribute("aria-busy", "true");
    formStatus.textContent = "Enviando mensaje...";
    formStatus.className = "form-status";

    try {
      await submitContactForm(formData);
      contactForm.reset();
      formStatus.textContent = "Mensaje enviado correctamente. Te responderé a la brevedad.";
      formStatus.className = "form-status is-success";
    } catch (error) {
      formStatus.textContent =
        "No se pudo enviar el mensaje. Intentá nuevamente en unos minutos.";
      formStatus.className = "form-status is-error";
    } finally {
      contactForm.removeAttribute("aria-busy");

      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = submitButtonLabel;
      }
    }
  });
}

async function submitContactForm(formData) {
  const endpoint = "https://formsubmit.co/ajax/fede.montoro1824@gmail.com";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const result = await response.json().catch(() => null);
  const isSuccessful =
    response.ok && (result?.success === true || result?.success === "true");

  if (!isSuccessful) {
    throw new Error(result?.message || "FormSubmit rejected the submission.");
  }

  return result;
}
