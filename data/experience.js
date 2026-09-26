/**
 * Experience section — rendered by ExperienceModule (main.js).
 *
 * Sources of truth: the LinkedIn export (Profile.pdf, Aug 2026) and CV in
 * docs/private/. Only real employment/internships go in `work`; research
 * and independent projects go in `research` and are labelled as such —
 * never as jobs. Details of each project stay in the Projects section.
 *
 * cats: filter keys → work · research · support · backend · fullstack · data · aiml · cv · llm
 * video: key in data/videos.js (empty link → "Video coming soon")
 * videoTitle: i18n key used as the modal title
 */
window.EXPERIENCE = {
  ui: {
    filters: [
      { key: 'all',       en: 'All',                    es: 'Todo' },
      { key: 'work',      en: 'Work',                   es: 'Laboral' },
      { key: 'research',  en: 'Research',               es: 'Investigación' },
      { key: 'support',   en: 'Support & infrastructure', es: 'Soporte e infraestructura' },
      { key: 'backend',   en: 'Backend',                es: 'Servidor' },
      { key: 'fullstack', en: 'Full Stack / Web',       es: 'Desarrollo web integral' },
      { key: 'data',      en: 'Data',                   es: 'Datos' },
      { key: 'aiml',      en: 'AI / ML',                es: 'IA / ML' },
      { key: 'cv',        en: 'Computer Vision',        es: 'Visión por computador' },
      { key: 'llm',       en: 'LLM / Agents',           es: 'LLM / Agentes' },
    ],
    filtersLabel:  { en: 'Filter experience', es: 'Filtrar experiencia' },
    evolutionTitle: { en: 'How the trajectory evolved', es: 'Cómo evolucionó la trayectoria' },
    evolutionNote:  { en: 'A progression of capabilities, not a strict timeline.', es: 'Una progresión de capacidades, no una cronología estricta.' },
    evolution: [
      { en: 'Support & infrastructure', es: 'Soporte e infraestructura' },
      { en: 'Software development',     es: 'Desarrollo de software' },
      { en: 'Programming / Full Stack', es: 'Programación / desarrollo integral' },
      { en: 'Data',                     es: 'Datos' },
      { en: 'Machine Learning',         es: 'Aprendizaje automático' },
      { en: 'Research',                 es: 'Investigación' },
      { en: 'Computer Vision / Medical AI', es: 'Visión por computador / IA médica' },
      { en: 'LLM / RAG / Agents',       es: 'LLM / RAG / Agentes' },
      { en: 'AI Systems & Automation',  es: 'Sistemas de IA y automatización' },
    ],
    contributions: { en: 'Key contributions', es: 'Contribuciones clave' },
    highlights:    { en: 'Highlights',        es: 'Aspectos destacados' },
    tech:          { en: 'Technologies',      es: 'Tecnologías' },
    repo:          { en: 'Repository',        es: 'Repositorio' },
    privateRepo:   { en: 'Private repository', es: 'Repositorio privado' },
    caseStudy:     { en: 'View in Projects',  es: 'Ver en Proyectos' },
    video:         { en: 'Video',             es: 'Video' },
    empty:         { en: 'Nothing matches this filter.', es: 'Nada coincide con este filtro.' },
    more:          { en: 'Details and technologies', es: 'Detalles y tecnologías' },
  },

  groups: [
    {
      id: 'work',
      kind: 'professional',
      title: { en: 'Work experience', es: 'Experiencia laboral' },
      sub:   { en: 'Employment and internships, most recent first.', es: 'Empleos y prácticas profesionales, del más reciente al más antiguo.' },
      items: [
        {
          id: 'webmaster',
          cats: ['work', 'fullstack'],
          type: { en: 'Work experience · Contractor', es: 'Experiencia laboral · Contratista' },
          title: { en: 'Webmaster · Institutional Web Development', es: 'Webmáster · Desarrollo web institucional' },
          context: { en: 'Institución Universitaria Pascual Bravo · Contractor', es: 'Institución Universitaria Pascual Bravo · Contratista' },
          date: { en: 'Jul 2025 — Oct 2025', es: 'Jul 2025 — Oct 2025' },
          desc: {
            en: 'Administration and development of institutional web platforms: content and feature maintenance, usability improvements, institutional audiovisual production and support for digital-transformation initiatives.',
            es: 'Administración y desarrollo de plataformas web institucionales: mantenimiento de contenidos y funcionalidades, mejoras de usabilidad, producción audiovisual institucional y apoyo a iniciativas de transformación digital.',
          },
          points: [
            { en: 'Maintenance, updating and optimization of institutional web platforms and their content', es: 'Mantenimiento, actualización y optimización de plataformas web institucionales y sus contenidos' },
            { en: 'Design, usability and user-experience improvements with cross-platform, responsive design', es: 'Mejoras de diseño, usabilidad y experiencia de usuario con diseño responsivo y multiplataforma' },
            { en: 'Moodle administration: educational modules, permissions and course publishing', es: 'Administración de Moodle: módulos educativos, permisos y publicación de cursos' },
            { en: 'WordPress administration and news publishing for Pascual Bravo’s continuing-education and PITS areas', es: 'Administración de WordPress y publicación de noticias para las áreas de educación continua y PITS de Pascual Bravo' },
            { en: 'Technical support, requirements management and institutional audiovisual support', es: 'Soporte técnico, gestión de requerimientos y apoyo audiovisual institucional' },
            { en: 'Institutional audiovisual production: photography, interview recording and event coverage', es: 'Producción audiovisual institucional: fotografía, grabación de entrevistas y cubrimiento de eventos' },
          ],
          tech: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script', 'WordPress', 'Moodle', { en: 'Responsive design', es: 'Diseño responsivo' }, { en: 'Photography', es: 'Fotografía' }, { en: 'Video recording', es: 'Grabación de video' }],
        },
        {
          id: 'servisoft',
          cats: ['work', 'backend', 'fullstack'],
          type: { en: 'Work experience', es: 'Experiencia laboral' },
          title: { en: 'Full Stack / Backend Developer', es: 'Programadora Full Stack / Backend' },
          context: {
            en: 'Servisoft S.A. · clients: DANE, UPB, Pascual Bravo, Medellín City Hall, Acueducto Metropolitano de Bucaramanga, Contraloría Distrital de Medellín, Viva',
            es: 'Servisoft S.A. · clientes: DANE, UPB, Pascual Bravo, Alcaldía de Medellín, Acueducto Metropolitano de Bucaramanga, Contraloría Distrital de Medellín, Viva',
          },
          date: { en: 'Jun 2023 — Sep 2024', es: 'Jun 2023 — Sep 2024' },
          desc: {
            en: 'Custom Java backend solutions for institutional and public-sector clients, including maintenance, diagnosis and modernization of existing legacy systems.',
            es: 'Soluciones de servidor a medida en Java para clientes institucionales y del sector público, incluido el mantenimiento, diagnóstico y modernización de sistemas heredados.',
          },
          points: [
            { en: 'Java SE backend with JSP, Servlets and JDBC on Apache Tomcat (v6–v9); REST and SOAP APIs', es: 'Servidor en Java SE con JSP, Servlets y JDBC sobre Apache Tomcat (v6–v9); APIs REST y SOAP' },
            { en: 'MSSQL, Oracle and MongoDB: CRUD operations, stored procedures and query optimization', es: 'MSSQL, Oracle y MongoDB: operaciones CRUD, procedimientos almacenados y optimización de consultas' },
            { en: 'Diagnosis and fixing of errors in legacy Java and JavaScript systems, with technical and functional support', es: 'Diagnóstico y corrección de errores en sistemas heredados en Java y JavaScript, con soporte técnico y funcional' },
            { en: 'Backend–frontend integration; OOP (abstraction, inheritance, polymorphism) and exception handling', es: 'Integración entre servidor e interfaz; POO (abstracción, herencia, polimorfismo) y manejo de excepciones' },
            { en: 'Version control with GitHub / GitLab and dependency documentation for future maintenance', es: 'Control de versiones con GitHub / GitLab y documentación de dependencias para mantenimientos futuros' },
          ],
          tech: ['Java SE', 'JSP', 'Servlets', 'JDBC', 'Apache Tomcat', 'REST', 'SOAP', 'MSSQL', 'Oracle', 'MongoDB', 'GitHub / GitLab'],
        },
        {
          id: 'mvtel',
          cats: ['work', 'fullstack'],
          type: { en: 'Professional internship', es: 'Práctica profesional' },
          title: { en: 'Software Development Intern', es: 'Practicante de Desarrollo de Software' },
          context: { en: 'MV-TEL SAS', es: 'MV-TEL SAS' },
          date: { en: 'Jun 2021 — Nov 2021', es: 'Jun 2021 — Nov 2021' },
          desc: {
            en: 'Participation in the full development cycle of a mobile application and in the corporate website, with automated testing inside a Scrum team.',
            es: 'Participación en el ciclo completo de desarrollo de una aplicación móvil y en el sitio web corporativo, con pruebas automatizadas dentro de un equipo Scrum.',
          },
          points: [
            { en: 'Requirements gathering and analysis, functional design, architecture definition and feature validation', es: 'Levantamiento y análisis de requerimientos, diseño funcional, definición de arquitectura y validación de funcionalidades' },
            { en: 'Corporate website with HTML, CSS and JavaScript (responsive interfaces)', es: 'Sitio web corporativo con HTML, CSS y JavaScript (interfaces responsivas)' },
            { en: 'Automated tests with Selenium WebDriver and Java', es: 'Pruebas automatizadas con Selenium WebDriver y Java' },
            { en: 'Technical documentation, issue tracking and version control', es: 'Documentación técnica, seguimiento de incidencias y control de versiones' },
            { en: 'Scrum ceremonies: Sprint Planning, Daily Meetings, Reviews and Retrospectives', es: 'Ceremonias Scrum: planificación de sprint, reuniones diarias, revisiones y retrospectivas' },
          ],
          tech: ['Java', 'HTML', 'CSS', 'JavaScript', 'Selenium WebDriver', 'Scrum'],
        },
        {
          id: 'onelink',
          cats: ['work', 'support'],
          type: { en: 'Work experience', es: 'Experiencia laboral' },
          title: { en: 'Multi-Skill Agent — Customer Service, Sales, Retention and Technical Support', es: 'Agente Multi-Skill — Atención, Ventas, Retención y Soporte Técnico' },
          context: { en: 'OneLink BPO', es: 'OneLink BPO' },
          date: { en: 'Aug 2019 — Mar 2021', es: 'Ago 2019 — Mar 2021' },
          desc: {
            en: 'First-level technical support and customer service for landline, internet and TV services, plus testing of RPA software — the transition toward technology.',
            es: 'Soporte técnico de primer nivel y atención al cliente en telefonía fija, internet y televisión, además de pruebas de software RPA — la transición hacia la tecnología.',
          },
          points: [
            { en: 'Level-1 phone support: fault diagnosis, equipment configuration, network checks and case follow-up', es: 'Soporte telefónico de primer nivel: diagnóstico de fallas, configuración de equipos, verificación de red y seguimiento de casos' },
            { en: 'Telecommunications infrastructure: HFC, DTH, analogue and repeater technologies', es: 'Infraestructura de telecomunicaciones: tecnologías HFC, DTH, analógica y repetidores' },
            { en: 'Tester user for RPA bots in a test environment (white-box testing), reporting and documenting software faults', es: 'Usuaria de pruebas de bots RPA en entorno de prueba (caja blanca), con reporte y documentación de fallos' },
            { en: 'Customer service, billing, PQRS, sales and retention', es: 'Atención al cliente, facturación, PQRS, ventas y retención' },
          ],
          tech: ['HFC', 'DTH', 'RPA', { en: 'White-box testing', es: 'Pruebas de caja blanca' }, { en: 'Networking', es: 'Redes' }],
        },
        {
          id: 'emtelco',
          cats: ['work', 'support'],
          type: { en: 'Work experience', es: 'Experiencia laboral' },
          title: { en: 'Technical Support Advisor', es: 'Asesor de soporte técnico' },
          context: { en: 'emtelco', es: 'emtelco' },
          date: { en: 'Jan 2018 — Jan 2019', es: 'Ene 2018 — Ene 2019' },
          desc: {
            en: 'Phone technical support for residential internet, TV and landline users.',
            es: 'Soporte técnico telefónico a usuarios residenciales de internet, televisión y telefonía fija.',
          },
          points: [
            { en: 'Fault diagnosis and resolution on fiber (FTTH), HFC and UMTS', es: 'Diagnóstico y resolución de fallas en fibra óptica (FTTH), HFC y UMTS' },
            { en: 'Guidance configuring modems, set-top boxes and home devices', es: 'Orientación en la configuración de módems, decodificadores y equipos del hogar' },
            { en: 'Incident logging and follow-up; network checks and technician-visit scheduling', es: 'Registro y seguimiento de incidentes; verificación de red y programación de visitas técnicas' },
            { en: 'Connectivity, speed and service-sync tests', es: 'Pruebas de conectividad, velocidad y sincronización de servicios' },
          ],
          tech: ['FTTH', 'HFC', 'UMTS', { en: 'Troubleshooting', es: 'Diagnóstico de fallas' }],
        },
        {
          id: 'espumas',
          cats: ['work', 'support'],
          type: { en: 'Professional internship', es: 'Práctica profesional' },
          title: { en: 'Computer Maintenance Intern', es: 'Practicante de mantenimiento de equipos de cómputo' },
          context: { en: 'Espumas Medellín', es: 'Espumas Medellín' },
          date: { en: 'May 2017 — Jan 2018', es: 'May 2017 — Ene 2018' },
          desc: {
            en: 'Day-to-day technical support for internal users while starting systems studies — the first steps into programming.',
            es: 'Soporte técnico diario a usuarios internos mientras iniciaba los estudios de sistemas — los primeros pasos en programación.',
          },
          points: [
            { en: 'Daily support for more than 100 internal users: hardware and software incidents', es: 'Soporte diario a más de 100 usuarios internos: incidentes de hardware y software' },
            { en: 'Operating-system, driver and application installation; periodic backups', es: 'Instalación de sistemas operativos, controladores y aplicaciones; respaldos periódicos' },
            { en: 'Technical manuals, user guides and user training', es: 'Manuales técnicos, guías de usuario y capacitación a usuarios' },
            { en: 'Support for the systems area in basic programming and infrastructure tasks', es: 'Apoyo al área de sistemas en programación básica e infraestructura' },
          ],
          tech: ['Hardware', { en: 'Operating systems', es: 'Sistemas operativos' }, { en: 'Drivers', es: 'Controladores' }, { en: 'Backups', es: 'Respaldos' }],
        },
        {
          id: 'teleperformance',
          cats: ['work', 'support'],
          type: { en: 'Early work experience', es: 'Experiencia laboral temprana' },
          title: { en: 'Customer Service Advisor', es: 'Asesor' },
          context: { en: 'Teleperformance', es: 'Teleperformance' },
          date: { en: 'Mar 2014 — Nov 2014', es: 'Mar 2014 — Nov 2014' },
          desc: {
            en: 'Remote customer service on night shifts aligned to Spain’s time zone.',
            es: 'Atención remota al cliente en horario nocturno, adaptado al huso horario de España.',
          },
          points: [
            { en: 'Billing, service and product enquiries resolved remotely', es: 'Resolución remota de consultas de facturación, servicios y productos' },
            { en: 'Creation, management and follow-up of PQRS', es: 'Creación, gestión y seguimiento de PQRS' },
            { en: 'System adjustments and support on fiber-optic services', es: 'Ajustes en sistema y soporte en servicios de fibra óptica' },
            { en: 'Empathetic service under high quality standards and pressure', es: 'Atención empática bajo altos estándares de calidad y presión' },
          ],
          tech: [{ en: 'Remote support', es: 'Atención remota' }, 'PQRS', { en: 'Fiber optics', es: 'Fibra óptica' }],
        },
      ],
    },
    {
      id: 'research',
      kind: 'research',
      title: { en: 'Research & applied AI', es: 'Investigación e IA aplicada' },
      sub:   { en: 'Research and applied technical work — not presented as employment.', es: 'Investigación y trabajo técnico aplicado — no se presentan como empleo.' },
      items: [
        {
          id: 'cognia',
          cats: ['research', 'aiml', 'data'],
          type: { en: 'Research seedbed', es: 'Semillero de investigación' },
          status: { en: 'In progress', es: 'En curso' },
          title: { en: 'Seedbed member · Data Scientist | Machine Learning Engineer', es: 'Semillerista en ciencia de datos y aprendizaje automático' },
          context: { en: 'CognIA Research Seedbed — Institución Universitaria Pascual Bravo', es: 'Semillero de Investigación CognIA — Institución Universitaria Pascual Bravo' },
          date: { en: 'Feb 2026 — Present', es: 'Feb 2026 — Actualidad' },
          desc: {
            en: 'Predictive models to classify benign and malignant breast tumours on the Breast Cancer Wisconsin Diagnostic Dataset, applying supervised machine learning and statistical analysis to support medical diagnosis.',
            es: 'Modelos predictivos para clasificar tumores mamarios benignos y malignos con el conjunto Breast Cancer Wisconsin Diagnostic, aplicando aprendizaje automático supervisado y análisis estadístico para apoyar el diagnóstico médico.',
          },
          points: [
            { en: 'EDA, cleaning, transformation and feature selection with descriptive statistics and correlation analysis', es: 'Análisis exploratorio, limpieza, transformación y selección de variables con estadística descriptiva y análisis de correlación' },
            { en: 'Currently working with LLMs, Transformers, SVM and CNNs', es: 'Actualmente trabajo con LLM, Transformers, SVM y CNN' },
            { en: 'Logistic Regression, Decision Trees, Random Forest, SVM and KNN compared', es: 'Comparación de regresión logística, árboles de decisión, bosque aleatorio, SVM y KNN' },
            { en: 'K-Fold cross-validation, hyperparameter tuning and stratified train/test splits', es: 'Validación cruzada K-Fold, optimización de hiperparámetros y partición estratificada' },
            { en: 'Confusion matrices and metrics: accuracy, precision, recall, specificity, F1, ROC and AUC', es: 'Matrices de confusión y métricas: exactitud, precisión, sensibilidad, especificidad, F1, ROC y AUC' },
          ],
          tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'LLMs', 'Transformers', 'CNN'],
        },
        {
          id: 'dce-mri',
          cats: ['research', 'aiml', 'cv'],
          type: { en: 'Research · Thesis', es: 'Investigación · Tesis' },
          status: { en: 'Completed · Approved', es: 'Terminada · Aprobada' },
          title: { en: 'AI & Computer Vision Researcher — DCE-MRI Breast Cancer Classification', es: 'Investigadora en IA y Visión por Computador — Clasificación DCE-MRI de cáncer de mama' },
          context: { en: 'Undergraduate thesis · Institución Universitaria Pascual Bravo', es: 'Proyecto de grado · Institución Universitaria Pascual Bravo' },
          date: { en: 'Sep 2025 — Jun 2026', es: 'Sep 2025 — Jun 2026' },
          desc: {
            en: 'Applied Deep Learning research for classification of benign and malignant breast lesions from DCE-MRI, combining patient-level evaluation, cross-validation, model comparison and interpretability. Evaluated in September 2026; continues as a scientific article.',
            es: 'Investigación aplicada en aprendizaje profundo para clasificar lesiones mamarias benignas y malignas a partir de DCE-MRI, combinando evaluación a nivel de paciente, validación cruzada, comparación de modelos e interpretabilidad. Evaluada en septiembre de 2026; continúa como artículo científico.',
          },
          points: [
            { en: 'Medical-image pipelines in Python and PyTorch over the PRE, EARLY and LATE DCE-MRI phases', es: 'Flujos de imágenes médicas en Python y PyTorch sobre las fases pre-contraste, temprana y tardía del DCE-MRI' },
            { en: 'ResNet50, EfficientNet-B3 and MobileViT-S compared with 5-fold cross-validation and patient-level clinical evaluation', es: 'Comparación de ResNet50, EfficientNet-B3 y MobileViT-S con validación cruzada de 5 particiones y evaluación clínica a nivel de paciente' },
            { en: 'Grad-CAM interpretability; experiment tracking with MLflow and TensorBoard', es: 'Interpretabilidad con Grad-CAM; seguimiento de experimentos con MLflow y TensorBoard' },
            { en: 'Final ResNet50 model: AUC 0.951 and clinical recall 0.909', es: 'Modelo final ResNet50: AUC 0,951 y sensibilidad clínica 0,909' },
          ],
          tech: ['Python', 'PyTorch', 'OpenCV', 'ResNet50', 'EfficientNet-B3', 'MobileViT-S', 'Grad-CAM', 'MLflow', 'TensorBoard'],
          repo: 'https://github.com/PandoraRiot/MRI_BreastCancer_Classification',
          caseStudy: '#projects',
          video: 'project-thesis', videoTitle: 'projects.thesisTitle',
        },
        {
          id: 'ai-systems',
          cats: ['aiml', 'llm', 'backend', 'fullstack'],
          type: { en: 'Independent technical work', es: 'Trabajo técnico independiente' },
          status: { en: 'In progress', es: 'En curso' },
          title: { en: 'AI Systems & Automation', es: 'Sistemas de IA y automatización' },
          context: { en: 'Independent projects — not employment', es: 'Proyectos independientes — no es un empleo' },
          date: { en: '2026 — Present', es: '2026 — Presente' },
          desc: {
            en: 'Design and construction of AI systems with LLMs, RAG and agents, integrated through APIs, web interfaces and containers. Technical details live in Projects.',
            es: 'Diseño y construcción de sistemas de IA con LLM, RAG y agentes, integrados mediante APIs, interfaces web y contenedores. Los detalles técnicos están en Proyectos.',
          },
          points: [
            { en: 'JARVIS — personal AI assistant: LLMs, RAG, FastAPI + React dashboard, Redis and Docker; migrating toward Spring Boot microservices', es: 'JARVIS — asistente personal de IA: LLM, RAG, panel FastAPI + React, Redis y Docker; en migración hacia microservicios Spring Boot' },
            { en: 'Umbrella AI — multi-agent LLM system for job-offer analysis, role scoring and prioritization (RAG, Flask)', es: 'Umbrella AI — sistema multiagente con LLM para analizar ofertas, puntuar roles y priorizar oportunidades (RAG, Flask)' },
            { en: 'SaberPro-RAG — RAG learning assistant for the five Saber Pro modules (Qdrant, sentence-transformers, Ollama / Mistral)', es: 'SaberPro-RAG — asistente de aprendizaje con RAG para los cinco módulos de Saber Pro (Qdrant, sentence-transformers, Ollama / Mistral)' },
          ],
          tech: ['Python', 'FastAPI', 'React', 'Docker', 'LLMs', 'RAG', { en: 'Agents', es: 'Agentes' }, 'Redis', 'Spring Boot', { en: 'Microservices', es: 'Microservicios' }],
          caseStudy: '#projects',
        },
      ],
    },
  ],
};
