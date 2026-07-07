const revealItems = document.querySelectorAll(".reveal");
const themeToggle = document.querySelector(".theme-toggle");
const languageToggle = document.getElementById("languageToggle");
const themeImages = document.querySelectorAll("[data-light-src][data-dark-src]");
const themeStorageKey = "theme";
const languageStorageKey = "language";
const defaultLanguage = "es";
const pageName = document.body.dataset.page || "index";

const pageMeta = {
  index: {
    es: {
      title: "Federico Montoro | Junior Software Developer",
      description:
        "Ecosistema profesional de Federico Montoro: perfil, proyectos, trabajos académicos y FreToKa Lab.",
    },
    en: {
      title: "Federico Montoro | Junior Software Developer",
      description:
        "Federico Montoro's professional ecosystem: profile, projects, academic work, and FreToKa Lab.",
    },
  },
  "sobre-mi": {
    es: {
      title: "Sobre mí | Federico Montoro",
      description:
        "La historia personal de Federico Montoro: vocación de servicio, comunicación, música, naturaleza y tecnología con propósito.",
    },
    en: {
      title: "About me | Federico Montoro",
      description:
        "Federico Montoro's personal story: service mindset, communication, music, nature, and purposeful technology.",
    },
  },
  proyectos: {
    es: {
      title: "Proyectos Académicos | Federico Montoro",
      description:
        "Proyectos académicos destacados desarrollados por Federico Montoro durante su formación en el ISPC y la UPC.",
    },
    en: {
      title: "Academic Projects | Federico Montoro",
      description:
        "Featured academic projects developed by Federico Montoro during his education at ISPC and UPC.",
    },
  },
  contacto: {
    es: {
      title: "Enviar mensaje | Federico Montoro",
      description:
        "Formulario de contacto de Federico Montoro para consultas sobre desarrollo y soluciones digitales.",
    },
    en: {
      title: "Send message | Federico Montoro",
      description:
        "Federico Montoro's contact form for inquiries about development and digital solutions.",
    },
  },
  "certificaciones-unc": {
    es: {
      title: "Certificaciones UNC | Federico Montoro",
      description:
        "Certificaciones oficiales de Federico Montoro realizadas a través del Campus Virtual UNC.",
    },
    en: {
      title: "UNC Certifications | Federico Montoro",
      description:
        "Official certifications completed by Federico Montoro through the UNC Virtual Campus.",
    },
  },
};

