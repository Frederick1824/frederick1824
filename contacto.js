const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const contactPageUrl = "https://fedemontoro.vercel.app/contacto.html";

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
    const contactData = Object.fromEntries(formData.entries());
    contactData._url = contactPageUrl;

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    contactForm.setAttribute("aria-busy", "true");
    formStatus.textContent = "Enviando mensaje...";
    formStatus.className = "form-status";

    try {
      await submitContactForm(contactData);
      contactForm.reset();
      formStatus.textContent = "Mensaje enviado correctamente. Te responderé a la brevedad.";
      formStatus.className = "form-status is-success";
    } catch (error) {
      console.error("Contact form submission failed:", error);
      formStatus.textContent = getSubmissionErrorMessage(error);
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

async function submitContactForm(contactData) {
  const endpoint = "https://formsubmit.co/ajax/fede.montoro1824@gmail.com";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(contactData),
  });

  const responseText = await response.text();
  const result = parseJsonResponse(responseText);
  const isSuccessful =
    response.ok && (result?.success === true || result?.success === "true");

  if (!isSuccessful) {
    const error = new Error(result?.message || "FormSubmit rejected the submission.");
    error.status = response.status;
    throw error;
  }

  return result;
}

function parseJsonResponse(responseText) {
  try {
    return JSON.parse(responseText);
  } catch (error) {
    return null;
  }
}

function getSubmissionErrorMessage(error) {
  const providerMessage = error instanceof Error ? error.message : "";

  if (/confirm|activate|activation|verify/i.test(providerMessage)) {
    return "Falta activar el formulario. Revisá el correo de confirmación de FormSubmit.";
  }

  return "No se pudo enviar el mensaje. Intentá nuevamente en unos minutos.";
}
