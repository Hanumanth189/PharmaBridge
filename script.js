// PharmaBridge Academy - JavaScript Engine

let materialsData = [];

document.addEventListener('DOMContentLoaded', async () => {
  initTabs();
  initMobileMenu();
  initForm();
  await loadMaterials();
});

// Load materials catalog from materials.json
async function loadMaterials() {
  const materialsGrid = document.getElementById('materialsGrid');
  try {
    const response = await fetch('materials.json');
    if (!response.ok) throw new Error('Failed to load materials catalog');
    materialsData = await response.json();
    renderMaterials(materialsData);
    initFilterAndSearch();
  } catch (error) {
    console.error('Error loading materials:', error);
    if (materialsGrid) {
      materialsGrid.innerHTML = `
        <div class="card text-center" style="grid-column: 1 / -1;">
          <p class="text-muted"><i class="fa-solid fa-triangle-exclamation"></i> Direct Git materials catalog ready. You can browse the repository at <a href="https://github.com/hanumanthpanuganti/pharmabridge-materials" target="_blank">github.com/hanumanthpanuganti/pharmabridge-materials</a></p>
        </div>
      `;
    }
  }
}

// Render Material Cards
function renderMaterials(items) {
  const grid = document.getElementById('materialsGrid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="card text-center" style="grid-column: 1 / -1; padding: 48px;">
        <i class="fa-solid fa-folder-open icon-lg text-muted" style="font-size: 2.5rem; margin-bottom: 12px;"></i>
        <h4>No materials match your search query</h4>
        <p class="text-muted">Try clearing your filters or searching for terms like "Excel", "SOP", "HPLC", "GCP", or "Resume".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="material-card" data-track="${item.trackId}">
      <div>
        <div class="mat-header">
          <div class="mat-icon">
            <i class="fa-solid ${item.icon}"></i>
          </div>
          <span class="mat-tag"><i class="fa-brands fa-github"></i> ${item.type}</span>
        </div>

        <h3 class="mat-title">${item.title}</h3>
        <p class="mat-desc">${item.description}</p>

        <div class="mat-tags-list">
          ${item.tags.map(t => `<span class="mat-badge">#${t}</span>`).join('')}
        </div>
      </div>

      <div class="mat-footer">
        <span class="mat-size"><i class="fa-regular fa-file"></i> ${item.fileSize}</span>
        <a href="${item.gitPath}" target="_blank" class="btn btn-secondary btn-sm">
          <i class="fa-brands fa-github"></i> Access Storage
        </a>
      </div>
    </div>
  `).join('');
}

// Filter and Search logic
function initFilterAndSearch() {
  const searchInput = document.getElementById('materialSearch');
  const filterPills = document.querySelectorAll('.filter-pill');

  let activeTrack = 'all';
  let searchQuery = '';

  function filterData() {
    const filtered = materialsData.filter(item => {
      const matchesTrack = activeTrack === 'all' || item.trackId === activeTrack;
      const query = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));

      return matchesTrack && matchesSearch;
    });

    renderMaterials(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterData();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeTrack = pill.getAttribute('data-filter');
      filterData();
    });
  });
}

// Curriculum Track Tabs Switching
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const trackPanes = document.querySelectorAll('.track-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTrack = btn.getAttribute('data-track');

      tabBtns.forEach(b => b.classList.remove('active'));
      trackPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`track-${targetTrack}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// Copy Git URL to Clipboard
function copyGitUrl() {
  const gitRepoUrl = "git clone https://github.com/hanumanthpanuganti/pharmabridge-materials.git";
  const btn = document.getElementById('copyGitBtn');

  navigator.clipboard.writeText(gitRepoUrl).then(() => {
    if (btn) {
      btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      setTimeout(() => {
        btn.innerHTML = `<i class="fa-regular fa-copy"></i> Copy Link`;
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }, 2500);
    }
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#091E36';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }
}

// Handle Enrollment Form Submission
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('enrollmentForm');
  const successMsg = document.getElementById('formSuccess');

  if (form && successMsg) {
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
  }
}
