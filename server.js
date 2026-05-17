//==========================================================
// ElviceBrice Bot - Serveur Telegram
// Signal : SmartTrend Arrows v4
// Auteur : Elvice242
//==========================================================

const express    = require('express');
const axios      = require('axios');
const bodyParser = require('body-parser');

const app  = express();
app.use(bodyParser.json());

// Configuration
const BOT_TOKEN = '8929034815:AAFLAnuWTnxPpWMpgeDH0yh6AtLvCHGNv9Q';
const CHAT_ID   = '1013708003';
const PORT      = process.env.PORT || 3000;

// Fonction envoi message Telegram
async function sendTelegram(message)
  {
   try
     {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
         chat_id    : CHAT_ID,
         text       : message,
         parse_mode : 'HTML'
        });
      console.log('Message envoye :', message);
     }
   catch(err)
     {
      console.error('Erreur Telegram :', err.message);
     }
  }

// Fonction heure WAT (UTC+1)
function getWATTime()
  {
   const now = new Date();
   now.setHours(now.getHours() + 1);
   return now.toISOString().replace('T', ' ').substring(0, 19) + ' WAT';
  }

// Route principale - Reception signaux TradingView
app.post('/webhook', async (req, res) =>
  {
   try
     {
      const data    = req.body;
      const ticker  = data.ticker  || 'XAUUSD';
      const action  = data.action  || 'signal';
      const price   = data.price   || data.close || '---';
      const tf      = data.interval|| data.tf    || 'M1';
      const time    = getWATTime();

      let message = '';

      // Signal ACHAT
      if(action.toLowerCase().includes('buy') ||
         action.toLowerCase().includes('achat') ||
         action.toLowerCase().includes('long'))
        {
         message =
           `⚡ <b>ElviceBrice Signal</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `🟢 <b>▲ ACHAT</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `📊 Paire  : <b>${ticker}</b>\n` +
           `⏱ TF     : <b>${tf}</b>\n` +
           `💰 Prix   : <b>${price}</b>\n` +
           `🕐 Heure  : <b>${time}</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `🎯 TP     : <b>+2$</b>\n` +
           `🛑 SL     : <b>-1.5$</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `📱 <i>Elvice242 - SmartTrend v4</i>`;
        }

      // Signal VENTE
      else if(action.toLowerCase().includes('sell') ||
              action.toLowerCase().includes('vente') ||
              action.toLowerCase().includes('short'))
        {
         message =
           `⚡ <b>ElviceBrice Signal</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `🔴 <b>▼ VENTE</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `📊 Paire  : <b>${ticker}</b>\n` +
           `⏱ TF     : <b>${tf}</b>\n` +
           `💰 Prix   : <b>${price}</b>\n` +
           `🕐 Heure  : <b>${time}</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `🎯 TP     : <b>+2$</b>\n` +
           `🛑 SL     : <b>-1.5$</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `📱 <i>Elvice242 - SmartTrend v4</i>`;
        }

      // Signal generique
      else
        {
         message =
           `⚡ <b>ElviceBrice Signal</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `📊 Paire  : <b>${ticker}</b>\n` +
           `⏱ TF     : <b>${tf}</b>\n` +
           `💰 Prix   : <b>${price}</b>\n` +
           `📌 Signal : <b>${action}</b>\n` +
           `🕐 Heure  : <b>${time}</b>\n` +
           `━━━━━━━━━━━━━━━━━━\n` +
           `📱 <i>Elvice242 - SmartTrend v4</i>`;
        }

      await sendTelegram(message);
      res.json({ success: true, message: 'Signal envoye' });
     }
   catch(err)
     {
      console.error('Erreur webhook :', err);
      res.status(500).json({ success: false, error: err.message });
     }
  });

// Route test
app.get('/', (req, res) =>
  {
   res.json({
     status  : 'ElviceBrice Bot actif',
     version : '1.0',
     auteur  : 'Elvice242'
    });
  });

// Route test signal
app.get('/test', async (req, res) =>
  {
   await sendTelegram(
     `⚡ <b>ElviceBrice Bot</b>\n` +
     `━━━━━━━━━━━━━━━━━━\n` +
     `✅ Bot actif et connecte !\n` +
     `🕐 ${getWATTime()}\n` +
     `━━━━━━━━━━━━━━━━━━\n` +
     `📱 <i>Elvice242 - SmartTrend v4</i>`
    );
   res.json({ success: true, message: 'Message test envoye sur Telegram' });
  });

app.listen(PORT, () =>
  {
   console.log(`ElviceBrice Bot demarre sur port ${PORT}`);
   console.log(`Webhook : http://localhost:${PORT}/webhook`);
  });
