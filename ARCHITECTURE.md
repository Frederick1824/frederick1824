# Arquitectura del portfolio de Federico Montoro

## Resumen

Este proyecto es el portfolio personal y profesional de Federico Montoro. Es una web de presentación estática cuyo propósito es comunicar su perfil, experiencia, formación, proyectos académicos, intereses y marca profesional; facilitar el acceso a su CV y perfiles externos; y ofrecer medios directos de contacto.

No es un producto comercial, SaaS, ERP ni aplicación de gestión. No contiene usuarios autenticados, roles, paneles administrativos, stock, ventas, suscripciones, procesos transaccionales, backend propio ni base de datos.

La implementación es una web multipágina construida con HTML, CSS y JavaScript nativo. `index.html` concentra la presentación principal y enlaza páginas de detalle. `styles.css` y `script.js` aportan una identidad y comportamiento compartidos: diseño responsive, tema claro/oscuro, traducción español/inglés, adaptación del CV al idioma y animaciones. El formulario de contacto utiliza FormSubmit como servicio externo.

## Propósito del sitio

El portfolio funciona como carta de presentación digital de Federico Montoro. Sus objetivos observables son:

- Presentar su perfil como Junior Software Developer.
- Relacionar su formación tecnológica con su experiencia en Customer Success, Customer Experience, procesos comerciales y análisis operativo.
- Mostrar estudios, certificaciones y proyectos académicos.
- Comunicar su identidad personal y profesional.
- Facilitar el acceso al CV, GitHub, LinkedIn, WhatsApp y correo electrónico.
- Presentar FTK Lab como iniciativa vinculada a su trabajo y dirigir al visitante a su sitio externo.
- Permitir que reclutadores, clientes o colaboradores inicien una conversación.

## Público objetivo

El contenido y las llamadas a la acción están orientados a:

- Reclutadores y responsables de selección que evalúan el perfil profesional y técnico de Federico.
- Equipos o colaboradores interesados en sus conocimientos, trayectoria y proyectos.
- Potenciales clientes interesados en conocer su perfil y acceder a FTK Lab.
- Instituciones, docentes o pares que quieran revisar sus trabajos académicos y certificaciones.
- Personas que necesiten contactarlo por una oportunidad, propuesta o consulta.

El repositorio no contiene una segmentación formal, personas de usuario ni métricas de audiencia.

## Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| HTML5 | Estructura semántica, contenido y navegación entre páginas. |
| CSS3 | Identidad visual, layouts, componentes, temas, animaciones y responsive. |
| JavaScript nativo | Idioma, tema, imágenes temáticas, CV, animaciones y contacto. |
| `localStorage` | Persistencia local de las preferencias `theme` y `language`. |
| FormSubmit | Recepción externa de los mensajes enviados desde el formulario. |
| Google Fonts | Carga de las familias Inter y Syne. |
| jsDelivr | Carga de la fuente para emoji de banderas. |
| Git y GitHub | Control de versiones y repositorio remoto. |
| Vercel | Plataforma de despliegue declarada en los README. |

No existen framework frontend, gestor de paquetes, `package.json`, bundler, preprocesador, TypeScript, servidor propio ni proceso de build.

## Arquitectura general

El proyecto utiliza una arquitectura estática multipágina (MPA):

```text
Navegador
├── index.html                       Página principal y centro de navegación
├── sobre-mi.html                    Presentación personal ampliada
├── proyectos.html                   Proyectos académicos
├── contacto.html                    Formulario de contacto
├── pages/certificaciones-unc.html   Certificaciones UNC
├── styles.css                       Sistema visual compartido
├── script.js                        Comportamiento compartido
├── contacto.js                      Lógica exclusiva del formulario
├── assets/                          Identidad, fotografías, logos y CV
└── documents/                       Documentos y certificados
```

Cada página es un documento HTML independiente. No existe un router del lado del cliente. La navegación interna de la página principal utiliza anchors y la navegación a contenido ampliado carga otros documentos HTML.

