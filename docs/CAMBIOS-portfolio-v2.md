# Portafolio v2: reporte de cambios (Fase 1)

Rama: `portfolio-v2`. No se hizo push y `main` no se tocó. Fecha: 2026-09-24.

Para revisarlo en local:

```bash
cd ~/portfolio && git switch portfolio-v2
python3 -m http.server 8765   # → http://localhost:8765/
```

Cuando te guste, haces el merge a `main` y el sitio se vuelve a desplegar.

---

## 1. Cambios por sección

### Fechas, estados y contadores
- **Educación**
  - Ingeniería de Software: *Feb 2025 — Dic 2026*, con el estado "Grado en diciembre 2026" y un punto que pulsa.
  - Diplomado IA (UdeA): pasa a **Completado**, *Feb — Abr 2026*, 280 h (dato tomado del CV).
  - Nuevo: **Transformación Digital con IA y Automatización**, Becas **Nodo + Accenture**, cohorte G3 2026. La institución se muestra en cian para que resalte.
  - Nuevo: **Especialidad en Automatización de Procesos**, Nodo, *21 sep — 2 nov 2026*, marcada como **En curso** con el punto que pulsa.
  - Inglés: ahora dice "Inglés B1+ · en formación constante" / "English B1+ · continuously improving". Ya no menciona el examen TyT.
- **Timeline**: la reescribí completa en orden cronológico, sin duplicados. Hitos: grado (dic 2026, *próximo*), especialidad Nodo (*en curso*), artículo científico (*en curso*), tesis aprobada (oct 2025 — sep 2026), certificación Nodo + Accenture, proyectos independientes (*en curso*), diplomado IA, ESUMER, **Servisoft S.A.** (jun 2023 — sep 2024, backend Java), ESAP y la Tecnología.
- **Tesis**: quité la inconsistencia "2024–2025" / "2025 — Present". Ahora aparece como aprobada y con el artículo en curso.
- **Contadores** (8+, 5, 4, 176): el HTML estático ya trae el valor final. La animación desde 0 solo corre si hay JS y no está activo `prefers-reduced-motion`. Sin JS nunca se ve "0". Lo verifiqué.
- **Contacto**: roles objetivo actualizados a AI/ML Software Engineer, Backend Developer (Java/Spring Boot) y Full Stack Developer.

### Hero
- La foto de perfil va arriba y `ai-system-architecture.yaml` debajo. Esto venía del trabajo que tenías sin commitear en `main`; lo traje a la rama como primer commit. En móvil el orden es texto → foto → diagrama.

### "I build systems, not notebooks"
- Cada etiqueta ahora es un botón con **borde brillante animado**: un gradiente cónico índigo → cian → violeta que gira al pasar el mouse o con foco de teclado. Si el usuario tiene `prefers-reduced-motion`, se ve estático.
- Al hacer clic se abre un **modal grande con YouTube** en 16:9, que carga solo al abrir y usa `youtube-nocookie`. Se cierra con Esc, con un clic fuera o con el botón; al cerrar se detiene el video y el foco vuelve al botón. Si el link está vacío, el modal muestra "Video próximamente".
- Nueva **5.ª tarjeta, "Web Development / Desarrollo Web"**: Java, Spring Boot, JavaScript, React, HTML5/CSS y Bootstrap, todas sacadas del CV.
- **Pipeline end-to-end interactivo**: cada etapa funciona como una pestaña (clic, hover o flechas del teclado) y tiene un flujo animado entre etapas. El detalle de cada una muestra qué herramientas usas y en qué proyecto. Los datos son reales: 232 pacientes y 1.722 cortes salen del YAML de la tesis; Databricks y los 10 clasificadores, de OncoClassify según el CV; Docker, Redis, Prometheus y Grafana, del código de JARVIS.
- Corregí el texto de la tarjeta 4: en ES/EN decía "Cloud-native AI / Spark" pero sus etiquetas eran Spring Boot/FastAPI/Flask. Ahora dice "AI Infrastructure", igual que el HTML.

