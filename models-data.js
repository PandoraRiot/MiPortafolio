/**
 * Model Lab — data registry
 * Alexandra García · Software Engineer / ML & AI Systems
 *
 * Bilingual: every long-form field is { en, es }. Rendering code picks
 * the active language via I18nModule.getLang().
 *
 * Each entry is the single source of truth for both the Model Lab
 * list (index.html #lab) and the model detail view (lab.html#/<slug>).
 *
 * HOW TO ADD A NEW MODEL
 * -----------------------
 * 1. Copy an existing object below and change every field (both languages).
 * 2. `status` must be one of: 'planned' | 'research' | 'development' | 'trained' | 'deployed'
 *    Never mark 'trained' or 'deployed' unless a real artifact/metric backs it.
 * 3. `architecture` is a short ordered list of stages ({en, es} strings) rendered as a flow diagram.
 * 4. `metrics` is optional — omit (null) if nothing has been measured yet.
 *    When present, cite real numbers only, with sample size / caveat in `metricsNote`.
 * 5. `inference` describes the *shape* of a future demo (input → output) even if no
 *    demo exists yet — this is what lets the UI grow without a redesign.
 * 6. `cover` is the Model Lab carousel slide image. Leave it `null` to get an
 *    auto-generated placeholder (labeled with the model's name, so it's obvious
 *    which slot each future screenshot belongs in). Once a real MVP screenshot
 *    exists, drop the file in `assets/model-covers/<slug>.jpg` (or .png/.webp)
 *    and set `cover: 'assets/model-covers/<slug>.jpg'` — the carousel switches
 *    to the real image automatically, no HTML/CSS changes needed.
 * 7. No build step needed — this file is loaded directly via <script> on both pages.
 */
