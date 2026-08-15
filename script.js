// PharmaBridge Academy - JavaScript Engine (Implementation Guide V1.0)

let materialsData = [];

document.addEventListener('DOMContentLoaded', async () => {
  initTabs();
  initMobileMenu();
  initBgCanvas();
  initBackToTop();
  initScrollSpy();
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
          <p class="text-muted"><i class="fa-solid fa-triangle-exclamation"></i> Couldn't load study materials right now. Please refresh the page or try again shortly.</p>
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


// Mobile Menu Toggle
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const isOpen = navMenu.classList.contains('mobile-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open');
      }
    });
  }
}

// Dynamic Interactive Living Background Canvas Engine
function initBgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  let particles = [];
  const particleCount = Math.min(Math.floor(width * 0.045), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2.2 + 1;

      const colors = ['#00c896', '#38bdf8', '#818cf8', '#ffffff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.baseAlpha = Math.random() * 0.5 + 0.3;
      this.alpha = this.baseAlpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.angle += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.angle) * 0.2;

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, this.alpha));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          let opacity = (1 - dist / 130) * 0.25;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = '#00a878';
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

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
          <p class="text-muted"><i class="fa-solid fa-triangle-exclamation"></i> Couldn't load study materials right now. Please refresh the page or try again shortly.</p>
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

// Back-to-Top Floating Button
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ScrollSpy: highlight active navbar link on scroll
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 220;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
