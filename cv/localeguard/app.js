'use strict';

const state = {
  baseline: null,
  targets: [],
  rules: null,
  contexts: null,
  findings: [],
  reports: [],
  uiLanguage: 'ru',
  activeReport: null,
  status: { key: 'ready', suffix: '', kind: '' },
};

const translations = {
  ru: {
    skip: 'Перейти к результатам', navAria: 'Основная навигация', languageAria: 'Язык интерфейса',
    results: 'Результаты', bugReports: 'Баг-репорты', downloadCsv: 'Скачать CSV',
    heroText: 'Web App checkout, profile и settings: реальные локализации, намеренно внедрённые дефекты и детерминированный тестовый оракул.',
    verified: '● Контракт набора проверен', workspaceTitle: 'Проверка локализаций',
    workspaceText: 'Загрузите эталонный JSON и один или несколько переводов либо запустите встроенный демонстрационный набор.',
    baselineTitle: '1. Эталонный текст', baselineHelp: 'Определяет обязательные ключи, placeholders, ICU и HTML-теги.',
    baselineFile: 'Baseline JSON', baselineLocale: 'Исходная локаль', targetsTitle: '2. Файлы переводов',
    targetsHelp: 'Можно выбрать сразу несколько JSON; локаль определяется по имени файла.', targetFiles: 'Переводы JSON',
    loadedFiles: 'Загруженные файлы', noFiles: 'Файлы ещё не выбраны', runDemo: 'Запустить демо',
    runAudit: 'Проверить файлы', showBaseline: 'Показать эталон', hideBaseline: 'Скрыть эталон',
    downloadReport: 'Скачать отчёт', ready: 'Готово к проверке', baselinePreview: 'Эталонный текст',
    privacyNote: 'Файлы обрабатываются только в вашем браузере и никуда не отправляются.',
    locales: 'локалей', expectedFindings: 'найденных проблем', confirmedErrors: 'подтверждённых ошибок',
    heuristicWarnings: 'эвристических предупреждения', filters: 'Фильтры', localeLabel: 'Локаль', typeLabel: 'Тип',
    severityLabel: 'Важность', all: 'Все', localeKey: 'Локаль / ключ', rule: 'Правило', expected: 'Ожидается',
    actual: 'Фактически', report: 'Отчёт', loading: 'Загрузка демо…', empty: 'Нет результатов для выбранных фильтров',
    loadError: 'Не удалось загрузить данные', footerNote: 'Никаких API-ключей, сети или внешних пакетов.',
    csvExport: 'Экспорт CSV', mutationLedger: 'Журнал мутаций', reportTitle: 'Структурированный баг-репорт',
    copyReport: 'Копировать JSON', close: 'Закрыть', createReport: 'Открыть', demoLoaded: 'Демо загружено и проверено',
    auditComplete: 'Проверка завершена', uploadReady: 'Файлы готовы к проверке', baselineLoaded: 'Эталон загружен',
    needBaseline: 'Сначала загрузите эталонный JSON', needTargets: 'Добавьте хотя бы один файл перевода',
    invalidObject: 'JSON должен быть плоским объектом key → string', copied: 'Баг-репорт скопирован',
  },
  en: {
    skip: 'Skip to findings', navAria: 'Main navigation', languageAria: 'Interface language',
    results: 'Findings', bugReports: 'Bug reports', downloadCsv: 'Download CSV',
    heroText: 'Web App checkout, profile, and settings: real localization files, intentionally injected defects, and a deterministic test oracle.',
    verified: '● Dataset contract verified', workspaceTitle: 'Localization audit',
    workspaceText: 'Upload a baseline JSON and one or more translations, or run the built-in demonstration dataset.',
    baselineTitle: '1. Baseline text', baselineHelp: 'Defines required keys, placeholders, ICU structures, and HTML tags.',
    baselineFile: 'Baseline JSON', baselineLocale: 'Source locale', targetsTitle: '2. Translation files',
    targetsHelp: 'Select multiple JSON files at once; locale is inferred from each filename.', targetFiles: 'Translation JSON files',
    loadedFiles: 'Loaded files', noFiles: 'No files selected yet', runDemo: 'Run demo', runAudit: 'Audit files',
    showBaseline: 'Show baseline', hideBaseline: 'Hide baseline', downloadReport: 'Download report', ready: 'Ready to audit',
    baselinePreview: 'Baseline text', privacyNote: 'Files are processed only in your browser and are never uploaded.',
    locales: 'locales', expectedFindings: 'findings', confirmedErrors: 'confirmed errors', heuristicWarnings: 'heuristic warnings',
    filters: 'Filters', localeLabel: 'Locale', typeLabel: 'Type', severityLabel: 'Severity', all: 'All',
    localeKey: 'Locale / key', rule: 'Rule', expected: 'Expected', actual: 'Actual', report: 'Report',
    loading: 'Loading demo…', empty: 'No results match the selected filters', loadError: 'Unable to load data',
    footerNote: 'No API keys, network calls, or external packages.', csvExport: 'CSV export', mutationLedger: 'Mutation ledger',
    reportTitle: 'Structured bug report', copyReport: 'Copy JSON', close: 'Close', createReport: 'Open',
    demoLoaded: 'Demo loaded and audited', auditComplete: 'Audit complete', uploadReady: 'Files are ready to audit',
    baselineLoaded: 'Baseline loaded', needBaseline: 'Upload a baseline JSON first', needTargets: 'Add at least one translation file',
    invalidObject: 'JSON must be a flat key → string object', copied: 'Bug report copied',
  },
};

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const t = (key) => translations[state.uiLanguage][key] || key;

