/**
 * OmniPulse AI - Brand Voices & Personas View
 */

const BrandVoiceView = {
  render(container) {
    const voices = window.MOCK_DATA.brandVoices;

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <!-- Top Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white">Brand Voices & AI Personas</h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Train OmniPulse AI to match your exact tone of voice, jargon, and formatting style.</p>
          </div>

          <button onclick="BrandVoiceView.openCreateModal()" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-all shrink-0">
            <i data-lucide="plus" class="w-4 h-4"></i> Create Brand Persona
          </button>
        </div>

        <!-- Personas Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${voices.map(voice => `
            <div class="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between space-y-4 hover:border-indigo-500/30 transition-all">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <i data-lucide="mic" class="w-4 h-4"></i>
                  </span>
                  <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    ${voice.badge}
                  </span>
                </div>

                <div>
                  <h3 class="text-base font-bold text-white">${voice.name}</h3>
                  <p class="text-xs text-indigo-300 font-medium mt-0.5">${voice.tone}</p>
                </div>

                <div class="space-y-2 text-xs">
                  <div>
                    <span class="text-slate-400 font-semibold block text-[11px]">Key Vocabulary:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      ${voice.vocabulary.map(w => `<span class="px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800 text-[10px]">${w}</span>`).join('')}
                    </div>
                  </div>

                  <div>
                    <span class="text-slate-400 font-semibold block text-[11px]">Target Audience:</span>
                    <p class="text-slate-300 text-[11px]">${voice.targetAudience}</p>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <button onclick="Utils.showToast('Voice set as default', 'success')" class="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                  Set as Active
                </button>
                <button onclick="Utils.showToast('Voice configuration opened', 'info')" class="text-slate-400 hover:text-white">
                  <i data-lucide="settings" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  openCreateModal() {
    Utils.showToast('Custom Brand Voice Builder initialized', 'info');
  }
};

window.BrandVoiceView = BrandVoiceView;
