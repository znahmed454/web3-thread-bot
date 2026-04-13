require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cheerio = require('cheerio');
const Groq = require('groq-sdk');
const { t } = require('./lang');
const { generatePrompt } = require('./prompt');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const userLang = {};

function getLang(chatId) {
  return userLang[chatId] || 'id';
}

async function scrapeWebsite(url) {
  try {
    const { data } = await axios.get(url, {
      timeout: 15000,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ThreadBot/1.0)' }
    });
    const $ = cheerio.load(data);
    $('script, style, nav, footer, header').remove();
    const title = $('title').text().trim();
    const metaDesc = $('meta[name="description"]').attr('content') || '';
    const h1 = $('h1').first().text().trim();
    const h2s = $('h2').map((_, el) => $(el).text().trim()).get().slice(0, 8);
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 4000);
    return { title, metaDesc, h1, h2s, bodyText, url };
  } catch (err) {
    throw new Error('Gagal akses website: ' + err.message);
  }
}

async function generateThread(siteData, lang) {
  const prompt = generatePrompt(siteData, lang);
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: lang === 'en'
          ? 'You are an experienced crypto/web3 content writer who specializes in creating viral Twitter threads for contests.'
          : 'Kamu adalah crypto/web3 content writer berpengalaman yang ahli membuat viral Twitter threads untuk kontes.'
      },
      { role: 'user', content: prompt }
    ],
    temperature: 0.8,
    max_tokens: 2000,
  });
  return response.choices[0].message.content;
}

function formatThread(threadText) {
  const tweets = threadText.split(/\n---\n|\[Tweet \d+\]/i).filter(t => t.trim().length > 10);
  return tweets.map((tweet, i) => `*Tweet ${i + 1}/${tweets.length}*\n\n${tweet.trim()}`).join('\n\n' + '─'.repeat(20) + '\n\n');
}

bot.onText(/\/start/, (msg) => {
  const lang = getLang(msg.chat.id);
  bot.sendMessage(msg.chat.id, t(lang, 'welcome'), { parse_mode: 'Markdown' });
});

bot.onText(/\/help/, (msg) => {
  const lang = getLang(msg.chat.id);
  bot.sendMessage(msg.chat.id, t(lang, 'help'), { parse_mode: 'Markdown' });
});

bot.onText(/\/language/, (msg) => {
  const lang = getLang(msg.chat.id);
  bot.sendMessage(msg.chat.id, t(lang, 'chooseLang'), {
    reply_markup: {
      inline_keyboard: [[
        { text: '🇮🇩 Indonesia', callback_data: 'lang_id' },
        { text: '🇬🇧 English', callback_data: 'lang_en' }
      ]]
    }
  });
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  if (query.data === 'lang_id') {
    userLang[chatId] = 'id';
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(chatId, t('id', 'langSet'), { parse_mode: 'Markdown' });
  } else if (query.data === 'lang_en') {
    userLang[chatId] = 'en';
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(chatId, t('en', 'langSet'), { parse_mode: 'Markdown' });
  }
});

bot.on('message', async (msg) => {
  const text = msg.text || '';
  const chatId = msg.chat.id;
  const lang = getLang(chatId);
  if (text.startsWith('/')) return;
  const urlRegex = /https?:\/\/[^\s]+/i;
  if (!urlRegex.test(text)) {
    bot.sendMessage(chatId, t(lang, 'errorUrl'), { parse_mode: 'Markdown' });
    return;
  }
  const url = text.match(urlRegex)[0];
  const loadingMsg = await bot.sendMessage(chatId, t(lang, 'loading'));
  try {
    const siteData = await scrapeWebsite(url);
    const threadText = await generateThread(siteData, lang);
    const formatted = formatThread(threadText);
    await bot.deleteMessage(chatId, loadingMsg.message_id);
    await bot.sendMessage(chatId, t(lang, 'done') + '\n\n' + formatted, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });
  } catch (err) {
    await bot.editMessageText(t(lang, 'errorGeneral') + err.message, {
      chat_id: chatId,
      message_id: loadingMsg.message_id
    });
  }
});

console.log('Bot running dengan Groq AI...');