window.MODEL_LAB = [
  {
    slug: 'cnn',
    order: '02',
    shortName: 'CNN',
    fullName: { en: 'Convolutional Neural Network', es: 'Red Neuronal Convolucional' },
    type: { en: 'Computer Vision', es: 'Visión por Computador' },
    framework: 'PyTorch',
    task: { en: 'Image classification', es: 'Clasificación de imágenes' },
    status: 'trained',
    tags: [{ en: 'Computer Vision', es: 'Visión por Computador' }, { en: 'PyTorch', es: 'PyTorch' }, { en: 'Transfer Learning', es: 'Transferencia de Aprendizaje' }],
    cover: null,
    summary: {
      en: 'Multi-architecture image classifiers trained and evaluated across two applied projects: a fruit-image benchmark and the convolutional backbone family explored for the DCE-MRI thesis (ResNet18/50, EfficientNet).',
      es: 'Clasificadores de imágenes multi-arquitectura entrenados y evaluados en dos proyectos aplicados: un benchmark de imágenes de frutas y la familia de backbones convolucionales explorada para la tesis DCE-MRI (ResNet18/50, EfficientNet).',
    },
    architecture: [
      { en: 'Input image (RGB, resized + normalized)', es: 'Imagen de entrada (RGB, redimensionada y normalizada)' },
      { en: 'Convolutional backbone (ResNet / EfficientNet family)', es: 'Backbone convolucional (familia ResNet / EfficientNet)' },
      { en: 'Batch norm + ReLU blocks', es: 'Bloques de batch norm + ReLU' },
      { en: 'Global average pooling', es: 'Pooling promedio global' },
      { en: 'Fully connected classification head', es: 'Cabeza de clasificación totalmente conectada' },
      { en: 'Softmax output', es: 'Salida softmax' },
    ],
    dataset: {
      en: 'Fruit-image benchmark (AI Diploma, UdeA + Talento Tech) for the multi-architecture study; DCE-MRI ROI crops for the thesis backbone comparison — see the DCE-MRI case study for that dataset\'s detail.',
      es: 'Benchmark de imágenes de frutas (Diplomado IA, UdeA + Talento Tech) para el estudio multi-arquitectura; recortes ROI de DCE-MRI para la comparación de backbones de la tesis — ver el caso de estudio DCE-MRI para el detalle de ese dataset.',
    },
    training: {
      en: 'Fruit classification: comparative training of 3+ CNN architectures with overfitting analysis and generalization checks. DCE-MRI: backbone candidates trained under 5-fold cross-validation on the stratified training split.',
      es: 'Clasificación de frutas: entrenamiento comparativo de 3+ arquitecturas CNN con análisis de overfitting y verificación de generalización. DCE-MRI: backbones candidatos entrenados con validación cruzada de 5 folds sobre el split de entrenamiento estratificado.',
    },
    metrics: null,
    metricsNote: {
      en: 'Fruit-benchmark metrics were coursework-internal (accuracy/overfitting curves, not published). Thesis-side CNN backbone results are reported under the DCE-MRI case study, not duplicated here.',
      es: 'Las métricas del benchmark de frutas fueron internas al curso (curvas de accuracy/overfitting, no publicadas). Los resultados de los backbones CNN de la tesis se reportan en el caso de estudio DCE-MRI, no se duplican aquí.',
    },
    repo: 'https://github.com/PandoraRiot/breast-cancer-dce-mri-classification',
    repoLabel: { en: 'DCE-MRI backbone experiments', es: 'Experimentos de backbones DCE-MRI' },
    demo: null,
    inference: {
      input: { en: 'Image upload (JPEG/PNG)', es: 'Carga de imagen (JPEG/PNG)' },
      output: { en: 'Class label + confidence score', es: 'Etiqueta de clase + puntaje de confianza' },
    },
    api: null,
  },
  {
    slug: 'transformer',
    order: '08',
    shortName: 'Transformer',
    fullName: { en: 'Vision Transformer', es: 'Transformador de Visión (ViT)' },
    type: { en: 'Computer Vision', es: 'Visión por Computador' },
    framework: 'PyTorch (timm)',
    task: { en: 'Image classification (candidate backbone)', es: 'Clasificación de imágenes (backbone candidato)' },
    status: 'research',
    tags: [{ en: 'Vision Transformer', es: 'Transformador de Visión' }, { en: 'PyTorch', es: 'PyTorch' }, { en: 'Medical AI', es: 'IA Médica' }],
    cover: null,
    summary: {
      en: 'MobileViT explored as a candidate backbone in the DCE-MRI architecture comparison alongside the CNN family — evaluated, not yet selected as the final production model.',
      es: 'MobileViT explorado como backbone candidato en la comparación de arquitecturas de DCE-MRI junto con la familia CNN — evaluado, aún no seleccionado como modelo final de producción.',
    },
    architecture: [
      { en: 'Patch embedding (image → token sequence)', es: 'Patch embedding (imagen → secuencia de tokens)' },
      { en: 'Local representation (MobileNet-style conv block)', es: 'Representación local (bloque conv estilo MobileNet)' },
      { en: 'Transformer encoder blocks (global self-attention)', es: 'Bloques de encoder Transformer (self-attention global)' },
      { en: 'Fusion block', es: 'Bloque de fusión' },
      { en: 'Classification head', es: 'Cabeza de clasificación' },
    ],
    dataset: {
      en: 'Same DCE-MRI ROI dataset and patient-level stratified split used across the thesis backbone comparison.',
      es: 'Mismo dataset de ROI DCE-MRI y split estratificado a nivel de paciente usado en toda la comparación de backbones de la tesis.',
    },
    training: {
      en: 'Trained as one candidate within the 5-fold cross-validation architecture comparison; a best-fold checkpoint was saved for further evaluation.',
      es: 'Entrenado como uno de los candidatos dentro de la comparación de arquitecturas con validación cruzada de 5 folds; se guardó un checkpoint del mejor fold para evaluación posterior.',
    },
    metrics: null,
    metricsNote: {
      en: 'Still in the comparison stage — no consolidated result is being published until the architecture selection is finalized.',
      es: 'Todavía en etapa de comparación — no se publica un resultado consolidado hasta finalizar la selección de arquitectura.',
    },
    repo: 'https://github.com/PandoraRiot/breast-cancer-dce-mri-classification',
    repoLabel: { en: 'DCE-MRI backbone experiments', es: 'Experimentos de backbones DCE-MRI' },
    demo: null,
    inference: {
      input: { en: 'Image / attention map', es: 'Imagen / mapa de atención' },
      output: { en: 'Class prediction + attention visualization', es: 'Predicción de clase + visualización de atención' },
    },
    api: null,
  },
  {
    slug: 'mlp',
    order: '01',
    shortName: 'MLP',
    fullName: { en: 'Multi-Layer Perceptron', es: 'Perceptrón Multicapa' },
    type: { en: 'Tabular Learning', es: 'Aprendizaje Tabular' },
    framework: 'PyTorch',
    task: { en: 'Structured-data classification', es: 'Clasificación de datos estructurados' },
    status: 'planned',
    tags: [{ en: 'Tabular', es: 'Datos Tabulares' }, { en: 'Baseline', es: 'Línea base' }],
    cover: null,
    summary: {
      en: 'Next in the lab queue: a PyTorch MLP baseline on structured data already explored with scikit-learn classifiers (SVM, KNN, Random Forest).',
      es: 'Siguiente en la cola del laboratorio: una línea base MLP en PyTorch sobre datos estructurados ya explorados con clasificadores de scikit-learn (SVM, KNN, Random Forest).',
    },
    architecture: [
      { en: 'Input features (scaled)', es: 'Features de entrada (escaladas)' },
      { en: 'Dense layer + activation', es: 'Capa densa + activación' },
      { en: 'Dense layer + activation', es: 'Capa densa + activación' },
      { en: 'Output layer', es: 'Capa de salida' },
    ],
    dataset: { en: 'To be defined — likely the same tabular sets used in the classical ML benchmark, for a direct comparison.', es: 'Por definir — probablemente los mismos conjuntos tabulares usados en el benchmark de ML clásico, para una comparación directa.' },
    training: null, metrics: null, metricsNote: null,
    repo: null, repoLabel: null, demo: null,
    inference: { input: { en: 'Feature vector (tabular row)', es: 'Vector de features (fila tabular)' }, output: { en: 'Class prediction', es: 'Predicción de clase' } },
    api: null,
  },
  {
    slug: 'rnn',
    order: '03',
    shortName: 'RNN',
    fullName: { en: 'Recurrent Neural Network', es: 'Red Neuronal Recurrente' },
    type: { en: 'Sequence Learning', es: 'Aprendizaje de Secuencias' },
    framework: 'PyTorch',
    task: { en: 'Sequence modeling', es: 'Modelado de secuencias' },
    status: 'planned',
    tags: [{ en: 'Sequence', es: 'Secuencias' }, { en: 'Time Series', es: 'Series de Tiempo' }],
    cover: null,
    summary: {
      en: 'Planned entry point into sequence modeling before moving to gated variants (LSTM, GRU).',
      es: 'Punto de entrada planeado al modelado de secuencias, antes de pasar a variantes con compuertas (LSTM, GRU).',
    },
    architecture: [
      { en: 'Input sequence', es: 'Secuencia de entrada' },
      { en: 'Recurrent cell (shared weights over time)', es: 'Celda recurrente (pesos compartidos en el tiempo)' },
      { en: 'Hidden state propagation', es: 'Propagación del estado oculto' },
      { en: 'Output layer', es: 'Capa de salida' },
    ],
    dataset: null, training: null, metrics: null, metricsNote: null,
    repo: null, repoLabel: null, demo: null,
    inference: { input: { en: 'Sequence (time series / text)', es: 'Secuencia (serie de tiempo / texto)' }, output: { en: 'Next-step or class prediction', es: 'Predicción del siguiente paso o de clase' } },
    api: null,
  },
  {
    slug: 'lstm',
    order: '04',
    shortName: 'LSTM',
    fullName: { en: 'Long Short-Term Memory', es: 'Long Short-Term Memory' },
    type: { en: 'Sequence Learning', es: 'Aprendizaje de Secuencias' },
    framework: 'PyTorch',
    task: { en: 'Long-range sequence modeling', es: 'Modelado de secuencias de largo alcance' },
    status: 'planned',
    tags: [{ en: 'Sequence', es: 'Secuencias' }, { en: 'Gated RNN', es: 'RNN con Compuertas' }],
    cover: null,
    summary: {
      en: 'Gated recurrent architecture planned for longer-range sequence dependencies than a vanilla RNN handles well.',
      es: 'Arquitectura recurrente con compuertas planeada para dependencias de secuencia de más largo alcance de lo que maneja bien una RNN simple.',
    },
    architecture: [
      { en: 'Input sequence', es: 'Secuencia de entrada' },
      { en: 'Forget / input / output gates', es: 'Compuertas de olvido / entrada / salida' },
      { en: 'Cell state', es: 'Estado de celda' },
      { en: 'Hidden state', es: 'Estado oculto' },
      { en: 'Output layer', es: 'Capa de salida' },
    ],
    dataset: null, training: null, metrics: null, metricsNote: null,
    repo: null, repoLabel: null, demo: null,
    inference: { input: { en: 'Sequence (time series / text)', es: 'Secuencia (serie de tiempo / texto)' }, output: { en: 'Next-step or class prediction', es: 'Predicción del siguiente paso o de clase' } },
    api: null,
  },
  {
    slug: 'gru',
    order: '05',
    shortName: 'GRU',
    fullName: { en: 'Gated Recurrent Unit', es: 'Gated Recurrent Unit' },
    type: { en: 'Sequence Learning', es: 'Aprendizaje de Secuencias' },
    framework: 'PyTorch',
    task: { en: 'Sequence modeling (lightweight)', es: 'Modelado de secuencias (ligero)' },
    status: 'planned',
    tags: [{ en: 'Sequence', es: 'Secuencias' }, { en: 'Gated RNN', es: 'RNN con Compuertas' }],
    cover: null,
    summary: {
      en: 'Lighter gated alternative to LSTM, planned as a comparison point on the same sequence tasks.',
      es: 'Alternativa con compuertas más ligera que LSTM, planeada como punto de comparación en las mismas tareas de secuencia.',
    },
    architecture: [
      { en: 'Input sequence', es: 'Secuencia de entrada' },
      { en: 'Reset / update gates', es: 'Compuertas de reinicio / actualización' },
      { en: 'Hidden state', es: 'Estado oculto' },
      { en: 'Output layer', es: 'Capa de salida' },
    ],
    dataset: null, training: null, metrics: null, metricsNote: null,
    repo: null, repoLabel: null, demo: null,
    inference: { input: { en: 'Sequence (time series / text)', es: 'Secuencia (serie de tiempo / texto)' }, output: { en: 'Next-step or class prediction', es: 'Predicción del siguiente paso o de clase' } },
    api: null,
  },
  {
    slug: 'autoencoder',
    order: '06',
    shortName: 'Autoencoder',
    fullName: { en: 'Autoencoder', es: 'Autocodificador' },
    type: { en: 'Representation Learning', es: 'Aprendizaje de Representaciones' },
    framework: 'PyTorch',
    task: { en: 'Reconstruction / anomaly detection', es: 'Reconstrucción / detección de anomalías' },
    status: 'planned',
    tags: [{ en: 'Unsupervised', es: 'No Supervisado' }, { en: 'Representation Learning', es: 'Aprendizaje de Representaciones' }],
    cover: null,
    summary: {
      en: 'Planned for unsupervised representation learning and anomaly-detection experiments.',
      es: 'Planeado para aprendizaje de representaciones no supervisado y experimentos de detección de anomalías.',
    },
    architecture: [
      { en: 'Input', es: 'Entrada' },
      { en: 'Encoder (downsampling)', es: 'Codificador (downsampling)' },
      { en: 'Latent bottleneck', es: 'Cuello de botella latente' },
      { en: 'Decoder (upsampling)', es: 'Decodificador (upsampling)' },
      { en: 'Reconstruction output', es: 'Salida de reconstrucción' },
    ],
    dataset: null, training: null, metrics: null, metricsNote: null,
    repo: null, repoLabel: null, demo: null,
    inference: { input: { en: 'Sample (image / vector)', es: 'Muestra (imagen / vector)' }, output: { en: 'Reconstruction + reconstruction error', es: 'Reconstrucción + error de reconstrucción' } },
    api: null,
  },
  {
    slug: 'gan',
    order: '07',
    shortName: 'GAN',
    fullName: { en: 'Generative Adversarial Network', es: 'Red Generativa Adversaria' },
    type: { en: 'Generative Modeling', es: 'Modelado Generativo' },
    framework: 'PyTorch',
    task: { en: 'Sample generation', es: 'Generación de muestras' },
    status: 'planned',
    tags: [{ en: 'Generative', es: 'Generativo' }, { en: 'Adversarial Training', es: 'Entrenamiento Adversario' }],
    cover: null,
    summary: {
      en: 'Planned generative-modeling entry — generator/discriminator pair trained adversarially.',
      es: 'Entrada planeada de modelado generativo — par generador/discriminador entrenado de forma adversaria.',
    },
    architecture: [
      { en: 'Noise vector z', es: 'Vector de ruido z' },
      { en: 'Generator network', es: 'Red generadora' },
      { en: 'Generated sample', es: 'Muestra generada' },
      { en: 'Discriminator network', es: 'Red discriminadora' },
      { en: 'Real vs. fake signal', es: 'Señal real vs. falsa' },
    ],
    dataset: null, training: null, metrics: null, metricsNote: null,
    repo: null, repoLabel: null, demo: null,
    inference: { input: { en: 'Random noise vector', es: 'Vector de ruido aleatorio' }, output: { en: 'Generated sample', es: 'Muestra generada' } },
    api: null,
  },
  {
    slug: 'gnn',
    order: '09',
    shortName: 'GNN',
    fullName: { en: 'Graph Neural Network', es: 'Red Neuronal de Grafos' },
    type: { en: 'Graph Learning', es: 'Aprendizaje en Grafos' },
    framework: 'PyTorch Geometric',
    task: { en: 'Node / graph prediction', es: 'Predicción de nodo / grafo' },
    status: 'planned',
    tags: [{ en: 'Graphs', es: 'Grafos' }, { en: 'Relational Learning', es: 'Aprendizaje Relacional' }],
    cover: null,
    summary: {
      en: 'Planned exploration of message-passing architectures for graph-structured data.',
      es: 'Exploración planeada de arquitecturas de paso de mensajes para datos estructurados como grafos.',
    },
    architecture: [
      { en: 'Graph (nodes + edges)', es: 'Grafo (nodos + aristas)' },
      { en: 'Message passing layers', es: 'Capas de paso de mensajes' },
      { en: 'Node embedding aggregation', es: 'Agregación de embeddings de nodo' },
      { en: 'Readout function', es: 'Función de readout' },
      { en: 'Node / graph prediction', es: 'Predicción de nodo / grafo' },
    ],
    dataset: null, training: null, metrics: null, metricsNote: null,
    repo: null, repoLabel: null, demo: null,
    inference: { input: { en: 'Graph (nodes, edges, features)', es: 'Grafo (nodos, aristas, features)' }, output: { en: 'Node or graph-level prediction', es: 'Predicción a nivel de nodo o grafo' } },
    api: null,
  },
];