### Evidencia segura (Cloud & Big Data)
- Las tarjetas de **AWS, Apache Spark y Containerization** tienen un bloque "Evidencia" con dos botones: **video demo** (mismo modal, link vacío por ahora) y **diagrama de arquitectura en SVG** que se abre en el modal (horizontal en escritorio, vertical en móvil).
  - AWS: OncoClassify (Databricks → S3 → EC2 dentro de una VPC → usuario).
  - Spark: patrón de ETL por lotes, rotulado como "patrón de referencia".
  - Docker: pipeline de la tesis (cliente → API REST → runtime PyTorch → volumen).
- No hay ningún nombre real de recurso, cuenta, bucket, host ni puerto. Los datos están en `data/diagrams.js`.
- El fragmento opcional de `docker-compose` **no se incluyó**. El único compose real está en JARVIS, que es un repo **privado**, y la regla era usarlo solo si venía de un repo público.

### Proyectos
- Nueva pestaña de filtro **Desarrollo Web** con dos tarjetas:
  - **Nova E-commerce** (repo público real: Spring Boot, React, MySQL).
  - **Landing page, negocio de reformas**: placeholder de captura y `TODO(Alexa)`.
- **Tesis**: "Containerized ML Thesis Pipeline" quedó fusionado dentro de la tarjeta de la tesis.
  - Estado: *Tesis · Aprobada*.
  - Funcionalidades: los 3 modelos, K-Fold, focal loss, Grad-CAM y Docker.
  - Botones: repositorio, video y **Explorar arquitectura**.
  - El link ahora apunta a `MRI_BreastCancer_Classification`. El anterior (`breast-cancer-dce-mri-classification`) es **privado** y daba 404 a los visitantes. Corregí lo mismo en el Model Lab.
- **Career Ops → "Umbrella AI — Multi-Agent LLM System"**, con la lista de funcionalidades confirmadas y el botón "Videos cortos" (acepta varios clips). Sigue sin código porque el repo es privado.
- **SaberPro-RAG** como proyecto destacado: stack y funcionalidades según el prompt.
- **JARVIS**, estado "En desarrollo".
- Todas las tarjetas tienen botón de video. Enlacé el repo público de *Clasificación de frutas CNN*.

### Animación de arquitectura (tesis)
- Un **explorador interactivo** en el modal para MobileViT-S (por defecto), ResNet50 y EfficientNet-B3.
  - Bloques en flujo con un pulso de datos animado y detalle al seleccionar cada bloque.
  - Selector **Fase 1 (backbone congelado) / Fase 2 (fine-tuning)**, con leyenda de colores: congelado, descongelado en el fine-tuning y cabeza nueva.
- **Las capas descongeladas vienen del código del repo**, no son inventadas. En `experimentos/*/cuadernos/ExperimentoOficial.ipynb`, BLOQUE 10, `unfreeze_top_layers()`:
  - MobileViT-S: `stages.4` + `head`. `final_conv` sigue congelado.
  - ResNet50: `layer4` + `fc`.
  - EfficientNet-B3: `features.7`, `features.8` + `classifier`.
- Épocas, LR y focal loss salen de `configs/BreastCancer_DCE_DL_VF_config.yaml`. Estructura, canales y parámetros salen de los modelos de referencia (timm/torchvision).
- Hecho con HTML/CSS/JS, sin librerías. Respeta `prefers-reduced-motion`. Los datos están en `data/thesis-architecture.js`.

### LLM Engineering
- El contenido quedó igual. Cada chip (Models & APIs, Orchestration & Tools, Engineering Patterns) tiene ahora el borde brillante y abre el modal de video.

### Tech Stack
- Nuevo bloque **Web · Frontend / Backend / Full Stack** con tecnologías del CV:
  - Frontend: JavaScript, React, HTML5, CSS, Bootstrap, UI basada en componentes.
  - Backend: Java 8/12, Spring Boot, REST/SOAP, FastAPI, Flask, Tomcat.
  - Entrega: MySQL, Oracle, MSSQL, Postman, WordPress, Vercel.
