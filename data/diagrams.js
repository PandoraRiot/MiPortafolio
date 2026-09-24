/**
 * Architecture diagrams for the "evidence" blocks (Cloud & Big Data cards).
 * Rendered as SVG by DiagramModule (main.js) inside the shared modal.
 *
 * SECURITY: generic service names only. No account IDs, bucket names,
 * hostnames, IPs, ARNs or internal URLs — ever.
 *
 * nodes:  ordered left→right (top→bottom on phones); `kind` picks the accent.
 * group:  optional box drawn around nodes[from..to] (e.g. a VPC).
 * note:   caption under the diagram (what it is / what it is not).
 */
window.PORTFOLIO_DIAGRAMS = {
  aws: {
    title: { en: 'OncoClassify · AWS deployment (simplified)', es: 'OncoClassify · despliegue en AWS (simplificado)' },
    nodes: [
      { kind: 'data',  label: { en: 'Databricks', es: 'Databricks' }, sub: { en: 'training runs', es: 'entrenamientos' } },
      { kind: 'store', label: { en: 'S3', es: 'S3' }, sub: { en: 'datasets · models', es: 'conjuntos de datos · modelos' } },
      { kind: 'svc',   label: { en: 'EC2', es: 'EC2' }, sub: { en: 'app + classifier', es: 'aplicación + clasificador' } },
      { kind: 'user',  label: { en: 'User', es: 'Usuario' }, sub: { en: 'browser', es: 'navegador' } },
    ],
    group: { from: 2, to: 2, label: { en: 'VPC', es: 'VPC' } },
    note: {
      en: 'Breast-cancer classifier (10 supervised models compared) served from EC2 inside a VPC, with S3 storage and Databricks for training orchestration. Generic view — no real resource names.',
      es: 'Clasificador de cáncer de mama (10 modelos supervisados comparados) servido desde EC2 dentro de una VPC, con almacenamiento en S3 y Databricks para orquestar entrenamientos. Vista genérica — sin nombres reales de recursos.',
    },
  },
  spark: {
    title: { en: 'Batch ETL with Spark (reference pattern)', es: 'ETL por lotes con Spark (patrón de referencia)' },
    nodes: [
      { kind: 'data',  label: { en: 'Raw sources', es: 'Fuentes crudas' }, sub: { en: 'CSV · JSON', es: 'CSV · JSON' } },
      { kind: 'svc',   label: { en: 'PySpark ETL', es: 'ETL PySpark' }, sub: { en: 'clean · join', es: 'limpiar · unir' } },
      { kind: 'store', label: { en: 'Parquet', es: 'Parquet' }, sub: { en: 'curated layer', es: 'capa curada' } },
      { kind: 'ml',    label: { en: 'ML training', es: 'Entrenamiento ML' }, sub: { en: 'features → model', es: 'características → modelo' } },
    ],
    note: {
      en: 'The pattern I apply with Spark / Databricks: distributed batch transformations that land in columnar Parquet before feature engineering and training.',
      es: 'El patrón que aplico con Spark / Databricks: transformaciones distribuidas por lotes que terminan en Parquet columnar antes de la ingeniería de características y el entrenamiento.',
    },
  },
  docker: {
    title: { en: 'Containerized ML pipeline · DCE-MRI thesis (simplified)', es: 'Flujo de ML contenerizado · tesis DCE-MRI (simplificado)' },
    nodes: [
      { kind: 'user',  label: { en: 'Client', es: 'Cliente' }, sub: { en: 'HTTP request', es: 'petición HTTP' } },
      { kind: 'svc',   label: { en: 'REST API', es: 'API REST' }, sub: { en: 'container', es: 'contenedor' } },
      { kind: 'ml',    label: { en: 'Model runtime', es: 'Entorno de ejecución del modelo' }, sub: { en: 'PyTorch', es: 'PyTorch' } },
      { kind: 'store', label: { en: 'Volume', es: 'Volumen' }, sub: { en: 'data · checkpoints', es: 'datos · checkpoints' } },
    ],
    group: { from: 1, to: 2, label: { en: 'Docker', es: 'Docker' } },
    note: {
      en: 'Model, REST API and runtime packaged together for reproducible runs. Generic view — no hosts, ports or internal paths.',
      es: 'Modelo, API REST y entorno de ejecución empaquetados juntos para ejecuciones reproducibles. Vista genérica — sin servidores, puertos ni rutas internas.',
    },
  },
};
