/**
 * OmniPulse AI - SPA Core Application Controller & Router
 */

const App = {
  currentView: 'dashboard',

  init() {
    this.bindEvents();
    this.updateCreditDisplay();
    this.navigate('dashboard');
  },

  bindEvents() {
    // Keyboard shortcuts (Cmd+K or Ctrl+K for search)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.openSearchModal();
      }
    });

    // Mobile sidebar toggle
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const sidebar = document.getElementById('app-sidebar');
        if (sidebar) sidebar.classList.toggle('-translate-x-full');
      });
    }
  },

  navigate(viewName, options = {}) {
    this.currentView = viewName;
    const container = document.getElementById('app-main-content');
    if (!container) return;

    // Update Sidebar Active state
    document.querySelectorAll('.nav-item').forEach(el => {
      const target = el.getAttribute('data-view');
      if (target === viewName) {
        el.className = 'nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all bg-indigo-600/15 text-indigo-400 border border-indigo-500/30';
      } else {
        el.className = 'nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all text-slate-400 hover:text-white hover:bg-slate-800/60';
      }
    });

    // Close mobile sidebar if open
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar && window.innerWidth < 1024) {
      sidebar.classList.add('-translate-x-full');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render View
    switch (viewName) {
      case 'dashboard':
        DashboardView.render(container);
        break;
      case 'studio':
        StudioView.render(container, options);
        break;
      case 'library':
        LibraryView.render(container);
        break;
      case 'calendar':
        CalendarView.render(container);
        break;
      case 'brand-voice':
        BrandVoiceView.render(container);
        break;
      case 'analytics':
        AnalyticsView.render(container);
        break;
      case 'billing':
        BillingView.render(container);
        break;
      default:
        DashboardView.render(container);
    }
  },

  updateCreditDisplay() {
    const credits = window.APP_CONFIG.credits;
    const badge = document.getElementById('header-credit-badge');
    if (badge) {
      badge.innerText = `${credits.remaining} / ${credits.total} Credits Left`;
    }
  },

  openCampaignDetails(campId) {
    const camp = window.MOCK_DATA.campaigns.find(c => c.id === campId);
    if (!camp) return;
    StudioView.activeCampaign = camp;
    this.navigate('studio');
  },

  scheduleModal(campId, platform) {
    Utils.showToast(`Post scheduled for ${platform.toUpperCase()} on Thursday at 9:00 AM`, 'success');
  },

  openSearchModal() {
    Utils.showToast('Omni-Search (Cmd+K) ready. Type to search campaigns...', 'info');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;
