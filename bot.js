// bot.js

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Membaca token dari file .env
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('Token bot tidak ditemukan dalam file .env!');
  process.exit(1); // Keluar dari aplikasi jika token tidak ditemukan
}

const bot = new TelegramBot(token, { polling: true });

// Fungsi untuk mengirim pesan awal ketika pengguna mengetik /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username ? `@${msg.chat.username}` : msg.chat.first_name;

  const welcomeText = `Hi ${username}, this is MONEY MAKING PROJECT bot, welcome! 
You can choose the verifications you like.

From the creators of @moneymakingprojectofficial.
Reviews @mmproject_reviews`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '‍💻Catalog', callback_data: 'catalog' }],
        [{ text: '🔎Info', callback_data: 'info' }]
      ]
    }
  };

  // URL gambar yang akan dikirim
  const imageUrl = 'https://ibb.co.com/JjRzY14';

  // Mengirim gambar diikuti dengan teks
  bot.sendPhoto(chatId, imageUrl, { caption: welcomeText, ...options });
});


// Tangani callback dari tombol-tombol lain
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id; // ID pesan sebelumnya
  const data = callbackQuery.data;
  const username = callbackQuery.message.chat.username ? `@${callbackQuery.message.chat.username}` : callbackQuery.message.chat.first_name;
  
// Menghapus pesan sebelumnya
  bot.deleteMessage(chatId, messageId);
  
  if (data === 'start') {
    // URL gambar untuk ditampilkan di pesan
    const imageUrl = 'https://ibb.co.com/JjRzY14'; // Ganti dengan URL gambar yang sesuai

    // Teks penyambutan untuk pesan
    const welcomeText = `Hi ${username}, this is MONEY MAKING PROJECT bot, welcome! 
You can choose the verifications you like.

From the creators of @moneymakingprojectofficial.
Reviews @mmproject_reviews`;

    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '💻Catalog', callback_data: 'catalog' }],
          [{ text: '🔎Info', callback_data: 'info' }]
        ]
      }
    };

    // Kirim gambar diikuti dengan teks
    bot.sendPhoto(chatId, imageUrl, { caption: welcomeText, ...options });
  }
});


// Menangani pilihan "Catalog" dan "Info"
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  // Menangani pilihan "Catalog"
  if (data === 'catalog') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'KYC', callback_data: 'KYC' }],
          [{ text: 'ACCOUNT', callback_data: 'ACCOUNT' }],
          [{ text: 'MAIL', callback_data: 'MAIL' }],
		  [{ text: 'Kembali', callback_data: 'start' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih salah satu kategori produk:', options);
  }
// Menangani pilihan "Info"
else if (data === 'info') {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: ' ☎️Support', callback_data: 'SUPPORT' }],
        [{ text: '📊 Partnership Program', callback_data: 'For_Partner' }],
        [{ text: '❓FAQ', callback_data: 'FAQ' }],
        [{ text: '🔥Partners', callback_data: 'Partners' }],
        [{ text: 'Kembali', callback_data: 'start' }]
      ]
    }
  };
  bot.sendMessage(chatId, 'Untuk informasi lebih lanjut, pilih salah satu opsi berikut:', options);
}

// Menangani pilihan "SUPPORT"
else if (data === 'SUPPORT') {
  const text = '☎️ Support\n\nIf you have any questions or problems, write to the administrator: @stzne\n\nBut before that, make sure your question is not in the FAQ👇';
  const options = {
    reply_markup: {
      inline_keyboard: [
	  [{ text: 'FAQ', callback_data: 'FAQ' }],
        [{ text: 'Kembali', callback_data: 'info' }]
      ]
    }
  };
  
  // Kirim pesan teks panjang dengan tombol "Kembali" dan "FAQ"
  bot.sendMessage(chatId, text, options);
}
// Menangani pilihan "For Partner"
else if (data === 'For_Partner') {
  const text = `📊 Partnership Program

For traffic providers (influencers).

Influencers interested in partnership, Dm @stzne.

For product suppliers (droppers).
If you are ready to supply us with your products and earn money from it, Dm @stzne.
`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Kembali', callback_data: 'info' }]
      ]
    }
  };

  // Kirim pesan teks panjang dengan tombol "Kembali"
  bot.sendMessage(chatId, text, options);
}


// Menangani pilihan "FAQ"
else if (data === 'FAQ') {
  const text = `❓FAQ

1. Can I get a discount? The discount is available from 500 pieces.

2. Can the verification be expedited? Unfortunately, no. Everything works in a live queue.

3. Is re-verification possible? We do not guarantee that the dropper will get in touch again. The chance is very small in Asia and Africa, hence the price is low. In Ukraine, the chance is much higher.

4. Why are certain geos not available? We often add new geos. If a specific geo is not available, it means there is a long queue for it, and you need to wait.

5. Are there guarantees for the accounts? Unfortunately, only accounts that did not pass KYC are subject to replacement. We do not recommend using the account for personal purposes and making large deposits. There is always a chance of blocking and theft by the dropper.

Working hours of different geos:

- Bangladesh 6:00-12:00 UTC
- Kenya 6:00-13:00 UTC
- Indonesia 6:00-12:00 UTC
- India 8:00-14:00 UTC
- Nigeria 7:00-14:00 UTC
- Ukraine 7:00-20:00 UTC`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Kembali', callback_data: 'info' }]
      ]
    }
  };

  // Kirim pesan teks panjang dengan tombol "Kembali"
  bot.sendMessage(chatId, text, options);
}

