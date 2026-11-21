/**
 * OmniPulse AI - Billing & Subscription Plans View
 */

const BillingView = {
  isAnnual: false,

  render(container) {
    const plans = window.APP_CONFIG.pricingPlans;
    const credits = window.APP_CONFIG.credits;

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white">Billing & Subscription Plans</h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Manage your plan, team seats, credit quota, and invoices.</p>
          </div>

          <div class="inline-flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button onclick="BillingView.toggleCycle(false)" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${!this.isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}">
              Monthly
            </button>
            <button onclick="BillingView.toggleCycle(true)" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${this.isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}">
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div class="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Active Subscription</span>
              <h3 class="text-lg font-bold text-white mt-0.5">Creator Pro Tier ($79/mo)</h3>
            </div>
            <div class="text-xs text-slate-400">
              Resets in <strong class="text-white">${credits.resetsInDays} days</strong>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300 font-medium">Repurpose Credits Usage:</span>
              <span class="font-bold text-white">${credits.used} / ${credits.total} Credits (${credits.remaining} remaining)</span>
            </div>
            <div class="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" style="width: ${(credits.used / credits.total) * 100}%"></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${plans.map(plan => {
            const price = this.isAnnual ? plan.priceAnnual : plan.priceMonthly;
            const isCurrent = plan.id === 'pro';

            return `
              <div class="glass-card rounded-2xl p-6 border ${plan.popular ? 'border-indigo-500/50 shadow-xl shadow-indigo-500/10' : 'border-white/5'} flex flex-col justify-between space-y-5 relative overflow-hidden">
                <div class="space-y-3">
                  <div>
                    <h4 class="text-lg font-bold text-white">${plan.name}</h4>
                    <p class="text-xs text-slate-400 mt-0.5">${plan.desc}</p>
                  </div>

                  <div class="flex items-baseline gap-1">
                    <span class="text-3xl font-extrabold text-white">$${price}</span>
                    <span class="text-xs text-slate-400">/ mo</span>
                  </div>

                  <div class="space-y-2 pt-3 border-t border-white/5 text-xs">
                    ${plan.features.map(f => `
                      <div class="flex items-center gap-2 text-slate-300">
                        <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0"></i>
                        <span>${f}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <button 
                  onclick="BillingView.selectPlan('${plan.id}')" 
                  class="w-full py-2.5 rounded-xl font-semibold text-xs transition-all ${isCurrent ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'}"
                >
                  ${isCurrent ? 'Current Active Plan' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  toggleCycle(isAnn) {
    this.isAnnual = isAnn;
    this.render(document.getElementById('app-main-content'));
  },

  selectPlan(planId) {
    if (planId === 'pro') {
      Utils.showToast('You are currently on the Creator Pro plan', 'info');
      return;
    }
    Utils.showToast(`Redirecting to Stripe Checkout for ${planId.toUpperCase()}...`, 'success');
  }
};

window.BillingView = BillingView;