### Responsabilidades

- Los archivos HTML contienen el contenido editorial, la semántica y los enlaces.
- `styles.css` concentra la presentación de todas las páginas.
- `script.js` implementa las funciones compartidas por el portfolio.
- `contacto.js` valida y envía el formulario de contacto.
- `assets/` y `documents/` contienen los recursos que respaldan la presentación visual y profesional.

## Estructura visual y secciones

### Página principal: `index.html`

La home presenta el recorrido principal del visitante:

1. **Inicio (`#inicio`)**: identidad, nombre, rol, fotografía y accesos a GitHub y Sobre mí.
2. **Perfil profesional (`#perfil-profesional`)**: descripción del perfil, trayectoria, enfoque y áreas de desarrollo.
3. **Experiencia laboral (`#experiencia-laboral`)**: experiencia en Customer Success, procesos y fortalezas; incluye CV y LinkedIn.
4. **Formación (`#formacion`)**: presentación de UPC, ISPC y UNC con enlaces a proyectos y certificaciones.
5. **FTK Lab (`#lab`)**: bloque de presentación de la iniciativa y enlace a su web externa.
6. **Contacto (`#contacto`)**: información de contacto y accesos a WhatsApp, LinkedIn, GitHub y formulario.
7. **Footer**: enlaces principales y cierre de marca.

También existe `#formacion-academica` como anchor adicional dentro de Formación.

### Página Sobre mí: `sobre-mi.html`

Amplía la dimensión personal del portfolio. Incluye:

- Encabezado editorial.
- Fotografía personal.
- Historia y recorrido humano/profesional.
- Intereses e inspiraciones: música, personas, tecnología y naturaleza.
- Cierre con llamada a contacto.

### Página de proyectos: `proyectos.html`

Agrupa trabajos académicos por institución:

- Tres proyectos ISPC.
- Cuatro proyectos UPC.
- Enlaces a proyectos publicados o repositorios de GitHub.
- Anchor `#proyectos-upc` para llegar directamente al bloque UPC.

### Página de certificaciones: `pages/certificaciones-unc.html`

Presenta certificaciones realizadas mediante la Universidad Nacional de Córdoba. Actualmente contiene una tarjeta con acceso a un certificado PDF local.

### Página de contacto: `contacto.html`

Ofrece un formulario con nombre, teléfono, email y mensaje. El envío es procesado desde el navegador por `contacto.js` y remitido a FormSubmit. No existe almacenamiento local ni backend propio para las consultas.

## Navegación

### Navegación principal

El header de `index.html` enlaza a Inicio, Perfil, Sobre mí, Experiencia, Formación, FTK Lab y Contacto. Las secciones de la misma página se recorren mediante anchors y `scroll-behavior: smooth`.

### Navegación secundaria

Las páginas secundarias mantienen la marca, el selector de tema y el selector de idioma. Sus enlaces vuelven a secciones relevantes de `index.html`.

Flujo general:

```text
index.html
├── sobre-mi.html
├── proyectos.html
│   └── enlaces a proyectos externos y GitHub
├── pages/certificaciones-unc.html
│   └── documents/certificates/*.pdf
├── contacto.html
│   └── FormSubmit
└── enlaces externos
    ├── GitHub
    ├── LinkedIn
    ├── WhatsApp
    ├── email
    └── FTK Lab
```

La página anidada dentro de `pages/` usa rutas relativas con `../`; este detalle debe conservarse al editar o mover archivos.

## Componentes principales

No hay componentes programáticos ni framework. Los componentes son patrones HTML y clases CSS reutilizados manualmente:

- **Header y marca**: `.site-header`, `.brand` y `.main-nav`.
- **Selector de tema**: `.theme-toggle`.
- **Selector de idioma**: `#languageToggle` y `.language-option`.
- **Imágenes adaptadas al tema**: `.theme-image` con `data-light-src` y `data-dark-src`.
- **Botones y llamadas a la acción**: `.btn` con variantes visuales.
- **Tarjetas de contenido**: perfil, experiencia, formación, servicios, proyectos, certificados e intereses.
- **Elementos animados**: `.reveal`, activados al entrar en el viewport.
- **Footer**: `.site-footer` con enlaces profesionales.
- **Formulario de contacto**: `#contact-form`, campos requeridos, honeypot y región de estado accesible.

Como header y footer están copiados en varios HTML, una modificación global exige revisar todas las páginas.

## Manejo de idiomas

El idioma predeterminado es español. `script.js` permite alternar a inglés desde el selector visible en cada página.

El sistema funciona de la siguiente manera:

- `body[data-page]` identifica la página activa.
- `pageMeta` contiene títulos y descripciones por página e idioma.
- `textTranslations` contiene traducciones del español al inglés.
- Los elementos con `data-i18n` y otros nodos de texto se traducen en el navegador.
- `attributeTranslations` traduce placeholders del formulario.
- La preferencia se guarda en `localStorage` bajo la clave `language`.
- El atributo `lang` del documento se actualiza a `es` o `en`.
- Los enlaces `.cv-download` cambian entre el CV español y el inglés.
- Se emite el evento personalizado `languagechange` para notificar el cambio.

El contenido fuente permanece embebido en español en los HTML. La traducción depende en parte de coincidencias exactas de texto, por lo que cualquier cambio editorial debe comprobarse en ambos idiomas.

## Modo claro y oscuro

El tema se controla con la clase `dark-mode` sobre `<body>`.

- `styles.css` define variables de color y superficies para ambos modos.
- La preferencia se almacena con la clave `theme` en `localStorage`.
- Un script inline aplica el tema oscuro antes de renderizar el contenido principal para reducir parpadeos.
- El botón actualiza `aria-label`, `aria-pressed` y `title`.
- Las imágenes con variantes de tema cambian de archivo mediante `data-light-src` y `data-dark-src`.
- Los recursos alternativos se precargan para suavizar el cambio.
- Si `localStorage` no está disponible, el sitio continúa funcionando sin persistencia.

## Organización de assets

```text
assets/
├── academic/   Logos de UPC, ISPC y UNC en versiones clara y oscura.
├── branding/   Logos principales, navbar, FTK Lab y favicon utilizado.
├── cv/         CV en español e inglés usado por los enlaces dinámicos.
├── img/        Fotografía personal utilizada en Sobre mí.
├── profile/    Fotos de perfil y variantes visuales para la home.
└── favicons    Iconos adicionales en varios tamaños.

documents/
├── certificates/              Certificados académicos en PDF.
└── cv-federico-montoro.pdf    Copia adicional del CV.
```

Convenciones observadas:

- Sufijos `-light` y `-dark` para variantes de tema.
- Sufijos `-es` y `-en` para documentos por idioma.
- Separación por propósito: identidad, perfil, academia, CV y documentos.

Existen recursos duplicados o alternativos, como varios favicons y más de una copia del CV. Antes de eliminarlos debe verificarse su uso externo, ya que el repositorio solo permite confirmar referencias internas.

## Diseño responsive

El sitio adapta sus layouts mediante CSS sin librerías externas.

- El contenido usa contenedores `.section-shell` y grids flexibles.
- Hay media queries principales en 1050, 900 y 640 px.
- También se contemplan dispositivos de puntero grueso y anchos menores a 767 px.
- Los bloques de varias columnas colapsan progresivamente a una columna.
- Header, navegación, botones, tarjetas, formularios e imágenes se reajustan para pantallas pequeñas.
- `overflow-x: clip` evita desbordes horizontales provocados por elementos decorativos.
- El glow de cursor se limita a dispositivos con puntero preciso y viewport de al menos 768 px.

No existe una herramienta automatizada de pruebas responsive ni capturas de referencia versionadas.

## Accesibilidad

El código incluye varias medidas de accesibilidad:

- HTML semántico con `header`, `main`, `section`, `article`, `nav`, `footer` y `form`.
- `aria-label` en navegación, botones, marca y grupos de acciones.
- `aria-pressed` en controles de tema e idioma.
- `aria-current="page"` en la navegación de Sobre mí.
- Textos alternativos en imágenes informativas y `alt=""` en logos decorativos cuando corresponde.
- Labels asociados por estructura a los campos del formulario.
- Estado de envío con `role="status"`, `aria-live="polite"` y `aria-busy`.
- Uso de `reportValidity()` y mensajes personalizados en ambos idiomas.
- Estilos `:focus-visible` en controles interactivos.
- Soporte para `prefers-reduced-motion: reduce`.
- Enlaces externos con `rel="noopener noreferrer"`.

No hay auditoría WCAG, pruebas con lector de pantalla ni validación automatizada de accesibilidad documentadas.

## SEO y metadatos

Cada página incluye:

- `<title>` propio.
- `<meta name="description">` propio.
- `<meta charset="utf-8">`.
- `<meta name="viewport">`.
- Favicon.
- Idioma de documento actualizable.

`script.js` actualiza título y descripción al cambiar de idioma mediante `pageMeta`.

No se observan:

- URLs canónicas.
- Metadatos Open Graph o Twitter Cards.
- Datos estructurados JSON-LD.
- `sitemap.xml`.
- `robots.txt`.
- Archivo de analítica o medición SEO.

Por tanto, el SEO básico está implementado, mientras que el SEO social y técnico avanzado no existe actualmente.

## Formulario y contacto

El contacto es una función auxiliar de la web de presentación, no un flujo comercial interno.

`contacto.html` define el formulario y `contacto.js`:

- Comprueba los campos requeridos.
- Usa la validación nativa del navegador para el email.
- Incluye un campo honeypot antispam.
- Deshabilita el botón durante el envío.
- Muestra estados de envío, éxito, activación o error en español e inglés.
- Envía los datos como JSON al endpoint AJAX de FormSubmit.
- Limpia el formulario tras una respuesta exitosa.

El correo receptor, la URL pública y los endpoints están escritos directamente en el código. No hay variables de entorno ni almacenamiento de mensajes en el proyecto.

## Despliegue

Los README declaran el portfolio publicado en:

```text
https://fedemontoro.vercel.app/
```

El repositorio no contiene `vercel.json`, configuración de hosting ni comando de build. Al ser un sitio estático, el despliegue requiere servir la raíz del repositorio tal como está:

1. Conectar el repositorio al proveedor de hosting estático.
2. Seleccionar la raíz como directorio público.
3. No configurar un comando de compilación.
4. Mantener `index.html` como documento inicial.
5. Verificar las páginas `.html`, las rutas relativas, PDFs y assets tras publicar.
6. Confirmar que la URL usada por el formulario coincide con el dominio publicado.

El código también menciona `fedemontoro.com.ar` como identidad y asunto de contacto, pero no hay configuración DNS o de dominio personalizado dentro del repositorio.

## Ejecución local

No hay dependencias que instalar. Se recomienda usar un servidor HTTP estático:

```powershell
cd C:\Users\PC\Documents\Frederick1824
python -m http.server 8000
```

Luego abrir:

```text
http://localhost:8000/
```

El uso de `file://` no reproduce necesariamente las mismas condiciones del hosting y puede estar restringido por el navegador.

## Mantenimiento del contenido

### Cambios de texto

1. Editar el texto fuente en el HTML correspondiente.
2. Actualizar su traducción en `textTranslations` dentro de `script.js`.
3. Verificar el contenido con idioma español e inglés.
4. Si cambia el enfoque de una página, actualizar también `pageMeta`.

### Cambios de navegación o enlaces

El header y footer están repetidos. Deben revisarse `index.html`, `sobre-mi.html`, `proyectos.html`, `contacto.html` y `pages/certificaciones-unc.html`. También deben respetarse las rutas `../` de la página anidada.