- Al marquee le agregué React y JavaScript.

### Research
- Nuevo interés **10 · Desarrollo Web / Web Development**.

### GitHub
- **Causa del "Loading…" y los "—"**: se pedían solo 6 repos y después se filtraban los forks. Como tus repos más recientes son forks, casi no quedaba nada.
  - Ahora se piden 100 repos, se excluyen forks y repos vacíos, y se ordenan por último push.
- La respuesta se guarda en `localStorage` por 1 hora, con `try/catch`. Hay timeout de 8 s y un respaldo en dos pasos: primero la caché vencida y después repos públicos seleccionados, con un aviso visible.
- 4 contadores: repos públicos, proyectos propios, seguidores y **lenguaje principal calculado** (antes era "Python" fijo).
- Tarjetas externas, verificadas el 24 sep 2026:
  - `github-readme-stats.vercel.app` está **pausado (HTTP 503)**, así que no se usa.
  - En su lugar: `github-profile-summary-cards` (stats y lenguajes), `streak-stats.demolab.com` (racha) y `ghchart.rshah.org` (gráfico de contribuciones, invertido para el tema oscuro).
  - Cada imagen se oculta sola si su servicio falla.

### Correcciones extra encontradas al verificar
- **Scroll horizontal a 375px**: el `<pre>` del terminal LLM ensanchaba la grilla. Se arregló con `min-width: 0`.
- **Íconos que no existen en Phosphor 2.1.1**: `docker-logo`, `kubernetes-logo` y `server` aparecían vacíos. Los cambié por `shipping-container`, `steering-wheel` y `hard-drives`.
- **Bio (`hero.aboutBio`)**: corregí la trayectoria, que ahora es técnica en sistemas → Tecnología en Desarrollo de Software → Ingeniería de Software. **Ojo:** ese texto hoy **no se muestra** en la página porque la tarjeta `about.md` que lo usaba ya no estaba en tu versión del hero. Quedó listo por si la recuperas.

---

## 2. Dónde pegar los links de video

**Un solo archivo: `data/videos.js`.** Cada clave corresponde a un `data-video="…"` del HTML.

```js
'docker': 'https://youtu.be/XXXXXXXXXXX',          // cualquier formato de YouTube
'project-umbrella': ['https://youtu.be/AAA', 'https://youtu.be/BBB'],   // varios clips
```

Si dejas el link vacío (`''` o `[]`), el modal muestra "Video próximamente". Claves disponibles:

- **Systems**: `microservices`, `rest-apis`, `event-driven`, `docker`, `kubernetes`, `aws`, `mlops`, `git`, `ci-ready`, `spring-boot`, `fastapi`, `flask`, `java`, `javascript`, `react`, `html-css`, `bootstrap`
- **Evidencia**: `evidence-aws`, `evidence-spark`, `evidence-docker`
- **Proyectos**: `project-thesis`, `project-umbrella` (lista), `project-saberpro-rag`, `project-jarvis`, `project-fruits-cnn`, `project-ml-benchmark`, `project-segmentation`, `project-web-landing`
- **LLM**: `gpt-4`, `claude`, `gemini`, `deepseek`, `openrouter`, `langchain`, `cursor-ai`, `ollama`, `rag`, `ai-agents`, `prompt-engineering`, `retrieval-systems`, `multi-agent`, `vector-dbs`

---

## 3. TODO(Alexa) pendientes