function renderStatus() {
  const element = $('#status');
  const current = state.status;
  element.textContent = `${t(current.key)}${current.suffix}`;
  element.className = `status${current.kind ? ` is-${current.kind}` : ''}`;
}

function setStatusKey(key, kind = '', suffix = '') {
  state.status = { key, kind, suffix };
  renderStatus();
}

function setLanguage(language) {
  state.uiLanguage = translations[language] ? language : 'ru';
  document.documentElement.lang = state.uiLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = t(element.dataset.i18n);
    if (value) element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const value = t(element.dataset.i18nAria);
    if (value) element.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-language]').forEach((button) => {
    const active = button.dataset.language === state.uiLanguage;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $('#toggleBaseline').textContent = $('#baselinePanel').hidden ? t('showBaseline') : t('hideBaseline');
  try { localStorage.setItem('localeguard.uiLanguage', state.uiLanguage); } catch (_) {}
  updateSourceUi();
  renderStatus();
  renderFindings();
}

function validateFlatObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
    && Object.values(value).every((item) => typeof item === 'string');
}

async function readJsonFile(file) {
  const data = JSON.parse(await file.text());
  if (!validateFlatObject(data)) throw new Error(t('invalidObject'));
  return data;
}

function localeFromFilename(name) {
  return name.replace(/\.json$/i, '').replace(/_/g, '-');
}

function updateSourceUi() {
  const baseline = state.baseline;
  $('#baselinePreview').textContent = baseline ? JSON.stringify(baseline.data, null, 2) : '{}';
  $('#baselineMeta').textContent = baseline
    ? `${baseline.locale} · ${Object.keys(baseline.data).length} keys · ${baseline.name}` : '—';
  $('#fileSummary').textContent = state.targets.length
    ? state.targets.map((item) => `${item.locale} (${Object.keys(item.data).length})`).join(' · ') : t('noFiles');
}

function placeholders(text) {
  const values = [];
  const regex = /\{([A-Za-z_][A-Za-z0-9_]*)\s*(?:,|\})/g;
  for (const match of text.matchAll(regex)) values.push(match[1]);
  return [...new Set(values)].sort();
}

