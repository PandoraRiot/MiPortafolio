/**
 * Thesis architecture explorer — data for the interactive diagram in the
 * DCE-MRI thesis card (index.html → "Explore architecture").
 *
 * Source of truth (verified, not invented):
 *   Repo  github.com/PandoraRiot/MRI_BreastCancer_Classification
 *   - configs/BreastCancer_DCE_DL_VF_config.yaml  → epochs, LRs, loss, input size
 *   - experimentos/experimento{1..5}/cuadernos/ExperimentoOficial.ipynb
 *       BLOQUE 10 · freeze_backbone()      → phase 1: only the head trains
 *       BLOQUE 10 · unfreeze_top_layers()  → phase 2: the blocks marked
 *                                            `unfrozen` below + the head
 *   Block structure / channel sizes / param counts: the torchvision
 *   (resnet50, efficientnet_b3) and timm (mobilevit_s) reference models
 *   the notebooks instantiate.
 *
 * state: 'frozen'   → frozen in both phases
 *        'unfrozen' → frozen in phase 1, trainable in phase 2 (fine-tuning)
 *        'head'     → trainable in both phases (new classification head)
 * kind:  'conv' | 'transformer' | 'head' | 'io'
 */
window.THESIS_ARCH = {
  input: {
    en: '3-channel DCE-MRI slice: pre-contrast · early post-contrast · late post-contrast',
    es: 'Corte DCE-MRI de 3 canales: pre-contraste · post-contraste temprano · post-contraste tardío',
  },
  training: {
    phase1: {
      en: 'Phase 1 · 10 epochs · backbone frozen, only the head trains (AdamW, LR 1e-3*)',
      es: 'Fase 1 · 10 épocas · red base congelada, solo entrena la cabeza (AdamW, LR 1e-3*)',
    },
    phase2: {
      en: 'Phase 2 · 20 epochs · partial unfreeze of the top blocks + head (LR 1e-4*, cosine annealing)',
      es: 'Fase 2 · 20 épocas · descongelado parcial de los bloques superiores + cabeza (LR 1e-4*, decaimiento coseno)',
    },
    note: {
      en: '* Values from the repo\'s final config (VF). EfficientNet-B3 uses 5e-4 / 5e-5. Loss: focal loss (α 0.6, γ 2.0).',
      es: '* Valores de la configuración final del repositorio (VF). EfficientNet-B3 usa 5e-4 / 5e-5. Pérdida: pérdida focal (α 0.6, γ 2.0).',
    },
  },
  models: [
    {
      id: 'mobilevit_s',
      name: 'MobileViT-S',
      family: { en: 'Hybrid CNN-Transformer · timm', es: 'Híbrido CNN-Transformer · timm' },
      inputSize: '256×256',
      blocks: [
        { id: 'stem', label: 'stem', kind: 'conv', state: 'frozen', shape: '16 × 128²', params: '0.5K',
          detail: { en: '3×3 strided convolution — first low-level edges and textures.', es: 'Convolución 3×3 con submuestreo — primeros bordes y texturas.' } },
        { id: 'stages.0', label: 'stages.0', kind: 'conv', state: 'frozen', shape: '32 × 128²', params: '4K',
          detail: { en: '1 × MobileNetV2 inverted-residual block.', es: '1 × bloque residual invertido de MobileNetV2.' } },
        { id: 'stages.1', label: 'stages.1', kind: 'conv', state: 'frozen', shape: '64 × 64²', params: '87K',
          detail: { en: '3 × MobileNetV2 blocks — local features, downsampling.', es: '3 × bloques MobileNetV2 — características locales y reducción de resolución.' } },
        { id: 'stages.2', label: 'stages.2', kind: 'transformer', state: 'frozen', shape: '96 × 32²', params: '0.66M',
          detail: { en: 'MV2 + MobileViT block: local conv → unfold into patches → 2 Transformer layers (d=144) → fold → fuse with the conv path.', es: 'MV2 + bloque MobileViT: convolución local → despliegue en parches → 2 capas Transformer (d=144) → plegado → fusión con la rama convolucional.' } },
        { id: 'stages.3', label: 'stages.3', kind: 'transformer', state: 'frozen', shape: '128 × 16²', params: '1.77M',
          detail: { en: 'MV2 + MobileViT block with 4 Transformer layers (d=192) — global context across the lesion.', es: 'MV2 + bloque MobileViT con 4 capas Transformer (d=192) — contexto global sobre la lesión.' } },
        { id: 'stages.4', label: 'stages.4', kind: 'transformer', state: 'unfrozen', shape: '160 × 8²', params: '2.31M',
          detail: { en: 'MV2 + MobileViT block with 3 Transformer layers (d=240). Unfrozen in phase 2: the most task-specific representations adapt to DCE-MRI.', es: 'MV2 + bloque MobileViT con 3 capas Transformer (d=240). Descongelado en la fase 2: las representaciones más específicas se adaptan a DCE-MRI.' } },
        { id: 'final_conv', label: 'final_conv', kind: 'conv', state: 'frozen', shape: '640 × 8²', params: '0.10M',
          detail: { en: '1×1 convolution expanding to 640 channels. Stays frozen — unfreeze_top_layers() only opens stages.4 and the head.', es: 'Convolución 1×1 que expande a 640 canales. Sigue congelada — unfreeze_top_layers() solo abre stages.4 y la cabeza.' } },
        { id: 'head', label: 'head', kind: 'head', state: 'head', shape: { en: 'benign · malignant', es: 'benigno · maligno' }, params: '—',
          detail: { en: 'Global pooling + new classifier (benign vs. malignant). Trains in both phases.', es: 'Agrupamiento global + clasificador nuevo (benigno vs. maligno). Entrena en ambas fases.' } },
      ],
    },
    {
      id: 'resnet50',
      name: 'ResNet50',
      family: { en: 'CNN · residual · torchvision', es: 'CNN · residual · torchvision' },
      inputSize: '256×256',
      blocks: [
        { id: 'conv1', label: 'conv1', kind: 'conv', state: 'frozen', shape: '64 × 128²', params: '9K',
          detail: { en: '7×7 convolution + BN + max-pool.', es: 'Convolución 7×7 + BN + agrupamiento máximo.' } },
        { id: 'layer1', label: 'layer1', kind: 'conv', state: 'frozen', shape: '256 × 64²', params: '0.22M',
          detail: { en: '3 bottleneck residual blocks.', es: '3 bloques residuales de cuello de botella.' } },
        { id: 'layer2', label: 'layer2', kind: 'conv', state: 'frozen', shape: '512 × 32²', params: '1.22M',
          detail: { en: '4 bottleneck residual blocks.', es: '4 bloques residuales de cuello de botella.' } },
        { id: 'layer3', label: 'layer3', kind: 'conv', state: 'frozen', shape: '1024 × 16²', params: '7.10M',
          detail: { en: '6 bottleneck residual blocks.', es: '6 bloques residuales de cuello de botella.' } },
        { id: 'layer4', label: 'layer4', kind: 'conv', state: 'unfrozen', shape: '2048 × 8²', params: '14.96M',
          detail: { en: '3 bottleneck blocks. Unfrozen in phase 2 — also the Grad-CAM target layer (layer4[-1]).', es: '3 bloques de cuello de botella. Descongelado en la fase 2 — también es la capa objetivo de Grad-CAM (layer4[-1]).' } },
        { id: 'fc', label: 'fc', kind: 'head', state: 'head', shape: { en: 'benign · malignant', es: 'benigno · maligno' }, params: '—',
          detail: { en: 'Replaced fully-connected head. Trains in both phases.', es: 'Capa fully-connected reemplazada. Entrena en ambas fases.' } },
      ],
    },
    {
      id: 'efficientnet_b3',
      name: 'EfficientNet-B3',
      family: { en: 'CNN · compound scaling · torchvision', es: 'CNN · escalado compuesto · torchvision' },
      inputSize: '300×300',
      blocks: [
        { id: 'features.0', label: 'features.0', kind: 'conv', state: 'frozen', shape: '40 ch', params: '1K',
          detail: { en: 'Stem: 3×3 strided convolution.', es: 'Capa inicial: convolución 3×3 con submuestreo.' } },
        { id: 'features.1-3', label: 'features.1–3', kind: 'conv', state: 'frozen', shape: '24 → 48 ch', params: '0.16M',
          detail: { en: 'MBConv stages (2 + 3 + 3 blocks) with squeeze-and-excitation.', es: 'Etapas MBConv (2 + 3 + 3 bloques) con squeeze-and-excitation.' } },
        { id: 'features.4-6', label: 'features.4–6', kind: 'conv', state: 'frozen', shape: '96 → 232 ch', params: '6.66M',
          detail: { en: 'MBConv stages (5 + 5 + 6 blocks).', es: 'Etapas MBConv (5 + 5 + 6 bloques).' } },
        { id: 'features.7', label: 'features.7', kind: 'conv', state: 'unfrozen', shape: '384 ch', params: '3.28M',
          detail: { en: 'Last MBConv stage (2 blocks). Unfrozen in phase 2.', es: 'Última etapa MBConv (2 bloques). Descongelada en la fase 2.' } },
        { id: 'features.8', label: 'features.8', kind: 'conv', state: 'unfrozen', shape: '1536 ch', params: '0.59M',
          detail: { en: '1×1 head convolution. Unfrozen in phase 2 — also the Grad-CAM target layer.', es: 'Convolución 1×1 final. Descongelada en la fase 2 — también es la capa objetivo de Grad-CAM.' } },
        { id: 'classifier', label: 'classifier', kind: 'head', state: 'head', shape: { en: 'benign · malignant', es: 'benigno · maligno' }, params: '—',
          detail: { en: 'Dropout + replaced linear layer. Trains in both phases.', es: 'Desactivación aleatoria de neuronas + capa lineal reemplazada. Entrena en ambas fases.' } },
      ],
    },
  ],
};
