/**
 * OmniPulse AI - Mock Data & Preloaded Content
 */
const MOCK_DATA = {
  stats: {
    totalRepurposed: 142,
    timeSavedHours: 46.5,
    estimatedReach: '284.5K',
    avgViralScore: 92,
    postsPublished: 88,
    activeVoices: 3
  },

  brandVoices: [
    {
      id: 'voice-1',
      name: 'Tech Founder & Builder',
      badge: 'Active Default',
      tone: 'Direct, analytical, honest, anti-hype',
      vocabulary: ['first-principles', 'unit economics', 'flywheel', 'traction', 'bottleneck'],
      forbidden: ['synergy', 'game-changer', 'revolutionary', 'unlocking'],
      targetAudience: 'Software founders, technical leaders, builders',
      sampleHook: 'Most SaaS products fail not because of bad code, but because of invisible distribution debt. Here is the teardown:'
    },
    {
      id: 'voice-2',
      name: 'Growth & Marketing Strategist',
      badge: 'B2B Social',
      tone: 'Energetic, actionable, bullet-driven, tactical',
      vocabulary: ['conversion rate', 'funnel', 'CAC:LTV', 'playbook', 'retention hook'],
      forbidden: ['delighted', 'paradigm shift', 'pleased to announce'],
      targetAudience: 'CMOs, solo marketers, agency operators',
      sampleHook: 'Stop spending $5k/mo on ads before you nail this 3-step organic repurposing loop:'
    },
    {
      id: 'voice-3',
      name: 'Executive Thought Leader',
      badge: 'Enterprise',
      tone: 'Authoritative, strategic, calm, visionary',
      vocabulary: ['macroeconomic', 'sustainable advantage', 'governance', 'leverage'],
      forbidden: ['growth hack', 'secret trick', 'crushing it'],
      targetAudience: 'VPs, C-suite executives, investors',
      sampleHook: 'The companies winning in 2026 are not hiring more headcount; they are embedding autonomous AI into their core operations.'
    }
  ],

  campaigns: [
    {
      id: 'camp-1',
      title: 'The 2026 Micro-SaaS Playbook: From Zero to $50k MRR with Autonomous AI Agents',
      sourceType: 'YouTube Video',
      sourceUrl: 'https://youtube.com/watch?v=micro-saas-agents-2026',
      sourceSummary: 'In-depth 45-minute breakdown on how solo founders use autonomous coding and marketing agents to build lean SaaS companies with 90%+ margins.',
      createdAt: '2026-11-15T14:30:00Z',
      brandVoice: 'Tech Founder & Builder',
      viralScore: 96,
      outputs: {
        twitter: [
          '1/5 In 2024, building a $50k MRR SaaS required 4 engineers, 2 marketers, and $500k in seed funding.\n\nIn 2026, it takes 1 solo builder and 4 autonomous AI workflows.\n\nHere is the exact playbook to do it with zero fluff 🧵👇',
          '2/5 Step 1: Invert Product Development.\n\nOld way: Spend 3 months coding an MVP before talking to a customer.\n\nNew way: Launch an interactive prototype in 48h. Pre-sell 10 annual licenses. If nobody pays, kill the idea on Sunday night.',
          '3/5 Step 2: Content Repurposing as your Primary Moat.\n\nCode is cheap; attention is expensive.\n\nEvery time you ship a feature, document it on video. Use OmniPulse to fan it out into 10 platform-tailored assets.\n\nOne 10-minute Loom = 1 X thread + 1 LinkedIn post + 2 TikTok hooks + 1 newsletter dispatch.',
          '4/5 Step 3: Ruthless Tech Stack Simplicity.\n\n- Frontend: Tailwind + Vanilla/React on Cloudflare Pages\n- Database: Supabase / Turso Edge Postgres\n- Payments: Stripe / Lemon Squeezy\n\nTotal monthly infra cost: <$65.',
          '5/5 Step 4: Price for Value.\n\nNever price at $9/mo unless you have 1M users. Anchor at $49/mo minimum. Higher price points attract serious buyers who actively use the tool.\n\nBookmark this thread if you are building this weekend 🚀'
        ],
        linkedin: `Most founders believe you need a 10-person team to reach $50,000/month in SaaS revenue.

That used to be true. In 2026, it is an outdated myth.

Here is what the modern "One-Person AI Unicorn" model actually looks like:

1. Asymmetric Leverage over Headcount
Instead of hiring specialists for every vertical, top founders build autonomous agent workflows for code refactoring, user onboarding triage, and multi-channel content distribution.

2. Distribution-First Architecture
You don't build first and market later. You build distribution channels (LinkedIn, X, specialized newsletters) simultaneously while validating demand through interactive prototypes.

3. Ruthless Tech Stack Simplicity
Edge functions, serverless Postgres, and clean HTML/Tailwind frontend deliver 99.9% uptime with near-zero maintenance overhead.

4. High-Touch Customer Intimacy
When AI handles repetitive boilerplate, you have 20 hours a week to talk directly to your 50 highest-paying accounts.

The competitive advantage of tomorrow is having the highest output-per-human through intelligent automation.

Are you building solo or with a team this year? Let's discuss in the comments below.

#SaaS #MicroSaaS #ArtificialIntelligence #Startups #Entrepreneurship`,
        shorts: `[HOOK - 00:00 to 00:03]
(Fast zoom in, holding phone showing revenue dashboard)
"If you are still trying to raise venture capital to build software in 2026, stop. You are doing it backwards."

[PROBLEM - 00:03 to 00:15]
"Two years ago, building a tool that makes $50,000 a month required hiring 5 engineers and burning through cash. Today, 1 solo founder using AI agents can deploy and validate a micro-SaaS in under a single weekend."

[THE 3-STEP FORMULA - 00:15 to 00:45]
"Step 1: Never write code without pre-orders. Put up an interactive demo, get 10 paid pre-orders first.
Step 2: Automate your distribution. Take one 5-minute video and turn it into 10 multi-platform posts using autonomous repurposing.
Step 3: Price for value. Charge $49 to $99 a month to businesses who have an urgent burning problem."

[CALL TO ACTION - 00:45 to 00:60]
"Comment 'PLAYBOOK' below and I will send you the complete step-by-step PDF breakdown for free!"`,
        newsletter: `SUBJECT: The "One-Person Unicorn" SaaS Formula (Teardown)
PREVIEW: How solo builders hit $50k MRR with autonomous agent workflows...

Hey {{FirstName}},

There is a seismic shift happening across the software industry right now.

Over the past 6 months, we analyzed 25 solo founders who crossed $500,000 in Annual Recurring Revenue. None of them have a single full-time employee.

Here are the 3 structural advantages they have over traditional startups:
1. Near-Zero Capital Burn (infra cost <$150/mo)
2. 48-Hour Iteration Cycles powered by AI engineering
3. Autonomous Content Syndication across X, LinkedIn, and video

Action Item for this week:
Pick ONE repetitive task in your weekly workflow—whether it is customer onboarding emails or content distribution—and automate it completely with an AI pipeline.

Best,
The OmniPulse AI Team`,
        blog: `# The 2026 Micro-SaaS Playbook: Scaling to $50k MRR with Autonomous AI Workflows

*Meta Description: Discover how modern solo software founders hit $50k MRR using autonomous AI agents, lean architectures, and automated distribution systems.*

## Introduction: The Death of the Bloated Startup

The traditional venture-backed software playbook was built for an era where building code was the primary bottleneck. Today, with state-of-the-art LLMs, automated testing suites, and AI code generation, code has become abundant.

The real bottleneck in 2026 is **Distribution and Customer Retention**.

## 1. Validating Demand Before Writing a Single Line of Code
Successful micro-SaaS operators follow the Rule of 10: Reach out to 50 target ICPs, secure 10 pre-orders before writing code.

## 2. Autonomous Content Distribution
Every product release must generate 10+ social assets automatically to fuel inbound discovery.`
      }
    },
    {
      id: 'camp-2',
      title: 'Deep Dive: How Multi-Agent Workflows Outperform Traditional LLM Chains',
      sourceType: 'PDF Whitepaper',
      sourceUrl: 'ai-agents-benchmark-whitepaper.pdf',
      sourceSummary: 'Empirical benchmark comparing zero-shot prompt pipelines vs autonomous multi-agent consensus loops for enterprise tasks.',
      createdAt: '2026-11-12T09:15:00Z',
      brandVoice: 'Executive Thought Leader',
      viralScore: 91,
      outputs: {
        twitter: [
          '1/5 Prompt engineering is hitting an asymptotic plateau.\n\nIf you are still chaining single prompts in 2026, you are losing up to 42% in reasoning accuracy.\n\nHere is what our empirical benchmark of 100,000 enterprise queries revealed 🧵👇',
          '2/5 In our latest whitepaper, we benchmarked 3 architectures:\n1. Zero-shot / Few-shot prompt chains\n2. Sequential pipeline orchestration\n3. Autonomous multi-agent consensus networks (Planner + Critic + Executor)',
          '3/5 The results were staggering:\n- Multi-agent networks reduced hallucinations by 68%\n- Edge-case recovery improved from 51% to 94%\n- Token cost increased by only 1.4x due to semantic caching',
          '4/5 The breakthrough is "Adversarial Reflection":\nWhen you assign an explicit Critic agent whose only goal is falsifying output, system accuracy jumps instantly.',
          '5/5 Architecture beats model size.\nA coordinated swarm of specialized models consistently outperforms a monolithic mega-model.\n\nRead the full benchmark whitepaper in the link below 👇'
        ],
        linkedin: `Prompt engineering had its moment in 2023. In 2026, enterprise architecture has shifted to Multi-Agent Consensus Swarms.

Our research team analyzed over 100,000 enterprise queries across financial modeling and compliance.

Key executive findings:
1. Monolithic Prompts Fail Complex Logic (accuracy drops below 60% on 20+ constraint rules)
2. Adversarial Reflection cuts hallucinations by 68%
3. Tiered Intelligence reduces inference bills by 55%

CTOs: Stop looking for the magical prompt. Start building specialized multi-agent verification pipelines.

#EnterpriseAI #TechLeadership #SoftwareArchitecture #MachineLearning`,
        shorts: `[HOOK - 00:00 to 00:03]
"Prompt Engineering is officially dead. Here is what is replacing it right now."

[EXPLANATION - 00:03 to 00:25]
"A new study tested 100,000 queries and showed that single-prompt chains fail 40% of the time. But when you use 3 AI agents that cross-examine each other—an Architect, a Builder, and a Critic—accuracy skyrockets to 96%."

[CTA - 00:25 to 00:45]
"Follow for more AI engineering breakdowns you can deploy today!"`,
        newsletter: `SUBJECT: Why Agent Swarms are Replacing Prompt Chains
PREVIEW: Real data from 100,000 enterprise benchmark runs...

Hi {{FirstName}},

Over the past three years, the industry obsessed over prompt engineering tips. Today, enterprise software has decisively moved to autonomous multi-agent systems with active reflection loops.

Key Findings:
- 68.4% drop in hallucinations using adversarial critic agents
- 94.2% reasoning completion vs 58.7% for sequential prompts
- 87% auto-recovery on execution errors without human intervention

Download the benchmark breakdown inside the OmniPulse portal.`,
        blog: `# Benchmarking Multi-Agent Networks vs Sequential LLM Chains

*Meta Description: Comprehensive empirical benchmark evaluating multi-agent consensus networks and reflection mechanisms.*

## The Limitations of Sequential Prompting
Early LLM orchestration frameworks relied on simple linear pipelines. Errors compounded at each stage.

## The Multi-Agent Verification Architecture
By introducing specialized Planner, Executor, and Critic agents, system reliability reaches mission-critical thresholds.`
      }
    }
  ],
  calendarEvents: [
    { id: 'cal-1', date: '2026-11-18', time: '09:00 AM', platform: 'twitter', title: 'Micro-SaaS Playbook Thread (Tweets 1-5)', status: 'Scheduled', campaignId: 'camp-1' },
    { id: 'cal-2', date: '2026-11-18', time: '01:30 PM', platform: 'linkedin', title: 'One-Person AI Unicorn Model Breakdown', status: 'Scheduled', campaignId: 'camp-1' },
    { id: 'cal-3', date: '2026-11-19', time: '11:00 AM', platform: 'shorts', title: 'Shorts/TikTok: Raising VC in 2026 is backwards', status: 'Scheduled', campaignId: 'camp-1' },
    { id: 'cal-4', date: '2026-11-20', time: '08:30 AM', platform: 'newsletter', title: 'Newsletter: One-Person Unicorn Formula', status: 'Draft', campaignId: 'camp-1' },
    { id: 'cal-5', date: '2026-11-21', time: '02:00 PM', platform: 'linkedin', title: 'Multi-Agent Consensus vs LLM Chains', status: 'Draft', campaignId: 'camp-2' },
    { id: 'cal-6', date: '2026-11-22', time: '10:00 AM', platform: 'blog', title: 'Blog Post: Benchmarking Multi-Agent Networks', status: 'Published', campaignId: 'camp-2' }
  ],
  analytics: {
    monthlyImpressions: [
      { month: 'Jun', value: 42000 },
      { month: 'Jul', value: 68000 },
      { month: 'Aug', value: 112000 },
      { month: 'Sep', value: 165000 },
      { month: 'Oct', value: 219000 },
      { month: 'Nov', value: 284500 }
    ],
    platformDistribution: [
      { name: 'X / Twitter', share: 38, count: '108K reach', color: '#1DA1F2' },
      { name: 'LinkedIn', share: 34, count: '96K reach', color: '#0A66C2' },
      { name: 'Reels & TikTok', share: 16, count: '45K reach', color: '#FE2C55' },
      { name: 'Newsletter', share: 12, count: '35K opens', color: '#10B981' }
    ],
    recentConversions: [
      { campaign: 'The 2026 Micro-SaaS Playbook', views: '48.2K', engagement: '6.4%', viralScore: 96 },
      { campaign: 'Multi-Agent Workflows Whitepaper', views: '32.1K', engagement: '5.8%', viralScore: 91 },
      { campaign: 'Why 90% of B2B Founders Fail', views: '61.7K', engagement: '8.2%', viralScore: 94 }
    ]
  }
};

window.MOCK_DATA = MOCK_DATA;