| Dónde | Qué falta |
|---|---|
| `data/videos.js` | Todos los links de YouTube (sección 2). |
| `index.html`, tarjeta de la tesis | Link o DOI del artículo cuando se envíe o publique. |
| `index.html`, Umbrella AI | Completar funcionalidades (`projects.umbrellaF6…` en `i18n.js` + un `<li>`). |
| `index.html`, SaberPro-RAG | `github.com/PandoraRiot/SaberPro-RAG` es **público pero está vacío** (0 commits). Enlazarlo cuando subas código y confirmar el estado exacto (`projects.saberStatus`, hoy "RAG · EdTech"). |
| `index.html`, landing de reformas | Nombre del negocio, URL en vivo, stack (`metricStack` + tags), secciones reales y **captura** (`assets/img/projects/…`). |
| `index.html`, Educación | Temario de la Especialidad en Automatización (`education.autoDesc`), si quieres más detalle. |

---

## 4. Datos que se contradicen: decídelo tú

1. **Stack de JARVIS.** El prompt dice "dashboard Flask", pero el **código local** (`backend/app.py`) y el **CV** dicen **FastAPI + React** (más Redis, Docker, Prometheus/Grafana/Loki/Jaeger). Usé FastAPI + React.
2. **JARVIS y Umbrella podrían ser el mismo código.** El README del repo `Jarvis_agent_master` se titula "Umbrella.NovaAI" y contiene `career_ops_service/`. En el sitio quedaron como dos tarjetas distintas, como pide el prompt. Confirma que así lo quieres.
3. **K-Fold en la tesis.** El prompt lo da como confirmado, pero en el repo `StratifiedGroupKFold` solo se **importa** y el YAML dice `split_strategy: holdout_70_15_15_patient_level`. Lo mantuve porque tu dato tiene prioridad. Si el artículo usa holdout, cambia `thesisF2` / `t4Desc` en `i18n.js`.
4. **Diplomado IA.** El sitio decía "Feb — Jun 2026, En curso" y el CV dice "Abril 2026". Usé *Feb — Abr 2026, Completado*.
5. **Tecnología en Desarrollo de Software.** El sitio dice *Ago 2017 — Ene 2022* y el CV *2018–2022*. Mantuve las fechas del sitio, que son más precisas; confírmalo.
6. **Técnica en sistemas.** La mencionaste para la bio, pero no está en el CV ni en Educación, y el contador "5 programas completados" no la incluye. Si quieres que aparezca como tarjeta o hito, dame institución y fechas.
7. **Clientes de Servisoft.** El CV nombra a DANE, JEP, Alcaldía de Medellín y UPB. En el sitio dejé "clientes del sector público", sin nombres. Si quieres nombrarlos, edita `timeline.t9Desc`.
8. **Model Lab.** La entrada CNN menciona "ResNet18/50", pero el repo final de la tesis solo tiene ResNet50, EfficientNet-B3 y MobileViT-S. No lo toqué porque el Model Lab quedaba fuera del alcance.
9. **Terminal de LLM.** Todavía dice `CareerOpsAgent(...)`. Lo dejé porque el prompt pedía no tocar ese contenido; si quieres coherencia con el renombre, cámbialo por `UmbrellaAgent`.
10. **Mes de la certificación Nodo + Accenture.** Solo se sabe "cohorte G3 2026". Si tienes el mes, ponlo en `education.nodoDate` / `timeline.t5Date`.

---

## 5. Verificación realizada

- Recorrido automático con Chromium headless en **375, 768 y 1440 px**, en **ES y EN**: **0 errores de consola** y **0 scroll horizontal**.
- Modal: abre, muestra "Video próximamente", se cierra con Esc y devuelve el foco. Diagramas y explorador probados en escritorio y móvil.
- Todas las claves `data-i18n*` y `data-video-title` existen en ambos idiomas. Todas las claves `data-video` existen en `data/videos.js` y no sobra ninguna.
- Los textos idénticos en ES y EN son nombres propios o términos técnicos (MLOps, Backend, Deep Learning, nombres de instituciones…).
- Contadores correctos sin JS y con `prefers-reduced-motion`.
- `lab.html`: sin errores, y el link apunta al repo público.
- Búsqueda de credenciales, IPs, IDs de AWS, ARNs, buckets y URLs internas antes de cada commit: nada. `docs/private/` (el CV) está en `.gitignore` y **no se commiteó**.
