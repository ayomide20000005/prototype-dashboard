// dashboard/app.js
// Carilume dashboard logic. Requires data.js to be loaded first.

const STORAGE_KEY = 'carilume_dashboard_v1';

// state = { career: 'uiux', hours: 0-3, done: [phaseIndex, ...] } or null
let state = null;
let selCareer = null; // setup screen selection
let selHours = null;  // setup screen selection

const $ = (id) => document.getElementById(id);

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isCareerKey(k) {
  return typeof k === 'string' && Object.prototype.hasOwnProperty.call(CAREERS, k);
}

function isHoursIndex(h) {
  return Number.isInteger(h) && h >= 0 && h <= 3;
}

/* ── Analytics (same helper name as the main site) ─────────────────────── */
function carilume_track(eventName, params) {
  if (typeof gtag !== 'function') return;
  const base = {
    career_match: state && isCareerKey(state.career) ? CAREERS[state.career].name : 'not_yet_matched'
  };
  gtag('event', eventName, Object.assign(base, params || {}));
}

/* ── Storage ───────────────────────────────────────────────────────────── */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s || !isCareerKey(s.career) || !isHoursIndex(s.hours)) return null;
    const total = CAREERS[s.career].phases.length;
    const done = Array.isArray(s.done)
      ? Array.from(new Set(s.done.filter((i) => Number.isInteger(i) && i >= 0 && i < total)))
      : [];
    return { career: s.career, hours: s.hours, done: done };
  } catch (e) {
    return null;
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Storage unavailable (private mode, etc.). The dashboard still works for this session.
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

/* ── Link in from the main site: dashboard/index.html?career=uiux&hours=2 ── */
function applyUrlParams() {
  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch (e) {
    return;
  }
  const career = params.get('career');
  const hours = parseInt(params.get('hours'), 10);

  if (isCareerKey(career) && isHoursIndex(hours)) {
    const sameCareer = state && state.career === career;
    state = {
      career: career,
      hours: hours,
      done: sameCareer ? state.done : []
    };
    saveState();
    carilume_track('dashboard_opened_from_quiz', { hours_index: hours });
  }

  if (params.has('career') || params.has('hours')) {
    try {
      window.history.replaceState(null, '', window.location.pathname);
    } catch (e) {}
  }
}

/* ── Progress maths ────────────────────────────────────────────────────── */
function getProgress() {
  const career = CAREERS[state.career];
  const total = career.phases.length;
  const doneCount = career.phases.filter((_, i) => state.done.includes(i)).length;
  const current = career.phases.findIndex((_, i) => !state.done.includes(i));
  return {
    career: career,
    total: total,
    doneCount: doneCount,
    current: current, // -1 when everything is done
    percent: Math.round((doneCount / total) * 100),
    complete: current === -1
  };
}

/* ── Shared HTML: milestone checkbox ───────────────────────────────────── */
function milestoneToggle(i, text) {
  const on = state.done.includes(i);
  return (
    '<button type="button" class="ms-toggle" data-index="' + i + '" aria-pressed="' + on + '">' +
      '<span class="ms-box"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5"/></svg></span>' +
      '<span class="ms-text">' + esc(text) + '</span>' +
    '</button>'
  );
}

/* ── Render: Overview ──────────────────────────────────────────────────── */
function renderOverview() {
  const p = getProgress();
  const c = p.career;
  const timeline = getTimeline(state.career, state.hours);
  const hoursLabel = HOURS_LABELS[state.hours];

  $('hero-name').textContent = c.name;
  $('hero-apt').textContent = c.apt;
  $('hero-timeline-tag').textContent = 'Job-ready in ' + timeline;
  $('hero-hours-tag').textContent = hoursLabel;

  $('stat-progress').textContent = p.percent + '%';
  $('stat-bar').style.width = p.percent + '%';
  $('stat-milestones').textContent = p.doneCount + ' / ' + p.total;
  $('stat-timeline').textContent = timeline;
  $('stat-timeline-sub').textContent = 'at ' + hoursLabel;

  if (p.complete) {
    $('stat-phase').textContent = 'Complete';
    $('stat-phase-sub').textContent = 'All ' + p.total + ' phases done';
    $('complete-banner').hidden = false;
    $('next-card').hidden = true;
  } else {
    const ph = c.phases[p.current];
    $('stat-phase').textContent = ph.name;
    $('stat-phase-sub').textContent = 'Phase ' + (p.current + 1) + ' of ' + p.total + ' · ' + ph.duration;
    $('complete-banner').hidden = true;
    $('next-card').hidden = false;
    $('next-title').textContent = ph.name;
    $('next-phase-tag').textContent = 'Phase ' + (p.current + 1) + ' · ' + ph.duration;
    $('next-focus').textContent = ph.focus;
    $('next-milestone').innerHTML = milestoneToggle(p.current, ph.milestone);
  }
}

/* ── Render: Roadmap ───────────────────────────────────────────────────── */
function renderRoadmap() {
  const p = getProgress();
  const c = p.career;
  const timeline = getTimeline(state.career, state.hours);
  const hoursLabel = HOURS_LABELS[state.hours];

  $('rm-title').textContent = c.name + ' — Zero to Job-Ready';
  $('rm-sub').textContent = 'Personalised for ' + hoursLabel + ' · ' + p.doneCount + ' of ' + p.total + ' milestones done';
  $('rm-pill').textContent = 'At ' + hoursLabel + ' — job-ready in ' + timeline;

  $('rm-phases').innerHTML = c.phases.map(function (ph, i) {
    const isDone = state.done.includes(i);
    const isCurrent = i === p.current;
    const color = PHASE_COLORS[i % PHASE_COLORS.length];
    const rowClass = 'phase-row' + (isDone ? ' done' : '') + (isCurrent ? ' current' : '');
    const badge = isDone
      ? '<span class="tag tag-green">Done</span>'
      : (isCurrent ? '<span class="tag tag-gold">Current</span>' : '');

    return (
      '<div class="' + rowClass + '">' +
        '<div class="phase-circle" style="background:' + color.bg + ';color:' + color.text + '">' + (isDone ? '✓' : (i + 1)) + '</div>' +
        '<div class="phase-card">' +
          '<div class="phase-header">' +
            '<div class="phase-name">' + esc(ph.name) + ' ' + badge + '</div>' +
            '<div class="phase-duration">' + esc(ph.duration) + '</div>' +
          '</div>' +
          '<div class="phase-focus">' + esc(ph.focus) + '</div>' +
          '<div class="phase-goal">' + esc(ph.goal) + '</div>' +
          milestoneToggle(i, ph.milestone) +
        '</div>' +
      '</div>'
    );
  }).join('');
}

function renderAll() {
  renderOverview();
  renderRoadmap();
}

/* ── Views + screens ───────────────────────────────────────────────────── */
function showView(name) {
  $('view-overview').hidden = name !== 'overview';
  $('view-roadmap').hidden = name !== 'roadmap';
  document.querySelectorAll('.nav-item').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.view === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  carilume_track('screen_view', { screen_name: 'dashboard_' + name });
}

function showApp() {
  $('onboarding').hidden = true;
  $('app').hidden = false;
  renderAll();
  showView('overview');
}

function showOnboarding() {
  selCareer = null;
  selHours = null;
  document.querySelectorAll('.ob-option').forEach(function (b) {
    b.classList.remove('selected');
    b.setAttribute('aria-checked', 'false');
  });
  $('ob-start').disabled = true;
  $('app').hidden = true;
  $('onboarding').hidden = false;
  window.scrollTo({ top: 0 });
}

/* ── Events ────────────────────────────────────────────────────────────── */
function selectOption(container, btn) {
  container.querySelectorAll('.ob-option').forEach(function (b) {
    const on = b === btn;
    b.classList.toggle('selected', on);
    b.setAttribute('aria-checked', on ? 'true' : 'false');
  });
  $('ob-start').disabled = !(selCareer !== null && selHours !== null);
}

$('ob-careers').addEventListener('click', function (e) {
  const btn = e.target.closest('.ob-option');
  if (!btn) return;
  selCareer = btn.dataset.career;
  selectOption($('ob-careers'), btn);
});

$('ob-hours').addEventListener('click', function (e) {
  const btn = e.target.closest('.ob-option');
  if (!btn) return;
  selHours = parseInt(btn.dataset.hours, 10);
  selectOption($('ob-hours'), btn);
});

$('ob-start').addEventListener('click', function () {
  if (!isCareerKey(selCareer) || !isHoursIndex(selHours)) return;
  state = { career: selCareer, hours: selHours, done: [] };
  saveState();
  carilume_track('dashboard_setup_completed', { hours_index: selHours });
  showApp();
});

document.querySelectorAll('.nav-item').forEach(function (btn) {
  btn.addEventListener('click', function () {
    showView(btn.dataset.view);
  });
});

$('go-roadmap-btn').addEventListener('click', function () {
  showView('roadmap');
});

function handleReset() {
  const ok = window.confirm('Change your career path? Your progress on the current path will be cleared.');
  if (!ok) return;
  carilume_track('dashboard_reset');
  clearState();
  state = null;
  showOnboarding();
}
$('reset-btn').addEventListener('click', handleReset);
$('reset-btn-mobile').addEventListener('click', handleReset);

// Tick / untick a milestone (works on both Overview and Roadmap)
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.ms-toggle');
  if (!btn || !state) return;

  const i = parseInt(btn.dataset.index, 10);
  const inRoadmap = !!btn.closest('#rm-phases');
  const wasDone = state.done.includes(i);

  if (wasDone) {
    state.done = state.done.filter(function (x) { return x !== i; });
  } else {
    state.done.push(i);
  }
  saveState();
  renderAll();

  const p = getProgress();
  carilume_track('milestone_toggled', {
    phase_number: i + 1,
    phase_name: p.career.phases[i].name,
    completed: !wasDone,
    progress_percent: p.percent
  });
  if (!wasDone && p.complete) {
    carilume_track('roadmap_completed');
  }

  // Keep keyboard focus on the same checkbox after the roadmap re-renders
  if (inRoadmap) {
    const again = document.querySelector('#rm-phases .ms-toggle[data-index="' + i + '"]');
    if (again) again.focus();
  }
});

// Track quick-link and sidebar-link clicks
document.addEventListener('click', function (e) {
  const link = e.target.closest('[data-track]');
  if (!link) return;
  carilume_track('dashboard_link_clicked', { link: link.dataset.track });
});

/* ── Init ──────────────────────────────────────────────────────────────── */
state = loadState();
applyUrlParams();

if (state) {
  carilume_track('dashboard_viewed');
  showApp();
} else {
  showOnboarding();
}