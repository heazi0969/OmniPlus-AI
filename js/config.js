/**
 * OmniPulse AI - Configuration & App Constants
 */
const APP_CONFIG = {
  name: 'OmniPulse AI',
  tagline: 'Next-Gen Content Repurposing & Multi-Channel Growth Engine',
  version: '2.4.0',
  currentPlan: 'Creator Pro',
  credits: {
    total: 120,
    used: 84,
    remaining: 36,
    resetsInDays: 9
  },
  platforms: [
    { id: 'twitter', name: 'X / Twitter', icon: 'twitter', color: '#1DA1F2', badge: 'Thread (5-7 Tweets)' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2', badge: 'Authority Post / Carousel' },
    { id: 'shorts', name: 'Reels & TikTok', icon: 'video', color: '#FE2C55', badge: 'Viral 60s Script' },
    { id: 'newsletter', name: 'Email Newsletter', icon: 'mail', color: '#10B981', badge: 'Substack / Beehiiv Issue' },
    { id: 'blog', name: 'SEO Blog Post', icon: 'file-text', color: '#F59E0B', badge: 'H2/H3 Long-form' }
  ],
  tones: [
    { id: 'founder', name: 'Authoritative & Data-Driven', desc: 'Direct, no-fluff, strategic metrics' },
    { id: 'viral', name: 'Viral & Punchy', desc: 'Hook-heavy, short sentences, high engagement' },
    { id: 'storyteller', name: 'Narrative Storytelling', desc: 'Emotional journey, personal lessons' },
    { id: 'educational', name: 'Step-by-Step Educational', desc: 'How-to guides, frameworks, checklists' }
  ],
  pricingPlans: [
    {
      id: 'starter',
      name: 'Starter',
      priceMonthly: 29,
      priceAnnual: 24,
      desc: 'Ideal for solo creators and indie hackers starting their multi-channel presence.',
      features: [
        '30 Repurpose Credits / month',
        '1 Custom Brand Voice',
        'Text & Blog Ingestion',
        'X Thread & LinkedIn Outputs',
        'Standard Generation Speed',
        'Community Support'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Creator Pro',
      priceMonthly: 79,
      priceAnnual: 64,
      desc: 'Everything you need to run an automated viral content studio with multi-modal inputs.',
      features: [
        '120 Repurpose Credits / month',
        '5 Custom Brand Voices',
        'YouTube URL & Podcast Audio Ingestion',
        'All 5 Output Formats (Video Scripts & Newsletters)',
        'Content Calendar & Visual Scheduler',
        'Priority Claude 3.7 / GPT-4o Engine',
        'Priority 24/7 Support'
      ],
      popular: true
    },
    {
      id: 'agency',
      name: 'Agency Scale',
      priceMonthly: 199,
      priceAnnual: 169,
      desc: 'For high-velocity marketing agencies, growth consultancies, and multi-brand teams.',
      features: [
        'Unlimited Repurpose Credits',
        '25 Custom Brand Voices',
        'Client Workspaces & Team Seats (10 Seats)',
        'White-label PDF & Markdown Exports',
        'Zapier & Make.com Webhook Automation',
        'Dedicated Account Manager'
      ],
      popular: false
    }
  ]
};

window.APP_CONFIG = APP_CONFIG;
