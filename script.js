// PharmaBridge Academy - JavaScript Engine (Implementation Guide V1.0)

let materialsData = [];

document.addEventListener('DOMContentLoaded', async () => {
  initTabs();
  initMobileMenu();
  await loadMaterials();
});

// Dismiss Welcome Overlay
function dismissWelcome() {
  const overlay = document.getElementById('welcomeOverlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
}

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
          <p class="text-muted"><i class="fa-solid fa-triangle-exclamation"></i> Direct study materials folder ready. Access directly on <a href="https://onedrive.live.com/my?id=%2Fpersonal%2F60251449553f7b82%2FDocuments%2FpharmaBridge%5Fstudy%20materials" target="_blank">OneDrive Storage Folder</a></p>
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
        <p class="text-muted">Try clearing your filters or searching for terms like "Excel", "SOP", "HPLC", "GCP", or "CDM".</p>
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
          <span class="mat-tag"><i class="fa-solid fa-cloud"></i> ${item.type}</span>
        </div>

        <h3 class="mat-title">${item.title}</h3>
        <p class="mat-desc">${item.description}</p>

        <div class="mat-tags-list">
          ${item.tags.map(t => `<span class="mat-badge">#${t}</span>`).join('')}
        </div>
      </div>

      <div class="mat-footer">
        <span class="mat-size"><i class="fa-regular fa-file"></i> ${item.fileSize}</span>
        <a href="${item.storageUrl}" target="_blank" class="btn btn-secondary btn-sm">
          <i class="fa-solid fa-up-right-from-square"></i> Open Material
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

// Copy OneDrive Storage Link
function copyStorageUrl() {
  const storageUrl = "https://onedrive.live.com/my?id=%2Fpersonal%2F60251449553f7b82%2FDocuments%2FpharmaBridge%5Fstudy%20materials";
  const btn = document.getElementById('copyStorageBtn');

  navigator.clipboard.writeText(storageUrl).then(() => {
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
        navMenu.style.background = '#051120';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }
}