function pluralCategories(text) {
  const values = [];
  const regex = /\b(zero|one|two|few|many|other)\s*\{/g;
  for (const match of text.matchAll(regex)) values.push(match[1]);
  return new Set(values);
}

function tags(text) {
  const values = [];
  const regex = /<\/?([A-Za-z][A-Za-z0-9]*)\b[^>]*>/g;
  for (const match of text.matchAll(regex)) values.push(match[1]);
  return new Set(values);
}

function isPlural(text) {
  return /\{[A-Za-z_][A-Za-z0-9_]*\s*,\s*plural\s*,/.test(text);
}

function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function scan() {
  const baseline = state.baseline.data;
  const rules = state.rules || {};
  const contexts = state.contexts || { keyConstraints: {}, fixtures: {} };
  const results = [];

  const add = (locale, key, rule, severity, classification, expected, actual) => {
    results.push({ locale, key, rule, severity, classification, expected, actual });
  };

  for (const target of state.targets) {
    const locale = target.locale;
    const data = target.data;
    const mismatchKeys = new Set();

    for (const [key, source] of Object.entries(baseline)) {
      if (!(key in data)) {
        add(locale, key, 'KEY_MISSING', 'high', 'confirmed_error', 'Key exists with a non-empty translation', 'Key is absent');
        continue;
      }
      const value = data[key];
      if (!value) {
        add(locale, key, 'VALUE_EMPTY', 'high', 'confirmed_error', 'Non-empty translation', 'Empty string');
        continue;
      }

      const sourceVars = placeholders(source);
      const targetVars = placeholders(value);
      if (!arraysEqual(sourceVars, targetVars)) {
        mismatchKeys.add(key);
        add(locale, key, 'PLACEHOLDER_MISMATCH', 'critical', 'confirmed_error',
          `Placeholders: ${JSON.stringify(sourceVars).replace(/"/g, "'")}`,
          `Placeholders: ${JSON.stringify(targetVars).replace(/"/g, "'")}`);
      }

      const opening = (value.match(/\{/g) || []).length;
      const closing = (value.match(/\}/g) || []).length;
      if (opening !== closing) {
        add(locale, key, 'ICU_UNBALANCED_BRACES', 'high', 'confirmed_error', 'Balanced ICU braces', `opening=${opening}, closing=${closing}`);
      } else if (isPlural(source) && rules.pluralCategories?.[locale]) {
        const required = new Set(rules.pluralCategories[locale]);
        const actual = pluralCategories(value);
        const missing = [...required].filter((category) => !actual.has(category)).sort();
        if (missing.length) {
          const expected = [...required].sort();
          add(locale, key, 'ICU_MISSING_PLURAL_CATEGORY', 'high', 'confirmed_error',
            `Categories: ${JSON.stringify(expected).replace(/"/g, "'")}`,
            `Missing: ${JSON.stringify(missing).replace(/"/g, "'")}`);
        }
      }

      const requiredTags = new Set([
        ...tags(source),
        ...(contexts.keyConstraints?.[key]?.requiredTags || []),
      ]);
      const targetTags = tags(value);
      const missingTags = [...requiredTags].filter((tag) => !targetTags.has(tag)).sort();
      if (missingTags.length) {
        add(locale, key, 'REQUIRED_TAG_MISMATCH', 'high', 'confirmed_error',
          `Required tags: ${JSON.stringify([...requiredTags]).replace(/"/g, "'")}`,
          `Missing tags: ${JSON.stringify(missingTags).replace(/"/g, "'")}`);
      }

      if (value !== value.trim()) {
        add(locale, key, 'EDGE_WHITESPACE', 'medium', 'confirmed_error', 'No leading or trailing whitespace', JSON.stringify(value));
      }
    }

    const sourceAllowlist = new Set(rules.safeguards?.sourceCopyAllowlist || []);
    const minimumLetters = rules.heuristicRules?.SOURCE_COPY_SUSPECTED?.minimumLetters || 4;
    for (const key of Object.keys(baseline).filter((item) => item in data).sort()) {
      const source = baseline[key];
      if (!sourceAllowlist.has(key) && data[key] === source && (source.match(/[^\W\d_]/gu) || []).length >= minimumLetters) {
        add(locale, key, 'SOURCE_COPY_SUSPECTED', 'medium', 'heuristic_warning',
          'Reviewed target-language translation or explicit allowlist entry', data[key]);
      }
    }

    for (const [key, constraint] of Object.entries(contexts.keyConstraints || {})) {
      const limit = constraint.maxCharacters;
      if (limit && key in data && data[key].length > limit) {
        add(locale, key, 'UI_LENGTH_RISK', 'medium', 'heuristic_warning',
          `At most ${limit} characters for the fixture`, `${data[key].length} characters`);
      }
    }

    const terminology = rules.safeguards?.terminologyChecks?.[locale] || {};
    for (const [key, termRule] of Object.entries(terminology)) {
      const value = (data[key] || '').toLocaleLowerCase(locale);
      if ((termRule.disallowed || []).some((item) => item.toLocaleLowerCase(locale) === value)) {
        add(locale, key, 'TERMINOLOGY_VARIATION', 'low', 'heuristic_warning', `Preferred term: ${termRule.preferred}`, data[key]);
      }
    }

    if ((rules.rtlLocales || []).includes(locale)) {
      const rtlAllowlist = new Set(rules.safeguards?.rtlInterpolationAllowlist || []);
      for (const [key, value] of Object.entries(data)) {
        if (placeholders(value).length && !isPlural(value) && !rtlAllowlist.has(key) && !mismatchKeys.has(key)) {
          add(locale, key, 'RTL_INTERPOLATION_REVIEW', 'medium', 'heuristic_warning',
            'Human review or bidi-isolation marks around interpolated LTR content',
            'Placeholder appears in an RTL sentence without an allowlist decision');
        }
      }
    }
  }

  results.forEach((finding, index) => { finding.id = `F-${String(index + 1).padStart(3, '0')}`; });
  return results;
}

function contextForFinding(finding) {
  const constraints = state.contexts?.keyConstraints || {};
  let fixtureName = constraints[finding.key]?.fixture;
  if (!fixtureName) fixtureName = Object.keys(state.contexts?.fixtures || {}).find((name) => finding.key.startsWith(name));
  const fixture = state.contexts?.fixtures?.[fixtureName] || {};
  return { screen: fixture.screen || finding.key.split('.')[0], component: fixture.component || 'LocalizationResource', testData: fixture.testValues || {} };
}

function makeReport(finding) {
  const number = finding.id.replace('F-', '');
  const confirmed = finding.classification === 'confirmed_error';
  return {
    id: `LOC-${number}`,
    findingId: finding.id,
    summary: `${finding.locale}: ${finding.rule} for ${finding.key}`,
    classification: finding.classification,
    severity: finding.severity,
    locale: finding.locale,
    key: finding.key,
    context: contextForFinding(finding),
    steps: [`Set locale to ${finding.locale}`, `Open the related ${finding.key.split('.')[0]} screen`, `Render localization key ${finding.key}`],
    expected: finding.expected,
    actual: finding.actual,
    evidence: [`Rule: ${finding.rule}`, `Baseline locale: ${state.baseline.locale}`, `Source file: ${state.baseline.name}`],
    recommendation: confirmed ? 'Restore the baseline localization contract and rerun the audit.' : 'Review the rendered UI and accept or fix the warning with evidence.',
    status: confirmed ? 'open' : 'needs_human_review',
  };
}

function rebuildLocaleFilter() {
  const select = $('#locale');
  const selected = select.value;
  select.innerHTML = '';
  const all = new Option(t('all'), '');
  all.dataset.i18n = 'all';
  select.add(all);
  [...new Set(state.findings.map((item) => item.locale))].forEach((locale) => select.add(new Option(locale, locale)));
  select.value = [...select.options].some((option) => option.value === selected) ? selected : '';
}

function updateStats() {
  $('#total').textContent = state.findings.length;
  $('#confirmed').textContent = state.findings.filter((item) => item.classification === 'confirmed_error').length;
  $('#warnings').textContent = state.findings.filter((item) => item.classification === 'heuristic_warning').length;
  const locales = new Set(state.targets.map((item) => item.locale));
  document.querySelector('.cards .card:first-child .num').textContent = locales.size;
  $('#downloadFindings').disabled = !state.findings.length;
}

function renderFindings() {
  const body = $('#rows');
  if (!body) return;
  const locale = $('#locale').value;
  const classification = $('#classification').value;
  const severity = $('#severity').value;
  const filtered = state.findings.filter((item) => (!locale || item.locale === locale)
    && (!classification || item.classification === classification)
    && (!severity || item.severity === severity));
  body.innerHTML = filtered.length ? filtered.map((item) => `
    <tr>
      <td><strong>${escapeHtml(item.id)}</strong><br><span class="${escapeHtml(item.classification)}">${escapeHtml(item.classification)}</span></td>
      <td><strong>${escapeHtml(item.locale)}</strong><br><code>${escapeHtml(item.key)}</code></td>
      <td><code>${escapeHtml(item.rule)}</code></td>
      <td><span class="pill ${escapeHtml(item.severity)}">${escapeHtml(item.severity)}</span></td>
      <td>${escapeHtml(item.expected)}</td><td>${escapeHtml(item.actual)}</td>
      <td><button class="report-button" type="button" data-report-id="${escapeHtml(item.id)}">${escapeHtml(t('createReport'))}</button></td>
    </tr>`).join('') : `<tr><td colspan="7" class="empty">${escapeHtml(t('empty'))}</td></tr>`;
  document.querySelectorAll('[data-report-id]').forEach((button) => button.addEventListener('click', () => openReport(button.dataset.reportId)));
}

function runAudit(source = 'upload') {
  if (!state.baseline) { setStatusKey('needBaseline', 'error'); return; }
  if (!state.targets.length) { setStatusKey('needTargets', 'error'); return; }
  state.baseline.locale = $('#baselineLocale').value.trim() || state.baseline.locale || 'en-US';
  state.findings = scan();
  state.reports = state.findings.map(makeReport);
  rebuildLocaleFilter();
  updateStats();
  renderFindings();
  updateSourceUi();
  setStatusKey(source === 'demo' ? 'demoLoaded' : 'auditComplete', 'success', `: ${state.findings.length}`);
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

async function loadDemo() {
  setStatusKey('loading');
  try {
    const localeNames = ['en-US', 'ru-RU', 'de-DE', 'fr-FR', 'ar-SA'];
    let rules;
    let contexts;
    let localeData;
    if (window.LOCALEGUARD_DEMO) {
      rules = window.LOCALEGUARD_DEMO.rules;
      contexts = window.LOCALEGUARD_DEMO.contexts;
      localeData = localeNames.map((locale) => window.LOCALEGUARD_DEMO.locales[locale]);
    } else {
      [rules, contexts, ...localeData] = await Promise.all([
        fetchJson('config/rules.json'), fetchJson('config/contexts.json'),
        ...localeNames.map((locale) => fetchJson(`locales/${locale}.json`)),
      ]);
    }
    state.rules = rules;
    state.contexts = contexts;
    state.baseline = { locale: 'en-US', name: 'en-US.json', data: localeData[0] };
    state.targets = localeNames.slice(1).map((locale, index) => ({ locale, name: `${locale}.json`, data: localeData[index + 1] }));
    $('#baselineLocale').value = 'en-US';
    updateSourceUi();
    runAudit('demo');
  } catch (error) {
    setStatusKey('loadError', 'error', `: ${error.message}`);
  }
}

async function onBaselineSelected(event) {
  const [file] = event.target.files;
  if (!file) return;
  try {
    const locale = localeFromFilename(file.name);
    state.baseline = { locale, name: file.name, data: await readJsonFile(file) };
    $('#baselineLocale').value = locale;
    updateSourceUi();
    setStatusKey('baselineLoaded', 'success');
  } catch (error) { setStatusKey('loadError', 'error', `: ${error.message}`); }
}

async function onTargetsSelected(event) {
  const files = [...event.target.files];
  if (!files.length) return;
  try {
    state.targets = await Promise.all(files.map(async (file) => ({
      locale: localeFromFilename(file.name), name: file.name, data: await readJsonFile(file),
    })));
    updateSourceUi();
    setStatusKey('uploadReady', 'success');
  } catch (error) { setStatusKey('loadError', 'error', `: ${error.message}`); }
}

function toggleBaseline() {
  const panel = $('#baselinePanel');
  panel.hidden = !panel.hidden;
  $('#toggleBaseline').textContent = panel.hidden ? t('showBaseline') : t('hideBaseline');
}

function openReport(findingId) {
  const finding = state.findings.find((item) => item.id === findingId);
  if (!finding) return;
  state.activeReport = makeReport(finding);
  $('#reportPreview').textContent = JSON.stringify(state.activeReport, null, 2);
  const dialog = $('#reportDialog');
  if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
}

function downloadJson(filename, data) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function initialize() {
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  document.querySelectorAll('select').forEach((select) => select.addEventListener('change', renderFindings));
  $('#baselineFile').addEventListener('change', onBaselineSelected);
  $('#translationFiles').addEventListener('change', onTargetsSelected);
  $('#demoButton').addEventListener('click', loadDemo);
  $('#runButton').addEventListener('click', () => runAudit('upload'));
  $('#toggleBaseline').addEventListener('click', toggleBaseline);
  $('#downloadFindings').addEventListener('click', () => downloadJson('localeguard-findings.json', {
    schemaVersion: '1.0', baselineLocale: state.baseline?.locale, findingCount: state.findings.length, findings: state.findings, bugReports: state.reports,
  }));
  $('#closeReport').addEventListener('click', () => $('#reportDialog').close());
  $('#copyReport').addEventListener('click', async () => {
    if (!state.activeReport) return;
    try { await navigator.clipboard.writeText(JSON.stringify(state.activeReport, null, 2)); setStatusKey('copied', 'success'); } catch (_) {}
  });
  $('#reportDialog').addEventListener('click', (event) => { if (event.target === $('#reportDialog')) $('#reportDialog').close(); });
  let savedLanguage = 'ru';
  try { savedLanguage = localStorage.getItem('localeguard.uiLanguage') || 'ru'; } catch (_) {}
  setLanguage(savedLanguage);
  loadDemo();
}

initialize();