### Actualización del CV

Reemplazar ambos archivos conservando los nombres actuales:

```text
assets/cv/federico-montoro-cv-es.pdf
assets/cv/federico-montoro-cv-en.pdf
```

Si se cambian los nombres, actualizar `updateCvDownloadLinks()` en `script.js` y todos los enlaces HTML iniciales.

### Nuevos proyectos o certificados

- Añadir proyectos como tarjetas en `proyectos.html` y sumar las traducciones correspondientes.
- Añadir certificados en `pages/certificaciones-unc.html`, guardar los PDF en `documents/certificates/` y usar rutas relativas desde `pages/`.

### Cambios visuales

Los estilos de todas las páginas comparten `styles.css`. Antes de modificar una clase genérica como `.btn`, `.site-header`, `.site-footer`, `.reveal` o `.section-shell`, debe comprobarse su efecto en todas las páginas y breakpoints.

## Estado actual y límites

El portfolio tiene implementadas sus páginas principales, navegación, dos idiomas, dos temas, adaptación responsive, enlaces profesionales, descarga de CV, proyectos, certificaciones y contacto.

No existe un backlog formal, suite de pruebas, linter, pipeline CI/CD, backend, base de datos ni variables de entorno. Tampoco hay funciones de negocio que deban documentarse: cualquier incorporación futura de autenticación, paneles, ventas, stock o administración sería una ampliación ajena a la arquitectura actual del portfolio.

Los README presentan correctamente la intención general y la URL pública, pero la estructura de carpetas que describen no coincide completamente con el árbol actual. El código vigente debe considerarse la fuente de verdad para páginas, rutas y comportamiento.

## Posibles mejoras

Las siguientes son mejoras técnicas posibles, no funcionalidades comprometidas:

- Actualizar ambos README para que reflejen la estructura real.
- Separar `styles.css` por páginas o responsabilidades para reducir el riesgo de regresiones.
- Reemplazar las traducciones basadas en texto por claves estables y archivos de idioma.
- Centralizar header, footer, enlaces y datos de contacto para evitar duplicación.
- Optimizar las imágenes más pesadas y servir formatos modernos y tamaños responsive.
- Revisar y depurar favicons, CV y assets duplicados o sin referencias internas.
- Añadir pruebas automáticas de rutas, anchors, cambio de tema, idiomas y formulario.
- Incorporar validación de accesibilidad y enlaces.
- Añadir canonical, Open Graph, Twitter Cards, JSON-LD de perfil profesional, sitemap y robots.txt.
- Configurar un proceso explícito de validación y despliegue.
- Extraer a configuración central las URLs y datos repetidos.

## Riesgos de mantenimiento

- Una edición de texto puede romper su traducción si no se actualiza el diccionario.
- La duplicación de navegación puede producir enlaces inconsistentes entre páginas.
- Una regla global en el CSS monolítico puede afectar superficies no relacionadas.
- Las rutas relativas de `pages/certificaciones-unc.html` pueden romperse al reorganizar carpetas.
- FormSubmit, Google Fonts y jsDelivr son dependencias externas.
- El formulario depende de valores hardcodeados y de la activación del proveedor.
- La ausencia de pruebas automatizadas obliga a verificar manualmente todas las páginas, idiomas, temas y tamaños de pantalla.
- El peso de algunas imágenes puede perjudicar la velocidad de carga y las métricas web.

## Fuente de verdad

Para futuras modificaciones, el orden recomendado de autoridad es:

1. Los HTML, CSS y JavaScript actuales para estructura y comportamiento.
2. Los archivos de `assets/` y `documents/` para recursos descargables y visuales.
3. Este documento para comprender la arquitectura general.
4. Los README para presentación pública, teniendo en cuenta que su árbol de carpetas está desactualizado.

No debe asumirse ninguna función, integración, entorno o flujo que no pueda verificarse en esos archivos.
