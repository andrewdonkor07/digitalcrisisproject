'use strict';

/* ═══════════════════════════════════════════════════
   DARK MODE TOGGLE
═══════════════════════════════════════════════════ */
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = root.getAttribute('data-theme') ||
    (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

/* ═══════════════════════════════════════════════════
   MOBILE NAV
═══════════════════════════════════════════════════ */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const open = !mobileNav.hidden;
    mobileNav.hidden = open;
    menuToggle.setAttribute('aria-expanded', String(!open));
  });
}
function closeMobileNav() {
  if (mobileNav) mobileNav.hidden = true;
}
window.closeMobileNav = closeMobileNav;

/* ═══════════════════════════════════════════════════
   COUNT-UP ANIMATION — hero stats
═══════════════════════════════════════════════════ */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const elapsed = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - elapsed, 3);
    el.textContent = Math.round(ease * target);
    if (elapsed < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num[data-target]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  statNums.forEach(el => io.observe(el));
} else {
  statNums.forEach(el => animateCount(el));
}

/* ═══════════════════════════════════════════════════
   THINKERS DATA
═══════════════════════════════════════════════════ */
const thinkers = [
  {
    name: 'Johanna Drucker',
    work: 'Humanities Approaches to Graphical Display (2011); Visualization and Interpretation (2020)',
    domain: 'Digital Studies',
    domainColor: '#b5640d',
    domainBg: '#f0ddc8',
    hook: 'Why every visualization is an argument, not a window onto data.',
    connection: 'Drucker\'s concept of capta — data as always-already interpreted rather than neutrally given, grounds every visualization decision in this project. When I display rhetorical appeals as a bar chart or posting frequency as a timeline, I am making interpretive choices, not documenting facts. Her distinction between capta (what is actively constructed by the observer) and data (what is passively given) is foundational to why this project presents visualizations with narrative annotation rather than as self-evident evidence.',
    quote: 'Humanistic inquiry acknowledges the situated, partial, and constitutive character of knowledge production — the always-already interpretedness of data.',
    citation: 'Drucker, J. (2011). Humanities approaches to graphical display. Digital Humanities Quarterly, 5(1). http://www.digitalhumanities.org/dhq/vol/5/1/000091/000091.html'
  },
  {
    name: 'Taina Bucher',
    work: 'If...then: Algorithmic Power and Politics (2018)',
    domain: 'Platform Studies',
    domainColor: '#d94f0a',
    domainBg: '#fde8db',
    hook: 'Algorithms are editorial forces: invisible but consequential.',
    connection: 'Bucher demonstrates that platform algorithms are not neutral delivery mechanisms but active editorial forces that determine what content circulates and for whom. For this project, her argument explains why the same post from FEMA might reach very different audiences on X versus Instagram — the algorithmic environment shapes not just who sees a message but what rhetorical registers are rewarded. Her concept of "programmed sociality" is essential for understanding why crisis communication adapted differently across platforms during 2020–2025.',
    quote: 'Algorithms are not mere technical procedures; they are social assemblages that mediate experience, shape conduct, and organize attention.',
    citation: 'Bucher, T. (2018). If...then: Algorithmic power and politics. Oxford University Press. https://doi.org/10.1093/oso/9780190493028.001.0001'
  },
  {
    name: 'Nicole Starosielski',
    work: 'The Undersea Network (2015)',
    domain: 'Infrastructure Studies',
    domainColor: '#2e6b4f',
    domainBg: '#c8e0d4',
    hook: 'Today\'s platforms inherit yesterday\'s colonial cable routes.',
    connection: 'Starosielski\'s analysis of undersea cable networks — tracing how submarine internet cables follow colonial shipping routes and telegraph lines — provides the model for historicizing the 2020–2025 period rather than treating it as a generic present. Her argument that digital infrastructure carries deep material and political histories is essential for understanding why API restrictions are not merely technical decisions but expressions of power that have structural antecedents. This project also draws on her practice of pairing scholarly argument with interactive digital mapping.',
    quote: 'The undersea network is not a technology outside of history, society, or geography. It is an infrastructure whose routes and terminals reflect decades of geopolitical and economic decision-making.',
    citation: 'Starosielski, N. (2015). The undersea network. Duke University Press. https://doi.org/10.1215/9780822376224'
  },
  {
    name: 'Tara McPherson',
    work: 'Feminist in a Software Lab: Difference + Design (2018)',
    domain: 'Digital Studies',
    domainColor: '#b5640d',
    domainBg: '#f0ddc8',
    hook: 'Technical design and cultural politics are inseparable.',
    connection: 'McPherson\'s central argument — that the UNIX operating system\'s modular design carried the same logic of racial and social segregation that characterized postwar America — insists that technical choices always embody cultural politics. For this project, her argument means that the interface I have designed is itself an ideological artifact, not a neutral container for findings. Every structural decision about how findings are displayed, what can be compared, and how argument flows through the interface is a claim about knowledge and value.',
    quote: 'We must develop better frameworks for understanding the relationship between our tools and our politics, for grasping how the medium shapes the message in new and powerful ways.',
    citation: 'McPherson, T. (2018). Feminist in a software lab: Difference + design. Harvard University Press. https://doi.org/10.4159/9780674978720'
  },
  {
    name: 'Axel Bruns',
    work: 'After the "APIcalypse" (2019)',
    domain: 'Post-API Methods',
    domainColor: '#2e6b4f',
    domainBg: '#c8e0d4',
    hook: 'Platform API closure is deliberate, not an accident of engineering.',
    connection: 'Bruns names the APIcalypse (the sharp restriction of platform data access beginning around 2018 to 2023), and argues that platforms restricted API access not for security reasons but to impede independent scholarly research and public accountability. This is foundational to the project\'s methodological stance: treating the post-API condition not as a technical obstacle to manage but as a structural fact that demands a principled response. If platforms obscure the mechanisms through which public communication circulates, that itself is a form of power.',
    quote: 'The end of broadly accessible social media data is not the end of social media research — but it does require a fundamental rethinking of what questions we can responsibly ask.',
    citation: 'Bruns, A. (2019). After the "APIcalypse": Social media platforms and their fight against critical scholarly research. Information, Communication & Society, 22(11), 1544–1566. https://doi.org/10.1080/1369118X.2019.1637447'
  },
  {
    name: 'Deen Freelon',
    work: 'Computational Research in the Post-API Age (2018)',
    domain: 'Post-API Methods',
    domainColor: '#2e6b4f',
    domainBg: '#c8e0d4',
    hook: 'The post-API age calls for methodological reinvention, not resignation.',
    connection: 'Freelon\'s short but influential essay names the practical constraints facing computational social media researchers after major platforms began restricting data access. His call for scholars to adapt their methods — rather than simply bemoan restricted access — directly motivates this project\'s commitment to manual curation and interpretive close reading as principled methodological responses. The project embodies his argument that the post-API age demands rigor rather than resignation.',
    quote: 'We need to develop new methods that are appropriate to the post-API environment — methods that are transparent, replicable, and honest about their limitations.',
    citation: 'Freelon, D. (2018). Computational research in the post-API age. Political Communication, 35(4), 665–668. https://doi.org/10.1080/10584609.2018.1477506'
  },
  {
    name: 'Michael Kent & Maureen Taylor',
    work: 'Toward a Dialogic Theory of Public Relations (2002); Dialogic Engagement (2014)',
    domain: 'Crisis Communication',
    domainColor: '#c0392b',
    domainBg: '#fce9e7',
    hook: 'Genuine dialogue versus broadcasting: what makes institutional messaging authentic?',
    connection: 'Kent and Taylor\'s dialogic communication framework provides the primary analytical language for evaluating FEMA\'s and ARC\'s posts. Their five dialogic principles — mutuality, propinquity, empathy, risk, and commitment — allow systematic comparison of how the two organizations address their publics: whether they invite genuine exchange or primarily broadcast authority downward. The 2014 article by Taylor and Kent refines this framework by distinguishing genuine dialogue from superficial interactivity, which is especially useful for analyzing posts that appear conversational but function as one-way information delivery.',
    quote: 'Dialogue is not a technique — it is an ethical commitment to the other, a willingness to be changed by what one hears.',
    citation: 'Kent, M. L., & Taylor, M. (2002). Toward a dialogic theory of public relations. Public Relations Review, 28(1), 21–37. https://doi.org/10.1016/S0363-8111(02)00108-X'
  },
  {
    name: 'Tien-Tsung Hu',
    work: 'A Prehistory of the Cloud (2015)',
    domain: 'Infrastructure Studies',
    domainColor: '#d94f0a',
    domainBg: '#fde8db',
    hook: 'The cloud has a colonial history, and it shapes the present.',
    connection: 'Hu\'s critical history of cloud computing, tracing how "the cloud" emerged from military, colonial, and corporate computing infrastructures — supports this project\'s argument that the social media platforms of 2020–2025 are not self-originating technologies but historically layered systems. His book provides the theoretical language for historicizing API decisions, platform architectures, and the uneven geographies of digital access that shape who can communicate what during a disaster.',
    quote: 'The cloud is not simply a metaphor for networked computing — it is a historical formation that normalizes computational power while obscuring its material conditions.',
    citation: 'Hu, T.-H. (2015). A prehistory of the cloud. MIT Press. https://doi.org/10.7551/mitpress/9979.001.0001'
  },
  {
    name: 'Melanie Walsh',
    work: 'The Challenges and Possibilities of Social Media Data (2023)',
    domain: 'Digital Humanities',
    domainColor: '#b5640d',
    domainBg: '#f0ddc8',
    hook: 'Social media data demands ethical frameworks, not just methods.',
    connection: 'Walsh\'s chapter in Debates in the Digital Humanities 2023 argues that social media should be treated as a rich object of humanistic inquiry — but doing so responsibly requires sustained attention to community engagement, citation ethics, and data sharing, not only technical methods. For this project, her argument grounds the ethical dimension of working with posts authored by or about people affected by disasters. It also anchors the project within the digital humanities tradition, positioning it as humanistic inquiry rather than social science data extraction.',
    quote: 'How we collect, cite, and share social media data matters as much as what we find — and the former shapes the latter in ways we must make visible.',
    citation: 'Walsh, M. (2023). The challenges and possibilities of social media data. In M. K. Gold & L. F. Klein (Eds.), Debates in the digital humanities 2023 (pp. 275–290). University of Minnesota Press. https://doi.org/10.5749/9781452969565'
  }
];

