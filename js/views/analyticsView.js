/**
 * OmniPulse AI - Analytics & Growth Hub View
 */

const AnalyticsView = {
  render(container) {
    const analytics = window.MOCK_DATA.analytics;

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <!-- Top Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white">Growth & Performance Analytics</h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Multi-channel impression velocity, audience conversion, and viral score benchmarks.</p>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold">
              Last 30 Days
            </span>
          </div>
        </div>

        <!-- Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="glass-card rounded-2xl p-5 border border-white/5">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Impressions</span>
            <div class="mt-2 text-2xl font-bold text-white">284,500</div>
            <p class="text-xs text-emerald-400 mt-1 flex items-center">
              <i data-lucide="trending-up" class="w-3.5 h-3.5 mr-1"></i> +44% vs previous month
            </p>
          </div>

          <div class="glass-card rounded-2xl p-5 border border-white/5">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Repurposing Velocity</span>
            <div class="mt-2 text-2xl font-bold text-white">4.8x</div>
            <p class="text-xs text-purple-400 mt-1">1 piece -> 10 assets</p>
          </div>

          <div class="glass-card rounded-2xl p-5 border border-white/5">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Dwell Engagement</span>
            <div class="mt-2 text-2xl font-bold text-white">6.8%</div>
            <p class="text-xs text-indigo-400 mt-1">Industry avg is 2.1%</p>
          </div>

          <div class="glass-card rounded-2xl p-5 border border-white/5">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly Hours Saved</span>
            <div class="mt-2 text-2xl font-bold text-white">46.5 Hours</div>
            <p class="text-xs text-emerald-400 mt-1">$3,700 labor equivalent</p>
          </div>
        </div>

        <!-- Platform Breakdown & Leaderboard -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Channel Breakdown Bars -->
          <div class="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i data-lucide="pie-chart" class="w-4 h-4 text-indigo-400"></i> Platform Distribution
            </h3>

            <div class="space-y-4 pt-2">
              ${analytics.platformDistribution.map(item => `
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-slate-200 flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${item.color}"></span>
                      ${item.name}
                    </span>
                    <span class="text-slate-400">${item.count} (${item.share}%)</span>
                  </div>
                  <div class="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div class="h-full rounded-full" style="width: ${item.share}%; background-color: ${item.color}"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Top Performing Content Leaderboard -->
          <div class="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i data-lucide="trophy" class="w-4 h-4 text-amber-400"></i> Top Converting Assets
            </h3>

            <div class="space-y-3">
              ${analytics.recentConversions.map((conv, idx) => `
                <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <span class="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-xs flex items-center justify-center">
                      #${idx + 1}
                    </span>
                    <div>
                      <h4 class="text-xs font-bold text-white">${conv.campaign}</h4>
                      <p class="text-[11px] text-slate-400">${conv.views} views • ${conv.engagement} engagement</p>
                    </div>
                  </div>
                  ${Utils.getViralScoreBadge(conv.viralScore)}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }
};

window.AnalyticsView = AnalyticsView;
