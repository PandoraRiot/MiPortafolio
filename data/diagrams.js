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