const textTranslations = {
  "Inicio": "Home",
  "Perfil": "Profile",
  "Sobre mí": "About me",
  "Experiencia": "Experience",
  "Formación": "Education",
  "Contacto": "Contact",
  "Ver GitHub": "View GitHub",
  "Ver LinkedIn": "View LinkedIn",
  "Descargar CV": "Download CV",
  "Enviar mensaje": "Send message",
  "Enviar consulta": "Send inquiry",
  "Volver a contacto": "Back to contact",
  "Volver al portfolio": "Back to portfolio",
  "Perfil profesional": "Professional profile",
  "Perfil Profesional": "Professional Profile",
  "Backend · Full-Stack · Procesos y análisis operativo":
    "Backend · Full-Stack · Processes and operational analysis",
  "Mi nombre es Federico Montoro y actualmente me encuentro desarrollando mi formación en tecnología y desarrollo de software, combinando estudios académicos, proyectos prácticos y aprendizaje continuo.":
    "My name is Federico Montoro, and I am currently building my path in technology and software development through academic study, practical projects, and continuous learning.",
  "Inicié mi recorrido en programación en 2025 cursando la Tecnicatura Universitaria en Programación Full Stack en la Universidad Provincial de Córdoba. Posteriormente amplié mi formación incorporando la Tecnicatura Superior en Desarrollo de Software del Instituto Superior Politécnico Córdoba, complementando este proceso con cursos, certificaciones y programas de formación continua dictados por distintas instituciones, entre ellas la Universidad Nacional de Córdoba.":
    "I began my programming journey in 2025 through the University Technician Degree in Full Stack Programming at Universidad Provincial de Córdoba. Later, I expanded my academic development by joining the Higher Technical Degree in Software Development at Instituto Superior Politécnico Córdoba, complementing this process with courses, certifications, and continuous training programs from different institutions, including Universidad Nacional de Córdoba.",
  "Antes de ingresar al mundo del desarrollo construí una sólida trayectoria profesional vinculada a Customer Success, Customer Experience, procesos comerciales y análisis operativo. Durante esos años desarrollé habilidades de comunicación, gestión de clientes, resolución de problemas, orientación a resultados y mejora continua, participando activamente en la construcción de experiencias positivas para usuarios y clientes.":
    "Before entering the software development field, I built a strong professional background in Customer Success, Customer Experience, commercial processes, and operational analysis. During those years, I developed skills in communication, client management, problem solving, results orientation, and continuous improvement, actively contributing to positive experiences for users and clients.",
  "Esa experiencia me permite aportar una visión integral que combina tecnología, negocio y personas. No solo me interesa cómo funciona una solución digital, sino también qué problema resuelve, cómo impacta en quienes la utilizan y de qué manera puede generar valor real para una organización.":
    "That experience allows me to bring an integrated perspective that connects technology, business, and people. I am interested not only in how a digital solution works, but also in the problem it solves, how it affects the people who use it, and how it can create real value for an organization.",
  "Me apasiona el desarrollo de soluciones centradas en el usuario, la optimización de procesos y la construcción de herramientas simples, útiles y escalables. Disfruto trabajar en equipo, aprender de manera constante y transformar ideas en proyectos concretos que mejoren la experiencia de las personas.":
    "I am passionate about user-centered solutions, process optimization, and building simple, useful, and scalable tools. I enjoy teamwork, constant learning, and turning ideas into concrete projects that improve people’s experiences.",
  "Actualmente continúo fortaleciendo mi perfil en áreas como desarrollo Full Stack, bases de datos, análisis funcional, Customer Success y entornos B2B SaaS, participando además en iniciativas propias como FreToKa Lab, donde exploro tecnologías, metodologías y soluciones aplicadas a necesidades reales.":
    "I am currently strengthening my profile in areas such as Full Stack development, databases, functional analysis, Customer Success, and B2B SaaS environments, while also working on personal initiatives such as FreToKa Lab, where I explore technologies, methodologies, and solutions applied to real needs.",
  "Formación académica": "Academic background",
  "Formación y desarrollo profesional.": "Education and professional development.",
  "Carreras, certificaciones y actualización continua para una formación tecnológica integral.":
    "Degree programs, certifications, and continuous learning for a well-rounded technology profile.",
  "Trayectoria profesional": "Professional background",
  "EXPERIENCIA PROFESIONAL": "PROFESSIONAL EXPERIENCE",
  "Customer Success · Procesos comerciales · Resolución de problemas":
    "Customer Success · Commercial processes · Problem solving",
  "Cuento con una amplia experiencia en Customer Success, Customer Experience, procesos comerciales y análisis operativo. A lo largo de mi trayectoria desarrollé una fuerte capacidad para comprender necesidades, resolver problemas concretos y acompañar a las personas con una comunicación clara, cercana y orientada a resultados.":
    "I have broad experience in Customer Success, Customer Experience, commercial processes, and operational analysis. Throughout my career, I developed a strong ability to understand needs, solve concrete problems, and support people through clear, approachable, results-oriented communication.",
  "Mi perfil combina criterio comercial, vocación de servicio y mirada operativa. Esa base me permite entender no solo cómo construir una solución digital, sino también para qué se necesita, qué problema resuelve y cómo puede mejorar la experiencia de quien la utiliza.":
    "My profile combines business judgment, a service mindset, and an operational perspective. That foundation helps me understand not only how to build a digital solution, but also why it is needed, what problem it solves, and how it can improve the experience of those who use it.",
  "Hoy aplico esa experiencia previa al desarrollo de software, integrando programación, análisis de procesos y enfoque centrado en el usuario para crear herramientas simples, útiles y sostenibles.":
    "Today I apply that previous experience to software development, integrating programming, process analysis, and a user-centered approach to create simple, useful, and sustainable tools.",
  "Fortalezas profesionales": "Professional strengths",
  "Resolución de problemas": "Problem solving",
  "Perfil comercial": "Commercial profile",
  "Análisis operativo": "Operational analysis",
  "Comunicación clara": "Clear communication",
  "Orientación a resultados": "Results orientation",
  "Tecnologías": "Technologies",
  "Customer Success · B2B SaaS · Operaciones · Procesos":
    "Customer Success · B2B SaaS · Operations · Processes",
  "Universidad Provincial de Córdoba": "Universidad Provincial de Córdoba",
  "Formación Universitaria": "University Education",
  "Tecnicatura Universitaria en Programación Full Stack":
    "University Technician Degree in Full Stack Programming",
  "Formación universitaria orientada al desarrollo Full Stack, integrando frontend, backend, bases de datos y arquitectura de software. A través de proyectos académicos y trabajos colaborativos adquirí experiencia en el diseño y construcción de aplicaciones modernas, fortaleciendo mi capacidad para transformar necesidades reales en soluciones digitales funcionales.":
    "University education focused on Full Stack development, integrating frontend, backend, databases, and software architecture. Through academic projects and collaborative work, I gained experience designing and building modern applications, strengthening my ability to turn real needs into functional digital solutions.",
  "Explorar proyectos UPC": "Explore UPC projects",
  "Instituto Superior Politécnico Córdoba": "Instituto Superior Politécnico Córdoba",
  "Formación Técnica Superior": "Higher Technical Education",
  "Tecnicatura Superior en Desarrollo de Software":
    "Higher Technical Degree in Software Development",
  "Formación técnica centrada en programación, análisis de sistemas, documentación, testing y metodologías de desarrollo. Este recorrido fortaleció mis habilidades para comprender procesos, resolver problemas de manera estructurada y aplicar buenas prácticas en la construcción de software mantenible y escalable.":
    "Technical education focused on programming, systems analysis, documentation, testing, and development methodologies. This path strengthened my ability to understand processes, solve problems in a structured way, and apply good practices when building maintainable, scalable software.",
  "Explorar proyectos ISPC": "Explore ISPC projects",
  "Universidad Nacional de Córdoba": "Universidad Nacional de Córdoba",
  "Certificaciones y Formación Continua": "Certifications and Continuous Learning",
  "Certificaciones oficiales y formación continua desarrolladas a través de la Universidad Nacional de Córdoba, orientadas a innovación, transformación digital, metodologías de trabajo y actualización profesional permanente.":
    "Official certifications and continuous learning completed through Universidad Nacional de Córdoba, focused on innovation, digital transformation, work methodologies, and ongoing professional development.",
  "Explorar certificaciones UNC": "Explore UNC certifications",
  "Laboratorio de soluciones digitales": "Digital solutions lab",
  "Diseño web, digitalización de procesos, automatización de tareas y herramientas de gestión para profesionales, comercios y PyMEs.":
    "Web design, process digitization, task automation, and management tools for professionals, businesses, and SMEs.",
  "Creamos soluciones simples, útiles y enfocadas en mejorar la productividad, la organización y la experiencia de usuario.":
    "We create simple, useful solutions focused on improving productivity, organization, and user experience.",
  "Diseño Web": "Web Design",
  "Landing pages, sitios institucionales y presencia digital profesional.":
    "Landing pages, institutional websites, and professional digital presence.",
  "Digitalización": "Digitization",
  "Transformación de planillas, formularios y procesos manuales en herramientas digitales.":
    "Turning spreadsheets, forms, and manual processes into digital tools.",
  "Automatización": "Automation",
  "Automatización de tareas repetitivas para ahorrar tiempo y reducir errores.":
    "Automation of repetitive tasks to save time and reduce errors.",
  "Herramientas internas para control, seguimiento y gestión operativa.":
    "Internal tools for control, tracking, and operational management.",
  "¿Tenés una idea, proyecto o consulta?": "Do you have an idea, project, or question?",
  "Estoy disponible para conversar sobre desarrollo web, digitalización de procesos, automatización de tareas, herramientas de gestión y soluciones digitales para profesionales, comercios y PyMEs.":
    "I am available to talk about web development, process digitization, task automation, management tools, and digital solutions for professionals, businesses, and SMEs.",
  "Federico Montoro • Transformando ideas en soluciones útiles":
    "Federico Montoro • Turning ideas into useful solutions",
  "Más allá del código": "Beyond code",
  "Personas, naturaleza y tecnología como partes de una misma forma de observar, comprender y construir soluciones.":
    "People, nature, and technology as parts of the same way of observing, understanding, and building solutions.",
  "Perspectiva": "Perspective",
  "Detenerse, observar y volver a mirar.": "Pause, observe, and look again.",
  "Mi historia": "My story",
  "Una mirada humana para resolver problemas reales.":
    "A human perspective for solving real problems.",
  "Desde muy chico aprendí la importancia de escuchar, ayudar y generar vínculos genuinos con las personas. Crecí en una ciudad turística, donde orientar visitantes y colaborar con quienes necesitaban ayuda formó parte de mi día a día. Esa experiencia temprana despertó una vocación de servicio que continúa acompañándome hasta hoy.":
    "From a very young age, I learned the importance of listening, helping, and building genuine relationships with people. I grew up in a tourist city, where guiding visitors and helping those who needed support was part of everyday life. That early experience awakened a service mindset that still stays with me today.",
  "Con el tiempo desarrollé experiencia en atención al cliente, Customer Success, Customer Experience, ventas y procesos comerciales, fortaleciendo habilidades como la escucha activa, la comunicación efectiva y la capacidad para comprender necesidades reales y transformarlas en soluciones concretas.":
    "Over time, I gained experience in customer service, Customer Success, Customer Experience, sales, and commercial processes, strengthening skills such as active listening, effective communication, and the ability to understand real needs and turn them into concrete solutions.",
  "Mi recorrido profesional me permitió trabajar con personas de distintos perfiles, construir relaciones de confianza y entender que detrás de cada proceso, producto o sistema siempre existe una necesidad humana que merece ser comprendida.":
    "My professional path allowed me to work with people from different backgrounds, build relationships based on trust, and understand that behind every process, product, or system there is always a human need worth understanding.",
  "Además de la tecnología, la música ocupa un lugar fundamental en mi vida desde la infancia. También disfruto del deporte, la naturaleza, las actividades al aire libre y los espacios que invitan a reflexionar y observar las cosas desde nuevas perspectivas.":
    "Beyond technology, music has played an important role in my life since childhood. I also enjoy sports, nature, outdoor activities, and spaces that invite reflection and help me see things from new perspectives.",
  "Hoy combino esa experiencia humana y comercial con mi formación en desarrollo de software, buscando crear herramientas útiles, accesibles y orientadas a mejorar la vida de quienes las utilizan.":
    "Today I combine that human and commercial experience with my software development education, aiming to create useful, accessible tools designed to improve the lives of the people who use them.",
  "Lo que me inspira": "What inspires me",
  "Cuatro dimensiones que forman parte de mí.":
    "Four dimensions that are part of who I am.",
  "Música": "Music",
  "La creatividad y la sensibilidad artística forman parte de mi manera de pensar.":
    "Creativity and artistic sensitivity are part of the way I think.",
  "Personas": "People",
  "Disfruto escuchar, acompañar y construir relaciones de confianza.":
    "I enjoy listening, supporting others, and building relationships based on trust.",
  "Tecnología": "Technology",
  "Transformar problemas reales en soluciones digitales útiles.":
    "Turning real problems into useful digital solutions.",
  "Naturaleza": "Nature",
  "Un espacio para reflexionar, aprender y encontrar nuevas ideas.":
    "A space to reflect, learn, and find new ideas.",
  "Personas primero. Tecnología con propósito.": "People first. Technology with purpose.",
  "Conversemos": "Let’s talk",
  "Formación aplicada": "Applied learning",
  "Proyectos Académicos": "Academic Projects",
  "Trabajos prácticos y proyectos desarrollados durante mi formación en el ISPC y la UPC, aplicando programación, análisis, diseño de sistemas y resolución de problemas reales.":
    "Practical assignments and projects developed during my education at ISPC and UPC, applying programming, analysis, systems design, and real-world problem solving.",
  "Proyectos ISPC": "ISPC Projects",
  "Proyecto ABP": "Project-Based Learning",
  "Protección de la Información en la Era Digital":
    "Information Protection in the Digital Era",
  "Proyecto ABP sobre seguridad informática, protección de datos, Habeas Data, Ley 25.326 y concientización digital.":
    "Project-based work on cybersecurity, data protection, Habeas Data, Law 25.326, and digital awareness.",
  "Ver proyecto": "View project",
  "Análisis de sistemas": "Systems analysis",
  "Sistemas y Organizaciones – Evidencia 2": "Systems and Organizations – Evidence 2",
  "Sitio web académico enfocado en estructuras organizacionales, organigramas, evolución histórica de las organizaciones y análisis de sistemas.":
    "Academic website focused on organizational structures, org charts, the historical evolution of organizations, and systems analysis.",
  "Matemática y lógica": "Mathematics and logic",
  "GymManager – Matemática y Lógica": "GymManager – Mathematics and Logic",
  "Proyecto grupal centrado en análisis lógico, validación de casos de prueba, casos límite, casos de error y evaluación de resultados dentro de un sistema de gestión para gimnasios.":
    "Group project focused on logical analysis, test case validation, edge cases, error cases, and result evaluation within a gym management system.",
  "Proyectos UPC": "UPC Projects",
  "Trabajos prácticos y proyectos desarrollados durante la formación en la Universidad Provincial de Córdoba, aplicando programación orientada a objetos, interfaces web, patrones de diseño, testing y bases de datos.":
    "Practical assignments and projects developed during my education at Universidad Provincial de Córdoba, applying object-oriented programming, web interfaces, design patterns, testing, and databases.",
  "POO / Plataforma": "OOP / Platform",
  "Suscripciones Premium": "Premium Subscriptions",
  "Proyecto académico de Programación Orientada a Objetos enfocado en la gestión de suscripciones, servicios premium y lógica de negocio aplicada.":
    "Academic Object-Oriented Programming project focused on subscription management, premium services, and applied business logic.",
  "Interfaz web desarrollada como práctica de diseño, presentación visual y construcción de una propuesta tecnológica con identidad propia.":
    "Web interface developed as practice in design, visual presentation, and building a technology proposal with its own identity.",
  "Repositorio académico orientado a buenas prácticas de diseño, principios SOLID, pruebas automatizadas y comportamiento esperado mediante Cucumber.":
    "Academic repository focused on design best practices, SOLID principles, automated tests, and expected behavior with Cucumber.",
  "Ver repositorio": "View repository",
  "Trabajo práctico enfocado en bases de datos MongoDB, consultas, estructura de datos y fundamentos aplicados dentro de un entorno MEAN.":
    "Practical assignment focused on MongoDB databases, queries, data structures, and applied fundamentals within a MEAN environment.",
  "Dejame tus datos y me contacto a la brevedad.":
    "Leave your details and I will get back to you shortly.",
  "Datos de contacto": "Contact details",
  "Nombre": "Name",
  "Teléfono": "Phone",
  "Mensaje": "Message",
  "Formación y desarrollo profesional": "Education and professional development",
  "Certificaciones UNC": "UNC Certifications",
  "Certificaciones oficiales y formación continua realizadas a través del Campus Virtual de la Universidad Nacional de Córdoba.":
    "Official certifications and continuous learning completed through the Virtual Campus of Universidad Nacional de Córdoba.",
  "Metodologías ágiles para procesos de innovación abierta":
    "Agile methodologies for open innovation processes",
  "30 horas": "30 hours",
  "Emitido: 10 de junio de 2026": "Issued: June 10, 2026",
  "Ver certificado": "View certificate",
  "Volver al inicio": "Back to home",
};

