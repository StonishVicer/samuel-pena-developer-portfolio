// ==========================================
// 1. MENÚ HAMBURGUESA
// ==========================================
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerBtn?.addEventListener('click', () => {
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true' ? false : true;
    hamburgerBtn.setAttribute('aria-expanded', expanded);
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
});

// ==========================================
// 2. FADE-IN AL SCROLL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index === 0) return;
        section.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    sections.forEach((section, index) => {
        if (index === 0) return;
        observer.observe(section);
    });
});

// ==========================================
// 3. NAVBAR ACTIVA (resaltado dinámico)
// ==========================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('border-b-2', 'border-primary-fixed', 'text-primary', 'font-bold');
                link.classList.add('text-on-surface-variant', 'font-medium');
                if (link.getAttribute('data-target') === id) {
                    link.classList.add('border-b-2', 'border-primary-fixed', 'text-primary', 'font-bold');
                    link.classList.remove('text-on-surface-variant', 'font-medium');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => observerNav.observe(section));

// ==========================================
// 4. EXPERIENCIA DINÁMICA (hover/click)
// ==========================================
const expItems = document.querySelectorAll('.experience-item');
let activeExpIndex = 0; // por defecto el primero

// Función para activar un ítem
function setActiveExp(index) {
    expItems.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) {
            item.classList.add('active');
        }
    });
    activeExpIndex = index;
}

// Inicializar con el primero activo
if (expItems.length > 0) {
    setActiveExp(0);
}

expItems.forEach((item, index) => {
    // Hover
    item.addEventListener('mouseenter', () => {
        setActiveExp(index);
    });
    // Click (para mantener el estado al hacer click)
    item.addEventListener('click', () => {
        setActiveExp(index);
    });
});

