/**
 * OmniPulse AI - Utility Functions & UI Helpers
 */

const Utils = {
  /**
   * Shows a floating toast notification
   * @param {string} message 
   * @param {'success'|'info'|'warning'|'error'} type 
   * @param {number} duration 
   */
  showToast(message, type = 'success', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const colorMap = {
      success: 'border-emerald-500/40 bg-slate-900/95 text-emerald-300 shadow-emerald-950/50',
      info: 'border-indigo-500/40 bg-slate-900/95 text-indigo-300 shadow-indigo-950/50',
      warning: 'border-amber-500/40 bg-slate-900/95 text-amber-300 shadow-amber-950/50',
      error: 'border-rose-500/40 bg-slate-900/95 text-rose-300 shadow-rose-950/50'
    };

    const iconMap = {
      success: '<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>',
      info: '<i data-lucide="info" class="w-5 h-5 text-indigo-400"></i>',
      warning: '<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-400"></i>',
      error: '<i data-lucide="x-circle" class="w-5 h-5 text-rose-400"></i>'
    };

    toast.className = `toast-enter pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 ${colorMap[type] || colorMap.info}`;
    toast.innerHTML = `
      <div class="shrink-0">${iconMap[type] || iconMap.info}</div>
      <div class="text-sm font-medium text-slate-100">${message}</div>
      <button class="ml-2 text-slate-400 hover:text-white" onclick="this.parentElement.remove()">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    `;

    container.appendChild(toast);
    if (window.lucide) {
      window.lucide.createIcons({ root: toast });
    }

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Copies text to clipboard and displays toast
   * @param {string} text 
   * @param {string} successMsg 
   */
  async copyToClipboard(text, successMsg = 'Copied to clipboard!') {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast(successMsg, 'success');
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast(successMsg, 'success');
    }
  },

  /**
   * Format ISO date string into readable format
   * @param {string} isoString 
   */
  formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  },

  /**
   * Returns Tailwind badge style for viral score
   * @param {number} score 
   */
  getViralScoreBadge(score) {
    if (score >= 90) {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        <i data-lucide="zap" class="w-3 h-3 text-emerald-400"></i> ${score}/100 Viral
      </span>`;
    }
    if (score >= 80) {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
        <i data-lucide="trending-up" class="w-3 h-3 text-indigo-400"></i> ${score}/100 High
      </span>`;
    }
    return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
      <i data-lucide="activity" class="w-3 h-3 text-amber-400"></i> ${score}/100 Good
    </span>`;
  },

  /**
   * Safe text truncation
   */
  truncate(text, length = 120) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
};

window.Utils = Utils;