const attributeTranslations = {
  "Tu nombre": "Your name",
  "Tu teléfono": "Your phone",
  "tuemail@email.com": "youremail@email.com",
  "Contame brevemente en qué puedo ayudarte": "Briefly tell me how I can help",
};

const getStoredLanguage = () => {
  try {
    return localStorage.getItem(languageStorageKey) === "en" ? "en" : defaultLanguage;
  } catch (error) {
    return defaultLanguage;
  }
};

const translations = {
  es: {},
  en: textTranslations,
};

const normalizeText = (text) => text.replace(/\s+/g, " ").trim();

const getEnglishText = (spanishText) => translations.en[normalizeText(spanishText)];

const updateLanguageToggle = (lang) => {
  const languageButton = document.getElementById("languageToggle");

  if (!(languageButton instanceof HTMLButtonElement)) {
    return;
  }

  const currentLang = lang === "en" ? "en" : defaultLanguage;
  languageButton.textContent = currentLang === "es" ? "🇺🇸 EN" : "🇪🇸 ES";
  languageButton.setAttribute(
    "aria-label",
    currentLang === "es" ? "Switch to English" : "Cambiar a español",
  );
  languageButton.title = currentLang === "es" ? "Switch to English" : "Cambiar a español";
};

const updateMetaLanguage = (lang) => {
  const meta = pageMeta[pageName]?.[lang] || pageMeta.index[lang];
  document.title = meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", meta.description);
  }
};

