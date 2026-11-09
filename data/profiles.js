/**
 * Profile pages (/ml-ai/, /full-stack/, /backend-java/, /data-analytics/).
 *
 * One source for every specialized page: PROJECTS holds each project once and
 * PROFILES only says which projects, roles and skills a page shows and in what
 * order. Rendered by profile.js. Every fact here is verified (code, thesis or
 * Alexa's confirmation) — see docs/private/marca-profesional/.
 *
 * Code is never linked: all repos are private by Alexa's decision.
 */
(function () {
  const PROJECTS = {
    thesis: {
      name: { en: 'Breast lesion classification on DCE-MRI — thesis', es: 'Clasificación de lesiones mamarias en DCE-MRI — tesis' },
      status: { en: 'Approved thesis · presented at XXI SIE–2026', es: 'Tesis aprobada · presentada en el XXI SIE–2026' },
      problem: {
        en: 'Telling benign from malignant breast lesions on dynamic contrast-enhanced MRI, where a missed malignant case is the costliest error.',
        es: 'Distinguir lesiones mamarias benignas de malignas en resonancia magnética con contraste, donde no detectar un caso maligno es el error más costoso.',
      },
      solution: {
        en: 'Compared ResNet50, EfficientNet-B3 and MobileViT-S with transfer learning and progressive fine-tuning on three contrast phases (BreastDM), focal loss, isotonic calibration and a tuned threshold. Stratified patient-level hold-out split (162 / 35 / 35 patients) to avoid leakage; Grad-CAM to check that the model looks at the lesion.',
        es: 'Comparé ResNet50, EfficientNet-B3 y MobileViT-S con transfer learning y ajuste fino progresivo sobre tres fases del contraste (BreastDM), pérdida focal, calibración isotónica y umbral ajustado. Partición hold-out estratificada por paciente (162 / 35 / 35 pacientes) para evitar fugas de información; Grad-CAM para comprobar que el modelo mira la lesión.',
      },
      results: {
        en: ['ResNet50 on 35 test patients: ROC-AUC 0.941, sensitivity 0.864 (19 of 22 malignant), specificity 0.846, F1 0.884',
          'Calibrated AUC 0.897, 95% CI [0.766, 0.992]: a small test set, so the interval is always reported',
          'Experiments tracked with MLflow; being turned into a scientific paper'],
        es: ['ResNet50 en 35 pacientes de prueba: AUC-ROC 0,941, sensibilidad 0,864 (19 de 22 malignos), especificidad 0,846, F1 0,884',
          'AUC calibrado 0,897, IC95 % [0,766; 0,992]: el conjunto de prueba es pequeño, por eso siempre reporto el intervalo',
          'Experimentos registrados con MLflow; en conversión a artículo científico'],
      },
      stack: ['PyTorch', 'timm', 'ResNet50', 'EfficientNet-B3', 'MobileViT-S', 'Grad-CAM', 'MLflow'],
      links: [{ href: '../#projects', label: { en: 'Architecture in the full portfolio', es: 'Arquitectura en el portafolio completo' } }],
    },
    jarvis: {
      name: { en: 'JARVIS — personal AI assistant platform', es: 'JARVIS — plataforma de asistente personal de IA' },
      status: { en: 'In daily use', es: 'En uso diario' },
      image: 'assets/img/projects/jarvis.webp',
      problem: {
        en: 'One assistant for job search, research, study and planning that keeps working when an LLM provider fails or runs out of quota.',
        es: 'Un solo asistente para búsqueda de empleo, investigación, estudio y planeación que siga funcionando cuando un proveedor de LLM falla o se queda sin cuota.',
      },
      solution: {
        en: 'FastAPI backend with an orchestrator and specialized agents, LangGraph state graphs with human review, an in-house MCP server and a model gateway with a 6-model fallback chain (Groq, Gemini and local Ollama). RAG on Pinecone with multilingual-e5 embeddings and a BGE reranker. React dashboard, Supabase authentication (JWT) and a Career Ops microservice backed by Redis.',
        es: 'Backend en FastAPI con un orquestador y agentes especializados, grafos de estados en LangGraph con revisión humana, un servidor MCP propio y un gateway de modelos con cadena de respaldo de 6 modelos (Groq, Gemini y Ollama local). RAG sobre Pinecone con embeddings multilingual-e5 y reranker BGE. Panel en React, autenticación con Supabase (JWT) y un microservicio Career Ops con Redis.',
      },
      results: {
        en: ['Retrieval evaluated against known-answer sets (recall@3 = 1.0) with a reranker threshold calibrated on data',
          '1,150 automated tests and CI on GitHub Actions',
          '9 Docker Compose services observed end to end: Prometheus with 6 alerts (service down, 5xx errors, failing tools, pending approval, LLM rate limit), Grafana dashboards, Loki and Promtail logs, Jaeger tracing',
          'Services: Groq, Gemini and Ollama (LLMs), Pinecone, Supabase, Redis, Gmail, Google Calendar and Notion; 55 ADRs'],
        es: ['Recuperación evaluada con conjuntos de respuesta conocida (recall@3 = 1,0) y umbral del reranker calibrado con datos',
          '1.150 pruebas automatizadas y CI en GitHub Actions',
          '9 servicios en Docker Compose con observabilidad completa: Prometheus con 6 alertas (servicio caído, errores 5xx, herramientas fallando, aprobación pendiente, límite de tasa del LLM), paneles en Grafana, logs con Loki y Promtail y trazas con Jaeger',
          'Servicios: Groq, Gemini y Ollama (LLMs), Pinecone, Supabase, Redis, Gmail, Google Calendar y Notion; 55 ADRs'],
      },
      stack: ['Python', 'FastAPI', 'LangGraph', 'MCP', 'Pinecone', 'React', 'Supabase', 'Redis', 'Docker', 'Prometheus', 'Grafana', 'Loki', 'Jaeger'],
      links: [{ href: '../#projects', label: { en: 'Screenshots in the full portfolio', es: 'Capturas en el portafolio completo' } }],
    },
    wdbc: {
      name: { en: 'Breast cancer diagnosis support tool (Wisconsin)', es: 'Herramienta de apoyo al diagnóstico de cáncer de mama (Wisconsin)' },
      status: { en: 'Project lead · team of 5 · AI diploma, Universidad de Antioquia', es: 'Líder de proyecto · equipo de 5 · Diplomado en IA, Universidad de Antioquia' },
      problem: {
        en: 'Classifying breast tumors as benign or malignant from cell-nucleus measurements, where a missed malignant tumor (false negative) is the costliest error.',
        es: 'Clasificar tumores mamarios como benignos o malignos a partir de medidas del núcleo celular, donde no detectar un tumor maligno (falso negativo) es el error más costoso.',
      },
      solution: {
        en: 'I led a five-person team that built and compared 10 supervised classifiers (two per member) on the Breast Cancer Wisconsin Diagnostic dataset, all held to recall ≥ 0.90 for the malignant class with shared metrics. I wrote the EDA that selected 6 features for discriminative power and low multicollinearity, trained Random Forest and SVM with recall-optimized 5-fold grid search and threshold tuning, and wrote the comparative review.',
        es: 'Lideré un equipo de 5 personas que construyó y comparó 10 clasificadores supervisados (dos por integrante) sobre el conjunto Breast Cancer Wisconsin Diagnostic, todos con la meta de sensibilidad ≥ 0,90 en la clase maligna y métricas comunes. Hice el EDA que seleccionó 6 variables por poder discriminante y baja multicolinealidad, entrené Random Forest y SVM con búsqueda en rejilla de 5 particiones optimizando la sensibilidad y ajuste de umbral, y escribí la revisión comparativa.',
      },
      results: {
        en: ['Best model (mine): SVM with RBF kernel (C = 10, γ = 0.01) — on validation, recall 0.977, precision 1.00, F1 0.988, accuracy 0.991 and ROC-AUC 0.9997, with 1 false negative and 0 false positives',
          'On the 114 test cases the SVM kept recall 0.952 (2 false negatives)',
          'Random Forest for comparison on 114 test cases: accuracy 0.98, recall 0.95, precision 1.00, ROC-AUC 0.996',
          'Deployed with Docker on AWS (EC2): isolated VPC network, IAM permissions and image storage on S3'],
        es: ['Mejor modelo (mío): SVM con kernel RBF (C = 10, γ = 0,01) — en validación, sensibilidad 0,977, precisión 1,00, F1 0,988, exactitud 0,991 y AUC-ROC 0,9997, con 1 falso negativo y 0 falsos positivos',
          'En los 114 casos de prueba el SVM mantuvo sensibilidad 0,952 (2 falsos negativos)',
          'Random Forest como comparación en 114 casos de prueba: exactitud 0,98, sensibilidad 0,95, precisión 1,00, AUC-ROC 0,996',
          'Desplegada con Docker en AWS (EC2): red aislada en VPC, permisos con IAM y almacenamiento de imágenes en S3'],
      },
      stack: ['Python', 'Scikit-learn', 'Random Forest', 'SVM', 'GridSearchCV', 'Pandas', 'AWS', 'EC2', 'S3', 'VPC', 'IAM', 'Docker'],
      links: [{ href: '../#projects', label: { en: 'See it in the full portfolio', es: 'Verlo en el portafolio completo' } }],
    },
    fruits: {
      name: { en: 'Fruit classification with CNNs', es: 'Clasificación de frutas con CNN' },
      status: { en: 'AI diploma team project (UdeA) · video demo', es: 'Proyecto en equipo del diplomado en IA (UdeA) · demo en video' },
      problem: {
        en: 'Classifying fruit images reliably by comparing architectures instead of trusting a single model.',
        es: 'Clasificar imágenes de frutas de forma confiable comparando arquitecturas, en vez de confiar en un solo modelo.',
      },
      solution: {
        en: 'Comparative training of several CNN architectures with overfitting analysis and generalization checks in a reproducible environment; MLflow experiment tracking being added.',
        es: 'Entrenamiento comparativo de varias arquitecturas CNN con análisis de sobreajuste y verificación de generalización en un entorno reproducible; seguimiento de experimentos con MLflow en curso.',
      },
      results: { en: ['Video demo in the full portfolio'], es: ['Demo en video en el portafolio completo'] },
      stack: ['PyTorch', 'CNN', 'OpenCV', 'MLflow'],
      links: [{ href: '../#projects', label: { en: 'Watch the demo', es: 'Ver la demo' } }],
    },
    lector: {
      name: { en: 'Lector de PDF — audiobooks and English learning', es: 'Lector de PDF — audiolibros y aprendizaje de inglés' },
      status: { en: 'Live in production', es: 'Publicada en producción' },
      image: 'assets/img/projects/lector-pdf-v2.webp',
      problem: {
        en: 'Listening to any book or document with natural voices, offline and without uploading the file to a server, and learning English along the way.',
        es: 'Escuchar cualquier libro o documento con voces naturales, sin conexión y sin subir el archivo a un servidor, y de paso aprender inglés.',
      },
      solution: {
        en: 'Installable PWA in TypeScript and Preact: Piper neural voices running on the device with ONNX Runtime Web, pdf.js plus Tesseract.js OCR for scanned pages, offline Spanish ⇄ English translation in WebAssembly, and online rooms on Cloudflare Workers.',
        es: 'PWA instalable en TypeScript y Preact: voces neuronales Piper que corren en el dispositivo con ONNX Runtime Web, pdf.js y OCR con Tesseract.js para páginas escaneadas, traducción español ⇄ inglés sin conexión en WebAssembly y salas en línea sobre Cloudflare Workers.',
      },
      results: {
        en: ['601 unit tests and 57 end-to-end tests (Playwright), CI on GitHub Actions',
          'Compatibility tested on Chrome 111 to 156 and on Safari',
          'A1/A2 English course with spaced repetition, live for real users',
          'Privacy-friendly analytics with Umami: no cookies, honors Do Not Track, generic routes only'],
        es: ['601 pruebas unitarias y 57 de extremo a extremo (Playwright), CI en GitHub Actions',
          'Compatibilidad probada en Chrome 111 a 156 y en Safari',
          'Curso de inglés A1/A2 con repetición espaciada, en uso por personas reales',
          'Analítica respetuosa con la privacidad con Umami: sin cookies, respeta «No rastrear» y solo usa rutas genéricas'],
      },
      stack: ['TypeScript', 'Preact', 'Vite', 'PWA', 'ONNX Runtime Web', 'WebAssembly', 'Cloudflare Workers', 'Umami', 'Playwright', 'Vitest'],
      links: [{ href: 'https://milectorpdf.vercel.app/', label: { en: 'Try the app', es: 'Probar la app' } }],
    },
    vella: {
      name: { en: 'Vella Perfumería — custom e-commerce', es: 'Vella Perfumería — e-commerce a medida' },
      status: { en: 'Client project · storefront live, backend in preparation', es: 'Proyecto para cliente · vitrina publicada, backend en preparación' },
      image: 'assets/img/projects/vella-perfumeria.webp',
      problem: {
        en: "A client's perfume business in Colombia needed its own online store with its real catalog, cart and payments.",
        es: 'El negocio de perfumes de una clienta en Colombia necesitaba su propia tienda en línea con su catálogo real, carrito y pagos.',
      },
      solution: {
        en: 'Next.js 16, React 19 and TypeScript storefront, and a Java 21 + Spring Boot 4 backend organized by domain modules (catalog, cart, orders, payments, inventory, promotions, notifications, admin). Spring Security as an OAuth2 resource server (JWT), Spring Data JPA, Flyway migrations on PostgreSQL, Stripe payments and OpenAPI docs.',
        es: 'Vitrina en Next.js 16, React 19 y TypeScript, y backend en Java 21 y Spring Boot 4 organizado por módulos de dominio (catálogo, carrito, pedidos, pagos, inventario, promociones, notificaciones y administración). Spring Security como servidor de recursos OAuth2 (JWT), Spring Data JPA, migraciones Flyway sobre PostgreSQL, pagos con Stripe y documentación OpenAPI.',
      },
      results: {
        en: ['100 JUnit 5 tests, including integration tests against a real PostgreSQL with Testcontainers',
          'Real catalog of more than 100 products; storefront live on Vercel'],
        es: ['100 pruebas JUnit 5, con pruebas de integración contra PostgreSQL real usando Testcontainers',
          'Catálogo real de más de 100 productos; vitrina publicada en Vercel'],
      },
      stack: ['Java 21', 'Spring Boot 4', 'Spring Security', 'Spring Data JPA', 'Flyway', 'PostgreSQL', 'Stripe', 'Testcontainers', 'Next.js', 'TypeScript'],
      links: [{ href: 'https://vellaperfumeria.vercel.app/', label: { en: 'See the storefront', es: 'Ver la vitrina' } }],
    },
    fintech: {
      name: { en: 'Fintech NovaAI — financial data platform', es: 'Fintech NovaAI — plataforma de datos financieros' },
      status: { en: 'Datathon team project (DATAHACKA 2026)', es: 'Proyecto en equipo del datatón DATAHACKA 2026' },
      problem: {
        en: 'Fintechs see raw transactions but not the person behind them, so early risk and financial stress go unnoticed.',
        es: 'Las fintech ven transacciones crudas pero no a la persona detrás, y el riesgo temprano o el estrés financiero pasan desapercibidos.',
      },
      solution: {
        en: 'Four-person team. Medallion pipeline on Parquet: bronze (flattened events), silver (cleaning and time-based features) and gold (360° user view with 35+ features). K-Means segmentation and Isolation Forest anomaly detection, plus an LLM agent with a deterministic offline fallback.',
        es: 'Equipo de 4 personas. Pipeline Medallion sobre Parquet: bronce (eventos aplanados), plata (limpieza y variables temporales) y oro (vista 360° con más de 35 variables por usuario). Segmentación con K-Means y detección de anomalías con Isolation Forest, y un agente con LLM con respaldo determinista sin conexión.',
      },
      results: {
        en: ['My part: the FastAPI REST API, the Docker setup, the agent and the Streamlit + Plotly dashboard', 'Video demo of the full flow'],
        es: ['Mi parte: la API REST en FastAPI, los contenedores Docker, el agente y el dashboard en Streamlit con Plotly', 'Demo en video del flujo completo'],
      },
      stack: ['Python', 'Pandas', 'Parquet', 'Scikit-learn', 'FastAPI', 'Streamlit', 'Plotly', 'Docker'],
      links: [{ href: 'https://www.youtube.com/watch?v=Ke1hc862LAs', label: { en: 'Watch the demo', es: 'Ver la demo' } }],
    },
    accounting: {
      name: { en: 'Privacy-first accounting system', es: 'Sistema contable privacy-first' },
      status: { en: 'Client project · in use', es: 'Proyecto para cliente · en uso' },
      problem: {
        en: "A freelancer's invoices and expenses lived in scattered PDFs, and the data is too sensitive to upload to a cloud tool.",
        es: 'Las facturas y gastos de un trabajador independiente estaban en PDF dispersos, y los datos son demasiado sensibles para subirlos a una herramienta en la nube.',
      },
      solution: {
        en: 'Local-only pipeline: PyMuPDF extraction plus Tesseract OCR, SHA-256 deduplication, validation states, HMAC pseudonymization of personal data and configurable tax rules, feeding a Streamlit dashboard.',
        es: 'Pipeline 100 % local: extracción con PyMuPDF y OCR con Tesseract, deduplicación por SHA-256, estados de validación, seudonimización de datos personales con HMAC y reglas fiscales configurables, que alimentan un dashboard en Streamlit.',
      },
      results: {
        en: ['Automatic privacy check on every derived file', 'Excel export with formulas for the accountant', 'Manual corrections survive reprocessing'],
        es: ['Verificación automática de privacidad en cada archivo derivado', 'Exportación a Excel con fórmulas para el contador', 'Las correcciones manuales sobreviven al reprocesado'],
      },
      stack: ['Python', 'Pandas', 'PyMuPDF', 'Tesseract', 'Pydantic', 'Streamlit', 'Plotly', 'openpyxl'],
      links: [],
    },
    cognia: {
      name: { en: 'CognIA — predictive models for breast cancer', es: 'CognIA — modelos predictivos de cáncer de mama' },
      status: { en: 'Research group · ongoing', es: 'Semillero de investigación · en curso' },
      problem: {
        en: 'Which classical model best separates benign and malignant tumors on the Breast Cancer Wisconsin Diagnostic dataset, and how sure can we be?',
        es: '¿Qué modelo clásico separa mejor los tumores benignos y malignos del conjunto Breast Cancer Wisconsin Diagnostic, y con cuánta certeza?',
      },
      solution: {
        en: 'Exploratory analysis, cleaning and feature selection with descriptive statistics and correlation analysis; logistic regression, decision trees, Random Forest, SVM and KNN compared with stratified K-fold cross-validation and hyperparameter tuning.',
        es: 'Análisis exploratorio, limpieza y selección de variables con estadística descriptiva y análisis de correlación; regresión logística, árboles de decisión, bosque aleatorio, SVM y KNN comparados con validación cruzada K-fold estratificada y optimización de hiperparámetros.',
      },
      results: {
        en: ['Evaluation with confusion matrices, precision, sensitivity, specificity, F1, ROC and AUC'],
        es: ['Evaluación con matrices de confusión, precisión, sensibilidad, especificidad, F1, ROC y AUC'],
      },
      stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      links: [],
    },
  };

  const ROLES = {
    freelance: { role: { en: 'AI Systems & Automation Engineer', es: 'Ingeniera de Sistemas de IA y Automatización' }, org: { en: 'Independent / Freelance', es: 'Independiente / Freelance' }, dates: { en: '2023 — Present', es: '2023 — Actualidad' } },
    cognia: { role: { en: 'Data Science & Machine Learning Researcher', es: 'Semillerista en Ciencia de Datos y Machine Learning' }, org: { en: 'CognIA Research Group — Institución Universitaria Pascual Bravo', es: 'Semillero CognIA — Institución Universitaria Pascual Bravo' }, dates: { en: 'Feb 2026 — Present', es: 'Feb 2026 — Actualidad' } },
    thesis: { role: { en: 'AI & Computer Vision Researcher', es: 'Investigadora en IA y Visión por Computador' }, org: { en: 'Undergraduate thesis — Institución Universitaria Pascual Bravo', es: 'Proyecto de grado — Institución Universitaria Pascual Bravo' }, dates: { en: 'Sep 2025 — Jun 2026', es: 'Sep 2025 — Jun 2026' } },
    webmaster: { role: { en: 'Webmaster · Institutional Web Development (contractor)', es: 'Webmáster · Desarrollo Web Institucional (contratista)' }, org: { en: 'Institución Universitaria Pascual Bravo', es: 'Institución Universitaria Pascual Bravo' }, dates: { en: 'Jul 2025 — Oct 2025', es: 'Jul 2025 — Oct 2025' } },
    servisoft: { role: { en: 'Junior Full Stack Developer — Java Backend', es: 'Desarrolladora Full Stack Junior — Backend Java' }, org: { en: 'Servisoft S.A.', es: 'Servisoft S.A.' }, dates: { en: 'Jun 2023 — Sep 2024', es: 'Jun 2023 — Sep 2024' },
      note: { en: 'Java 8/12, JSP, Servlets, JDBC on Tomcat; REST and SOAP APIs on MSSQL, Oracle and MongoDB for DANE, JEP, the Medellín Mayor’s Office and other public and private clients.', es: 'Java 8/12, JSP, Servlets y JDBC sobre Tomcat; APIs REST y SOAP sobre MSSQL, Oracle y MongoDB para el DANE, la JEP, la Alcaldía de Medellín y otros clientes públicos y privados.' } },
    mvtel: { role: { en: 'Software Development Intern', es: 'Practicante de Desarrollo de Software' }, org: { en: 'MV-TEL SAS', es: 'MV-TEL SAS' }, dates: { en: 'Jun 2021 — Nov 2021', es: 'Jun 2021 — Nov 2021' } },
  };

  const PROFILES = {
    'ml-ai': {
      cv: 'ML_Engineer',
      headline: { en: 'ML Engineer · Computer Vision · LLMs, RAG and agents', es: 'ML Engineer · Visión por computador · LLMs, RAG y agentes' },
      summary: {
        en: 'I take models from experimentation to systems that are evaluated, monitored and actually work: deep learning for medical imaging with honest, patient-level evaluation, and LLM systems with RAG and agents that are tested like any other software.',
        es: 'Llevo modelos de la experimentación a sistemas que se evalúan, se monitorean y funcionan: deep learning para imágenes médicas con una evaluación honesta a nivel de paciente, y sistemas con LLMs, RAG y agentes que se prueban como cualquier otro software.',
      },
      primary: ['PyTorch', 'Transfer learning', { en: 'Computer vision', es: 'Visión por computador' }, { en: 'Model evaluation & calibration', es: 'Evaluación y calibración de modelos' }, 'Grad-CAM', 'MLflow', 'LLMs', 'RAG', 'Pinecone', 'LangGraph', 'MCP', 'FastAPI'],
      secondary: ['Scikit-learn', 'AWS', 'Docker', 'Prometheus', 'Grafana', 'Pandas', 'Java'],
      projects: ['thesis', 'jarvis', 'wdbc', 'fruits', 'fintech'],
      roles: ['freelance', 'thesis', 'cognia', 'servisoft'],
    },
    'full-stack': {
      cv: 'Full_Stack',
      headline: { en: 'Full Stack Developer · TypeScript, React and Next.js · Spring Boot and FastAPI', es: 'Full Stack Developer · TypeScript, React y Next.js · Spring Boot y FastAPI' },
      summary: {
        en: 'I ship complete products, from the browser to the database: an installable PWA live in production with hundreds of automated tests, and a custom e-commerce site with a Spring Boot backend, plus professional experience building Java backends.',
        es: 'Entrego productos completos, del navegador a la base de datos: una PWA instalable en producción con cientos de pruebas automatizadas y un e-commerce a medida con backend en Spring Boot, además de experiencia profesional construyendo backends en Java.',
      },
      primary: ['TypeScript', 'React', 'Preact', 'Next.js', 'PWA', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'Supabase', 'Playwright', 'Vercel', 'Cloudflare Workers'],
      secondary: ['Node.js', 'Express', 'Docker', 'GitHub Actions', 'Tailwind CSS', 'Java', 'Python', 'WebAssembly'],
      projects: ['lector', 'vella', 'jarvis'],
      roles: ['freelance', 'servisoft', 'webmaster', 'mvtel'],
    },
    'backend-java': {
      cv: 'Backend_Java',
      headline: { en: 'Backend Engineer · Java 21 and Spring Boot · REST APIs · PostgreSQL', es: 'Backend Engineer · Java 21 y Spring Boot · APIs REST · PostgreSQL' },
      summary: {
        en: 'Professional Java backend experience for public-sector organizations, and today secure, tested Spring Boot 4 services: OAuth2/JWT, JPA, Flyway, Testcontainers and documented APIs.',
        es: 'Experiencia profesional en backend Java para entidades del sector público y, hoy, servicios en Spring Boot 4 seguros y probados: OAuth2/JWT, JPA, Flyway, Testcontainers y APIs documentadas.',
      },
      primary: ['Java 21', 'Spring Boot', 'Spring Security', 'OAuth2 / JWT', 'Spring Data JPA', 'Flyway', 'PostgreSQL', 'REST', 'SOAP', 'JUnit 5', 'Testcontainers', 'OpenAPI'],
      secondary: ['Node.js', 'Express', 'MSSQL', 'Oracle', 'MongoDB', 'Docker', 'FastAPI', 'Redis'],
      projects: ['vella', 'jarvis'],
      roles: ['servisoft', 'freelance', 'mvtel'],
    },
    'data-analytics': {
      cv: 'Data_Analyst',
      headline: { en: 'Data Analyst · Python and SQL · Data pipelines · Visualization', es: 'Data Analyst · Python y SQL · Pipelines de datos · Visualización' },
      summary: {
        en: 'I turn messy data (PDFs, events, transactions) into reliable information for decisions, with pipelines that check data quality and protect privacy along the way.',
        es: 'Convierto datos desordenados (PDF, eventos, transacciones) en información confiable para decidir, con pipelines que revisan la calidad de los datos y protegen la privacidad en el camino.',
      },
      primary: ['Python', 'Pandas', 'SQL', 'ETL', { en: 'Medallion architecture', es: 'Arquitectura Medallion' }, 'Parquet', { en: 'Data quality', es: 'Calidad de datos' }, { en: 'Exploratory analysis', es: 'Análisis exploratorio' }, 'Scikit-learn', 'Streamlit', 'Plotly'],
      secondary: ['PostgreSQL', 'NumPy', 'Matplotlib', 'FastAPI', 'Docker', 'OCR'],
      projects: ['wdbc', 'fintech', 'accounting'],
      roles: ['freelance', 'cognia', 'thesis'],
    },
  };

  window.PORTFOLIO_PROFILES = { PROJECTS, ROLES, PROFILES };
})();
