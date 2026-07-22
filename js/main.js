// ==========================================
// 1. FADE-IN AL SCROLL
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    if (index === 0) return;
    section.classList.add("fade-in");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  sections.forEach((section, index) => {
    if (index === 0) return;
    observer.observe(section);
  });
});

// ==========================================
// 3. NAVBAR ACTIVA (resaltado dinámico)
// ==========================================
const navLinks = document.querySelectorAll(".nav-link");
const sectionsNav = document.querySelectorAll("section[id]");

const observerNav = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.remove(
            "border-b-2",
            "border-primary-fixed",
            "text-primary",
            "font-bold",
          );
          link.classList.add("text-on-surface-variant", "font-medium");
          if (link.getAttribute("data-target") === id) {
            link.classList.add(
              "border-b-2",
              "border-primary-fixed",
              "text-primary",
              "font-bold",
            );
            link.classList.remove("text-on-surface-variant", "font-medium");
          }
        });
      }
    });
  },
  { threshold: 0.3 },
);

sectionsNav.forEach((section) => observerNav.observe(section));

// ==========================================
// 4. EXPERIENCIA DINÁMICA (hover/click)
// ==========================================
const expItems = document.querySelectorAll(".experience-item");
let activeExpIndex = 0;

function setActiveExp(index) {
  expItems.forEach((item, i) => {
    item.classList.remove("active");
    if (i === index) {
      item.classList.add("active");
    }
  });
  activeExpIndex = index;
}

if (expItems.length > 0) {
  setActiveExp(0);
}

expItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    setActiveExp(index);
  });
  item.addEventListener("click", () => {
    setActiveExp(index);
  });
});