// Menangani pilihan "Partners"
else if (data === 'Partners') {
  const text = `🔥Partners
  
@smartseller22
@smartseller1
@Fillip377
@Edhivana
`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Kembali', callback_data: 'info' }]
      ]
    }
  };

  // Kirim pesan teks panjang dengan tombol "Kembali"
  bot.sendMessage(chatId, text, options);
}


  // Menangani pilihan "KYC"
  else if (data === 'KYC') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'BYBIT', callback_data: 'BYBIT' }, { text: 'BYBIT WITH PROXY', callback_data: 'BYBIT_PROXY' }],
          [{ text: 'GALXE', callback_data: 'GALXE' }, { text: 'KUCOIN', callback_data: 'KUCOIN' }],
          [{ text: 'BITGET', callback_data: 'BITGET' }, { text: 'OKX', callback_data: 'OKX' }],
          [{ text: 'BingX', callback_data: 'BingX' }, { text: 'MEXC', callback_data: 'MEXC' }],
          [{ text: 'GATE.IO', callback_data: 'GATE.IO' }, { text: 'BACKPACK', callback_data: 'BACKPACK' }],
          [{ text: 'SANDBOX', callback_data: 'SANDBOX' }, { text: 'BINANCE', callback_data: 'BINANCE' }],
          [{ text: 'BITMART', callback_data: 'BITMART' }, { text: 'HASHKEY', callback_data: 'HASHKEY' }],
          [{ text: 'WHITEBIT', callback_data: 'WHITEBIT' }, { text: 'ZETACHAIN', callback_data: 'ZETACHAIN' }],
          [{ text: 'BITFINITY', callback_data: 'BITFINITY' }, { text: 'ARKHAM', callback_data: 'ARKHAM' }],
          [{ text: 'HOLONYM', callback_data: 'HOLONYM' }, { text: 'CERTIK SKYNET', callback_data: 'CERTIK_SKYNET' }],
          [{ text: 'HEMI', callback_data: 'HEMI' }, { text: 'ICN', callback_data: 'ICN' }],
          [{ text: 'HUOBI', callback_data: 'HUOBI' }, { text: 'CEX IO', callback_data: 'CEX_IO' }],
          [{ text: 'TOKENSOFT', callback_data: 'TOKENSOFT' }, { text: 'CIVIC', callback_data: 'CIVIC' }],
          [{ text: 'AVITO', callback_data: 'AVITO' }, { text: 'COINLIST', callback_data: 'COINLIST' }],
          [{ text: 'SUPRA', callback_data: 'SUPRA' }, { text: 'CRYPTO.COM', callback_data: 'CRYPTO_COM' }],
          [{ text: 'COINBASE', callback_data: 'COINBASE' }, { text: 'KINTO', callback_data: 'KINTO' }],
          [{ text: 'YOUHODLER', callback_data: 'YOUHODLER' }, { text: 'SYNAPS', callback_data: 'SYNAPS' }],
          [{ text: 'MIXIN', callback_data: 'MIXIN' }, { text: 'GM EXCHANGE', callback_data: 'GM_EXCHANGE' }],
          [{ text: 'Kembali', callback_data: 'catalog' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih produk KYC:', options);
  }
// Menangani produk dalam KYC
  else if (data === 'BYBIT' || data === 'GALXE' || data === 'BITGET' || data === 'BingX' || data === 'GATE.IO' || data === 'SANDBOX'
   || data === 'BITMART' || data === 'WHITEBIT' || data === 'BITFINITY' || data === 'HOLONYM' || data === 'HEMI' || data === 'HUOBI' || data === 'TOKENSOFT' || data === 'AVITO' || data === 'SUPRA' || data === 'COINBASE'
    || data === 'YOUHODLER' || data === 'MIXIN' || data === 'BYBIT_PROXY' || data === 'KUCOIN' || data === 'OKX' || data === 'MEXC' || data === 'BACKPACK' || data === 'BINANCE' || data === 'HASHKEY' || data === 'ZETACHAIN' || data === 'ARKHAM'
	 || data === 'CERTIK_SKYNET' || data === 'ICN' || data === 'CEX_IO' || data === 'CIVIC' || data === 'COINLIST' || data === 'CRYPTO_COM' || data === 'KINTO' || data === 'SYNAPS'|| data === 'GM_EXCHANGE') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Indonesia', callback_data: 'INDONESIA' }, { text: 'Sri Lanka', callback_data: 'SRILANKA' }],
          [{ text: 'India', callback_data: 'INDIA' }, { text: 'Bangladesh', callback_data: 'BANGLADESH' }],
          [{ text: 'Kembali', callback_data: 'KYC' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih negara untuk produk ini:', options);
  }

  // Menangani pilihan negara KYC
  else if (data === 'INDONESIA' || data === 'SRILANKA' || data === 'INDIA' || data === 'BANGLADESH') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '1 ACC ~ 20$', callback_data: 'PRICE_1' }],
          [{ text: '5 ACC ~ 15$/ACC', callback_data: 'PRICE_5' }],
          [{ text: '10 ACC+ ~ 8$/ACC', callback_data: 'PRICE_10' }],
          [{ text: 'Kembali', callback_data: 'KYC' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih harga untuk produk di negara ini:', options);
  }
  // Menangani pilihan "ACCOUNT"
  else if (data === 'ACCOUNT') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'LINKEDIN', callback_data: 'LINKEDIN' }, { text: 'FACEBOOK', callback_data: 'FACEBOOK' }],
          [{ text: 'INSTAGRAM', callback_data: 'INSTAGRAM' }, { text: 'DISCORD', callback_data: 'DISCORD' }],
          [{ text: 'TWITTER', callback_data: 'TWITTER' }, { text: 'TELEGRAM', callback_data: 'TELEGRAM' }],
          [{ text: 'Kembali', callback_data: 'catalog' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih produk untuk kategori ACCOUNT:', options);
  }

  // Menangani produk dalam ACCOUNT
  else if (data === 'LINKEDIN' || data === 'FACEBOOK' || data === 'INSTAGRAM' || data === 'DISCORD' || data === 'TWITTER' || data === 'TELEGRAM') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Indonesia', callback_data: 'INDONESIA' }, { text: 'Usa', callback_data: 'USA' }],
          [{ text: 'Mix', callback_data: 'MIX' }],
          [{ text: 'Kembali', callback_data: 'ACCOUNT' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih negara untuk produk ini:', options);
  }

  // Menangani pilihan negara ACCOUNT
  else if (data === 'INDONESIA' || data === 'USA' || data === 'MIX') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '1 ACC ~ 10$', callback_data: 'PRICE_11' }],
          [{ text: '5 ACC ~ 7$/ACC', callback_data: 'PRICE_55' }],
          [{ text: '10 ACC+ ~ 4$/ACC', callback_data: 'PRICE_100' }],
          [{ text: 'Kembali', callback_data: 'ACCOUNT' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih harga untuk produk di negara ini:', options);
  }
 // Menangani pilihan "MAIL"
  else if (data === 'MAIL') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'GMAIL', callback_data: 'GMAIL' }, { text: 'MAIL RU', callback_data: 'MAIL_RU' }],
          [{ text: 'OUTLOOK', callback_data: 'OUTLOOK' }, { text: 'MAIL.COM', callback_data: 'MAIL.COM' }],
          [{ text: 'RAMBLER', callback_data: 'RAMBLER' }, { text: 'YAHOO', callback_data: 'YAHOO' }],
          [{ text: 'Kembali', callback_data: 'catalog' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih produk untuk kategori MAIL:', options);
  }

  // Menangani produk dalam MAIL
  else if (data === 'GMAIL' || data === 'MAIL_RU' || data === 'OUTLOOK' || data === 'MAIL.COM' || data === 'RAMBLER' || data === 'YAHOO') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Mix', callback_data: 'MIX1' }],
          [{ text: 'Kembali', callback_data: 'MAIL' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih negara untuk produk ini:', options);
  }

  // Menangani pilihan negara MAIL
  else if (data === 'MIX1') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '1 ACC ~ 5$', callback_data: 'PRICE_12' }],
          [{ text: '5 ACC ~ 3$/ACC', callback_data: 'PRICE_52' }],
          [{ text: '10 ACC+ ~ 1$/ACC', callback_data: 'PRICE_102' }],
          [{ text: 'Kembali', callback_data: 'MAIL' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Pilih harga untuk produk di negara ini:', options);
  }

  // Menangani pilihan harga
  else if (data === 'PRICE_1' || data === 'PRICE_5' || data === 'PRICE_10' || data === 'PRICE_11' || data === 'PRICE_55' || data === 'PRICE_100' || data === 'PRICE_12' || data === 'PRICE_52' || data === 'PRICE_102') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Hubungi @stzne', url: 'https://t.me/stzne' }],
		     [{ text: 'Kembali Ke Menu', callback_data: 'start' }]
        ]
      }
    };
    bot.sendMessage(chatId, 'Silakan hubungi @stzne untuk transaksi lebih lanjut.', options);
  }

  // Menangani callback lainnya
  else {
    bot.answerCallbackQuery(callbackQuery.id);
  }
});
