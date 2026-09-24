/**
 * Video links — ONE place to paste every YouTube link on the site.
 *
 * Each key matches a `data-video="<key>"` attribute in index.html.
 * Accepted formats (any of them works):
 *   'https://www.youtube.com/watch?v=VIDEO_ID'
 *   'https://youtu.be/VIDEO_ID'
 *   'https://www.youtube.com/shorts/VIDEO_ID'
 *   'VIDEO_ID'
 * A key can also hold a list of links (e.g. short demo clips):
 *   'project-umbrella': ['https://youtu.be/AAA', 'https://youtu.be/BBB'],
 *
 * Empty string ('') or empty list ([]) → the modal shows the
 * "Video coming soon / Video próximamente" state.
 *
 * TODO(Alexa): paste the YouTube links below.
 */
window.PORTFOLIO_VIDEOS = {
  // ── "I build systems, not notebooks" — tag chips ──────────────
  'microservices': '',
  'rest-apis': '',
  'event-driven': '',
  'docker': '',
  'kubernetes': '',
  'aws': '',
  'mlops': '',
  'git': '',
  'ci-ready': '',
  'spring-boot': '',
  'fastapi': '',
  'flask': '',
  // Web Development card
  'java': '',
  'javascript': '',
  'react': '',
  'html-css': '',
  'bootstrap': '',

  // ── Cloud & Big Data — evidence blocks ────────────────────────
  'evidence-aws': '',
  'evidence-spark': '',
  'evidence-docker': '',

  // ── Projects ──────────────────────────────────────────────────
  'project-thesis': '',
  'project-umbrella': [],          // short clips — list of links
  'project-saberpro-rag': '',
  'project-jarvis': '',
  'project-fruits-cnn': '',
  'project-ml-benchmark': '',
  'project-segmentation': '',
  'project-web-landing': '',

  // ── LLM Engineering — chips ───────────────────────────────────
  'gpt-4': '',
  'claude': '',
  'gemini': '',
  'deepseek': '',
  'openrouter': '',
  'langchain': '',
  'cursor-ai': '',
  'ollama': '',
  'rag': '',
  'ai-agents': '',
  'prompt-engineering': '',
  'retrieval-systems': '',
  'multi-agent': '',
  'vector-dbs': '',
};