// ==========================================
// 5. SISTEMA DE IDIOMA (EN/ES)
// ==========================================
const translations = {
    en: {
        // Meta
        'meta-title': 'Samuel Peña | Freelance Full-Stack Web Developer',
        'meta-desc': 'Portfolio of Samuel Peña, software developer with over 2 years of experience in web applications. Specialist in PHP, React, Next.js and PostgreSQL.',
        'og-title': 'Samuel Peña | Freelance Full-Stack Web Developer',
        'og-desc': 'Portfolio of Samuel Peña, software developer with over 2 years of experience in web applications.',
        'tw-title': 'Samuel Peña | Freelance Full-Stack Web Developer',
        'tw-desc': 'Portfolio of Samuel Peña, software developer with over 2 years of experience in web applications.',
        // Nav
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-experience': 'Experience',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        'nav-contact-btn': 'Contact',
        // Hero
        'hero-title': 'Transforming ideas into <br />scalable and efficient web applications',
        'hero-desc': "Hi, I'm Samuel Peña, a Full-Stack Jr. Developer and Freelance Software Developer from Venezuela. With over 2 years of experience, I specialize in building robust web solutions, from backend to dynamic user interfaces.",
        'hero-btn-projects': 'View Projects',
        'hero-btn-contact': 'Contact',
        'hero-availability': 'Available',
        // About
        'about-badge': '[ ABOUT ]',
        'about-title': 'Associate Degree in Computer Science, passionate about clean code and agile solutions.',
        'about-text1': "I graduated from the Jesús Obrero University Institute (IUJO) in May 2026 with an Associate Degree in Computer Science. At 21, I'm passionate about solving complex problems through clean code and agile implementations. I'm bilingual, fluent in Spanish (Native) and English (C1), which allows me to collaborate effectively in international teams. Outside of commercial programming, I dedicate time to volunteering, contributing my technical knowledge to social impact causes.",
        'about-text2': 'My technical training and practical experience have allowed me to lead projects from database design to responsive interface implementation. I believe in user-centered development and continuous improvement.',
        'about-btn': 'View Projects',
        // Skills
        'skills-badge': '[ SKILLS ]',
        'skills-title': 'Skills & Technologies',
        'skills-lang-title': 'Programming Languages',
        'skills-lang-1': 'PHP',
        'skills-lang-2': 'JavaScript (ES6+) / TypeScript',
        'skills-lang-3': 'SQL, HTML5, CSS3',
        'skills-lang-4': 'Python (basic)',
        'skills-front-title': 'Frontend Frameworks',
        'skills-front-1': 'React / Next.js',
        'skills-front-2': 'Vue.js (basic)',
        'skills-front-3': 'Tailwind CSS / Bootstrap',
        'skills-front-4': 'Responsive Design',
        'skills-back-title': 'Backend & APIs',
        'skills-back-1': 'Laravel / PHP',
        'skills-back-2': 'Node.js (Express)',
        'skills-back-3': 'RESTful APIs / GraphQL',
        'skills-back-4': 'WordPress / Headless CMS',
        'skills-db-title': 'Databases & Storage',
        'skills-db-1': 'PostgreSQL / MySQL',
        'skills-db-2': 'Supabase / Firebase',
        'skills-db-3': 'MongoDB (basic)',
        'skills-db-4': 'SQL optimization',
        'skills-tools-title': 'DevOps & Tools',
        'skills-tools-1': 'Git / GitHub / GitLab',
        'skills-tools-2': 'Docker (basic)',
        'skills-tools-3': 'CI/CD (GitHub Actions)',
        'skills-tools-4': 'Vercel / Netlify / AWS',
        'skills-meth-title': 'Methodologies & Soft Skills',
        'skills-meth-1': 'Agile (Scrum / Kanban)',
        'skills-meth-2': 'AI-assisted development',
        'skills-meth-3': 'Technical SEO / Performance',
        'skills-meth-4': 'CRM Automation (HubSpot, GoHighLevel)',
        // Experience
        'exp-badge': '[ EXPERIENCE ]',
        'exp-title': 'Professional Experience',
        'exp-sub': 'Collaborations with digital agencies and international teams.',
        'exp-company': 'Company',
        'exp-date': 'Date',
        'exp-location': 'Location',
        'exp-1-title': 'Full-Stack Developer Intern',
        'exp-1-company': 'Keycode Agencia Digital',
        'exp-1-date': 'Feb 2026 – May 2026',
        'exp-1-location': 'Remote, Mexico',
        'exp-1-desc1': 'Developed a multi-tenant SaaS payroll module ("Dash") with Next.js and Supabase, using RLS for data isolation.',
        'exp-1-desc2': 'Built a corporate Wiki using Nextra JS and React, streamlining the onboarding process and knowledge transfer.',
        'exp-1-desc3': 'Conducted technical SEO audits and set up automations in GoHighLevel CRM to improve sales response.',
        'exp-2-title': 'Web Developer & Community Manager',
        'exp-2-company': 'The Loctor Family of REALTORS®',
        'exp-2-date': 'Oct 2024 – May 2026',
        'exp-2-location': 'Remote, US',
        'exp-2-desc1': 'Architected a custom real estate platform with WordPress and PHP, migrating legacy systems to an IDX-ready architecture.',
        'exp-2-desc2': 'Integrated HubSpot CRM via REST APIs and custom templates, resolving CSS conflicts for full mobile adaptability.',
        'exp-2-desc3': 'Managed digital presence through asynchronous workflows to drive lead generation.',
        // Projects
        'projects-badge': '[ PROJECTS ]',
        'projects-title': 'Selected Projects',
        'projects-sub': 'Web solutions that combine robust architecture, user experience, and measurable results.',
        'projects-view': 'View on GitHub',
        'project-1-title': 'AudiovisualPro (Rental System)',
        'project-1-role': '<span class="font-semibold">Role:</span> Full-Stack Developer (Remote, Aug 2025 – Dec 2025)',
        'project-1-desc': 'Built a reactive rental platform and a secure backend with a PHP/PostgreSQL REST API for equipment scheduling. Implemented Role-Based Access Control (RBAC), reducing manual administrative workflows by 30%.',
        'project-2-title': 'Heaven Graphics',
        'project-2-role': '<span class="font-semibold">Role:</span> Technical Lead (Pre-Internship) (Remote, Aug 2024 – Nov 2024)',
        'project-2-desc': 'Designed a CRUD inventory system with PHP and MySQL that reduced stock discrepancies from 15% to less than 3%. Automated data entry by 50%, delivering a Minimum Viable Product (MVP) that optimized warehouse delivery times.',
        'projects-all': 'View all projects',
        // Volunteering
        'vol-badge': '[ VOLUNTEERING ]',
        'vol-title': 'Social Impact',
        'vol-sub': 'Bringing technology and training to communities in need.',
        'vol-role': 'IT Support Volunteer',
        'vol-org': '<span class="font-semibold">Venezuelan Red Cross</span> · Aug 2025 – Dec 2025 · Barquisimeto, Venezuela',
        'vol-desc1': 'Restored over 12 obsolete workstations, extending critical hardware lifespan by approximately 2 years to support relief operations.',
        'vol-desc2': 'Led 4 digital literacy workshops for over 20 staff members, improving operational efficiency and administrative workflows.',
        // Contact
        'contact-badge': '[ CONTACT ]',
        'contact-title': "Let's talk about your next project",
        'contact-desc': "I'm always open to discussing new opportunities, collaborations, or just chatting about technology. Fill in the form and I'll get back to you as soon as possible.",
        // Form
        'form-name': 'Name *',
        'form-email': 'Email *',
        'form-subject': 'Subject',
        'form-message': 'Message *',
        'form-send': 'Send message',
        // CTA
        'cta-title': 'Ready to work together?',
        'cta-desc': "If you're looking for a proactive developer to boost your team or carry out your next software project, let's talk.",
        'cta-btn': 'Start a conversation',
        // Footer
        'footer-desc': 'Full-Stack Jr. Developer specialized in scalable and efficient web applications.',
        'footer-copy': '© 2026 Samuel Peña. All rights reserved.',
        'footer-nav': 'Navigation',
        'footer-nav-home': 'Home',
        'footer-nav-about': 'About',
        'footer-nav-skills': 'Skills',
        'footer-nav-exp': 'Experience',
        'footer-nav-projects': 'Projects',
        'footer-contact': 'Contact',
        'footer-email-label': 'Email',
        'footer-phone-label': 'Phone',
        'footer-github-label': 'GitHub'
    },
    es: {
        // Meta
        'meta-title': 'Samuel Peña | Desarrollador Web Freelance Full-Stack',
        'meta-desc': 'Portafolio de Samuel Peña, desarrollador de software con más de 2 años de experiencia en aplicaciones web. Especialista en PHP, React, Next.js y PostgreSQL.',
        'og-title': 'Samuel Peña | Desarrollador Web Freelance Full-Stack',
        'og-desc': 'Portafolio de Samuel Peña, desarrollador de software con más de 2 años de experiencia en aplicaciones web.',
        'tw-title': 'Samuel Peña | Desarrollador Web Freelance Full-Stack',
        'tw-desc': 'Portafolio de Samuel Peña, desarrollador de software con más de 2 años de experiencia en aplicaciones web.',
        // Nav
        'nav-home': 'Inicio',
        'nav-about': 'Sobre Mí',
        'nav-skills': 'Skills',
        'nav-experience': 'Experiencia',
        'nav-projects': 'Proyectos',
        'nav-contact': 'Contacto',
        'nav-contact-btn': 'Contactar',
        // Hero
        'hero-title': 'Transformando ideas en <br />aplicaciones web escalables y eficientes',
        'hero-desc': 'Hola, soy Samuel Peña, un Desarrollador Full-Stack Jr. y Freelance Software Developer de Venezuela. Con más de 2 años de experiencia, me especializo en construir soluciones web robustas, desde el backend hasta interfaces de usuario dinámicas.',
        'hero-btn-projects': 'Ver Proyectos',
        'hero-btn-contact': 'Contactar',
        'hero-availability': 'Disponible',
        // About
        'about-badge': '[ SOBRE MÍ ]',
        'about-title': 'Técnico Superior Universitario en Informática, apasionado por el código limpio y las soluciones ágiles.',
        'about-text1': 'Soy egresado del Instituto Universitario Jesús Obrero (IUJO) en mayo de 2026. A mis 21 años, me apasiona resolver problemas complejos mediante código limpio e implementaciones ágiles. Soy bilingüe, con dominio fluido del Español (Nativo) e Inglés (C1), lo que me permite colaborar eficazmente en equipos internacionales. Fuera de la programación comercial, dedico tiempo al voluntariado aportando mis conocimientos técnicos a causas de impacto social.',
        'about-text2': 'Mi formación técnica y mi experiencia práctica me han permitido liderar proyectos desde el diseño de la base de datos hasta la implementación de interfaces responsivas. Creo en el desarrollo centrado en el usuario y en la mejora continua.',
        'about-btn': 'Ver Proyectos',
        // Skills
        'skills-badge': '[ HABILIDADES ]',
        'skills-title': 'Habilidades y Tecnologías',
        'skills-lang-title': 'Lenguajes de Programación',
        'skills-lang-1': 'PHP',
        'skills-lang-2': 'JavaScript (ES6+) / TypeScript',
        'skills-lang-3': 'SQL, HTML5, CSS3',
        'skills-lang-4': 'Python (básico)',
        'skills-front-title': 'Frameworks Frontend',
        'skills-front-1': 'React / Next.js',
        'skills-front-2': 'Vue.js (básico)',
        'skills-front-3': 'Tailwind CSS / Bootstrap',
        'skills-front-4': 'Diseño Responsivo',
        'skills-back-title': 'Backend y APIs',
        'skills-back-1': 'Laravel / PHP',
        'skills-back-2': 'Node.js (Express)',
        'skills-back-3': 'APIs RESTful / GraphQL',
        'skills-back-4': 'WordPress / CMS Headless',
        'skills-db-title': 'Bases de Datos y Almacenamiento',
        'skills-db-1': 'PostgreSQL / MySQL',
        'skills-db-2': 'Supabase / Firebase',
        'skills-db-3': 'MongoDB (básico)',
        'skills-db-4': 'Optimización SQL',
        'skills-tools-title': 'DevOps y Herramientas',
        'skills-tools-1': 'Git / GitHub / GitLab',
        'skills-tools-2': 'Docker (básico)',
        'skills-tools-3': 'CI/CD (GitHub Actions)',
        'skills-tools-4': 'Vercel / Netlify / AWS',
        'skills-meth-title': 'Metodologías y Competencias',
        'skills-meth-1': 'Agile (Scrum / Kanban)',
        'skills-meth-2': 'Desarrollo asistido por IA',
        'skills-meth-3': 'SEO Técnico / Rendimiento',
        'skills-meth-4': 'Automatización CRM (HubSpot, GoHighLevel)',
        // Experience
        'exp-badge': '[ EXPERIENCIA ]',
        'exp-title': 'Trayectoria Profesional',
        'exp-sub': 'Colaboraciones con agencias digitales y equipos internacionales.',
        'exp-company': 'Empresa',
        'exp-date': 'Fecha',
        'exp-location': 'Ubicación',
        'exp-1-title': 'Desarrollador Full-Stack en prácticas',
        'exp-1-company': 'Keycode Agencia Digital',
        'exp-1-date': 'Feb 2026 – May 2026',
        'exp-1-location': 'Remoto, México',
        'exp-1-desc1': 'Desarrollé un módulo SaaS multi-inquilino de nómina ("Dash") con Next.js y Supabase, utilizando RLS para aislamiento de datos.',
        'exp-1-desc2': 'Construí una Wiki corporativa utilizando Nextra JS y React, agilizando el proceso de integración laboral y transferencia de conocimientos.',
        'exp-1-desc3': 'Ejecuté auditorías de SEO técnico y configuré automatizaciones en el CRM GoHighLevel para mejorar la respuesta de ventas.',
        'exp-2-title': 'Desarrollador Web y Community Manager',
        'exp-2-company': 'The Loctor Family of REALTORS®',
        'exp-2-date': 'Oct 2024 – May 2026',
        'exp-2-location': 'Remoto, EE.UU.',
        'exp-2-desc1': 'Arquitecté una plataforma inmobiliaria personalizada con WordPress y PHP, migrando sistemas heredados a una arquitectura preparada para IDX.',
        'exp-2-desc2': 'Integré el CRM de HubSpot mediante APIs REST y plantillas personalizadas, resolviendo conflictos de CSS para obtener una adaptabilidad móvil completa.',
        'exp-2-desc3': 'Gestioné la presencia digital mediante flujos de trabajo asíncronos para impulsar la generación de prospectos (leads).',
        // Projects
        'projects-badge': '[ PROYECTOS ]',
        'projects-title': 'Proyectos Seleccionados',
        'projects-sub': 'Soluciones web que combinan arquitectura robusta, experiencia de usuario y resultados medibles.',
        'projects-view': 'Ver en GitHub',
        'project-1-title': 'AudiovisualPro (Sistema de Rentas)',
        'project-1-role': '<span class="font-semibold">Rol:</span> Full-Stack Developer (Remoto, Ago 2025 – Dic 2025)',
        'project-1-desc': 'Construí una plataforma de renta reactiva y un backend seguro con una API REST en PHP/PostgreSQL para la programación de equipos. Implementé un Control de Acceso Basado en Roles (RBAC), reduciendo los flujos de trabajo administrativos manuales en un 30%.',
        'project-2-title': 'Heaven Graphics',
        'project-2-role': '<span class="font-semibold">Rol:</span> Technical Lead (Pre-Internship) (Remoto, Ago 2024 – Nov 2024)',
        'project-2-desc': 'Diseñé un sistema de inventario CRUD con PHP y MySQL que redujo las discrepancias de stock del 15% a menos del 3%. Automaticé la entrada de datos en un 50%, entregando un Producto Mínimo Viable (MVP) que optimizó los tiempos de entrega en el almacén.',
        'projects-all': 'Ver todos los proyectos',
        // Volunteering
        'vol-badge': '[ VOLUNTARIADO ]',
        'vol-title': 'Impacto Social',
        'vol-sub': 'Aportando tecnología y formación a comunidades que lo necesitan.',
        'vol-role': 'Voluntario de Soporte TI',
        'vol-org': '<span class="font-semibold">Cruz Roja Venezolana</span> · Ago 2025 – Dic 2025 · Barquisimeto, Venezuela',
        'vol-desc1': 'Restauré más de 12 estaciones de trabajo obsoletas, extendiendo la vida útil crítica del hardware en aproximadamente 2 años para apoyar las operaciones de socorro.',
        'vol-desc2': 'Lideré 4 talleres de alfabetización digital para más de 20 miembros del personal, mejorando la eficiencia operativa y los flujos de trabajo administrativos.',
        // Contact
        'contact-badge': '[ CONTACTO ]',
        'contact-title': 'Hablemos sobre tu próximo proyecto',
        'contact-desc': 'Siempre estoy abierto a discutir nuevas oportunidades, colaboraciones o simplemente charlar sobre tecnología. Completa el formulario y te responderé lo antes posible.',
        // Form
        'form-name': 'Nombre *',
        'form-email': 'Correo *',
        'form-subject': 'Asunto',
        'form-message': 'Mensaje *',
        'form-send': 'Enviar mensaje',
        // CTA
        'cta-title': '¿Listo para trabajar juntos?',
        'cta-desc': 'Si buscas a un desarrollador proactivo para potenciar tu equipo o llevar a cabo tu próximo proyecto de software, hablemos.',
        'cta-btn': 'Iniciar conversación',
        // Footer
        'footer-desc': 'Desarrollador Full-Stack Jr. especializado en aplicaciones web escalables y eficientes.',
        'footer-copy': '© 2026 Samuel Peña. Todos los derechos reservados.',
        'footer-nav': 'Navegación',
        'footer-nav-home': 'Inicio',
        'footer-nav-about': 'Sobre Mí',
        'footer-nav-skills': 'Habilidades',
        'footer-nav-exp': 'Experiencia',
        'footer-nav-projects': 'Proyectos',
        'footer-contact': 'Contacto',
        'footer-email-label': 'Correo',
        'footer-phone-label': 'Teléfono',
        'footer-github-label': 'GitHub'
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Actualizar meta tags
    document.querySelector('html').setAttribute('lang', lang);
    document.getElementById('meta-title').textContent = t['meta-title'];
    document.getElementById('meta-desc').setAttribute('content', t['meta-desc']);
    document.getElementById('og-title').setAttribute('content', t['og-title']);
    document.getElementById('og-desc').setAttribute('content', t['og-desc']);
    document.getElementById('tw-title').setAttribute('content', t['tw-title']);
    document.getElementById('tw-desc').setAttribute('content', t['tw-desc']);

    // Actualizar todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            // Si el contenido incluye HTML, usar innerHTML; si no, textContent
            if (t[key].includes('<')) {
                el.innerHTML = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Actualizar el label del toggle
    document.getElementById('lang-label').textContent = lang.toUpperCase();

    // Guardar preferencia
    localStorage.setItem('lang', lang);
}

// Detectar idioma guardado o navegador
const savedLang = localStorage.getItem('lang');
if (savedLang && translations[savedLang]) {
    setLanguage(savedLang);
} else {
    // Detectar navegador (solo para 'es')
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    const detected = browserLang.startsWith('es') ? 'es' : 'en';
    setLanguage(detected);
}

// Toggle de idioma
document.getElementById('lang-toggle').addEventListener('click', () => {
    const nextLang = currentLang === 'en' ? 'es' : 'en';
    setLanguage(nextLang);
});

// ==========================================
// 6. FORMULARIO (envío con validación)
// ==========================================
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = '⚠️ Please fill in all required fields.';
        formStatus.style.color = '#ffb4ab';
        return;
    }

    // Validar email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formStatus.textContent = '⚠️ Please enter a valid email address.';
        formStatus.style.color = '#ffb4ab';
        return;
    }

    // Mostrar estado de envío
    formStatus.textContent = '⏳ Sending...';
    formStatus.style.color = '#c0cab0';

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formStatus.textContent = '✅ Message sent successfully!';
            formStatus.style.color = '#9ffa43';
            form.reset();
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        formStatus.textContent = '❌ Oops! Something went wrong. Please try again.';
        formStatus.style.color = '#ffb4ab';
    }
});