// ==========================================
// 5. SISTEMA DE IDIOMA (EN/ES) - DEFINICIÓN TEMPRANA
// ==========================================
const translations = {
  en: {
    // Meta
    "meta-title": "Samuel Peña | Freelance Full-Stack Web Developer",
    "meta-desc":
      "Portfolio of Samuel Peña, software developer with over 2 years of experience in web applications. Specialist in PHP, React, Next.js and PostgreSQL.",
    "og-title": "Samuel Peña | Freelance Full-Stack Web Developer",
    "og-desc":
      "Portfolio of Samuel Peña, software developer with over 2 years of experience in web applications.",
    "tw-title": "Samuel Peña | Freelance Full-Stack Web Developer",
    "tw-desc":
      "Portfolio of Samuel Peña, software developer with over 2 years of experience in web applications.",
    // Nav
    "nav-home": "Home",
    "nav-about": "About",
    "nav-skills": "Skills",
    "nav-experience": "Experience",
    "nav-projects": "Projects",
    "nav-cert": "Certifications",
    "nav-contact": "Contact",
    "nav-contact-btn": "Contact",
    // Hero
    "hero-tagline": "Full-Stack Developer",
    "hero-title":
      "Transforming ideas into <span class=\"text-primary-fixed italic font-medium\">scalable</span> and <span class=\"text-primary-fixed italic font-medium\">efficient</span> web applications",
    "hero-desc":
      "Hi, I'm Samuel Peña, a Full-Stack Jr. Developer and Freelance Software Developer from Venezuela. With over 2 years of experience, I specialize in building robust web solutions, from backend to dynamic user interfaces.",
    "hero-btn-projects": "View Projects",
    "hero-btn-contact": "Contact",
    "hero-availability": "Available",
    // About
    "about-badge": "[ ABOUT ]",
    "about-title":
      "Associate Degree in Computer Science, passionate about clean code and agile solutions.",
    "about-text1":
      "I graduated from the Jesús Obrero University Institute (IUJO) in May 2026 with an Associate Degree in Computer Science. At 21, I'm passionate about solving complex problems through clean code and agile implementations. I'm bilingual, fluent in Spanish (Native) and English (C1), which allows me to collaborate effectively in international teams. Outside of commercial programming, I dedicate time to volunteering, contributing my technical knowledge to social impact causes.",
    "about-text2":
      "My technical training and practical experience have allowed me to lead projects from database design to responsive interface implementation. I believe in user-centered development and continuous improvement.",
    "about-btn": "View Projects",
    // Skills
    "skills-badge": "[ SKILLS ]",
    "skills-title": "Skills & Technologies",
    "skills-lang-title": "Programming Languages",
    "skills-lang-1": "PHP",
    "skills-lang-2": "JavaScript (ES6+) / TypeScript",
    "skills-lang-3": "SQL, HTML5, CSS3",
    "skills-lang-4": "Python",
    "skills-front-title": "Frontend Frameworks",
    "skills-front-1": "React / Next.js",
    "skills-front-2": "Vue.js (basic)",
    "skills-front-3": "Tailwind CSS / Bootstrap",
    "skills-front-4": "Responsive Design",
    "skills-back-title": "Backend & APIs",
    "skills-back-1": "Laravel / PHP",
    "skills-back-2": "Node.js (Express)",
    "skills-back-3": "RESTful APIs / GraphQL",
    "skills-back-4": "WordPress / Headless CMS",
    "skills-db-title": "Databases & Storage",
    "skills-db-1": "PostgreSQL / MySQL",
    "skills-db-2": "Supabase / Firebase",
    "skills-db-3": "MongoDB (basic)",
    "skills-db-4": "SQL optimization",
    "skills-tools-title": "DevOps & Tools",
    "skills-tools-1": "Git / GitHub / GitLab",
    "skills-tools-2": "Docker (basic)",
    "skills-tools-3": "CI/CD (GitHub Actions)",
    "skills-tools-4": "Vercel / Netlify / AWS",
    "skills-meth-title": "Methodologies & Soft Skills",
    "skills-meth-1": "Agile (Scrum / Kanban)",
    "skills-meth-2": "AI-assisted development",
    "skills-meth-3": "Technical SEO / Performance",
    "skills-meth-4": "CRM Automation (HubSpot, GoHighLevel)",
    // Experience
    "exp-badge": "[ EXPERIENCE ]",
    "exp-title": "Professional Experience",
    "exp-sub": "Collaborations with digital agencies and international teams.",
    "exp-company": "Company",
    "exp-date": "Date",
    "exp-location": "Location",
    "exp-1-title": "Full-Stack Developer Intern",
    "exp-1-company": "Keycode Agencia Digital",
    "exp-1-date": "Feb 2026 – May 2026",
    "exp-1-location": "Remote, Mexico",
    "exp-1-desc1":
      'Developed a multi-tenant SaaS payroll module ("Dash") with Next.js and Supabase, using RLS for data isolation.',
    "exp-1-desc2":
      "Built a corporate Wiki using Nextra JS and React, streamlining the onboarding process and knowledge transfer.",
    "exp-1-desc3":
      "Conducted technical SEO audits and set up automations in GoHighLevel CRM to improve sales response.",
    "exp-2-title": "Web Developer & Community Manager",
    "exp-2-company": "The Loctor Family of REALTORS®",
    "exp-2-date": "Oct 2024 – May 2026",
    "exp-2-location": "Remote, US",
    "exp-2-desc1":
      "Architected a custom real estate platform with WordPress and PHP, migrating legacy systems to an IDX-ready architecture.",
    "exp-2-desc2":
      "Integrated HubSpot CRM via REST APIs and custom templates, resolving CSS conflicts for full mobile adaptability.",
    "exp-2-desc3":
      "Managed digital presence through asynchronous workflows to drive lead generation.",
    // Projects
    "projects-badge": "[ PROJECTS ]",
    "projects-title": "TrainUP",
    "projects-sub":
      "All-in-one gym management platform. Memberships, bookings, payments, body metrics, and more.",
    "trainup-tagline": "Everything you need to manage your gym",
    "trainup-tagline-sub":
      "From memberships and bookings to body metrics and payments. TrainUP brings together all the tools your training center needs in one platform.",
    "trainup-features-title": "Core Features",
    "trainup-feat-1-title": "Membership Management",
    "trainup-feat-1-desc": "Activate, renew, and manage subscription plans. Control each member's status and automate expiration reminders.",
    "trainup-feat-2-title": "Bookings & Schedules",
    "trainup-feat-2-desc": "Set flexible schedules by day and time. Real-time capacity control with training profile restrictions.",
    "trainup-feat-3-title": "Integrated Payments",
    "trainup-feat-3-desc": "Accept Pago Móvil, Zelle, Binance, and cash. Every transaction is recorded with receipt and admin approval.",
    "trainup-feat-4-title": "Body Metrics",
    "trainup-feat-4-desc": "Track weight, abdomen, arms, legs, chest, and more. Visualize progress with month-over-month charts and comparisons.",
    "trainup-feat-5-title": "Admin Panel",
    "trainup-feat-5-desc": "Full dashboard with users, payments, bookings, and metrics. Everything you need to run your gym from one place.",
    "trainup-feat-6-title": "Client Portal",
    "trainup-feat-6-desc": "Each athlete gets their own profile with payment history, bookings, metrics, and progress. Full self-service from their phone.",
    "trainup-feat-7-title": "Notifications",
    "trainup-feat-7-desc": "Automatic payment reminders, booking confirmations, and expiration alerts. Keep your members informed at all times.",
    "trainup-feat-8-title": "Security & Compliance",
    "trainup-feat-8-desc": "Data encryption, HTTPS connections, daily backups, and role-based access control. Your data protected at all times.",
    "trainup-benefits-title": "Key Benefits",
    "trainup-ben-1-title": "Time Savings",
    "trainup-ben-1-desc": "Automate billing, bookings, and reminders. Recover hours you used to lose on manual administrative tasks.",
    "trainup-ben-2-title": "Error Reduction",
    "trainup-ben-2-desc": "Forget about spreadsheets and notebooks. Every payment, booking, and metric is recorded with no chance of loss.",
    "trainup-ben-3-title": "Retention Improvement",
    "trainup-ben-3-desc": "Athletes who see their progress stay more engaged. Evolution dashboards and visible metrics increase adherence.",
    "trainup-ben-4-title": "Multi-platform Access",
    "trainup-ben-4-desc": "Admins from the web panel, clients from their phone. Everyone gets the view they need, on the device they prefer.",
    "trainup-testimonial-text": "\"TrainUP let us centralize everything: payments, bookings, and our athletes' progress. What used to take us a full day, we now solve in minutes.\"",
    "trainup-testimonial-org": "Elite Training Center",
    "trainup-testimonial-user": "TrainUP User",
    "trainup-creds-title": "Try the Demo",
    "trainup-mobile-note": "TrainUP is a mobile-first application, designed with the mobile experience in mind. It looks and works best on mobile devices or using responsive developer view in desktop browsers. The app is still in active development, so it will be updated and improved continuously.",
    "trainup-visit": "Visit TrainUP",
    // Certifications - textos fijos
    "cert-badge": "[ CREDENTIALS ]",
    "cert-title": "Industry Certifications",
    "cert-issue-date": "Issue Date",
    "cert-expiration": "Expiration",
    "cert-credential-id": "Credential ID",
    "cert-verify-url": "View Credential",
    "cert-skills": "Skills & Competencies",
    "cert-no-expiration": "No Expiration",
    // Volunteering
    "vol-badge": "[ VOLUNTEERING ]",
    "vol-title": "Social Impact",
    "vol-role": "IT Support Volunteer",
    "vol-org-badge": "VENEZUELAN RED CROSS",
    "vol-location": "Barquisimeto, Venezuela · Aug 2025 – Dec 2025",
    "vol-intro":
      "Collaborated in an IT modernization and community service initiative to optimize the obsolete technology infrastructure of the Venezuelan Red Cross Barquisimeto chapter, directly safeguarding the digital workflows of critical health and laboratory facilities.",
    "vol-title-1": "Hardware Recovery & Diagnostics",
    "vol-desc1":
      "Conducted technical diagnostics and hardware recovery on aging workstations, harvesting viable components from decommissioned units to reassemble fully functional hardware systems while mitigating implementation costs.",
    "vol-title-2": "Network Infrastructure Renewal",
    "vol-desc2":
      "Inspected legacy networking architecture and over-three-decade-old structured cabling to draft and present a strategic infrastructure renewal plan designed to minimize down-time risks across daily administrative operations.",
    "vol-title-3": "Technical Documentation & SOPs",
    "vol-desc3":
      "Authored comprehensive technical documentation and system operation manuals from scratch to standardise software maintenance and internal application procedures, successfully reducing the organization's reliance on external IT support.",
    "vol-title-4": "Digital Literacy & AI Training",
    "vol-desc4":
      "Designed and delivered structured digital literacy workshops, secure web navigation seminars, and workplace prompt engineering training using generative AI tools, effectively bridging technical generational gaps for administrative staff and older workers.",
    "vol-impact-badge": "✦ Impact achieved",
    "vol-impact-text":
      "12+ workstations restored · 4 workshops delivered · 20+ staff trained",
    // Contact
    "contact-badge": "[ CONTACT ]",
    "contact-title": "Let's talk about your next project",
    "contact-desc":
      "I'm always open to discussing new opportunities, collaborations, or just chatting about technology. Fill in the form and I'll get back to you as soon as possible.",
    // Form
    "form-name": "Name *",
    "form-email": "Email *",
    "form-subject": "Subject",
    "form-message": "Message *",
    "form-send": "Send message",
    // CTA
    "cta-title": "Ready to work together?",
    "cta-desc":
      "If you're looking for a proactive developer to boost your team or carry out your next software project, let's talk.",
    "cta-btn": "Start a conversation",
    "cta-sub": "Fill out the form and I'll get back to you within 24 hours.",
    // Footer
    "footer-desc":
      "Full-Stack Jr. Developer specialized in scalable and efficient web applications.",
    "footer-copy": "© 2026 Samuel Peña. All rights reserved.",
    "footer-nav": "Navigation",
    "footer-nav-home": "Home",
    "footer-nav-about": "About",
    "footer-nav-skills": "Skills",
    "footer-nav-exp": "Experience",
    "footer-nav-projects": "Projects",
    "footer-nav-cert": "Certifications",
    "footer-contact": "Contact",
    "footer-email-label": "Email",
    "footer-phone-label": "Phone",
    "footer-github-label": "GitHub",
  },
  es: {
    // Meta
    "meta-title": "Samuel Peña | Desarrollador Web Freelance Full-Stack",
    "meta-desc":
      "Portafolio de Samuel Peña, desarrollador de software con más de 2 años de experiencia en aplicaciones web. Especialista en PHP, React, Next.js y PostgreSQL.",
    "og-title": "Samuel Peña | Desarrollador Web Freelance Full-Stack",
    "og-desc":
      "Portafolio de Samuel Peña, desarrollador de software con más de 2 años de experiencia en aplicaciones web.",
    "tw-title": "Samuel Peña | Desarrollador Web Freelance Full-Stack",
    "tw-desc":
      "Portafolio de Samuel Peña, desarrollador de software con más de 2 años de experiencia en aplicaciones web.",
    // Nav
    "nav-home": "Inicio",
    "nav-about": "Sobre Mí",
    "nav-skills": "Skills",
    "nav-experience": "Experiencia",
    "nav-projects": "Proyectos",
    "nav-cert": "Certificaciones",
    "nav-contact": "Contacto",
    "nav-contact-btn": "Contactar",
    // Hero
    "hero-tagline": "Desarrollador Full-Stack",
    "hero-title":
      "Transformando ideas en <span class=\"text-primary-fixed italic font-medium\">aplicaciones web escalables</span> y <span class=\"text-primary-fixed italic font-medium\">eficientes</span>",
    "hero-desc":
      "Hola, soy Samuel Peña, un Desarrollador Full-Stack Jr. y Freelance Software Developer de Venezuela. Con más de 2 años de experiencia, me especializo en construir soluciones web robustas, desde el backend hasta interfaces de usuario dinámicas.",
    "hero-btn-projects": "Ver Proyectos",
    "hero-btn-contact": "Contactar",
    "hero-availability": "Disponible",
    // About
    "about-badge": "[ SOBRE MÍ ]",
    "about-title":
      "Técnico Superior Universitario en Informática, apasionado por el código limpio y las soluciones ágiles.",
    "about-text1":
      "Soy egresado del Instituto Universitario Jesús Obrero (IUJO) en mayo de 2026. A mis 21 años, me apasiona resolver problemas complejos mediante código limpio e implementaciones ágiles. Soy bilingüe, con dominio fluido del Español (Nativo) e Inglés (C1), lo que me permite colaborar eficazmente en equipos internacionales. Fuera de la programación comercial, dedico tiempo al voluntariado aportando mis conocimientos técnicos a causas de impacto social.",
    "about-text2":
      "Mi formación técnica y mi experiencia práctica me han permitido liderar proyectos desde el diseño de la base de datos hasta la implementación de interfaces responsivas. Creo en el desarrollo centrado en el usuario y en la mejora continua.",
    "about-btn": "Ver Proyectos",
    // Skills
    "skills-badge": "[ HABILIDADES ]",
    "skills-title": "Habilidades y Tecnologías",
    "skills-lang-title": "Lenguajes de Programación",
    "skills-lang-1": "PHP",
    "skills-lang-2": "JavaScript (ES6+) / TypeScript",
    "skills-lang-3": "SQL, HTML5, CSS3",
    "skills-lang-4": "Python",
    "skills-front-title": "Frameworks Frontend",
    "skills-front-1": "React / Next.js",
    "skills-front-2": "Vue.js (básico)",
    "skills-front-3": "Tailwind CSS / Bootstrap",
    "skills-front-4": "Diseño Responsivo",
    "skills-back-title": "Backend y APIs",
    "skills-back-1": "Laravel / PHP",
    "skills-back-2": "Node.js (Express)",
    "skills-back-3": "APIs RESTful / GraphQL",
    "skills-back-4": "WordPress / CMS Headless",
    "skills-db-title": "Bases de Datos y Almacenamiento",
    "skills-db-1": "PostgreSQL / MySQL",
    "skills-db-2": "Supabase / Firebase",
    "skills-db-3": "MongoDB (básico)",
    "skills-db-4": "Optimización SQL",
    "skills-tools-title": "DevOps y Herramientas",
    "skills-tools-1": "Git / GitHub / GitLab",
    "skills-tools-2": "Docker (básico)",
    "skills-tools-3": "CI/CD (GitHub Actions)",
    "skills-tools-4": "Vercel / Netlify / AWS",
    "skills-meth-title": "Metodologías y Competencias",
    "skills-meth-1": "Agile (Scrum / Kanban)",
    "skills-meth-2": "Desarrollo asistido por IA",
    "skills-meth-3": "SEO Técnico / Rendimiento",
    "skills-meth-4": "Automatización CRM (HubSpot, GoHighLevel)",
    // Experience
    "exp-badge": "[ EXPERIENCIA ]",
    "exp-title": "Trayectoria Profesional",
    "exp-sub":
      "Colaboraciones con agencias digitales y equipos internacionales.",
    "exp-company": "Empresa",
    "exp-date": "Fecha",
    "exp-location": "Ubicación",
    "exp-1-title": "Desarrollador Full-Stack en prácticas",
    "exp-1-company": "Keycode Agencia Digital",
    "exp-1-date": "Feb 2026 – May 2026",
    "exp-1-location": "Remoto, México",
    "exp-1-desc1":
      'Desarrollé un módulo SaaS multi-inquilino de nómina ("Dash") con Next.js y Supabase, utilizando RLS para aislamiento de datos.',
    "exp-1-desc2":
      "Construí una Wiki corporativa utilizando Nextra JS y React, agilizando el proceso de integración laboral y transferencia de conocimientos.",
    "exp-1-desc3":
      "Ejecuté auditorías de SEO técnico y configuré automatizaciones en el CRM GoHighLevel para mejorar la respuesta de ventas.",
    "exp-2-title": "Desarrollador Web y Community Manager",
    "exp-2-company": "The Loctor Family of REALTORS®",
    "exp-2-date": "Oct 2024 – May 2026",
    "exp-2-location": "Remoto, EE.UU.",
    "exp-2-desc1":
      "Arquitecté una plataforma inmobiliaria personalizada con WordPress y PHP, migrando sistemas heredados a una arquitectura preparada para IDX.",
    "exp-2-desc2":
      "Integré el CRM de HubSpot mediante APIs REST y plantillas personalizadas, resolviendo conflictos de CSS para obtener una adaptabilidad móvil completa.",
    "exp-2-desc3":
      "Gestioné la presencia digital mediante flujos de trabajo asíncronos para impulsar la generación de prospectos (leads).",
    // Projects
    "projects-badge": "[ PROYECTOS ]",
    "projects-title": "TrainUP",
    "projects-sub":
      "Plataforma integral de gestión de gimnasios. Membresías, reservas, pagos, métricas corporales y más.",
    "trainup-tagline": "Todo lo que necesitas para gestionar tu gimnasio",
    "trainup-tagline-sub":
      "Desde membresías y reservas hasta métricas corporales y pagos. TrainUP reúne todas las herramientas que tu centro de entrenamiento necesita en una sola plataforma.",
    "trainup-features-title": "Funciones Principales",
    "trainup-feat-1-title": "Gestión de Membresías",
    "trainup-feat-1-desc": "Activa, renueva y gestiona planes de suscripción. Controla el estado de cada miembro y automatiza los recordatorios de vencimiento.",
    "trainup-feat-2-title": "Reservas y Horarios",
    "trainup-feat-2-desc": "Configura horarios flexibles por día y hora. Control de capacidad en tiempo real con restricciones por perfil de entrenamiento.",
    "trainup-feat-3-title": "Pagos Integrados",
    "trainup-feat-3-desc": "Acepta Pago Móvil, Zelle, Binance y efectivo. Cada transacción queda registrada con comprobante y aprobación del administrador.",
    "trainup-feat-4-title": "Métricas Corporales",
    "trainup-feat-4-desc": "Registro de peso, abdomen, brazos, piernas, pecho y más. Visualiza la evolución con gráficos y comparativas mes a mes.",
    "trainup-feat-5-title": "Panel de Administración",
    "trainup-feat-5-desc": "Dashboard completo con usuarios, pagos, reservas y métricas. Todo lo que necesitas para operar tu gimnasio desde un solo lugar.",
    "trainup-feat-6-title": "Portal del Cliente",
    "trainup-feat-6-desc": "Cada atleta tiene su propio perfil con historial de pagos, reservas, métricas y progreso. Autogestión total desde su móvil.",
    "trainup-feat-7-title": "Notificaciones",
    "trainup-feat-7-desc": "Recordatorios automáticos de pago, confirmación de reservas y alertas de vencimiento. Mantén a tus miembros siempre informados.",
    "trainup-feat-8-title": "Seguridad y Cumplimiento",
    "trainup-feat-8-desc": "Encriptación de datos, conexiones HTTPS, backups diarios y control de acceso por roles. Tus datos protegidos en todo momento.",
    "trainup-benefits-title": "Beneficios Clave",
    "trainup-ben-1-title": "Ahorro de Tiempo",
    "trainup-ben-1-desc": "Automatiza la facturación, las reservas y los recordatorios. Recupera horas que antes perdías en tareas administrativas manuales.",
    "trainup-ben-2-title": "Reducción de Errores",
    "trainup-ben-2-desc": "Olvídate de las hojas de cálculo y los cuadernos. Cada pago, reserva y métrica queda registrada sin posibilidad de pérdida.",
    "trainup-ben-3-title": "Mejora de Retención",
    "trainup-ben-3-desc": "Los atletas que ven su progreso se comprometen más. Los dashboards de evolución y las métricas visibles aumentan la adherencia.",
    "trainup-ben-4-title": "Acceso Multiplataforma",
    "trainup-ben-4-desc": "Administradores desde el panel web, clientes desde su móvil. Cada quien con la vista que necesita, en el dispositivo que prefiera.",
    "trainup-testimonial-text": "\"TrainUP nos permitió centralizar todo: pagos, reservas y el progreso de nuestros atletas. Lo que antes nos tomaba un día entero, ahora lo resolvemos en minutos.\"",
    "trainup-testimonial-org": "Centro de Entrenamiento Elite",
    "trainup-testimonial-user": "Usuario TrainUP",
    "trainup-creds-title": "Probar Demo",
    "trainup-mobile-note": "TrainUP es una aplicación mobile-first, diseñada pensando en la experiencia móvil. Se visualiza y funciona mejor en dispositivos móviles o utilizando la vista de desarrollo responsiva en navegadores de escritorio. La app aún está en desarrollo activo, por lo que se irá actualizando y mejorando continuamente.",
    "trainup-visit": "Visitar TrainUP",
    // Certifications - textos fijos
    "cert-badge": "[ CREDENCIALES ]",
    "cert-title": "Certificaciones Profesionales",
    "cert-issue-date": "Fecha de Emisión",
    "cert-expiration": "Expiración",
    "cert-credential-id": "ID de Credencial",
    "cert-verify-url": "Ver Credencial",
    "cert-skills": "Habilidades y Competencias",
    "cert-no-expiration": "Sin Expiración",
    // Volunteering
    "vol-badge": "[ VOLUNTARIADO ]",
    "vol-title": "Impacto Social",
    "vol-role": "Voluntario de Soporte TI",
    "vol-org-badge": "CRUZ ROJA VENEZOLANA",
    "vol-location": "Barquisimeto, Venezuela · Ago 2025 – Dic 2025",
    "vol-intro":
      "Colaboré en una iniciativa de modernización tecnológica y servicio comunitario para optimizar la infraestructura obsoleta de la seccional Barquisimeto de la Cruz Roja Venezolana, protegiendo directamente los flujos de trabajo digitales de instalaciones críticas de salud y laboratorios.",
    "vol-title-1": "Recuperación de Hardware y Diagnóstico",
    "vol-desc1":
      "Realicé diagnósticos técnicos y recuperación de hardware en estaciones de trabajo obsoletas, extrayendo componentes viables de unidades dadas de baja para reensamblar sistemas funcionales, mitigando costos de implementación.",
    "vol-title-2": "Renovación de Infraestructura de Red",
    "vol-desc2":
      "Inspeccioné la arquitectura de red heredada y el cableado estructurado de más de tres décadas para redactar y presentar un plan estratégico de renovación de infraestructura diseñado para minimizar riesgos de interrupción en las operaciones administrativas diarias.",
    "vol-title-3": "Documentación Técnica y Procedimientos",
    "vol-desc3":
      "Redacté documentación técnica integral y manuales de operación de sistemas desde cero para estandarizar el mantenimiento de software y los procedimientos de aplicaciones internas, reduciendo con éxito la dependencia de la organización de soporte TI externo.",
    "vol-title-4": "Alfabetización Digital y Formación en IA",
    "vol-desc4":
      "Diseñé e impartí talleres estructurados de alfabetización digital, seminarios de navegación web segura y capacitación en ingeniería de prompts para el lugar de trabajo utilizando herramientas de IA generativa, cerrando efectivamente las brechas generacionales técnicas para el personal administrativo y trabajadores de mayor edad.",
    "vol-impact-badge": "✦ Impacto logrado",
    "vol-impact-text":
      "12+ estaciones restauradas · 4 talleres impartidos · 20+ personas capacitadas",
    // Contact
    "contact-badge": "[ CONTACTO ]",
    "contact-title": "Hablemos sobre tu próximo proyecto",
    "contact-desc":
      "Siempre estoy abierto a discutir nuevas oportunidades, colaboraciones o simplemente charlar sobre tecnología. Completa el formulario y te responderé lo antes posible.",
    // Form
    "form-name": "Nombre *",
    "form-email": "Correo *",
    "form-subject": "Asunto",
    "form-message": "Mensaje *",
    "form-send": "Enviar mensaje",
    // CTA
    "cta-title": "¿Listo para trabajar juntos?",
    "cta-desc":
      "Si buscas a un desarrollador proactivo para potenciar tu equipo o llevar a cabo tu próximo proyecto de software, hablemos.",
    "cta-btn": "Iniciar conversación",
    "cta-sub": "Rellena el formulario y te responderé en menos de 24 horas.",
    // Footer
    "footer-desc":
      "Desarrollador Full-Stack Jr. especializado en aplicaciones web escalables y eficientes.",
    "footer-copy": "© 2026 Samuel Peña. Todos los derechos reservados.",
    "footer-nav": "Navegación",
    "footer-nav-home": "Inicio",
    "footer-nav-about": "Sobre Mí",
    "footer-nav-skills": "Habilidades",
    "footer-nav-exp": "Experiencia",
    "footer-nav-projects": "Proyectos",
    "footer-nav-cert": "Certificaciones",
    "footer-contact": "Contacto",
    "footer-email-label": "Correo",
    "footer-phone-label": "Teléfono",
    "footer-github-label": "GitHub",
  },
};

