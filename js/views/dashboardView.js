/**
 * OmniPulse AI - Dashboard View
 */

const DashboardView = {
  render(container) {
    const stats = window.MOCK_DATA.stats;
    const campaigns = window.MOCK_DATA.campaigns;
    const calendarEvents = window.MOCK_DATA.calendarEvents.slice(0, 4);

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <!-- Hero Header -->
        <div class="relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl">
          <div class="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 mb-3">
                <span class="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator"></span>
                AI Multi-Model Engine Active (Claude 3.7 & GPT-4o)
              </div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Turn 1 Content Asset into <span class="text-gradient">10 High-Growth Posts</span>
              </h1>
              <p class="text-slate-400 text-sm mt-2 max-w-2xl">
                Paste any YouTube link, podcast audio, or raw notes. OmniPulse AI transcribes, hooks, and formats viral threads, LinkedIn posts, and video scripts in 15 seconds.
              </p>
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <button onclick="App.navigate('studio')" class="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
                <span>Open Repurpose Studio</span>
              </button>
            </div>
          </div>

          <!-- Quick URL Ingestion Bar -->
          <div class="mt-6 pt-6 border-t border-white/5">
            <form id="quick-repurpose-form" class="flex flex-col sm:flex-row gap-3">
              <div class="relative flex-1">
                <i data-lucide="link" class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"></i>
                <input 
                  type="text" 
                  id="quick-url-input" 
                  placeholder="Paste YouTube URL, article link, or podcast topic to test..." 
                  class="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
              <button type="submit" class="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white font-medium text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all shrink-0">
                <i data-lucide="zap" class="w-4 h-4 text-indigo-400"></i>
                <span>Instant Repurpose</span>
              </button>
            </form>
          </div>
        </div>

        <div id="stats-section"></div>
        <div id="columns-section"></div>
      </div>
    `;

    this.renderStats(container, stats);
    this.renderColumns(container, campaigns, calendarEvents);
  },

  renderStats(container, stats) {
    container.querySelector('#stats-section').outerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="glass-card rounded-2xl p-5 border border-white/5">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-xs font-semibold tracking-wider uppercase">Repurposed Content</span>
            <div class="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <i data-lucide="layers" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-bold text-white">${stats.totalRepurposed}</span>
            <span class="text-xs font-medium text-emerald-400 flex items-center">
              <i data-lucide="trending-up" class="w-3 h-3 mr-0.5"></i> +28% this mo
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-1">Across 5 integrated channels</p>
        </div>

        <div class="glass-card rounded-2xl p-5 border border-white/5">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-xs font-semibold tracking-wider uppercase">Audience Reach</span>
            <div class="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <i data-lucide="bar-chart-3" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-bold text-white">${stats.estimatedReach}</span>
            <span class="text-xs font-medium text-purple-400">4.8x multiplier</span>
          </div>
          <p class="text-xs text-slate-400 mt-1">Organic algorithmic reach</p>
        </div>

        <div class="glass-card rounded-2xl p-5 border border-white/5">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-xs font-semibold tracking-wider uppercase">Time Reclaimed</span>
            <div class="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <i data-lucide="clock" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-bold text-white">${stats.timeSavedHours}h</span>
            <span class="text-xs font-medium text-emerald-400">Saved $3,700 agency fee</span>
          </div>
          <p class="text-xs text-slate-400 mt-1">Avg 3.2 hours saved per piece</p>
        </div>

        <div class="glass-card rounded-2xl p-5 border border-white/5">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-xs font-semibold tracking-wider uppercase">Avg Viral Score</span>
            <div class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <i data-lucide="flame" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-bold text-white">${stats.avgViralScore}/100</span>
            <span class="text-xs font-medium text-amber-400">Top 5% Benchmark</span>
          </div>
          <p class="text-xs text-slate-400 mt-1">Retention & hook rhythm metric</p>
        </div>
      </div>
    `;
  },

  renderColumns(container, campaigns, calendarEvents) {
    container.querySelector('#columns-section').outerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Campaigns (2 cols) -->
        <div class="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/5">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h3 class="text-lg font-bold text-white">Recent Repurposed Campaigns</h3>
              <p class="text-xs text-slate-400">Inspect or edit generated omni-channel formats</p>
            </div>
            <button onclick="App.navigate('library')" class="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View all (${campaigns.length}) <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <div class="space-y-3">
            ${campaigns.map(camp => `
              <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      ${camp.sourceType}
                    </span>
                    ${Utils.getViralScoreBadge(camp.viralScore)}
                    <span class="text-xs text-slate-500">• ${Utils.formatDate(camp.createdAt)}</span>
                  </div>
                  <h4 class="text-sm font-semibold text-white truncate hover:text-indigo-400 cursor-pointer" onclick="App.openCampaignDetails('${camp.id}')">
                    ${camp.title}
                  </h4>
                  <p class="text-xs text-slate-400 mt-1 line-clamp-1">
                    ${camp.sourceSummary}
                  </p>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <button onclick="App.openCampaignDetails('${camp.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/20 flex items-center gap-1.5 transition-colors">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i> View Formats
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Upcoming Calendar Queue (1 col) -->
        <div class="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white">Publishing Queue</h3>
              <button onclick="App.navigate('calendar')" class="text-xs text-indigo-400 hover:text-indigo-300">
                Full Calendar
              </button>
            </div>
            <p class="text-xs text-slate-400 mb-4">Upcoming automated dispatches</p>

            <div class="space-y-2.5">
              ${calendarEvents.map(event => {
                const platformConfig = window.APP_CONFIG.platforms.find(p => p.id === event.platform) || {};
                return `
                  <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style="background-color: ${platformConfig.color || '#6366f1'}20; color: ${platformConfig.color || '#6366f1'}">
                      <i data-lucide="${platformConfig.icon || 'share-2'}" class="w-4 h-4"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-semibold text-slate-200 truncate">${event.title}</p>
                      <p class="text-[11px] text-slate-400">${event.date} • ${event.time}</p>
                    </div>
                    <span class="text-[10px] px-2 py-0.5 rounded font-semibold ${event.status === 'Scheduled' ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'}">
                      ${event.status}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Brand Voice Active Card -->
          <div class="mt-6 p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider">Active Brand Voice</span>
              <span class="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Active</span>
            </div>
            <h5 class="text-xs font-bold text-white">Tech Founder & Builder</h5>
            <p class="text-[11px] text-slate-400 mt-1">Direct, analytical, honest, zero fluff. Optimizes for ICP conversion.</p>
            <button onclick="App.navigate('brand-voice')" class="mt-2.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
              Manage Brand Personas <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Hook up quick submit
    const quickForm = document.getElementById('quick-repurpose-form');
    if (quickForm) {
      quickForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const urlInput = document.getElementById('quick-url-input');
        const val = urlInput ? urlInput.value.trim() : '';
        App.navigate('studio', { prefillUrl: val });
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
};

window.DashboardView = DashboardView;