const translateTextNode = (node, lang) => {
  const parent = node.parentElement;

  if (!parent || ["SCRIPT", "STYLE", "SVG", "PATH", "TITLE"].includes(parent.tagName)) {
    return;
  }

  if (parent.closest("[data-no-i18n]")) {
    return;
  }

  const source = parent.dataset?.i18nSource || normalizeText(node.textContent || "");
  const translated = lang === "en" ? getEnglishText(source) : source;

  if (!translated) {
    return;
  }

  parent.dataset.i18nSource = source;
  node.textContent = node.textContent.replace(node.textContent.trim(), translated);
};

const setLanguage = (lang) => {
  const nextLanguage = lang === "en" ? "en" : defaultLanguage;

  document.documentElement.lang = nextLanguage;
  updateMetaLanguage(nextLanguage);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const source = element.dataset.i18nSource || normalizeText(element.textContent || "");
    const translated = nextLanguage === "en" ? getEnglishText(source) : source;

    if (!translated) {
      return;
    }

    element.dataset.i18nSource = source;
    element.textContent = translated;
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((node) => translateTextNode(node, nextLanguage));

  document.querySelectorAll("[placeholder]").forEach((element) => {
    const source = element.dataset.i18nPlaceholderSource || element.getAttribute("placeholder");
    const translated = nextLanguage === "en" ? attributeTranslations[source] : source;

    if (!translated) {
      return;
    }

    element.dataset.i18nPlaceholderSource = source;
    element.setAttribute("placeholder", translated);
  });

  try {
    localStorage.setItem(languageStorageKey, nextLanguage);
  } catch (error) {
    // Language switching still works for the current visit without storage.
  }

  updateLanguageToggle(nextLanguage);
  window.dispatchEvent(new CustomEvent("languagechange", { detail: { language: nextLanguage } }));
};
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
const currentLanguage = getStoredLanguage();
setLanguage(currentLanguage);
updateLanguageToggle(currentLanguage);

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

languageToggle?.addEventListener("click", () => {
  const currentLanguage = document.documentElement.lang === "en" ? "en" : defaultLanguage;
  setLanguage(currentLanguage === "en" ? "es" : "en");
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