let currentLang = "en";

// ==========================================
// 6. FORMULARIO (envío con validación)
// ==========================================
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "⚠️ Please fill in all required fields.";
    formStatus.style.color = "#ffb4ab";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.textContent = "⚠️ Please enter a valid email address.";
    formStatus.style.color = "#ffb4ab";
    return;
  }

  formStatus.textContent = "⏳ Sending...";
  formStatus.style.color = "#c0cab0";

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formStatus.textContent = "✅ Message sent successfully!";
      formStatus.style.color = "#9ffa43";
      form.reset();
    } else {
      throw new Error("Server error");
    }
  } catch (error) {
    formStatus.textContent = "❌ Oops! Something went wrong. Please try again.";
    formStatus.style.color = "#ffb4ab";
  }
});

// ==========================================
// 7. CERTIFICACIONES - STACK + DETALLE (con soporte de idioma)
// ==========================================

// --- Datos con traducciones ---
const certifications = [
  {
    id: 1,
    icon: "smart_toy",
    image: "assets/img/google_ai_certificate_samuel.jpg",
    issueDate: "2026-07-08",
    expirationDate: null,
    credentialId: "0952ea0b-0b17-4c88-a865-affc542312de",
    credentialUrl: "https://www.credly.com/earner/earned/badge/0952ea0b-0b17-4c88-a865-affc542312de",
    translations: {
      en: {
        name: "Google AI Essentials",
        organization: "Google Career Certificates",
        skills: [
          "Augment tasks with AI",
          "Critical Thinking",
          "Evaluate AI tools",
          "Iterative thinking",
          "Problem Solving",
          "Prompt Engineering",
          "Recognize AI harms",
          "Use AI responsibly",
          "Use generative AI technology",
        ],
      },
      es: {
        name: "Google AI Essentials",
        organization: "Google Career Certificates",
        skills: [
          "Aumentar tareas con IA",
          "Pensamiento Crítico",
          "Evaluar herramientas de IA",
          "Pensamiento Iterativo",
          "Resolución de Problemas",
          "Ingeniería de Prompts",
          "Reconocer daños de la IA",
          "Usar IA responsablemente",
          "Usar tecnología de IA generativa",
        ],
      },
    },
  },
  {
    id: 2,
    icon: "auto_awesome",
    image: "assets/img/claude_certificate_samuel.jpg",
    issueDate: "2026-03-01",
    expirationDate: null,
    credentialId: "uv7e8yp69evp",
    credentialUrl: "https://verify.skilljar.com/c/uv7e8yp69evp",
    translations: {
      en: {
        name: "Claude Code in Action",
        organization: "Anthropic",
        skills: [
          "Artificial Intelligence (AI)",
          "Software Development",
          "Agentic AI Development",
          "Prompt Engineering",
          "AI-Assisted Programming",
        ],
      },
      es: {
        name: "Claude Code in Action",
        organization: "Anthropic",
        skills: [
          "Inteligencia Artificial (IA)",
          "Desarrollo de Software",
          "Desarrollo de IA Agéntica",
          "Ingeniería de Prompts",
          "Programación Asistida por IA",
        ],
      },
    },
  },
  {
    id: 3,
    icon: "translate",
    image: "assets/img/ef_set_certificate_samuel.jpg",
    issueDate: "2026-05-01",
    expirationDate: null,
    credentialId: "6dpZwX",
    credentialUrl: "https://cert.efset.org/6dpZwX",
    translations: {
      en: {
        name: "EF SET English Certificate 82/100 (C2 Proficient)",
        organization: "EF SET",
        skills: [
          "English as a Second Language (ESL)",
          "Business English",
          "Technical Writing",
          "Academic English",
          "Communication Skills",
        ],
      },
      es: {
        name: "Certificado de Inglés EF SET 82/100 (C2 Avanzado)",
        organization: "EF SET",
        skills: [
          "Inglés como Segundo Idioma (ESL)",
          "Inglés de Negocios",
          "Escritura Técnica",
          "Inglés Académico",
          "Habilidades de Comunicación",
        ],
      },
    },
  },
  {
    id: 4,
    icon: "terminal",
    image: "assets/img/bash_certificate_samuel.jpg",
    issueDate: "2026-06-01",
    expirationDate: null,
    credentialId: "95icag7qfw",
    credentialUrl: "https://campus.mouredev.pro/certificates/95icag7qfw",
    translations: {
      en: {
        name: "Bash/Shell, terminal and command line from scratch",
        organization: "MoureDev",
        skills: [
          "Bash",
          "Shell Scripting",
          "Logic Programming",
          "Automation",
          "System Administration",
          "Command Line Tools",
        ],
      },
      es: {
        name: "Bash/Shell, terminal y línea de comandos desde cero",
        organization: "MoureDev",
        skills: [
          "Bash",
          "Programación de Shell",
          "Programación Lógica",
          "Automatización",
          "Administración de Sistemas",
          "Herramientas de Línea de Comandos",
        ],
      },
    },
  },
];