/* ═══════════════════════════════════════════════════
   RENDER THINKERS
═══════════════════════════════════════════════════ */
const thinkersGrid = document.getElementById('thinkersGrid');
const thinkerPanel = document.getElementById('thinkerPanel');
const thinkerPanelInner = document.getElementById('thinkerPanelInner');
const closeThinkerPanel = document.getElementById('closeThinkerPanel');
let activeThinkerCard = null;

if (thinkersGrid) {
  thinkers.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'thinker-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');
    card.style.setProperty('--thinker-color', t.domainColor);
    card.style.setProperty('--thinker-bg', t.domainBg);
    card.dataset.index = i;
    card.innerHTML = `
      <div class="thinker-card-top">
        <span class="thinker-domain">${t.domain}</span>
        <svg class="thinker-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </div>
      <div class="thinker-name">${t.name}</div>
      <div class="thinker-work">${t.work.split(';')[0].trim()}</div>
      <p class="thinker-hook">${t.hook}</p>
    `;
    card.addEventListener('click', () => openThinker(i, card));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openThinker(i, card); } });
    thinkersGrid.appendChild(card);
  });
}

function openThinker(i, card) {
  const t = thinkers[i];
  if (activeThinkerCard) activeThinkerCard.classList.remove('active');
  if (activeThinkerCard === card && !thinkerPanel.hidden) {
    thinkerPanel.hidden = true;
    activeThinkerCard = null;
    return;
  }
  activeThinkerCard = card;
  card.classList.add('active');
  thinkerPanelInner.innerHTML = `
    <div style="margin-bottom:var(--space-2)">
      <span class="thinker-domain" style="--thinker-color:${t.domainColor};--thinker-bg:${t.domainBg}">${t.domain}</span>
    </div>
    <h3>${t.name}</h3>
    <div class="panel-work">${t.work}</div>
    <p class="panel-connection">${t.connection}</p>
    <blockquote class="panel-quote">"${t.quote}"</blockquote>
    <p style="font-size:var(--text-xs);color:var(--color-text-faint);line-height:1.6;max-width:none">${t.citation}</p>
  `;
  thinkerPanel.hidden = false;
  thinkerPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

if (closeThinkerPanel) {
  closeThinkerPanel.addEventListener('click', () => {
    thinkerPanel.hidden = true;
    if (activeThinkerCard) { activeThinkerCard.classList.remove('active'); activeThinkerCard = null; }
  });
}

/* ═══════════════════════════════════════════════════
   CHART.JS CHARTS
═══════════════════════════════════════════════════ */
function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getChartColors() {
  return {
    fema: '#d94f0a',
    arc: '#c0392b',
    logos: '#2e6b4f',
    pathos: '#c0392b',
    ethos: '#b5640d',
    muted: getCSSVar('--color-text-muted') || '#7a7974',
    border: getCSSVar('--color-border') || '#cac3b4',
    bg: getCSSVar('--color-surface') || '#faf9f5',
  };
}

Chart.defaults.font.family = "'Satoshi', 'Helvetica Neue', sans-serif";

// Chart 1: Rhetorical Appeals by Organization
const ctxAppeals = document.getElementById('chartAppeals');
if (ctxAppeals) {
  const c = getChartColors();
  new Chart(ctxAppeals, {
    type: 'bar',
    data: {
      labels: ['Logos', 'Pathos', 'Ethos', 'Mixed'],
      datasets: [
        {
          label: 'FEMA',
          data: [68, 12, 14, 6],
          backgroundColor: '#d94f0a',
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Red Cross',
          data: [18, 58, 16, 8],
          backgroundColor: '#c0392b',
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { color: c.muted, font: { size: 12, weight: '600' }, padding: 16, boxWidth: 12, boxHeight: 12 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%` } }
      },
      scales: {
        x: { ticks: { color: c.muted, font: { size: 12 } }, grid: { display: false } },
        y: {
          ticks: { color: c.muted, font: { size: 12 }, callback: v => v + '%' },
          grid: { color: c.border },
          max: 80
        }
      }
    }
  });
}

// Chart 2: Format distribution (doughnut)
const ctxFormats = document.getElementById('chartFormats');
if (ctxFormats) {
  new Chart(ctxFormats, {
    type: 'doughnut',
    data: {
      labels: ['Photo', 'Video', 'Text only', 'Infographic', 'Quote tweet'],
      datasets: [
        {
          data: [38, 18, 22, 14, 8],
          backgroundColor: ['#b5640d', '#d94f0a', '#c0392b', '#2e6b4f', '#8a8170'],
          borderColor: 'transparent',
          hoverOffset: 8
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'right',
          labels: { color: getChartColors().muted, font: { size: 11 }, padding: 12, boxWidth: 12, boxHeight: 12 }
        },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` } }
      }
    }
  });
}

// Chart 3: Posting frequency by season (line)
const ctxTimeline = document.getElementById('chartTimeline');
if (ctxTimeline) {
  const c = getChartColors();
  new Chart(ctxTimeline, {
    type: 'line',
    data: {
      labels: ['Aug 2020', 'Sep 2020', 'Oct 2020', 'Jul 2021', 'Aug 2021', 'Sep 2021', 'Aug 2022', 'Sep 2022', 'Aug 2023', 'Nov 2023', 'Sep 2024', 'Nov 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Jul 2025'],
      datasets: [
        {
          label: 'FEMA',
          data: [5, 7, 3, 2, 4, 2, 2, 2, 1, 1, 3, 2, 8, 3, 2, 1],
          borderColor: '#d94f0a',
          backgroundColor: 'rgba(217,79,10,0.08)',
          tension: 0.4, fill: true,
          pointRadius: 4, pointBackgroundColor: '#d94f0a', pointBorderColor: 'white', pointBorderWidth: 2,
        },
        {
          label: 'Red Cross',
          data: [6, 4, 3, 3, 6, 2, 4, 2, 2, 1, 4, 2, 10, 4, 1, 2],
          borderColor: '#c0392b',
          backgroundColor: 'rgba(192,57,43,0.08)',
          tension: 0.4, fill: true,
          pointRadius: 4, pointBackgroundColor: '#c0392b', pointBorderColor: 'white', pointBorderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { color: getChartColors().muted, font: { size: 12, weight: '600' }, padding: 16, boxWidth: 12, boxHeight: 12 } },
      },
      scales: {
        x: { ticks: { color: getChartColors().muted, font: { size: 10 }, maxRotation: 45 }, grid: { display: false } },
        y: {
          ticks: { color: getChartColors().muted, font: { size: 12 }, stepSize: 2 },
          grid: { color: getChartColors().border },
          title: { display: true, text: 'Posts', color: getChartColors().muted, font: { size: 11 } }
        }
      }
    }
  });
}

// Chart 4: Dialogic features (radar)
const ctxDialogic = document.getElementById('chartDialogic');
if (ctxDialogic) {
  const c = getChartColors();
  new Chart(ctxDialogic, {
    type: 'radar',
    data: {
      labels: ['Mutuality', 'Empathy', 'Propinquity', 'Risk-taking', 'Commitment', 'Invitations to reply'],
      datasets: [
        {
          label: 'FEMA',
          data: [42, 28, 55, 30, 60, 20],
          borderColor: '#d94f0a',
          backgroundColor: 'rgba(217,79,10,0.12)',
          pointBackgroundColor: '#d94f0a',
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 4,
        },
        {
          label: 'Red Cross',
          data: [68, 75, 62, 50, 72, 60],
          borderColor: '#c0392b',
          backgroundColor: 'rgba(192,57,43,0.12)',
          pointBackgroundColor: '#c0392b',
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 4,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { color: c.muted, font: { size: 11, weight: '600' }, padding: 12, boxWidth: 12, boxHeight: 12 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}/100` } }
      },
      scales: {
        r: {
          ticks: { display: false },
          grid: { color: c.border },
          pointLabels: { color: c.muted, font: { size: 10 } },
          min: 0, max: 100
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════
   POSTS DATA
═══════════════════════════════════════════════════ */
const postsData = [
  // FEMA posts
  { org: 'fema', date: 'Sep 5, 2025', excerpt: 'We recently approved a Fire Management Assistance Grant to support state and local efforts to contain the 2-7 Fire in Central California. Take any evacuation orders issued by local officials seriously and follow @CAL_FIRE for the most current information.', media: 'Photo (infographic on grant)', rhetoric: 'logos', url: 'https://x.com/fema/status/1964031964639272992', analysis: 'Classic FEMA logos appeal: procedural action (grant approval), institutional authority, directive language ("take... seriously"), and third-party referral. No emotional language or personalized narrative.' },
  { org: 'fema', date: 'Mar 21, 2025', excerpt: 'If you were affected by the California wildfires, apply for disaster assistance and debris removal by March 31. For debris removal by @USACEHQ…', media: 'Photo (deadline reminder)', rhetoric: 'logos', url: 'https://x.com/fema/status/1903145520849195237', analysis: 'Deadline-driven informational post. Pure procedural logos: conditional framing ("if you were affected"), specific deadline, institutional referral to Army Corps of Engineers.' },
  { org: 'fema', date: 'Feb 6, 2025', excerpt: 'California: If you were affected by the wildfires, find recovery resources near you.', media: 'None', rhetoric: 'logos', url: 'https://x.com/fema/status/1887616405551653172', analysis: 'Resource aggregation post. State-directed address ("California:"), instrumental language. Quote-tweet structure signals institutional network-building rather than audience-building.' },
  { org: 'fema', date: 'Feb 3, 2025', excerpt: 'If you were affected by the California wildfires or another disaster, there are 4 ways to apply for assistance: Online…', media: 'Video (assistance application guide)', rhetoric: 'logos', url: 'https://x.com/fema/status/1886509244729438466', analysis: 'Numbered-list logos: "4 ways" signals bureaucratic procedural structure. Video format is unusual for FEMA but supports the instructional rather than emotional function.' },
  { org: 'fema', date: 'Jan 11, 2025', excerpt: 'Pictured: Disaster Survivor Assistance teams help wildfire survivors register for federal assistance at the Pasadena Convention Center…', media: '4 Photos (teams assisting survivors)', rhetoric: 'ethos', url: 'https://x.com/fema/status/1878176092613173474', analysis: 'One of FEMA\'s rarer ethos-pathos hybrid posts. Naming specific locations (Pasadena Convention Center) adds institutional credibility; "Disaster Survivor Assistance teams" foregrounds organizational presence rather than survivor experience.' },
  { org: 'fema', date: 'Jan 11, 2025', excerpt: 'For information from our agency on the California wildfires, visit fema.gov/disaster/4856', media: 'Photo (resource link graphic)', rhetoric: 'logos', url: 'https://x.com/fema/status/1878121000077767134', analysis: 'Canonical FEMA logos format: agency self-reference, numerical disaster code (bureaucratic register), resource aggregation. Minimal affective language.' },
  { org: 'fema', date: 'Jan 11, 2025', excerpt: 'If you received a letter saying you were not eligible for disaster assistance due to the California wildfires, please read the letter carefully…', media: 'Video (eligibility explanation)', rhetoric: 'logos', url: 'https://x.com/fema/status/1878105315305988114', analysis: 'Administrative clarification post addressing bureaucratic process (eligibility denial). Conditional logic structure. The video format attempts accessibility but the content remains procedural.' },
  { org: 'fema', date: 'Jan 9, 2025', excerpt: 'California: We know many are anxious for updates on the status of their homes. If you evacuated, please do not return home until local officials say it\'s safe…', media: 'Photo (safety advisory graphic)', rhetoric: 'ethos', url: 'https://x.com/fema/status/1877426416876208267', analysis: 'Notable emotional acknowledgment ("We know many are anxious") — relatively rare for FEMA. Quickly redirects to procedural directive. Suggests awareness of affective dimension without fully committing to pathos register.' },
  { org: 'fema', date: 'Jan 9, 2025', excerpt: 'Shelters are open for those affected by the California wildfires. To find a location near you, text SHELTER & your ZIP code to 43362…', media: '2 Photos (shelter info)', rhetoric: 'logos', url: 'https://x.com/fema/status/1877411336654668016', analysis: 'Actionable information delivery: specific mechanism (SMS shortcode), geographic precision (ZIP code), institutional network framing. No narrative context for shelter seekers.' },
  { org: 'fema', date: 'Jan 9, 2025', excerpt: 'California residents: As wildfires continue, the situation can change quickly with little notice. Have multiple ways to get information & emergency alerts…', media: 'Photo (alerts graphic)', rhetoric: 'logos', url: 'https://x.com/fema/status/1877396230034129194', analysis: 'Risk communication in classic FEMA register: urgency framed as information management ("multiple ways to get information"), behavioral directive rather than emotional reassurance.' },
  { org: 'fema', date: 'Jan 9, 2025', excerpt: 'Federal disaster assistance is available to the state of California to supplement recovery efforts in areas affected by wildfires and straight-line winds from Jan. 7, 2025…', media: 'None', rhetoric: 'logos', url: 'https://x.com/fema/status/1877183343185277346', analysis: 'Official declaration announcement. Government register: passive construction, technical precision ("straight-line winds"), institutional framing ("Federal disaster assistance... to the state"). Maximum bureaucratic authority, minimum emotional engagement.' },
  { org: 'fema', date: 'Jan 8, 2025', excerpt: 'California: If you\'re near a wildfire burn area, pay close attention to instructions from your local officials and evacuate immediately if told to do so…', media: 'Photo (evacuation advisory)', rhetoric: 'logos', url: 'https://x.com/fema/status/1877013763326345247', analysis: 'Imperative safety directive. "Evacuate immediately" — the urgency is real but expressed through procedural command rather than affective appeal.' },
  { org: 'fema', date: 'Dec 10, 2024', excerpt: 'Just in: California was approved for a Fire Management Assistance grant due to the devastating effects of the #FranklinFire…', media: 'None', rhetoric: 'logos', url: 'https://x.com/fema/status/1866548179858231797', analysis: 'Grant announcement. "Devastating effects" is one of the few affective descriptors used by FEMA; immediately contextualizes by grant action rather than human experience.' },
  { org: 'fema', date: 'Dec 9, 2024', excerpt: 'California: Elevated fire weather conditions are expected in parts of the state. Stay aware of red flag warnings…', media: 'Photo (weather warning graphic)', rhetoric: 'logos', url: 'https://x.com/fema/status/1866147157503250764', analysis: 'Preventive warning communication. Meteorological register ("elevated fire weather conditions," "red flag warnings"). Institutional framing prioritizes procedural awareness over affective preparation.' },
  { org: 'fema', date: 'Nov 8, 2024', excerpt: 'We approved a Fire Management Assistance Grant (FMAG) for the active #MountainFire this week to help cover firefighting costs in California…', media: 'Photo (FMAG info)', rhetoric: 'logos', url: 'https://x.com/fema/status/1854906242444967962', analysis: 'Administrative action announcement. Agency-centered ("We approved"), financial framing ("firefighting costs"), bureaucratic acronym (FMAG). Ethos through institutional competence rather than empathy.' },
  { org: 'fema', date: 'Sep 20, 2024', excerpt: 'This past week, we approved two Fire Management Assistance Grants (FMAG) to help cover firefighting costs in California: Bridge Fire…', media: 'Photo (FMAG summary)', rhetoric: 'logos', url: 'https://x.com/fema/status/1837178109965058234', analysis: 'Weekly FMAG summary. Efficiency of information delivery over narrative. Reveals FEMA\'s preference for consolidated, factual update cycles rather than real-time narrative engagement.' },
  { org: 'fema', date: 'Sep 13, 2024', excerpt: 'This past week, we approved four Fire Management Assistance Grants to help cover firefighting costs for the California #LineFire & #BoylesFire…', media: 'Photo (multiple FMAGs)', rhetoric: 'logos', url: 'https://x.com/fema/status/1834653938689196086', analysis: 'Four-grant weekly summary. Institutional efficiency rhetoric: speed (one week), scale (four grants), precision (named fires). Community impact abstracted behind financial mechanism.' },
  { org: 'fema', date: 'Jul 29, 2024', excerpt: 'California: We urge you to listen to local officials & monitor alerts as wildfires progress. Review your evacuation routes… #ParkFire', media: 'Photo (evacuation tips)', rhetoric: 'logos', url: 'https://x.com/fema/status/1817957094697447671', analysis: '"We urge you" — mild volitional appeal embedded in procedural directive. Evacuation route review is a behavioral instruction. #ParkFire hashtag links to event-specific discourse.' },
  { org: 'fema', date: 'Aug 1, 2023', excerpt: 'California and Nevada: As wildfires continue spreading, it\'s not the time to take risks…', media: 'None', rhetoric: 'logos', url: 'https://x.com/fema/status/1686443904743129094', analysis: 'Negative imperative framing ("not the time to take risks") — urgency via restraint rather than action. Cites @Readygov, extending institutional network logic.' },
  { org: 'fema', date: 'Mar 17, 2023', excerpt: 'To round out #AmeriCorpsWeek, we\'re recognizing Sean Duffy… who served with @AmeriCorps in California… assisting with wildfire and flooding response.', media: '2 Photos (AmeriCorps member)', rhetoric: 'ethos', url: 'https://x.com/fema/status/1636771990261440512', analysis: 'Institutional ethos through personnel recognition. Individual name and service history builds credibility without personal narrative vulnerability. Hybrid post: ethos + institutional partnership display.' },
  { org: 'fema', date: 'Jan 4, 2023', excerpt: 'The Director of our External Affairs office… visited one of our Urban Search & Rescue teams at the Sacramento Fire Department California Task Force 7…', media: 'Photo (visit to fire team)', rhetoric: 'ethos', url: 'https://x.com/fema/status/1610751245031034880', analysis: 'Institutional visibility and operational presence. Leadership visit narrative builds organizational ethos through proximity to responders rather than survivors.' },
  { org: 'fema', date: 'Sep 12, 2022', excerpt: 'If you need a safe place to stay due to the CA wildfires, text SHELTER & your zip code to 43362…', media: 'Photo (evacuation advisory)', rhetoric: 'logos', url: 'https://x.com/fema/status/1569386930134974465', analysis: 'Technical action information. SMS shortcode delivery mechanism signals FEMA\'s preference for accessible, procedurally clear information over empathetic acknowledgment of displacement experience.' },
  { org: 'fema', date: 'Aug 23, 2022', excerpt: 'The Randall Road Debris Basin was built using one of our mitigation grants after a large wildfire & storm…', media: 'Photo (basin graphic)', rhetoric: 'ethos', url: 'https://x.com/fema/status/1562098944498450432', analysis: 'Infrastructure ethos: long-term mitigation investment framed as institutional competence. Temporal depth ("after a large wildfire") signals durable commitment. No survivor reference.' },
  { org: 'fema', date: 'Oct 13, 2021', excerpt: 'California: Homeowners, renters & business owners who sustained uninsured or under-insured damage… have 2 weeks left to apply…', media: 'Photo (application deadline)', rhetoric: 'logos', url: 'https://x.com/fema/status/1448333183863373832', analysis: 'Countdown deadline logos. Audience segmentation (homeowners, renters, business owners) is procedural rather than empathetic — categorizing applicants rather than humanizing them.' },
  { org: 'fema', date: 'Aug 25, 2021', excerpt: '@POTUS approved a major disaster declaration in California for the ongoing wildfires…', media: 'None', rhetoric: 'ethos', url: 'https://x.com/fema/status/1430567104546283525', analysis: 'Maximum institutional authority: presidential approval signals highest level of federal commitment. Retweet of FEMARegion9 situates action in the distributed federal network.' },
  { org: 'fema', date: 'Jul 26, 2021', excerpt: 'Parts of California, Nevada & Arizona are under a flash flood watch or warning due to burn scars from previous fires… #FloodAfterFire', media: 'Video (flood after fire impacts)', rhetoric: 'logos', url: 'https://x.com/fema/status/1419715465853689856', analysis: 'Secondary hazard communication. Technical framing ("burn scars") extends FEMA\'s logos register to secondary risk. Hashtag #FloodAfterFire demonstrates FEMA\'s cross-hazard communication strategy.' },
  { org: 'fema', date: 'Oct 2, 2020', excerpt: 'Here are the latest facts and figures on the activities from the response to the California Wildfires. (As of October 1st)…', media: 'Photo (response stats)', rhetoric: 'logos', url: 'https://x.com/fema/status/1312075117053308930', analysis: '"Facts and figures" — explicit framing of FEMA\'s epistemic mode. The dashboard-style post presents operational data without humanizing framing, exemplifying the organization\'s logos-dominant communication identity.' },
  { org: 'fema', date: 'Sep 28, 2020', excerpt: 'California: if wildfires are threatening your area, closely monitor the instructions from your local officials… #GlassFire #ShadyFire', media: 'None', rhetoric: 'logos', url: 'https://x.com/fema/status/1310619523037515781', analysis: 'Deference to local officials is a structurally significant feature of FEMA\'s communication strategy: federal agency directing audiences to local authority rather than claiming direct relationship with affected publics.' },
  { org: 'fema', date: 'Sep 24, 2020', excerpt: 'Kevin Smith… traveled to Santa Cruz County, California, to visit the impacted communities and learn about current recovery efforts following the wildfires.', media: '2 Photos (recovery visit)', rhetoric: 'ethos', url: 'https://x.com/fema/status/1309216365178490889', analysis: 'Named official visit narrative. Ethos through proximity and attention ("to visit... to learn"). No survivor voices included — institutional witness rather than community testimony.' },
  { org: 'fema', date: 'Sep 15, 2020', excerpt: 'We continue to help communities across CA, CO, OR and WA that are being impacted by the wildfires…', media: '4 Photos (response efforts)', rhetoric: 'ethos', url: 'https://x.com/fema/status/1306005077816115201', analysis: 'Multi-state operational scope display. Ethos through geographic breadth and continuous action ("continue to help"). Institutional presence across states contrasts with ARC\'s localized community stories.' },
  { org: 'fema', date: 'Sep 10, 2020', excerpt: 'California & Oregon residents: with extensive wildfires affecting parts of the state, it\'s normal to experience stress & anxiety…', media: 'Photo (mental health support)', rhetoric: 'pathos', url: 'https://x.com/fema/status/1304073553277583360', analysis: 'One of FEMA\'s rarest post types: direct acknowledgment of emotional distress. The normalization language ("it\'s normal to experience") and explicit mention of mental health represents a notable departure from FEMA\'s typical logos register, particularly in a 2020 COVID co-crisis context.' },
  { org: 'fema', date: 'Aug 24, 2020', excerpt: 'We are working with public safety officials… as we respond to #wildfires in California as well as Tropical Storms #Marco & #Laura…', media: 'Photo (multi-disaster response)', rhetoric: 'ethos', url: 'https://x.com/fema/status/1297947333813055491', analysis: 'Multi-disaster operational framing. The simultaneous reference to wildfires and tropical storms situates the 2020 COVID summer within a broader overlapping disaster context — a distinctive feature of the 2020 period.' },
  { org: 'fema', date: 'Aug 19, 2020', excerpt: 'Current wildfires in California and Colorado are a good reminder that it\'s important to know your risk…', media: 'None', rhetoric: 'logos', url: 'https://x.com/fema/status/1296159717828505606', analysis: '"A good reminder" — instructional framing that positions FEMA as educator rather than responder. Risk literacy communication in the logos register.' },

  // ARC posts
  { org: 'arc', date: 'Jul 17, 2025', excerpt: 'You\'re looking at an incredible group of kids. After learning about the devastating wildfires in California, these students from First Presbyterian Church in Sioux Falls felt called to help. They turned their concern into action…', media: '2 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1945861265479414181', analysis: 'Classic ARC pathos strategy: community solidarity narrative, third-party actors as emotional protagonists, geographic scope (Sioux Falls to California) reinforcing national community of care.' },
  { org: 'arc', date: 'Jul 2, 2025', excerpt: 'Wildfires are impacting communities across New Mexico, Oregon, and Central and Southern California, and the season is just getting started. With forecasts pointing to an active wildfire season, our teams have been working around the clock to help people stay safe…', media: '4 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1940497973793743272', analysis: 'Operational scale ethos ("working around the clock") combined with anticipatory framing ("season is just getting started"). ARC builds authority through dedication narrative rather than bureaucratic process.' },
  { org: 'arc', date: 'Apr 28, 2025', excerpt: 'This is how you come together as a community! Several members of the Red Cross Long-Term Recovery team recently joined Hope Crisis Response Network volunteers to clean Roxy\'s home. It was damaged by smoke and ash during the Southern California wildfires in January…', media: '4 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1916960952399864305', analysis: 'Named survivor (Roxy), specific damage (smoke and ash), community collaboration narrative. ARC\'s long-term recovery framing distinguishes sustained relationship from acute crisis response — dialogic commitment over time.' },
  { org: 'arc', date: 'Jan 31, 2025', excerpt: 'We love making meaningful connections with the people we help after a disaster! While Red Cross volunteers were visiting neighborhoods in Southern California affected by wildfires, they met Ryan and Alcena Hoagues…', media: '4 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1885433043881488567', analysis: '"We love making meaningful connections" — explicit affective declaration opens post. Named survivors with relational context. The conjunction of organizational emotion and individual story is quintessential ARC pathos register.' },
  { org: 'arc', date: 'Jan 28, 2025', excerpt: 'Recovery is just beginning for many in Southern California after several massive wildfires destroyed more than 17,000 structures. As communities reopen, hundreds of Red Cross responders continue to work around the clock to provide critical relief and recovery assistance…', media: '4 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1884354648061972519', analysis: 'Scale ethos: 17,000 structures destroyed (specific fact), hundreds of responders, clock-framing. Balances statistical gravity with operational presence. More FEMA-adjacent than typical ARC — suggesting post-peak crisis shift in register.' },
  { org: 'arc', date: 'Jan 24, 2025', excerpt: 'A moment of happiness at one of our shelters in Southern California last week: Sweet baby Mia celebrated her 1st birthday! Red Cross volunteers have been supporting Mia and her family at the Pasadena Civic Center since they escaped their home in Altadena due to wildfires…', media: '1 video', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1882896302398189578', analysis: 'Celebration within crisis — birth narrative inverts the disaster frame. Baby Mia as narrative protagonist; named location (Altadena); "escaped" verb choice signals life-threatening context. The ARC affective register at its most distinctive: finding joy within disaster coverage.' },
  { org: 'arc', date: 'Jan 23, 2025', excerpt: 'Over 600 Red Crossers are working nonstop as we respond to wildfires in Southern California. The impact we\'ve been able to make since the beginning of our response shows just how important your support has been for those facing this disaster…', media: '4 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1882486472273490115', analysis: 'Operational ethos with donor appeal. "600 Red Crossers working nonstop" + "your support" activates the donor relationship. ARC\'s hybrid institutional-community identity: simultaneously reporting impact and building mutual obligation with donors.' },
  { org: 'arc', date: 'Jan 14, 2025', excerpt: 'Within days of the wildfires sweeping Southern California, hundreds of Red Cross disaster responders worked quickly to open emergency shelters and prepare truckloads of disaster supplies for the hardest-hit areas…', media: '4 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1879257313741074445', analysis: 'Speed-and-scale ethos: "within days," "hundreds of responders," "truckloads of supplies." ARC frames organizational competence through narrative action sequence rather than administrative process.' },
  { org: 'arc', date: 'Jan 14, 2025', excerpt: 'While Red Cross disaster workers respond to raging wildfires in Southern California, our teams are still actively working in Western North Carolina and other areas devastated by Hurricane Helene…', media: '1 photo', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1879227108943073747', analysis: 'Multi-disaster simultaneous presence narrative. Geographic breadth (California + North Carolina) builds organizational ethos through sustained commitment across simultaneous crises — a distinctive 2025 communication pattern.' },
  { org: 'arc', date: 'Jan 13, 2025', excerpt: 'Nearly 900 California wildfire evacuees woke up in Red Cross shelters Monday morning, many of whom are struggling after losing everything. Thankfully, more than 350 of our dedicated disaster responders and volunteers are on the ground…', media: '4 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1878864800043651073', analysis: '"Lost everything" — extreme loss framing. Number specificity (900 evacuees, 350 responders) grounds pathos appeal in quantifiable reality. "Woke up... Monday morning" — temporal grounding that humanizes statistics.' },
  { org: 'arc', date: 'Jan 12, 2025', excerpt: 'Shoutout to the amazing Red Cross volunteers offering hot meals, emotional support, and shelter to wildfire survivors and pets in Southern California.', media: 'None', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1878509513050841165', analysis: '"Hot meals, emotional support, and shelter" — the triad names both material and affective dimensions of care. The inclusion of pets signals ARC\'s awareness of attachment bonds as part of disaster experience. "Shoutout" is colloquial, social-native register.' },
  { org: 'arc', date: 'Jan 11, 2025', excerpt: 'She couldn\'t bear to leave the picture behind. "They were really something," said Rona Schneider, a California resident who is staying at a Red Cross evacuation shelter due to the wildfires. The photo is of her mother and father — first-generation immigrants from Poland — taken decades ago…', media: '1 photo', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1878134246272827852', analysis: 'Perhaps the most powerful post in the entire dataset. Named survivor, direct quote, family photograph as object of attachment, intergenerational immigrant narrative. The concentration of pathos markers — a single prized object, family history, displacement — demonstrates ARC\'s mastery of the human-interest story as crisis communication.' },
  { org: 'arc', date: 'Jan 10, 2025', excerpt: 'Carla Llamuca and her 4-year-old daughter, Thoa, are among many seeking refuge at a Red Cross emergency shelter after wildfires in Southern California forced them from their home. They fled the fast-moving Palisades Fire after receiving an evacuation notice…', media: '3 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1877747460480659758', analysis: 'Named mother-daughter pair, child\'s age specified, fire name used, evacuation notice as inciting event. ARC\'s narrative structure follows human-interest journalism conventions: individual as synecdoche for larger crisis.' },
  { org: 'arc', date: 'Jan 9, 2025', excerpt: 'Our hearts go out to everyone affected by the devastating wildfires in Southern California. Tens of thousands of people have already been forced to evacuate their homes, and the danger isn\'t over yet. Hurricane-force winds are fueling these fast-moving blazes…', media: '4 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1877460478361743467', analysis: '"Our hearts go out to everyone" — explicit affective solidarity opener. Immediate numbers (tens of thousands) scale the emotion without depersonalizing it. "Hurricane-force winds" creates visceral atmospheric urgency.' },
  { org: 'arc', date: 'Jan 8, 2025', excerpt: 'Red flag and high-wind warnings have been issued for millions of people in coastal southern California, creating a dangerous wildfire risk over the next few days. Local Red Cross disaster teams are supporting several shelter locations…', media: '1 photo', rhetoric: 'logos', url: 'https://x.com/RedCross/status/1877022592655098016', analysis: 'One of ARC\'s more logos-adjacent posts: technical weather warning language, specific geographic scope ("millions of people"), preparatory framing. Demonstrates that ARC can occupy the informational register when anticipatory rather than responsive.' },
  { org: 'arc', date: 'Nov 18, 2024', excerpt: 'When a wildfire in Central California forced people to evacuate their homes, they found refuge at a Red Cross shelter. @RedCrossCCR volunteers were there to comfort them and provide warm meals, health services, and essential resources. Here are some of the stories of the people we helped…', media: '4 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1858631426779841002', analysis: '"Here are some of the stories" — explicit narrative offer, reader invitation. ARC constructs its social media presence as a storytelling platform; "stories" frames crisis communication as humane testimony rather than operational reporting.' },
  { org: 'arc', date: 'Nov 8, 2024', excerpt: 'Wildfires can happen anywhere and spread fast. Right now, wildfires are burning across the U.S., from Southern California to New Jersey. Our disaster teams are actively responding and helping those who have been forced to evacuate.', media: '1 video', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1855013788736479610', analysis: '"Wildfires can happen anywhere" — preparedness framing with geographic universalism. National scope (California to New Jersey) builds ARC\'s identity as a nationwide disaster-response institution.' },
  { org: 'arc', date: 'Sep 18, 2024', excerpt: 'Say hello to these delightful residents staying at one of our Red Cross shelters! They are sheltering with their families after evacuating from raging wildfires in Southern California.', media: '4 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1836495550151106601', analysis: '"Say hello to these delightful residents" — social media address convention used to humanize evacuees. The photos reportedly showed animals sheltering alongside humans, extending the community-of-care framing.' },
  { org: 'arc', date: 'Sep 13, 2024', excerpt: 'Wildfires have spread quickly across Southern California, burning more than 113,000 acres and forcing hundreds of thousands of people from their homes. Red Cross disaster teams are on the ground, providing safe shelter, food, relief supplies, and recovery support to those evacuating…', media: '4 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1834645846563975350', analysis: 'Scale ethos: 113,000 acres, hundreds of thousands displaced. ARC\'s ethos here is operational competence expressed through physical resource provision (shelter, food, supplies). More logos-adjacent than typical.' },
  { org: 'arc', date: 'Jul 29, 2024', excerpt: 'Over 4 million. That\'s how many acres have burned in the U.S. because of increasing wildfire activity across much of the West for several months. While disaster responders help shelter people who have been forced from their homes in California, Idaho, Oregon and Washington…', media: '4 photos', rhetoric: 'logos', url: 'https://x.com/RedCross/status/1818031258783621587', analysis: '"Over 4 million. That\'s how many acres have burned" — opening with a statistic in a sentence fragment signals a deliberate rhetorical choice. ARC uses logos-adjacent scale data to frame the urgency before pivoting to operational presence.' },
  { org: 'arc', date: 'Jun 23, 2024', excerpt: 'As a mom and someone who has had her life turned upside down by wildfires, volunteer Julie Prather understands what New Mexico families are going through. "We lived in Southern California and evacuated four times," Julie said.', media: '4 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1804941268616990936', analysis: 'Volunteer as disaster survivor bridge: Julie embodies both institutional presence and lived experience. Her direct quote ("evacuated four times") is among the most specific personal displacement accounts in the dataset.' },
  { org: 'arc', date: 'Nov 7, 2023', excerpt: 'Don\'t let your guard down this wildfire season! Strong winds & dry vegetation in California & across several southwestern states have created ideal conditions for wildfires to spark. Take action now to protect your loved ones…', media: 'None', rhetoric: 'logos', url: 'https://x.com/RedCross/status/1722026147108585948', analysis: 'Seasonal preparedness communication. "Protect your loved ones" is an affective hook within otherwise logos-framed risk communication. ARC\'s preparedness messaging occupies a hybrid register.' },
  { org: 'arc', date: 'Aug 11, 2023', excerpt: 'Local Red Cross volunteers in Hawaii have been doing everything they can to support people affected by the wildfires in their community. And backup is on the way! Volunteers from Wisconsin, California, Oklahoma, Indiana, and other states are currently traveling to support those already on the ground. #MauiFires', media: '4 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1690058817512361984', analysis: 'Interstate volunteer mobilization narrative. Geographic enumeration (Wisconsin, California, Oklahoma, Indiana) constructs a national community of care converging on Hawaii. Ethos through organizational reach and response speed.' },
  { org: 'arc', date: 'Sep 12, 2022', excerpt: 'The #FairviewFire has burned 28K+ acres in southern California. @SoCal_RedCross volunteers are offering shelter, food, health services & more.', media: '3 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1569460891426639873', analysis: 'Event-named and data-specific (28K+ acres) ethos post. Regional account mention (@SoCal_RedCross) maps ARC\'s distributed organizational structure onto the post. Health services named alongside shelter and food extends care framing.' },
  { org: 'arc', date: 'Aug 22, 2022', excerpt: 'While deployed to a wildfire in California, @RedCrossIL nurse volunteer Jan Fulfs saved the life of an evacuee who fell unconscious & stopped breathing. Read how her quick actions led her to receive a Red Cross Certificate of Extraordinary Personal Action.', media: '1 photo', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1561790370459049987', analysis: 'Named hero narrative. Jan Fulfs\'s life-saving action (life at risk, CPR implied, medical credential noted) is the most dramatic individual ethos story in the dataset. ARC uses individual excellence as institutional merit.' },
  { org: 'arc', date: 'Aug 1, 2022', excerpt: 'In addition to responding to the deadly flooding in Kentucky & Missouri, our disaster teams are also helping those affected by the explosive wildfires in California.', media: '1 photo', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1554203238056038402', analysis: 'Simultaneous multi-disaster frame (flooding + wildfires). Ethos through scale and multi-front operational presence. Recall 2022 was the year following the COVID peaks — ARC is rebuilding post-pandemic operational narrative.' },
  { org: 'arc', date: 'Jul 25, 2022', excerpt: 'Red Cross volunteers continue to care for evacuees impacted by the #OakFire, a fast-moving wildfire that has burned over 16,000 acres in central California near Yosemite National Park.', media: '2 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1551628362191339524', analysis: 'Location specificity (Yosemite National Park) gives geographic resonance to the disaster. "Continue to care" frames ARC as sustained presence rather than episodic responder.' },
  { org: 'arc', date: 'Sep 29, 2021', excerpt: 'This is why we do what we do. A volunteer received this sweet thank you drawing from a 12-year-old shelter resident in California whose family had to evacuate their home with their horses due to a wildfire.', media: '1 photo', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1443292632558538760', analysis: '"This is why we do what we do" — mission statement as emotional payoff structure. Child age specified (12), thank-you drawing as art object, horses as attachment symbol. High density of pathos markers in minimal text.' },
  { org: 'arc', date: 'Aug 31, 2021', excerpt: 'Volunteers in California have been responding nonstop to wildfires, like the #CaldorFire. Shelters continue to stay open for those impacted.', media: 'None', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1432766951932243968', analysis: 'Sustained presence ethos with minimal affect. "Nonstop" and "continue to stay open" emphasize temporal commitment. Text-only format signals information priority over visual storytelling.' },
  { org: 'arc', date: 'Aug 19, 2021', excerpt: 'For updates on our response to wildfires in California follow @ARCGoldCountry', media: 'None', rhetoric: 'logos', url: 'https://x.com/RedCross/status/1428354900392435729', analysis: 'Pure network-referral post — directs audiences to regional account. Organizational information architecture post with no rhetorical elaboration. Rare example of ARC deploying the minimal logos format.' },
  { org: 'arc', date: 'Aug 10, 2021', excerpt: 'The #DixieFire is the second largest wildfire in California\'s history forcing thousands to evacuate their homes and charring more than 400K acres. Red Cross volunteers are working around the clock to help people impacted.', media: '1 photo', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1425162570151993346', analysis: 'Historical superlative framing ("second largest in California\'s history") establishes scale. The specificity of 400K acres combines logos precision with pathos magnitude. "Around the clock" frames organizational commitment.' },
  { org: 'arc', date: 'Aug 9, 2021', excerpt: 'Nearly 200 Red Cross disaster workers are supporting our current California wildfire response. They\'re providing meals, mental health support, shelter and more. So far, nearly 2.3 million acres across 15 states have been burned due to wildfires this season.', media: '1 photo', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1424788795317178372', analysis: 'The 2021 season-wide accounting (2.3 million acres, 15 states) situates California within a national crisis frame. Mental health support named alongside material provisions signals ARC\'s expanded care model.' },
  { org: 'arc', date: 'Aug 5, 2021', excerpt: 'The #DixieFire is the 6th largest fire on record and has burned more than 322K acres of land. Nearby communities in Northern California continue to be threatened with wildfire smoke and evacuation orders.', media: '1 photo', rhetoric: 'logos', url: 'https://x.com/RedCross/status/1423414044669751300', analysis: 'Historical ranking ("6th largest on record") establishes logos context before pivot to ongoing threat ("continue to be threatened"). Logos-dominant post with minimal ARC organizational presence — a notable exception.' },
  { org: 'arc', date: 'Jul 6, 2021', excerpt: 'THANK YOU to our amazing volunteers around the country who assisted over the holiday weekend. These @ARCGoldCountry volunteers helped with the Lava and Salt wildfires in California.', media: '3 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1412455371478863877', analysis: '"THANK YOU" in all-caps — affective emphasis through typographic intensification. Holiday weekend frame underscores volunteer sacrifice. Named volunteers and fires, named regional account: community specificity over institutional abstraction.' },
  { org: 'arc', date: 'Apr 29, 2021', excerpt: '"I have deployed several times as an Emergency Response Vehicle coordinator. I\'ve driven to the East Coast & to California for the wildfires. I like going out to help people in need." Volunteers like Rockee from the @RedCrossNevada region keep our mission moving forward!', media: '1 photo', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1387868070006464515', analysis: 'Named volunteer testimonial, first-person direct quote, cross-country deployment narrative. "I like going out to help people in need" — voluntarism as intrinsic motivation, building institutional ethos through individual authenticity.' },
  { org: 'arc', date: 'Jan 21, 2021', excerpt: 'Thank you to our @SoCal_RedCross volunteers who set up a temporary evacuation point during #ParkFire. It may be January, but California is still experiencing wildfire weather, and Red Crossers are ready to help.', media: 'None', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1352275141212983296', analysis: '"It may be January, but" — seasonal disruption frame. The seasonality disruption ("wildfire weather" in January) speaks to the 2020–2025 period\'s climatic disruption of traditional wildfire calendars.' },
  { org: 'arc', date: 'Dec 15, 2020', excerpt: 'Armed with video conferencing and a desire to help, virtual volunteers from Japan and Korea helped people affected by wildfires in California.', media: 'None', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1338948144164458497', analysis: 'COVID-era innovation: virtual volunteer international solidarity narrative. Japan + Korea volunteers, video conferencing as crisis-era adaptation. This is one of the clearest examples in the dataset of COVID temporality reshaping disaster communication.' },
  { org: 'arc', date: 'Oct 23, 2020', excerpt: '"We allow them to tell their story. Allow them to tell what they\'ve been through and respond as needed with the situation that they\'ve been involved in." Hear more about disaster spiritual care volunteer David Long\'s experience supporting California #wildfire residents.', media: 'None', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1319728599101034498', analysis: '"Allow them to tell their story" — meta-narrative statement about ARC\'s communication philosophy. Disaster spiritual care is a distinctive form of crisis support rarely named in social media communication; this post names and legitimizes it.' },
  { org: 'arc', date: 'Oct 14, 2020', excerpt: 'After a disaster hits, we often send Disaster Assessment teams into affected communities to help people start the recovery process. If you\'ve ever wondered what that entails, watch as one of our teams helps residents of Ono, California…', media: '1 video', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1316400322445803520', analysis: 'Educational transparency post: inviting audiences inside ARC\'s operational processes. Named community (Ono, California) grounds institutional procedure in specific recovery context. Unusual instructional format for disaster communication.' },
  { org: 'arc', date: 'Sep 28, 2020', excerpt: 'This is what\'s left in parts of Santa Cruz County after the CZU wildfire. Two new fires broke out in California over the weekend, burning nearly 10,000 acres. Tap here for our latest response update & safety information: #GlassFire #ZoggFire', media: '3 photos', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1310662520244523009', analysis: '"This is what\'s left" — opening with visual consequence, leading with devastation. The 2020 fire cluster (#CZU, #GlassFire, #ZoggFire) demonstrates the unprecedented multi-fire simultaneity of the 2020 season.' },
  { org: 'arc', date: 'Sep 10, 2020', excerpt: 'In California alone, over 2.5 million acres have burned so far this year due to wildfires. Red Cross teams are helping those evacuating in several West Coast states. Follow these local accounts for the latest updates. #Thread (1)', media: '1 photo', rhetoric: 'logos', url: 'https://x.com/RedCross/status/1303093631926874113', analysis: 'Thread structure is a 2020 platform adaptation. "In California alone" — isolating scale for emphasis. ARC uses logos-adjacent data to establish context before humanizing through thread sequence.' },
  { org: 'arc', date: 'Sep 9, 2020', excerpt: 'What to know about West Coast wildfires: 25 major fires are burning from Northern to Southern California. 348,000+ acres are burning in Oregon. 333,000+ acres have burned in Washington in just 24 hours.', media: '1 photo', rhetoric: 'logos', url: 'https://x.com/RedCross/status/1303798179117367299', analysis: 'Data-dense update in a FEMA-adjacent logos format — unusual for ARC. The scale (25 major fires, three-state scope, 24-hour statistic) required a different register. The 2020 West Coast fire event pushed ARC toward informational summary communication.' },
  { org: 'arc', date: 'Sep 2, 2020', excerpt: '23K people still can\'t return home in Northern California due to devastating wildfires. As they recover, Red Crossers will be standing behind them every step of the way.', media: '1 photo', rhetoric: 'pathos', url: 'https://x.com/RedCross/status/1301249765162856448', analysis: '"Standing behind them every step of the way" — sustained commitment metaphor. 23K displaced people combined with personal accompaniment promise. The "still can\'t return home" framing foregrounds the displacement experience rather than the operational response.' },
  { org: 'arc', date: 'Aug 25, 2020', excerpt: 'On Monday night, Red Crossers and our partners provided more than 3,300 people in California with refuge from the wildfires.', media: 'None', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1298322487533502467', analysis: 'Specific scale ethos: 3,300 people, one night, named time (Monday). The precision of the count grounds institutional performance in measurable terms without losing human reference.' },
  { org: 'arc', date: 'Aug 24, 2020', excerpt: 'With the help of partners, Red Crossers in California have helped people affected by the wildfires by providing: nearly 6K meals and snacks - emergency lodging, including shelters, and in some cases hotels, to 2,300 people - over 160 relief items', media: '4 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1297925985384435721', analysis: 'Metrics-forward operational report. The "and in some cases hotels" detail is a notable transparency moment — acknowledging non-shelter emergency lodging. List format unusual for ARC; suggests early-crisis logistics-forward communication before narrative framework established.' },
  { org: 'arc', date: 'Aug 21, 2020', excerpt: 'Red Cross disaster workers in California are supporting temporary evacuation points, shelters & cooling centers to help those affected by the wildfires.', media: '4 photos', rhetoric: 'ethos', url: 'https://x.com/RedCross/status/1296808761999400962', analysis: 'Infrastructure of care named: evacuation points, shelters, cooling centers (the last unusual and signals COVID summer heat emergency co-occurring with fires). Early 2020 post establishing organizational presence before full narrative strategies deployed.' }
];

/* ═══════════════════════════════════════════════════
   RENDER POSTS
═══════════════════════════════════════════════════ */
const postsGrid = document.getElementById('postsGrid');
const postsCount = document.getElementById('postsCount');

function renderPosts(filteredPosts) {
  if (!postsGrid) return;
  postsGrid.innerHTML = '';
  filteredPosts.forEach((post, i) => {
    const div = document.createElement('div');
    div.className = 'post-card';
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `${post.org === 'fema' ? 'FEMA' : 'Red Cross'} post from ${post.date}`);
    div.innerHTML = `
      <div class="post-card-header">
        <span class="post-org-badge ${post.org}">${post.org === 'fema' ? 'FEMA' : 'Red Cross'}</span>
        <span class="post-date">${post.date}</span>
      </div>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-card-footer">
        <span class="post-rhetoric-tag ${post.rhetoric}">${post.rhetoric.charAt(0).toUpperCase() + post.rhetoric.slice(1)}</span>
        <span class="post-media-tag">${post.media.split('(')[0].trim()}</span>
      </div>
    `;
    div.addEventListener('click', () => openPostModal(post));
    div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPostModal(post); } });
    postsGrid.appendChild(div);
  });
  if (postsCount) postsCount.textContent = `Showing ${filteredPosts.length} of ${postsData.length} posts`;
}

renderPosts(postsData);

// Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('postSearch');
let activeFilter = 'all';
let searchQuery = '';

function applyFilters() {
  let filtered = postsData;
  if (activeFilter !== 'all') {
    filtered = filtered.filter(p => p.org === activeFilter || p.rhetoric === activeFilter);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.excerpt.toLowerCase().includes(q) || p.date.toLowerCase().includes(q));
  }
  renderPosts(filtered);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    applyFilters();
  });
}

/* ═══════════════════════════════════════════════════
   POST MODAL
═══════════════════════════════════════════════════ */
const postModalOverlay = document.getElementById('postModalOverlay');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');

function openPostModal(post) {
  const orgName = post.org === 'fema' ? 'FEMA' : 'American Red Cross';
  modalContent.innerHTML = `
    <div class="modal-org-badge">
      <span class="post-org-badge ${post.org}">${orgName}</span>
    </div>
    <div class="modal-date">${post.date}</div>
    <h2 class="modal-title" id="modalTitle">Post Content</h2>
    <p class="modal-content-text">${post.excerpt}</p>
    <div class="modal-tags">
      <span class="post-rhetoric-tag ${post.rhetoric}">${post.rhetoric.charAt(0).toUpperCase() + post.rhetoric.slice(1)} appeal</span>
      <span class="post-media-tag" style="padding:0.2rem 0.65rem;background:var(--color-surface-offset);border-radius:var(--radius-full);font-size:var(--text-xs);font-weight:600;">${post.media}</span>
    </div>
    <div class="modal-analysis">
      <h4>Rhetorical Analysis</h4>
      <p>${post.analysis}</p>
    </div>
    <a href="${post.url}" target="_blank" rel="noopener" class="modal-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      View on X (Twitter)
    </a>
  `;
  postModalOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closePostModal() {
  postModalOverlay.hidden = true;
  document.body.style.overflow = '';
}

if (closeModal) closeModal.addEventListener('click', closePostModal);
if (postModalOverlay) {
  postModalOverlay.addEventListener('click', e => { if (e.target === postModalOverlay) closePostModal(); });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closePostModal(); } });

/* ═══════════════════════════════════════════════════
   TIMELINE DATA & RENDER
═══════════════════════════════════════════════════ */
const timelineEvents = [
  {
    year: '2020',
    title: 'Unprecedented West Coast Fire Season + COVID-19 Pandemic',
    dotClass: 'timeline-dot-fire',
    desc: 'The 2020 wildfire season was the largest in California\'s recorded history, burning over 4 million acres. It overlapped with the first year of the COVID-19 pandemic, fundamentally altering how the public used and experienced social media.',
    tags: ['Wildfire', 'COVID-19', 'Platform Surge', 'Dual Crisis'],
    detail: 'For this project, 2020 represents the starting condition of the post-API era as crisis communication context. COVID-19 transformed social media from a supplementary channel into a primary infrastructure for public information, institutional accountability, and community formation. FEMA and ARC communications in 2020 reflect both the wildfire urgency and the ambient anxiety of the pandemic. ARC\'s adaptation of virtual volunteers (international, video-conference-based) and FEMA\'s explicit mental health acknowledgment in September 2020 are distinctive markers of this COVID-inflected crisis year.'
  },
  {
    year: '2021',
    title: 'Dixie Fire — Second Largest in California History',
    dotClass: 'timeline-dot-fire',
    desc: 'The 2021 Dixie Fire burned over 963,000 acres, becoming the second-largest wildfire in California\'s history. It forced mass evacuations across Plumas, Butte, Tehama, Shasta, and Lassen counties.',
    tags: ['Wildfire', 'Dixie Fire', 'Mass Evacuation', 'Northern California'],
    detail: 'The Dixie Fire produced the highest density of ARC narrative posts about Northern California communities of the entire 2020–2025 dataset. ARC\'s posting strategy during the Dixie Fire emphasized volunteer accounts, real-time shelter updates, and individual survivor stories. FEMA\'s response was predominantly grant-announcement and deadline-reminder posts. The difference in rhetorical register between the two organizations is clearest in the Dixie Fire corpus.'
  },
  {
    year: '2022',
    title: 'Twitter Acquisition — Elon Musk Begins Platform Transformation',
    dotClass: 'timeline-dot-platform',
    desc: 'Elon Musk\'s $44 billion acquisition of Twitter in October 2022 began the platform\'s restructuring. Mass layoffs (approximately 80% of staff), policy changes, and API pricing announcements signaled impending structural transformation.',
    tags: ['Twitter/X', 'Platform Change', 'API Implications', 'Governance Shift'],
    detail: 'For this project, the 2022 acquisition marks the beginning of the platform instability period. Organizations like FEMA and ARC that had established communication strategies on Twitter had to begin adapting to a less predictable institutional environment. This is also the period when researchers began identifying what Bruns (2019) calls the APIcalypse: the deliberate restriction of research access as a form of platform power.'
  },
  {
    year: '2023',
    title: 'Twitter API Closure — Free Academic Access Ends',
    dotClass: 'timeline-dot-api',
    desc: 'Twitter announced the closure of its free API tier in February 2023, followed by prohibitively expensive pricing for academic access. This effectively ended large-scale academic research on Twitter/X data for most researchers.',
    tags: ['APIcalypse', 'Post-API', 'Research Access', 'Platform Power'],
    detail: 'This is the central methodological event for this project. The closure of free academic API access produced the conditions under which this project\'s manual curation methodology was developed. Following Bruns (2019) and Freelon (2018), this project treats the API closure not as a technical inconvenience but as a deliberate exercise of platform power — a structural decision with consequences for public accountability and scholarly independence. The project responds by developing manual curation as a principled alternative: smaller in scale but richer in interpretive depth.'
  },
  {
    year: '2023',
    title: 'Maui Wildfires — Largest U.S. Wildfire Disaster in Modern History',
    dotClass: 'timeline-dot-fire',
    desc: 'The August 2023 Lahaina wildfire on Maui killed at least 100 people, destroyed the historic town of Lahaina, and became the deadliest U.S. wildfire in over a century.',
    tags: ['Maui', 'Lahaina', 'Hawaii', 'Cross-Platform Response'],
    detail: 'The Maui fires are significant for this project because they triggered an ARC cross-state volunteer mobilization post that explicitly named California, Wisconsin, Oklahoma, and Indiana volunteers traveling to Hawaii. This geographic scope — a California-framed disaster network mobilizing for a Pacific Island emergency — illustrates how the post-2020 ARC communication strategy had expanded from California-centric to a genuinely national crisis network.'
  },
  {
    year: '2024',
    title: 'Instagram Algorithm Reorientation & Continued X Transformation',
    dotClass: 'timeline-dot-platform',
    desc: 'Instagram continued shifting its algorithm toward Reels-heavy content discovery, deprioritizing static image posts. X (formerly Twitter) continued implementing policy changes affecting verified accounts, content moderation, and third-party access.',
    tags: ['Instagram', 'Algorithm', 'Platform Divergence', 'X Policy Changes'],
    detail: 'For this project, 2024 represents the stabilization of the two platforms into distinctly different rhetorical environments. Instagram\'s Reels emphasis rewards ARC\'s video-forward, emotionally resonant communication style. X\'s ongoing instability and reduced institutional credibility (following blue-check verification changes) created different challenges for FEMA, whose institutional authority depended on clear organizational identity signals.'
  },
  {
    year: '2025',
    title: 'Los Angeles Wildfires — Most Destructive Urban Fire in U.S. History',
    dotClass: 'timeline-dot-fire',
    desc: 'The January 2025 Los Angeles fires, including the Palisades Fire and Eaton Fire, destroyed more than 17,000 structures, burned over 40,000 acres in densely populated areas, and produced the highest posting volume in the entire dataset.',
    tags: ['LA Fires', 'Palisades Fire', 'Eaton Fire', 'Urban Disaster', '2025'],
    detail: 'The 2025 LA fires represent the project\'s most analytically rich data cluster. The combination of urban density, celebrity community proximity (Pacific Palisades), simultaneous wind-driven spread across multiple ignition points, and the fully post-API research environment produced the most intensive institutional communication activity in the dataset. ARC\'s January 2025 posts include the dataset\'s most powerful pathos examples (Rona Schneider\'s family photograph, baby Mia\'s birthday in shelter) alongside its most FEMA-adjacent operational reports (17,000 structures destroyed, 600+ responders). FEMA\'s posts in January 2025 reached their most frequent posting rate of the entire 2020–2025 period.'
  }
];

const timelineContainer = document.getElementById('timelineContainer');
if (timelineContainer) {
  timelineEvents.forEach((ev, i) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-expanded', 'false');
    item.innerHTML = `
      <div class="timeline-dot ${ev.dotClass}"></div>
      <div class="timeline-card">
        <div class="timeline-year">${ev.year}</div>
        <h3 class="timeline-event-title">${ev.title}</h3>
        <p class="timeline-desc">${ev.desc}</p>
        <div class="timeline-tags">${ev.tags.map(t => `<span class="timeline-tag">${t}</span>`).join('')}</div>
        <div class="timeline-detail">${ev.detail}</div>
      </div>
    `;
    item.addEventListener('click', () => {
      const expanded = item.classList.contains('expanded');
      // Collapse all
      document.querySelectorAll('.timeline-item.expanded').forEach(el => {
        el.classList.remove('expanded');
        el.setAttribute('aria-expanded', 'false');
      });
      if (!expanded) {
        item.classList.add('expanded');
        item.setAttribute('aria-expanded', 'true');
      }
    });
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); } });
    timelineContainer.appendChild(item);
  });
}

/* ═══════════════════════════════════════════════════
   BIBLIOGRAPHY DATA & RENDER
═══════════════════════════════════════════════════ */
const bibData = [
  {
    citation: 'Austin, L., Fraustino, J. D., Jin, Y., & Liu, B. F. (2017). Crisis communication in a changing media environment. In L. Austin & Y. Jin (Eds.), <em>Social media and crisis communication</em> (pp. 423–448). Routledge. <a href="https://doi.org/10.4324/9781315749068-30" target="_blank" rel="noopener">https://doi.org/10.4324/9781315749068-30</a>',
    annotation: 'This chapter reviews the theoretical landscape of crisis communication scholarship and identifies key gaps produced by the changing social media environment. It provides a core framework for this project by grounding the analysis of FEMA and ARC posts within a tradition that emphasizes the multivocal, platform-mediated character of crisis information flows.'
  },
  {
    citation: 'Bruns, A. (2019). After the "APIcalypse": Social media platforms and their fight against critical scholarly research. <em>Information, Communication & Society</em>, <em>22</em>(11), 1544–1566. <a href="https://doi.org/10.1080/1369118X.2019.1637447" target="_blank" rel="noopener">https://doi.org/10.1080/1369118X.2019.1637447</a>',
    annotation: 'Bruns argues that platforms have deliberately restricted data access in ways that impede independent research and public accountability, framing this restriction as an exercise of platform power rather than a neutral technical decision. This analysis is foundational to the project\'s methodological intervention, which treats API closure not as a practical obstacle to work around but as a structural condition that demands a revised and principled approach to social media scholarship.'
  },
  {
    citation: 'Bucher, T. (2018). <em>If...then: Algorithmic power and politics</em>. Oxford University Press. <a href="https://doi.org/10.1093/oso/9780190493028.001.0001" target="_blank" rel="noopener">https://doi.org/10.1093/oso/9780190493028.001.0001</a>',
    annotation: 'Bucher examines algorithms as forms of power that structure visibility, interaction, and experience in ways largely invisible to users. This book deepens the project\'s platform analysis by explaining how algorithmic systems shape the environment in which FEMA and ARC crisis messages appear and circulate, determining which messages surface and for whom.'
  },
  {
    citation: 'Coombs, W. T. (2022). <em>Ongoing crisis communication: Planning, managing, and responding</em> (6th ed.). SAGE.',
    annotation: 'Coombs synthesizes major crisis communication theories and outlines best practices for organizational responses before, during, and after crises. This book situates the project within a broader crisis communication tradition and clarifies how social media practices both inherit and complicate established models, particularly Situational Crisis Communication Theory.'
  },
  {
    citation: 'Drucker, J. (2011). Humanities approaches to graphical display. <em>Digital Humanities Quarterly</em>, <em>5</em>(1). <a href="http://www.digitalhumanities.org/dhq/vol/5/1/000091/000091.html" target="_blank" rel="noopener">http://www.digitalhumanities.org/dhq/vol/5/1/000091/000091.html</a>',
    annotation: 'Drucker argues that humanities scholars must resist the positivist assumptions embedded in conventional visualizations and instead design displays that acknowledge interpretation, constructedness, and the co-dependence of observer and data — a quality she captures through the concept of capta rather than data. This essay is foundational to the project\'s visualization design, ensuring that charts and timelines function as interpretive arguments rather than neutral representations of a fixed record.'
  },
  {
    citation: 'Drucker, J. (2020). <em>Visualization and interpretation: Humanistic approaches to display</em>. MIT Press. <a href="https://doi.org/10.7551/mitpress/12523.001.0001" target="_blank" rel="noopener">https://doi.org/10.7551/mitpress/12523.001.0001</a>',
    annotation: 'In this book, Drucker extends her earlier arguments about capta and interpretation, offering a sustained account of how visual representation can serve humanistic inquiry across domains including time, space, and data analysis. It provides both conceptual grounding and practical guidance for designing a digital interface where visual comparison and rhetorical interpretation reinforce rather than undermine each other.'
  },
  {
    citation: 'Freelon, D. (2018). Computational research in the post-API age. <em>Political Communication</em>, <em>35</em>(4), 665–668. <a href="https://doi.org/10.1080/10584609.2018.1477506" target="_blank" rel="noopener">https://doi.org/10.1080/10584609.2018.1477506</a>',
    annotation: 'Freelon describes how the shrinking availability of platform APIs has reshaped computational social media research and calls on scholars to adapt their methods accordingly. His essay anchors the project\'s methodological framing by naming the post-API condition that motivates the turn toward curated, small-scale, and interpretively rigorous analysis.'
  },
  {
    citation: 'Hu, T.-H. (2015). <em>A prehistory of the cloud</em>. MIT Press. <a href="https://doi.org/10.7551/mitpress/9979.001.0001" target="_blank" rel="noopener">https://doi.org/10.7551/mitpress/9979.001.0001</a>',
    annotation: 'Hu traces the political, economic, and material histories that underlie contemporary networked computing, arguing that cloud infrastructure inherits the assumptions and inequalities of earlier communication systems. This book supports the project\'s historicization of the 2020–2025 period by situating current social media infrastructures within longer trajectories of mediation and institutional decision-making.'
  },
  {
    citation: 'Jin, Y., Liu, B. F., & Austin, L. L. (2014). Examining the role of social media in effective crisis management: The effects of crisis origin, information form, and source on publics\' crisis responses. <em>Communication Research</em>, <em>41</em>(1), 74–94. <a href="https://doi.org/10.1177/0093650211423918" target="_blank" rel="noopener">https://doi.org/10.1177/0093650211423918</a>',
    annotation: 'This article studies how crisis origin, message form, and information source influence public responses to crisis communication on social media, providing empirical grounding for the social-mediated crisis communication model. It offers one of the core analytical frameworks for comparing how FEMA and ARC use different platform environments to address publics during wildfire events.'
  },
  {
    citation: 'Kennedy, H. (2016). <em>Post, mine, repeat: Social media data mining becomes ordinary</em>. Palgrave Macmillan.',
    annotation: 'Kennedy examines how social media data practices have become normalized across public, commercial, and academic contexts, arguing that the everyday extraction and analysis of social data carries significant ethical and epistemological consequences. This book broadens the project\'s understanding of platform data beyond the question of technical collection, situating the research within larger data cultures that shaped the 2020–2025 period.'
  },
  {
    citation: 'Kent, M. L., & Taylor, M. (2002). Toward a dialogic theory of public relations. <em>Public Relations Review</em>, <em>28</em>(1), 21–37. <a href="https://doi.org/10.1016/S0363-8111(02)00108-X" target="_blank" rel="noopener">https://doi.org/10.1016/S0363-8111(02)00108-X</a>',
    annotation: 'Kent and Taylor develop a dialogic model of public relations that emphasizes mutuality, openness, and sustained relationship-building rather than one-way broadcasting. Their framework provides the primary language for analyzing whether FEMA\'s and ARC\'s crisis communication on social media invites meaningful public engagement or primarily projects institutional authority downward to publics.'
  },
  {
    citation: 'Lomborg, S., & Bechmann, A. (2014). Using APIs for data collection on social media. <em>The Information Society</em>, <em>30</em>(4), 256–265. <a href="https://doi.org/10.1080/01972243.2014.915276" target="_blank" rel="noopener">https://doi.org/10.1080/01972243.2014.915276</a>',
    annotation: 'Lomborg and Bechmann examine the methodological, legal, and ethical issues involved in collecting social media data through APIs, establishing a careful framework for API-based research in an earlier and more open platform environment. Their work is especially valuable because it establishes a methodological baseline against which the constraints and revised commitments of the post-API present can be measured and theorized.'
  },
  {
    citation: 'McPherson, T. (2018). <em>Feminist in a software lab: Difference + design</em>. Harvard University Press. <a href="https://doi.org/10.4159/9780674978720" target="_blank" rel="noopener">https://doi.org/10.4159/9780674978720</a>',
    annotation: 'McPherson argues that technical design and cultural politics are inseparable, and that digital tools from databases to interfaces always carry assumptions about knowledge, difference, and relation that are constitutive rather than incidental. This book strengthens the project\'s digital studies framework by insisting that the interface designed for this project is itself an epistemological and cultural artifact, not a neutral container for content.'
  },
  {
    citation: 'Perriam, J., Birkbak, A., & Freeman, A. (2020). Digital methods in a post-API environment. <em>International Journal of Social Research Methodology</em>, <em>23</em>(3), 277–290. <a href="https://doi.org/10.1080/13645579.2019.1682840" target="_blank" rel="noopener">https://doi.org/10.1080/13645579.2019.1682840</a>',
    annotation: 'This article examines how digital methods research must adapt to reduced API access and changing platform conditions, arguing that the instability of the research object should itself be made analytically productive. It is valuable to the project because it offers a contemporary methodological conversation that directly supports the approach of designing a reflexive, small-scale, and post-API research strategy.'
  },
  {
    citation: 'Starosielski, N. (2015). <em>The undersea network</em>. Duke University Press. <a href="https://doi.org/10.1215/9780822376224" target="_blank" rel="noopener">https://doi.org/10.1215/9780822376224</a>',
    annotation: 'Starosielski demonstrates that digital communication depends on material infrastructures with deep historical roots and uneven geographies, including subsea cables that trace colonial shipping routes and telegraph lines. This book grounds the project\'s claim that today\'s social media platforms must be understood as historically layered communication infrastructures rather than as self-originating present-day tools, and it serves as a model for pairing scholarly argument with interactive digital presentation.'
  },
  {
    citation: 'Taylor, M., & Kent, M. L. (2014). Dialogic engagement: Clarifying foundational concepts. <em>Journal of Public Relations Research</em>, <em>26</em>(5), 384–398. <a href="https://doi.org/10.1080/1062726X.2014.908718" target="_blank" rel="noopener">https://doi.org/10.1080/1062726X.2014.908718</a>',
    annotation: 'Taylor and Kent revisit dialogic communication theory, distinguishing genuine engagement from more superficial forms of organizational interactivity and clarifying the relational conditions under which dialogue can meaningfully occur. This article refines the evaluative criteria used in the project for assessing what counts as authentic institutional-public communication in FEMA\'s and ARC\'s social media posts.'
  },
  {
    citation: 'Walsh, M. (2023). The challenges and possibilities of social media data: New directions in literary studies and the digital humanities. In M. K. Gold & L. F. Klein (Eds.), <em>Debates in the digital humanities 2023</em> (pp. 275–290). University of Minnesota Press. <a href="https://doi.org/10.5749/9781452969565" target="_blank" rel="noopener">https://doi.org/10.5749/9781452969565</a>',
    annotation: 'Walsh argues that social media should be treated as a rich object for humanistic inquiry and that doing so responsibly demands sustained attention to community engagement, citation ethics, and data sharing, not only to computational methods. This chapter anchors the project more firmly in digital humanities and provides an ethical framework for handling curated post data from living publics.'
  },
  {
    citation: 'Weller, K. (2015). Accepting the challenges of social media research. <em>Online Information Review</em>, <em>39</em>(3), 281–289. <a href="https://doi.org/10.1108/OIR-03-2015-0069" target="_blank" rel="noopener">https://doi.org/10.1108/OIR-03-2015-0069</a>',
    annotation: 'Weller discusses the methodological and epistemological challenges of using social media material as scholarly evidence, emphasizing that choices about access, scale, platform, and interpretation are not incidental but constitutive of the meanings researchers can produce. This article reinforces the project\'s argument that decisions about how to collect and analyze crisis posts are themselves arguments about what social media research can and should know.'
  },
  {
    citation: 'Zappavigna, M. (2012). <em>Discourse of Twitter and social media: How we use language to create affiliation on the web</em>. Bloomsbury.',
    annotation: 'Zappavigna studies how social media discourse creates affiliation, publics, and social connection through language, examining how features such as tone, repetition, and hashtags operate within platform-specific communication contexts. Her work supports the rhetorical analysis in this project by providing linguistic and discourse tools for explaining how FEMA and ARC construct their publics differently through platform-mediated address during disaster events.'
  }
];

const bibList = document.getElementById('bibList');
if (bibList) {
  bibData.forEach((entry, i) => {
    const div = document.createElement('div');
    div.className = 'bib-entry';
    div.innerHTML = `
      <div class="bib-entry-header" role="button" tabindex="0" aria-expanded="false" id="bib-header-${i}">
        <p class="bib-citation">${entry.citation}</p>
        <div class="bib-expand-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
      <div class="bib-annotation" id="bib-annotation-${i}" role="region" aria-labelledby="bib-header-${i}">
        ${entry.annotation}
      </div>
    `;
    const header = div.querySelector('.bib-entry-header');
    header.addEventListener('click', () => {
      const open = div.classList.contains('open');
      div.classList.toggle('open');
      header.setAttribute('aria-expanded', String(!open));
    });
    header.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); } });
    bibList.appendChild(div);
  });
}

/* ═══════════════════════════════════════════════════
   ACTIVE NAV HIGHLIGHT ON SCROLL
═══════════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--color-text)';
          link.style.background = 'var(--color-surface-offset)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));

// Init Lucide icons if loaded
if (typeof lucide !== 'undefined') lucide.createIcons();
