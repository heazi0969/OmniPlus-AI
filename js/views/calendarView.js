/**
 * OmniPulse AI - Content Calendar View
 */

const CalendarView = {
  render(container) {
    const events = window.MOCK_DATA.calendarEvents;
    const days = ['Mon, Nov 17', 'Tue, Nov 18', 'Wed, Nov 19', 'Thu, Nov 20', 'Fri, Nov 21', 'Sat, Nov 22', 'Sun, Nov 23'];

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <!-- Top Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white">Content Calendar & Schedule</h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Automated distribution schedule across X, LinkedIn, TikTok, and Substack.</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="Utils.showToast('Schedule modal opened', 'info')" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all">
              <i data-lucide="plus" class="w-4 h-4"></i> Schedule Post
            </button>
          </div>
        </div>

        <!-- Weekly Grid Header -->
        <div class="grid grid-cols-1 md:grid-cols-7 gap-3">
          ${days.map(day => `
            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span class="text-xs font-bold text-slate-300 block">${day}</span>
            </div>
          `).join('')}
        </div>

        <!-- Calendar Events List -->
        <div class="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <i data-lucide="clock" class="w-4 h-4 text-indigo-400"></i> Upcoming Queue Items
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${events.map(ev => {
              const platformConfig = window.APP_CONFIG.platforms.find(p => p.id === ev.platform) || {};
              return `
                <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold" style="background-color: ${platformConfig.color || '#6366f1'}20; color: ${platformConfig.color || '#6366f1'}">
                      <i data-lucide="${platformConfig.icon || 'share-2'}" class="w-3.5 h-3.5"></i>
                      ${platformConfig.name || ev.platform}
                    </span>
                    <span class="text-[10px] px-2 py-0.5 rounded font-bold ${ev.status === 'Scheduled' ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30' : ev.status === 'Published' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}">
                      ${ev.status}
                    </span>
                  </div>

                  <div>
                    <h4 class="text-xs font-bold text-white line-clamp-2">${ev.title}</h4>
                    <p class="text-[11px] text-slate-400 mt-1">${ev.date} at ${ev.time}</p>
                  </div>

                  <div class="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <button onclick="App.openCampaignDetails('${ev.campaignId}')" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                      Inspect Content
                    </button>
                    <button onclick="Utils.showToast('Post schedule updated', 'success')" class="text-slate-400 hover:text-white">
                      <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }
};

window.CalendarView = CalendarView;