// --- Estado ---
let currentCertIndex = 0;
let isDetailView = false;
let certSectionEntered = false;

// --- Elementos DOM ---
const stackContainer = document.getElementById("cert-stack-container");
const detailContent = document.getElementById("cert-detail-content");
const detailImage = document.getElementById("cert-detail-image");
const detailInfo = document.getElementById("cert-detail-info");
const slider = document.getElementById("cert-slider");

const prevStack = document.getElementById("cert-prev-stack");
const nextStack = document.getElementById("cert-next-stack");
const dotsStack = document.getElementById("cert-dots-stack");
const prevDetail = document.getElementById("cert-prev-detail");
const nextDetail = document.getElementById("cert-next-detail");
const dotsDetail = document.getElementById("cert-dots-detail");
const backBtn = document.getElementById("cert-back-to-stack");

// --- Funciones auxiliares para obtener textos traducidos ---
function getCertText(cert, field) {
  return cert.translations[currentLang]?.[field] || cert.translations.en[field];
}

function getSkills(cert) {
  return cert.translations[currentLang]?.skills || cert.translations.en.skills;
}

// --- Funciones de navegación ---
function goToDetail(index) {
  currentCertIndex = index;
  isDetailView = true;
  slider.style.transform = "translateX(-100%)";
  renderDetail(index);
  updateDots(dotsDetail, index);
}

