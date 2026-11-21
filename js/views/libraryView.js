/**
 * OmniPulse AI - Content Library View
 */

const LibraryView = {
  currentFilter: 'all',
  searchQuery: '',

  render(container) {
    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white">Content Library</h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Manage, search, and export your repurposed multi-channel assets.</p>
          </div>

          <button onclick="App.navigate('studio')" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-all shrink-0">
            <i data-lucide="plus" class="w-4 h-4"></i> New Repurpose
          </button>
        </div>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button onclick="LibraryView.setFilter('all')" id="lib-filter-all" class="px-3 py-1.5 rounded-xl font-semibold bg-indigo-600 text-white shadow">
              All Assets
            </button>
            <button onclick="LibraryView.setFilter('twitter')" id="lib-filter-twitter" class="px-3 py-1.5 rounded-xl font-semibold bg-slate-900 text-slate-400 hover:text-white border border-slate-800">
              X Threads
            </button>
            <button onclick="LibraryView.setFilter('linkedin')" id="lib-filter-linkedin" class="px-3 py-1.5 rounded-xl font-semibold bg-slate-900 text-slate-400 hover:text-white border border-slate-800">
              LinkedIn
            </button>
            <button onclick="LibraryView.setFilter('shorts')" id="lib-filter-shorts" class="px-3 py-1.5 rounded-xl font-semibold bg-slate-900 text-slate-400 hover:text-white border border-slate-800">
              Video Scripts
            </button>
          </div>

          <div class="relative w-full md:w-64">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              onkeyup="LibraryView.handleSearch(this.value)"
              class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div id="library-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      </div>
    `;

    this.renderGrid();
    if (window.lucide) window.lucide.createIcons();
  },

  renderGrid() {
    const grid = document.getElementById('library-grid');
    if (!grid) return;

    let items = window.MOCK_DATA.campaigns;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(c => c.title.toLowerCase().includes(q) || c.sourceSummary.toLowerCase().includes(q));
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full glass-panel rounded-2xl p-10 text-center text-slate-400">
          <i data-lucide="folder-open" class="w-8 h-8 mx-auto text-slate-600 mb-2"></i>
          <p class="text-sm font-semibold text-white">No campaigns found</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons({ root: grid });
      return;
    }

    grid.innerHTML = items.map(camp => `
      <div class="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between space-y-4 hover:border-indigo-500/30 transition-all">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-indigo-300 border border-slate-700">
              ${camp.sourceType}
            </span>
            ${Utils.getViralScoreBadge(camp.viralScore)}
          </div>

          <h3 class="text-sm font-bold text-white hover:text-indigo-400 cursor-pointer line-clamp-2" onclick="App.openCampaignDetails('${camp.id}')">
            ${camp.title}
          </h3>

          <p class="text-xs text-slate-400 line-clamp-2">
            ${camp.sourceSummary}
          </p>
        </div>

        <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span class="text-slate-500 text-[11px] flex items-center gap-1">
            <i data-lucide="mic" class="w-3 h-3"></i> ${camp.brandVoice}
          </span>
          <button onclick="App.openCampaignDetails('${camp.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/20 flex items-center gap-1">
            Open Studio <i data-lucide="arrow-right" class="w-3 h-3"></i>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons({ root: grid });
  },

  setFilter(filterId) {
    this.currentFilter = filterId;
    ['all', 'twitter', 'linkedin', 'shorts'].forEach(id => {
      const btn = document.getElementById(`lib-filter-${id}`);
      if (btn) btn.className = id === filterId ? 'px-3 py-1.5 rounded-xl font-semibold bg-indigo-600 text-white shadow' : 'px-3 py-1.5 rounded-xl font-semibold bg-slate-900 text-slate-400 hover:text-white border border-slate-800';
    });
    this.renderGrid();
  },

  handleSearch(val) {
    this.searchQuery = val.trim();
    this.renderGrid();
  }
};

window.LibraryView = LibraryView;
