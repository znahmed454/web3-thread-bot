const messages = {
  id: {
    welcome: `🚀 *Web3 Twitter Thread Generator*\n\nKirim URL website project web3 dan saya akan membuat thread Twitter yang menarik untuk kontes!\n\n*Cara pakai:*\nCukup kirim URL langsung, contoh:\n\`https://projectkamu.xyz\`\n\n*Perintah:*\n/start - Tampilkan pesan ini\n/language - Ganti bahasa\n/help - Panduan penggunaan`,
    help: `📖 *Panduan Thread Generator*\n\n1. Kirim URL website project web3\n2. Tunggu beberapa detik\n3. Thread 7 tweet siap copy-paste!\n\n*Tips kontes:*\n• Tambahkan screenshot project\n• Tag akun resmi project\n• Posting di jam prime time`,
    loading: '⏳ Sedang menganalisis website dan membuat thread...',
    done: '✅ *Thread siap!* Copy tweet-nya satu per satu:',
    errorUrl: '⚠️ Kirim URL yang valid ya! Contoh: `https://projectkamu.xyz`',
    errorGeneral: '❌ Error: ',
    chooseLang: '🌐 Pilih bahasa untuk thread yang akan dibuat:',
    langSet: '✅ Bahasa diset ke *Bahasa Indonesia*. Thread berikutnya akan dalam Bahasa Indonesia.',
  },
  en: {
    welcome: `🚀 *Web3 Twitter Thread Generator*\n\nSend a web3 project URL and I'll create an engaging Twitter thread for contests!\n\n*How to use:*\nJust send a URL directly, e.g.:\n\`https://yourproject.xyz\`\n\n*Commands:*\n/start - Show this message\n/language - Change language\n/help - Usage guide`,
    help: `📖 *Thread Generator Guide*\n\n1. Send a web3 project website URL\n2. Wait a few seconds\n3. 7-tweet thread ready to copy-paste!\n\n*Contest tips:*\n• Add project screenshots\n• Tag the official project account\n• Post during prime time`,
    loading: '⏳ Analyzing website and generating thread...',
    done: '✅ *Thread ready!* Copy each tweet one by one:',
    errorUrl: '⚠️ Please send a valid URL! Example: `https://yourproject.xyz`',
    errorGeneral: '❌ Error: ',
    chooseLang: '🌐 Choose the language for the generated thread:',
    langSet: '✅ Language set to *English*. Your next thread will be in English.',
  }
};

function t(lang, key) {
  return (messages[lang] || messages['id'])[key] || '';
}

module.exports = { t };
