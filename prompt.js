function generatePrompt(siteData, lang = 'id') {
  const isEN = lang === 'en';

  const intro = isEN
    ? `You are a crypto/web3 Twitter KOL creating a viral thread for a contest.`
    : `Kamu adalah crypto/web3 Twitter KOL yang membuat thread viral untuk kontes.`;

  const dataSection = `
PROJECT DATA:
- URL: ${siteData.url}
- Title: ${siteData.title}
- Description: ${siteData.metaDesc}
- Main heading: ${siteData.h1}
- Website sections: ${siteData.h2s.join(', ')}
- Content: ${siteData.bodyText.slice(0, 3000)}
`;

  const instructions = isEN ? `
TASK:
Create a 7-tweet Twitter thread that is ENGAGING, INFORMATIVE, and VIRAL for a contest.
Write ALL tweets in ENGLISH.

OUTPUT FORMAT (use exactly these separators):
[Tweet 1]
(tweet text)

[Tweet 2]
(tweet text)

... up to Tweet 7

GUIDELINES PER TWEET:

Tweet 1 (HOOK - most important!):
- Start with a number, question, or bold statement
- Make people HAVE to keep reading
- Max 240 characters
- Example: "This project is about to change [X] forever. Here's why 🧵"

Tweet 2 (Problem):
- Explain the problem this project solves
- Relate to crypto/web3 community pain points

Tweet 3 (Solution):
- What the project offers
- Advantages over competitors
- Unique features or technology

Tweet 4 (Tokenomics / Ecosystem):
- Token info, utility, or ecosystem if available
- Value proposition
- If no token, cover the ecosystem

Tweet 5 (Traction / Roadmap):
- Achievements so far
- Exciting upcoming roadmap
- Notable partnerships or investors

Tweet 6 (Why You Should Care):
- FOMO moment — why this matters NOW
- Alpha readers can act on
- CTA to explore further

Tweet 7 (Closing + CTA):
- Summarize the core value
- Tag the official project account if inferable from URL
- 3-5 relevant hashtags (#DeFi #Web3 #Crypto + project-specific)
- Ask for follows and RTs

IMPORTANT RULES:
- Each tweet max 280 characters
- Use emojis sparingly
- Tone: informative but excited, like a crypto alpha caller
- No financial advice or investment calls
- Focus on tech, use case, and ecosystem
` : `
TUGAS:
Buat Twitter thread 7 tweet yang MENARIK, INFORMATIF, dan VIRAL untuk kontes.
Tulis SEMUA tweet dalam BAHASA INDONESIA.

FORMAT OUTPUT (gunakan pemisah ini persis):
[Tweet 1]
(teks tweet)

[Tweet 2]
(teks tweet)

... dst sampai Tweet 7

PANDUAN SETIAP TWEET:

Tweet 1 (HOOK - paling penting!):
- Mulai dengan angka, pertanyaan, atau pernyataan bold
- Bikin orang HARUS baca lanjutannya
- Max 240 karakter

Tweet 2 (Masalah):
- Jelaskan masalah yang diselesaikan project ini
- Relate dengan pain point komunitas crypto/web3

Tweet 3 (Solusi):
- Apa yang ditawarkan project ini
- Keunggulan dibanding kompetitor
- Fitur/teknologi uniknya

Tweet 4 (Tokenomics / Ekosistem):
- Info token, utilitas, atau ekosistem jika ada
- Jika tidak ada token, bahas ekosistemnya

Tweet 5 (Traction / Roadmap):
- Pencapaian yang sudah diraih
- Roadmap ke depan yang menarik
- Partnership atau investor notable

Tweet 6 (Kenapa Kamu Harus Peduli):
- FOMO moment - kenapa ini penting sekarang
- Alpha yang bisa pembaca manfaatkan

Tweet 7 (Penutup + CTA):
- Rangkum nilai utama project
- Tag akun resmi project jika bisa diinfer dari URL
- 3-5 hashtag relevan (#DeFi #Web3 #Crypto + hashtag spesifik project)
- Ajak follow dan RT

ATURAN PENTING:
- Setiap tweet max 280 karakter
- Gunakan emoji secukupnya
- Nada: informatif tapi excited, seperti alpha caller crypto
- Jangan ada klaim finansial atau ajakan investasi
`;

  return intro + dataSection + instructions;
}

module.exports = { generatePrompt };
