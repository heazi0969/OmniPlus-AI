// js/services/aiService.js

const GEMINI_KEY_STORAGE = 'omnipulse_gemini_api_key';

const AIService = {
  getApiKey() {
    return localStorage.getItem(GEMINI_KEY_STORAGE) || '';
  },

  setApiKey(key) {
    const cleaned = (key || '').trim();
    if (!cleaned) {
      localStorage.removeItem(GEMINI_KEY_STORAGE);
      return;
    }
    localStorage.setItem(GEMINI_KEY_STORAGE, cleaned);
  },

  hasApiKey() {
    return Boolean(this.getApiKey());
  },

  async generateRepurposedAssets({ title, sourceUrl, sourceText, brandVoice }) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Please enter and save your Gemini API key first.');
    }

    const prompt = `
You are OmniPulse AI, an expert multi-channel content repurposing engine.
Brand Voice: ${brandVoice || 'Tech Founder'}
Campaign Title / Topic: ${title || 'Untitled Campaign'}
Source URL: ${sourceUrl || 'N/A'}
Source Notes / Transcript: ${sourceText || 'N/A'}

Return ONLY valid JSON (no markdown code fences) with this exact structure:
{
  "twitter": [
    "Tweet 1 (under 270 chars)",
    "Tweet 2 (under 270 chars)",
    "Tweet 3 (under 270 chars)",
    "Tweet 4 (under 270 chars)",
    "Tweet 5 (under 270 chars)"
  ],
  "linkedin": "Engaging LinkedIn post text",
  "shorts": "Short-form video script with HOOK, BODY, and CTA",
  "newsletter": "Email newsletter subject and body",
  "blog": "Markdown blog post summary and key sections"
}
`.trim();

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || 'Gemini API request failed.');
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanedJson = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    try {
      return JSON.parse(cleanedJson);
    } catch {
      return {
        twitter: [rawText.slice(0, 260)],
        linkedin: rawText,
        shorts: rawText,
        newsletter: rawText,
        blog: rawText
      };
    }
  }
};

window.AIService = AIService;