function goToStack() {
  isDetailView = false;
  slider.style.transform = "translateX(0%)";
  updateCertCards();
  updateDots(dotsStack, currentCertIndex);
}

function changeCert(delta) {
  const total = certifications.length;
  currentCertIndex = (currentCertIndex + delta + total) % total;
  if (isDetailView) {
    renderDetail(currentCertIndex);
    updateDots(dotsDetail, currentCertIndex);
  } else {
    updateCertCards();
    updateDots(dotsStack, currentCertIndex);
  }
}

// --- Renderizar stack de tarjetas ---
function buildCardHTML(cert, index) {
  const name = getCertText(cert, "name");
  const org = getCertText(cert, "organization");

  return `
    <div class="cert-card brutalist-border rounded-sm shadow-2xl transition-all duration-500 ease-out cursor-pointer"
         data-index="${index}" role="button" tabindex="0" aria-label="${name} - ${org}"
         style="
           position: absolute;
           left: 50%;
           top: 50%;
           background-image: url('${cert.image}');
           background-size: cover;
           background-position: center;
           background-repeat: no-repeat;
         ">
      <div class="card-overlay"></div>
      <div class="card-content">
        <span class="material-symbols-outlined cert-icon">${cert.icon}</span>
        <p class="cert-org">${org}</p>
        <h4 class="cert-name">${name}</h4>
        <span class="cert-id">ID: ${cert.credentialId}</span>
      </div>
    </div>
  `;
}

