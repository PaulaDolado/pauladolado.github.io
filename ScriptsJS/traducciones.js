// Textos en inglés del portfolio, por clave.
//
// El español no está aquí: es el texto que ya hay en el HTML. Cada
// elemento traducible lleva un data-i18n (o data-i18n-html /
// data-i18n-attr) con una de estas claves, e idioma.js cambia su texto
// por el de aquí al pasar a inglés. Si una clave no existe, se queda el
// español.
//
// Las fichas de cada proyecto (botón "+") tienen su inglés en
// ScriptsJS/proyectoModal.js, junto al español.
window.TRADUCCIONES_EN = {
    // Comunes a todas las páginas
    'nav.logo': 'Paula Dolado — Home',
    'nav.inicio': 'HOME',
    'nav.acerca': 'ABOUT ME',
    'nav.proyectos': 'PROJECTS',
    'nav.experiencia': 'EXPERIENCE',
    'nav.contacto': 'CONTACT',
    'menu.abrir': 'Open menu',
    'menu.cerrar': 'Close menu',
    'idioma.cambiar': 'View the site in Spanish',

    // Portada
    'meta.titulo': 'Paula Dolado Aynié — Systems and Development Technician',
    'meta.descripcion': 'Portfolio of Paula Dolado Aynié, systems and development technician and computer engineer specialising in Java, Python, React and Django.',
    'inicio.eyebrow': 'Systems and Development Technician',
    'inicio.sub1': 'Higher Technician in Networked Computer Systems Administration',
    'inicio.sub2': 'Computer Engineer in Management and Information Systems',
    'inicio.verProyectos': 'VIEW PROJECTS',
    'inicio.descargarCv': 'DOWNLOAD CV',
    'inicio.scroll': 'Scroll to see more',

    // Acerca de mí
    'about.titulo': 'About me.',
    'about.habilidades': 'Technical skills',
    'skills.lenguajes': 'Languages and tools',
    'skills.frameworks': 'Frameworks, libraries and runtimes',
    'skills.backend': 'Backend and APIs',
    'skills.apisRest': 'REST APIs',
    'skills.devops': 'DevOps and infrastructure',
    'skills.bbdd': 'Databases',
    'skills.versiones': 'Version control',
    'skills.arquitectura': 'Architecture and development',
    'skills.poo': 'OOP',
    'skills.patrones': 'Design patterns',
    'skills.mvc': 'MVC architecture',
    'skills.microservicios': 'Microservices',
    'skills.verOtras': 'show --more-tech',
    'skills.verPrincipales': 'show --main',
    'skills.cargando': 'loading…',
    'about.hola': "Hi! I'm Paula",
    'about.p1': "I'm passionate about computing. My training began with the vocational programme in Networked Computer Systems Administration, and I'm currently expanding my knowledge with a degree in Computer Engineering.",
    'about.p2': "I'm teaching myself web development, both frontend and backend, which has allowed me to build projects with a complete view, from the visual side to the logic behind it.",
    'about.p3': "I see myself as curious, proactive and always learning, constantly looking for new technologies to grow and bring innovative solutions.",
    'about.saberMas': 'Learn more',

    // Proyectos
    'proyectos.titulo': 'Projects',
    'proyectos.otros': 'Other posts',
    'proyectos.masInfo.companyStock': 'More information about Company Stock',
    'proyectos.masInfo.tidely': 'More information about Tidely',
    'proyectos.masInfo.integra': 'More information about Integra',
    'proyectos.masInfo.elCandil': 'More information about El Candil',
    'proyectos.desc.companyStock': 'Stock management dashboard: material requests, internal restocking, suppliers and orders, with roles and a complete approval workflow.',
    'proyectos.desc.tidely': 'Personal organisation REST API: calendar, goals, finances and projects, with automatic notifications. Includes this web dashboard, a desktop app and an offline mobile app in development.',
    'proyectos.desc.integra': 'Employee portal: clock-in, absences, shift changes, tasks, calendar, tickets, notice board and internal chat, with management screens for each department.',
    'proyectos.desc.elCandil': 'Restaurant website: the menu as a filing cabinet of folders and table booking with capacity control and a WhatsApp confirmation. Next stage: ordering from the table.',
    'modal.cerrar': 'Close',
    'modal.kicker': 'Project',
    'modal.sinEnlace': 'No public link yet — check back soon.',

    // Experiencia
    'experiencia.kicker': '// 03 — experience',
    'experiencia.titulo': 'Work experience',
    'experiencia.sub': 'My professional journey and achievements',
    'experiencia.altasoft.puesto': 'Systems and Development Technician',
    'experiencia.altasoft.fechas': 'Jul. 2026 – Present',
    'experiencia.altasoft.desc': 'I handle incidents involving computers, IP telephony (FreePBX), PDAs and Zebra mobile terminals, and I manage the network and perimeter security with pfSense, as well as Active Directory environments. I also develop internal web applications for PDAs and mobile terminals with Symfony, applications with React and PostgreSQL, and process automations with n8n.',
    'experiencia.interface.puesto': 'Level 2 Support and Systems Technician',
    'experiencia.interface.tipo': 'Full-time · On-site',
    'experiencia.interface.desc': 'I provided level 2 technical support, analysing network incidents, administering servers, managing SaaS platforms and delivering advanced remote support.',
    'experiencia.interface.hyperv': 'HyperV Windows 2012, 2019 and 2022',
    'experiencia.cloud.puesto': 'Cloud Tech Associate Certifications',
    'experiencia.cloud.fechas': 'May 2022 – Mar. 2024',
    'experiencia.cloud.acronis': 'Acronis management and maintenance',

    // Contacto
    'contacto.kicker': '// 04 — contact',
    'contacto.titulo': 'Contact',
    'contacto.sub': "Have a project in mind? Let's work together to make it happen.",
    'form.nombre': 'Name',
    'form.correo': 'Email',
    'form.mensaje': 'Message',
    'form.enviar': 'Send',
    'form.enviando': 'Sending...',
    'form.ok': "Thank you! Your message has been sent successfully, I'll get back to you soon.",
    'form.error': 'Something went wrong while sending your message. Please try again or email me directly.',

    // Otros posts (listado)
    'posts.meta.titulo': 'Other posts — Paula Dolado Aynié',
    'posts.meta.descripcion': 'Other work by Paula Dolado Aynié: automations, experiments and processes explained step by step.',
    'posts.volverProyectos': 'Back to projects',
    'posts.kicker': '// other work',
    'posts.titulo': 'Other posts',
    'posts.intro': "Automations, experiments and processes that don't fit as a full project, explained step by step with screenshots.",
    'posts.leer': 'Read post →',
    'posts.categoria.automatizacion': 'Automation',

    // Post: automatización de facturas con n8n
    'n8n.meta.titulo': 'Invoice automation with n8n — Paula Dolado Aynié',
    'n8n.meta.descripcion': 'How an n8n workflow that automates invoice processing works, explained step by step with screenshots.',
    'n8n.volver': 'Other posts',
    'n8n.volverPie': 'Back to other posts',
    'n8n.kicker': '// automation',
    'n8n.titulo': 'Invoice automation with n8n',
    'n8n.tarjeta': 'n8n workflow that reads PDF purchase invoices with OCR, cross-checks them against the database and, after a review on a web page, records them in Access Dimensions.',
    'n8n.intro': 'An n8n workflow that turns PDF purchase invoices into entries in Access Dimensions. The machine does the repetitive work: it reads each document, extracts its data and cross-checks it against the database. The person only reviews and approves.',
    'n8n.empieza.titulo': 'Where it starts',
    'n8n.empieza.texto': 'The invoices to process are dropped into a folder: in a professional environment, a shared folder on the server; for individual use, a local folder on the computer. The workflow checks it automatically <strong>every 5 minutes</strong>, and it also has a <strong>manual trigger</strong> to run it on demand while testing.',
    'n8n.flujo.titulo': 'The workflow',
    'n8n.flujo.texto': 'Every time it runs, it follows the same path:',
    'n8n.flujo.recogida': '<strong>Collection</strong>: the PDFs in the folder are read and a copy of each one is saved for the review.',
    'n8n.flujo.extraccion': "<strong>Extraction</strong>: each document goes through Claude's OCR tool, which returns its data in a structured form: header, amounts and item lines.",
    'n8n.flujo.tratamiento': '<strong>Processing</strong>: the extracted data is checked against the Dimensions database to suggest the supplier, the code of each item, the cost account, the VAT code and the goods received note.',
    'n8n.flujo.aviso': '<strong>Notification</strong>: a pending review is created for each document and an email is sent listing all of them.',
    'n8n.flujo.alt': 'n8n workflow: manual and scheduled triggers, reading the PDFs, extraction, Dimensions lookup, review email and the webhooks for the review website',
    'n8n.flujo.pie': 'The complete workflow in n8n. At the top, PDF processing through to the email; below, the webhooks that serve the review website and record the invoice.',
    'n8n.correo.titulo': 'The review email',
    'n8n.correo.texto': 'The email goes to a personal account or a shared mailbox, depending on who handles purchasing. It lists each pending document with its total, the number of lines and any warnings detected, plus a button to review it.',
    'n8n.correo.alt': 'Sample email with two purchase invoices pending review, one with no warnings and another with issues and items without an internal code, each with its total, number of lines and a Review button',
    'n8n.correo.pie': 'Email with the invoices pending review, using sample data.',
    'n8n.revision.titulo': 'Reviewing each invoice',
    'n8n.revision.texto1': "From the email you open each invoice separately. The page shows the original PDF next to the extracted data, already checked against our database: some fields don't match as they are, such as the code a supplier gives an item versus our own, and the review suggests the match.",
    'n8n.revision.texto2': "If the OCR hasn't read a field correctly, it is corrected by hand. Editing it queries the internal database information again with the corrected value, so the rest of the accounting is recalculated on the right value.",
    'n8n.revision.alt': 'Review page: on the left, the invoice PDF; on the right, the header, the Dimensions accounting and the item lines, with the Reject and Approve and record in Dimensions buttons',
    'n8n.revision.pie': 'Reviewing a sample invoice: the PDF on the left and the data for Dimensions on the right. Repeated lines for the same item are grouped, and a warning appears when the invoice price has been rounded.',
    'n8n.aprobacion.titulo': 'Approval and recording',
    'n8n.aprobacion.texto1': 'Finally, the operator enters their name in <strong>Revisado por</strong> (reviewed by) and clicks <strong>Aprobar y registrar en Dimensions</strong> (approve and record in Dimensions). The invoice is loaded into the Access Dimensions database, marked as done, and a success message appears. An invoice that has already been recorded cannot be approved again.',
    'n8n.registrada.alt': 'Confirmation message: Recorded in Dimensions: P90001. Entry P90001 created in the purchase ledger.',
    'n8n.registrada.pie': 'Confirmation after approving: the invoice is recorded as an entry in the Dimensions purchase ledger.',
    'n8n.aprobacion.texto2': 'If something is wrong, it can be <strong>rejected</strong> by giving the reason in the comment.'
};
