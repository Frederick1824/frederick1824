const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const contactPageUrl = "https://fedemontoro.vercel.app/contacto.html";

const getContactLanguage = () => document.documentElement.lang === "en" ? "en" : "es";

const contactMessages = {
  es: {
    required: "Completá este campo.",
    invalid: "Revisá los campos obligatorios antes de continuar.",
    sendingButton: "Enviando...",
    sending: "Enviando mensaje...",
    success: "Mensaje enviado correctamente. Te responderé a la brevedad.",
    activation:
      "Falta activar el formulario. Revisá el correo de confirmación de FormSubmit.",
    error: "No se pudo enviar el mensaje. Intentá nuevamente en unos minutos.",
  },
  en: {
    required: "Please complete this field.",
    invalid: "Please review the required fields before continuing.",
    sendingButton: "Sending...",
    sending: "Sending message...",
    success: "Message sent successfully. I will reply shortly.",
    activation: "The form still needs activation. Please check the FormSubmit confirmation email.",
    error: "The message could not be sent. Please try again in a few minutes.",
  },
};

const contactText = (key) => contactMessages[getContactLanguage()][key];

if (contactForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
  const requiredFields = Array.from(contactForm.querySelectorAll("[required]"));
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const getSubmitButtonLabel = () =>
    submitButton instanceof HTMLButtonElement ? submitButton.textContent : contactText("error");

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
      field.setCustomValidity(field.value.trim() ? "" : contactText("required"));
    });

    if (!contactForm.reportValidity()) {
      formStatus.textContent = contactText("invalid");
      formStatus.className = "form-status is-error";
      return;
    }

    const submitButtonLabel = getSubmitButtonLabel();
    const formData = new FormData(contactForm);
    const contactData = Object.fromEntries(formData.entries());
    contactData._url = contactPageUrl;

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = contactText("sendingButton");
    }

    contactForm.setAttribute("aria-busy", "true");
    formStatus.textContent = contactText("sending");
    formStatus.className = "form-status";

    try {
      await submitContactForm(contactData);
      contactForm.reset();
      formStatus.textContent = contactText("success");
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
    return contactText("activation");
  }

  return contactText("error");
}