function computeCardStyle(index) {
  const offset = index - currentCertIndex;
  let translateX = 0, translateY = 0, rotate = 0, scale = 1, zIndex = 0, opacity = 1;

  if (!certSectionEntered) {
    translateX = 0;
    translateY = 40;
    rotate = 0;
    scale = 0.85;
    zIndex = index === 0 ? 10 : 1;
    opacity = 0;
  } else if (offset === 0) {
    translateX = 0; translateY = 0; rotate = 0; scale = 1; zIndex = 10;
  } else if (offset > 0) {
    const d = offset;
    translateX = 80 * d + 30;
    translateY = 25 * d;
    rotate = 3 * d;
    scale = 1 - 0.08 * d;
    zIndex = 10 - d;
    opacity = 1 - 0.2 * d;
  } else {
    const d = Math.abs(offset);
    translateX = -80 * d - 30;
    translateY = 25 * d;
    rotate = -3 * d;
    scale = 1 - 0.08 * d;
    zIndex = 10 - d;
    opacity = 1 - 0.2 * d;
  }
  if (Math.abs(offset) > 3) { opacity = 0; zIndex = -1; }

  return { transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`, zIndex, opacity };
}

function attachCardListeners() {
  document.querySelectorAll("#cert-stack-container .cert-card").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.dataset.index, 10);
      if (idx === currentCertIndex) {
        goToDetail(idx);
      } else {
        currentCertIndex = idx;
        updateCertCards();
        updateDots(dotsStack, currentCertIndex);
      }
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") card.click();
    });
  });
}

function initCertCards() {
  if (!stackContainer) return;
  stackContainer.innerHTML = certifications.map((cert, i) => buildCardHTML(cert, i)).join("");
  attachCardListeners();
  updateCertCards();
}

function updateCertCards() {
  if (!stackContainer) return;
  const cards = stackContainer.querySelectorAll(".cert-card");
  cards.forEach((card) => {
    const index = parseInt(card.dataset.index, 10);
    const style = computeCardStyle(index);
    card.style.transform = style.transform;
    card.style.zIndex = style.zIndex;
    card.style.opacity = style.opacity;
  });
  updateDots(dotsStack, currentCertIndex);
}

function rebuildCertCards() {
  if (!stackContainer) return;
  stackContainer.innerHTML = certifications.map((cert, i) => buildCardHTML(cert, i)).join("");
  attachCardListeners();
  updateCertCards();
}

// --- Renderizar detalle ---
function renderDetail(index) {
  const cert = certifications[index];
  if (!cert) return;

  const t = translations[currentLang];
  const name = getCertText(cert, "name");
  const org = getCertText(cert, "organization");
  const skills = getSkills(cert);

  detailImage.src = cert.image;
  detailImage.alt = `${name} certificate`;

  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const locale = currentLang === "es" ? "es-ES" : "en-US";
  const issueDate = new Date(cert.issueDate).toLocaleDateString(
    locale,
    dateOptions,
  );
  const expirationDate = cert.expirationDate
    ? new Date(cert.expirationDate).toLocaleDateString(locale, dateOptions)
    : t["cert-no-expiration"];

  detailInfo.innerHTML = `
    <h3 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">${name}</h3>
    <p class="text-primary-fixed font-label-caps text-sm uppercase tracking-widest mb-4">${org}</p>
    <div class="space-y-3 text-on-surface-variant">
      <div><span class="font-label-caps text-xs uppercase opacity-70">${t["cert-issue-date"]}</span><br><span class="font-body-md">${issueDate}</span></div>
      <div><span class="font-label-caps text-xs uppercase opacity-70">${t["cert-expiration"]}</span><br><span class="font-body-md">${expirationDate}</span></div>
      <div><span class="font-label-caps text-xs uppercase opacity-70">${t["cert-credential-id"]}</span><br><span class="font-body-md font-mono">${cert.credentialId}</span></div>
      <div><span class="font-label-caps text-xs uppercase opacity-70">${t["cert-verify-url"]}</span><br><a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="font-body-md text-primary-fixed hover:underline">${t["cert-verify-url"]} →</a></div>
      <div>
        <span class="font-label-caps text-xs uppercase opacity-70 block mb-2">${t["cert-skills"]}</span>
        <div class="flex flex-wrap gap-2">
          ${skills.map((skill) => `<span class="brutalist-border px-3 py-1 text-sm text-on-surface rounded-sm">${skill}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
}

// --- Actualizar dots ---
function updateDots(container, activeIndex) {
  if (!container) return;
  container.innerHTML = "";
  certifications.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.className = `w-2.5 h-2.5 rounded-full transition-colors ${idx === activeIndex ? "bg-primary-fixed" : "bg-outline-variant"}`;
    dot.setAttribute("aria-label", `Go to certification ${idx + 1}`);
    dot.addEventListener("click", () => {
      currentCertIndex = idx;
      if (isDetailView) {
        renderDetail(idx);
        updateDots(dotsDetail, idx);
      } else {
        renderStack();
        updateDots(dotsStack, idx);
      }
    });
    container.appendChild(dot);
  });
}

// --- Función para actualizar certificaciones al cambiar idioma ---
function updateCertificationsLanguage() {
  if (isDetailView) {
    renderDetail(currentCertIndex);
    updateDots(dotsDetail, currentCertIndex);
  } else {
    rebuildCertCards();
    updateDots(dotsStack, currentCertIndex);
  }
}

// --- Event listeners de navegación ---
if (prevStack) prevStack.addEventListener("click", () => changeCert(-1));
if (nextStack) nextStack.addEventListener("click", () => changeCert(1));
if (prevDetail) prevDetail.addEventListener("click", () => changeCert(-1));
if (nextDetail) nextDetail.addEventListener("click", () => changeCert(1));
if (backBtn) backBtn.addEventListener("click", goToStack);

// Teclas
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isDetailView) {
    goToStack();
  }
  if (e.key === "ArrowLeft") {
    changeCert(-1);
  }
  if (e.key === "ArrowRight") {
    changeCert(1);
  }
});

// ==========================================
// 8. FUNCIÓN DE CAMBIO DE IDIOMA (definida después de las funciones de certificaciones)
// ==========================================
function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Actualizar meta tags y elementos con data-i18n
  document.querySelector("html").setAttribute("lang", lang);
  document.getElementById("meta-title").textContent = t["meta-title"];
  document.getElementById("meta-desc").setAttribute("content", t["meta-desc"]);
  document.getElementById("og-title").setAttribute("content", t["og-title"]);
  document.getElementById("og-desc").setAttribute("content", t["og-desc"]);
  document.getElementById("tw-title").setAttribute("content", t["tw-title"]);
  document.getElementById("tw-desc").setAttribute("content", t["tw-desc"]);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      if (t[key].includes("<")) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  document.getElementById("lang-label").textContent = lang.toUpperCase();
  localStorage.setItem("lang", lang);

  // Actualizar certificaciones (tanto stack como detalle)
  updateCertificationsLanguage();
}

// ==========================================
// 9. INICIALIZACIÓN
// ==========================================

// Detectar idioma guardado o navegador
const savedLang = localStorage.getItem("lang");
let initialLang = "en";
if (savedLang && translations[savedLang]) {
  initialLang = savedLang;
} else {
  const browserLang = navigator.language || navigator.languages?.[0] || "en";
  initialLang = browserLang.startsWith("es") ? "es" : "en";
}

// Establecer idioma inicial (esto también renderizará las certificaciones)
setLanguage(initialLang);

// Inicializar certificaciones (si no se han renderizado aún)
// Nota: setLanguage ya llama a updateCertificationsLanguage, que a su vez llama a renderStack/renderDetail
// Pero por si acaso, forzamos la primera renderización si no hay tarjetas
if (certifications.length > 0 && stackContainer) {
  // Si el slider no tiene contenido, lo renderizamos
  if (!stackContainer.querySelector(".cert-card")) {
    initCertCards();
    isDetailView = false;
    slider.style.transform = "translateX(0%)";
    renderDetail(0);
  }
} else if (stackContainer) {
  stackContainer.innerHTML =
    '<p class="text-on-surface-variant">No certifications to display.</p>';
}

// Evento del botón de idioma
document.getElementById("lang-toggle").addEventListener("click", () => {
  const nextLang = currentLang === "en" ? "es" : "en";
  setLanguage(nextLang);
});

// ==========================================
// CERTIFICATE SECTION ENTRANCE ANIMATION
// ==========================================
const certSection = document.getElementById("certifications");
const certEntranceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !certSectionEntered) {
        certSectionEntered = true;
        updateCertCards();
        certEntranceObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

if (certSection) {
  certEntranceObserver.observe(certSection);
}
