/**
 * OmniPulse AI - Flagship Repurposing Studio View
 */

const StudioView = {
  currentTab: 'twitter',
  activeCampaign: null,
  isProcessing: false,

  render(container, options = {}) {
    this.container = container;
    if (!this.activeCampaign) {
      this.activeCampaign = JSON.parse(JSON.stringify(window.MOCK_DATA.campaigns[0]));
    }

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <!-- Top Studio Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-indicator"></span>
              <h2 class="text-xl sm:text-2xl font-bold text-white">AI Repurpose Studio</h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                Multi-Model v2.4
              </span>
            </div>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Transform long-form video, podcasts, and articles into 10 multi-channel growth assets.</p>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400">Monthly Credits: <strong id="studio-credit-count" class="text-indigo-400">${window.APP_CONFIG.credits.remaining} / ${window.APP_CONFIG.credits.total}</strong></span>
            <button onclick="App.navigate('billing')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors">
              Upgrade
            </button>
          </div>
        </div>

        <div id="studio-main-grid" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left Column: Source Input & Parameters (5 cols) -->
          <div id="studio-input-col" class="lg:col-span-5 space-y-6"></div>

          <!-- Right Column: Multi-Channel Generated Outputs (7 cols) -->
          <div id="studio-output-col" class="lg:col-span-7"></div>
        </div>
      </div>
    `;

    this.renderInputColumn(options);
    this.renderOutputColumn();
  },

  renderInputColumn(options = {}) {
    const inputCol = document.getElementById('studio-input-col');
    if (!inputCol) return;

    const savedKey = window.AIService ? window.AIService.getApiKey() : '';

    inputCol.innerHTML = `
      <!-- User BYOK Gemini API Key Card -->
      <div class="glass-panel rounded-2xl p-4 border border-white/10 shadow-lg space-y-2.5">
        <div class="flex items-center justify-between">
          <label for="studio-gemini-key" class="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <i data-lucide="key-round" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>Your Gemini API Key (Stored Locally)</span>
          </label>
          <span class="text-[10px] ${savedKey ? 'text-emerald-400' : 'text-amber-300'} font-semibold">
            ${savedKey ? 'Saved in Browser' : 'Key Required'}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <input
            type="password"
            id="studio-gemini-key"
            value="${savedKey}"
            placeholder="AIzaSy..."
            class="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onclick="StudioView.saveUserApiKey()"
            class="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shrink-0"
          >
            Save Key
          </button>
        </div>
        <p class="text-[11px] text-slate-400">
          Each user brings their own API key; it stays in your browser's localStorage and is never uploaded to GitHub.
        </p>
      </div>

      <div class="glass-panel rounded-2xl p-6 border border-white/10 shadow-xl space-y-5">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <i data-lucide="sparkles" class="w-4 h-4 text-indigo-400"></i> Source Ingestion
          </h3>
          <span class="text-xs text-indigo-300 font-medium">Step 1 of 2</span>
        </div>

        ${this.getSourceTabsHTML(options)}
        ${this.getFormControlsHTML()}

        <!-- Action Button -->
        <div class="pt-2">
          <button 
            id="btn-generate-campaign" 
            onclick="StudioView.startGeneration()" 
            class="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <i data-lucide="zap" class="w-4 h-4"></i>
            <span>Repurpose Now (1 Credit)</span>
          </button>
        </div>

        <!-- AI Generation Progress Bar -->
        <div id="ai-progress-box" class="hidden p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span id="ai-progress-text" class="font-medium text-indigo-300 flex items-center gap-1.5">
              <i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i> Generating content with Gemini...
            </span>
            <span id="ai-progress-percent" class="font-bold text-white">40%</span>
          </div>
          <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div id="ai-progress-bar" class="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300" style="width: 40%"></div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: inputCol });
    }
  },

  saveUserApiKey() {
    const input = document.getElementById('studio-gemini-key');
    if (!input || !window.AIService) return;
    window.AIService.setApiKey(input.value);
    if (window.Utils && typeof window.Utils.showToast === 'function') {
      window.Utils.showToast(
        input.value.trim() ? 'Gemini API key saved locally!' : 'API key cleared.',
        'success'
      );
    }
    this.renderInputColumn();
  },

  getSourceTabsHTML(options = {}) {
    const prefill = options.prefillUrl || '';
    const camp = this.activeCampaign;
    return `
      <div class="grid grid-cols-3 gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
        <button id="src-tab-url" onclick="StudioView.switchSourceTab('url')" class="py-2 text-xs font-semibold rounded-lg transition-all bg-indigo-600 text-white shadow">
          URL / Link
        </button>
        <button id="src-tab-file" onclick="StudioView.switchSourceTab('file')" class="py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition-all">
          Audio / PDF
        </button>
        <button id="src-tab-text" onclick="StudioView.switchSourceTab('text')" class="py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition-all">
          Raw Text
        </button>
      </div>

      <div id="src-content-url" class="space-y-2.5">
        <label class="block text-xs font-semibold text-slate-300">YouTube, Loom, or Podcast URL</label>
        <div class="relative">
          <i data-lucide="youtube" class="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
          <input 
            type="text" 
            id="studio-source-url" 
            value="${prefill || (camp ? camp.sourceUrl : '')}" 
            placeholder="https://www.youtube.com/watch?v=..." 
            class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div id="src-content-file" class="hidden space-y-2.5">
        <label class="block text-xs font-semibold text-slate-300">Upload Media or File</label>
        <div class="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-900/50">
          <i data-lucide="upload-cloud" class="w-6 h-6 text-indigo-400 mx-auto mb-1"></i>
          <p class="text-xs text-slate-300 font-medium">Click to upload or drag & drop</p>
          <p class="text-[10px] text-slate-400 mt-0.5">MP3, WAV, PDF, DOCX (Max 250MB)</p>
        </div>
      </div>

      <div id="src-content-text" class="hidden space-y-2.5">
        <label class="block text-xs font-semibold text-slate-300">Paste Notes or Draft</label>
        <textarea 
          id="studio-source-text" 
          rows="3" 
          placeholder="Paste raw transcript or notes..." 
          class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        ></textarea>
      </div>
    `;
  },

  getFormControlsHTML() {
    const voices = window.MOCK_DATA.brandVoices;
    const camp = this.activeCampaign;

    return `
      <div class="space-y-1.5">
        <label class="block text-xs font-semibold text-slate-300">Campaign Title or Focus Angle</label>
        <input 
          type="text" 
          id="studio-source-title" 
          value="${camp ? camp.title : ''}" 
          placeholder="e.g. 5 Lessons from Building Autonomous AI SaaS" 
          class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div class="space-y-1.5">
        <label class="block text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Target Brand Voice</span>
          <span onclick="App.navigate('brand-voice')" class="text-[11px] text-indigo-400 hover:underline cursor-pointer">Configure</span>
        </label>
        <select id="studio-brand-voice" class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
          ${voices.map(v => `<option value="${v.name}">${v.name} (${v.badge})</option>`).join('')}
        </select>
      </div>
    `;
  },

  switchSourceTab(tab) {
    ['url', 'file', 'text'].forEach(t => {
      const btn = document.getElementById(`src-tab-${t}`);
      const content = document.getElementById(`src-content-${t}`);
      if (t === tab) {
        if (btn) btn.className = 'py-2 text-xs font-semibold rounded-lg transition-all bg-indigo-600 text-white shadow';
        if (content) content.classList.remove('hidden');
      } else {
        if (btn) btn.className = 'py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition-all';
        if (content) content.classList.add('hidden');
      }
    });
  },

  renderOutputColumn() {
    const outputCol = document.getElementById('studio-output-col');
    if (!outputCol) return;

    const camp = this.activeCampaign;
    if (!camp) {
      outputCol.innerHTML = `<div class="glass-panel rounded-2xl p-8 text-center text-slate-400">No active campaign selected.</div>`;
      return;
    }

    const platforms = window.APP_CONFIG.platforms;

    outputCol.innerHTML = `
      <div class="glass-panel rounded-2xl p-6 border border-white/10 shadow-xl space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <span class="text-xs text-indigo-300 font-medium">Step 2 of 2</span>
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i data-lucide="layout" class="w-4 h-4 text-purple-400"></i> Generated Omni-Channel Assets
            </h3>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button onclick="StudioView.copyCurrentOutput()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors">
              <i data-lucide="copy" class="w-3.5 h-3.5 text-indigo-400"></i> Copy Format
            </button>
            <button onclick="StudioView.saveCampaign()" class="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5 transition-colors">
              <i data-lucide="bookmark" class="w-3.5 h-3.5"></i> Save Asset
            </button>
            <button onclick="App.scheduleModal('${camp.id}', StudioView.currentTab)" class="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5 transition-colors">
              <i data-lucide="calendar" class="w-3.5 h-3.5"></i> Schedule
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-white/5">
          ${platforms.map(p => `
            <button 
              id="out-tab-${p.id}" 
              onclick="StudioView.switchOutputTab('${p.id}')" 
              class="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${p.id === this.currentTab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'}"
            >
              <i data-lucide="${p.icon}" class="w-3.5 h-3.5"></i>
              <span>${p.name}</span>
            </button>
          `).join('')}
        </div>

        <div id="output-content-area" class="space-y-4"></div>
      </div>
    `;

    this.renderCurrentPlatformOutput();

    if (window.lucide) {
      window.lucide.createIcons({ root: outputCol });
    }
  },

  switchOutputTab(platformId) {
    this.currentTab = platformId;
    window.APP_CONFIG.platforms.forEach(p => {
      const btn = document.getElementById(`out-tab-${p.id}`);
      if (btn) {
        if (p.id === platformId) {
          btn.className = 'px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-600/30';
        } else {
          btn.className = 'px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800';
        }
      }
    });
    this.renderCurrentPlatformOutput();
  },

  renderCurrentPlatformOutput() {
    const area = document.getElementById('output-content-area');
    if (!area || !this.activeCampaign) return;

    const outputs = this.activeCampaign.outputs || {};
    const platform = this.currentTab;

    if (platform === 'twitter') {
      const tweets = Array.isArray(outputs.twitter) ? outputs.twitter : [];
      area.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>Thread (${tweets.length} Tweets Generated)</span>
            <span class="text-indigo-400 font-medium">Ready to Publish</span>
          </div>

          ${tweets.map((tweetText, idx) => `
            <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-slate-300 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px]">
                    ${idx + 1}
                  </span>
                  Tweet ${idx + 1} of ${tweets.length}
                </span>
                <span class="text-[11px] text-slate-500">${String(tweetText).length} / 280</span>
              </div>
              <textarea 
                rows="3" 
                class="w-full bg-slate-950/60 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none font-sans"
              >${tweetText}</textarea>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      const content = outputs[platform] || 'No content generated for this format yet.';
      area.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span class="capitalize">${platform} Output</span>
            <span class="text-slate-500">${typeof content === 'string' ? content.length : 0} characters</span>
          </div>
          <textarea 
            id="active-output-textarea"
            rows="14" 
            class="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 custom-editor-box font-mono"
          >${typeof content === 'string' ? content : JSON.stringify(content, null, 2)}</textarea>
        </div>
      `;
    }

    if (window.lucide) {
      window.lucide.createIcons({ root: area });
    }
  },

  async startGeneration() {
    if (this.isProcessing) return;

    const keyInputVal = document.getElementById('studio-gemini-key')?.value || '';
    if (keyInputVal.trim() && window.AIService) {
      window.AIService.setApiKey(keyInputVal.trim());
    }

    if (!window.AIService || !window.AIService.hasApiKey()) {
      alert('Pehle apni Gemini API Key enter kar ke "Save Key" par click karein.');
      return;
    }

    this.isProcessing = true;
    const titleVal = document.getElementById('studio-source-title')?.value.trim() || 'New Repurposed Campaign';
    const sourceUrl = document.getElementById('studio-source-url')?.value.trim() || '';
    const sourceText = document.getElementById('studio-source-text')?.value.trim() || '';
    const voiceVal = document.getElementById('studio-brand-voice')?.value || 'Tech Founder';

    const btn = document.getElementById('btn-generate-campaign');
    const progressBox = document.getElementById('ai-progress-box');
    const progressText = document.getElementById('ai-progress-text');
    const progressPercent = document.getElementById('ai-progress-percent');
    const progressBar = document.getElementById('ai-progress-bar');

    if (btn) {
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    if (progressBox) progressBox.classList.remove('hidden');
    if (progressText) progressText.innerHTML = `<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i> Calling Gemini API...`;
    if (progressPercent) progressPercent.innerText = '50%';
    if (progressBar) progressBar.style.width = '50%';
    if (window.lucide && progressBox) window.lucide.createIcons({ root: progressBox });

    try {
      const generatedOutputs = await window.AIService.generateRepurposedAssets({
        title: titleVal,
        sourceUrl,
        sourceText,
        brandVoice: voiceVal
      });

      if (window.APP_CONFIG && window.APP_CONFIG.credits) {
        window.APP_CONFIG.credits.used += 1;
        window.APP_CONFIG.credits.remaining = Math.max(0, window.APP_CONFIG.credits.remaining - 1);
      }
      if (window.App && typeof window.App.updateCreditDisplay === 'function') {
        window.App.updateCreditDisplay();
      }

      const newCamp = {
        id: 'camp-' + Date.now(),
        title: titleVal,
        sourceType: 'Gemini AI Generation',
        sourceUrl,
        sourceSummary: `Generated with Gemini using ${voiceVal} voice.`,
        createdAt: new Date().toISOString(),
        brandVoice: voiceVal,
        outputs: generatedOutputs
      };

      window.MOCK_DATA.campaigns.unshift(newCamp);
      this.activeCampaign = newCamp;

      if (progressPercent) progressPercent.innerText = '100%';
      if (progressBar) progressBar.style.width = '100%';

      if (window.Utils && typeof window.Utils.showToast === 'function') {
        window.Utils.showToast('AI content generated successfully!', 'success');
      }
      this.renderOutputColumn();
    } catch (err) {
      alert(`API Error: ${err.message}`);
    } finally {
      this.isProcessing = false;
      if (btn) {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
      if (progressBox) progressBox.classList.add('hidden');
      if (progressBar) progressBar.style.width = '25%';
    }
  }
};

window.StudioView = StudioView;