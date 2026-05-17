//==========================================================
// ElviceBrice Bot v2 - Serveur Telegram
// 4 alertes : Achat, Vente, Ferme BUY, Ferme SELL
// Auteur : Elvice242
//==========================================================

const express    = require('express');
const axios      = require('axios');
const bodyParser = require('body-parser');

const app  = express();
app.use(bodyParser.json());

const BOT_TOKEN = '8929034815:AAFLAnuWTnxPpWMpgeDH0yh6AtLvCHGNv9Q';
const CHAT_ID   = '1013708003';
const PORT      = process.env.PORT || 3000;

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

function getWATTime()
  {
   const now = new Date();
   now.setHours(now.getHours() + 1);
   return now.toISOString().replace('T',' ').substring(0,19) + ' WAT';
  }

app.post('/webhook', async (req, res) =>
  {
   try
     {
      const data   = req.body;
      const ticker = data.ticker   || 'XAUUSD';
      const action = (data.action  || '').toLowerCase();
      const price  = data.price    || '---';
      const tf     = data.interval || 'M1';
      const time   = getWATTime();

      let message = '';

      // ===== ACHAT =====
      if(action === 'buy')
        {
         message =
           `⚡ <b>ElviceBrice Signal</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `🟢 <b>▲ ACHAT — OUVRE BUY</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `📊 Paire  : <b>${ticker}</b>\n` +
           `⏱ TF     : <b>${tf}</b>\n` +
           `💰 Prix   : <b>${price}</b>\n` +
           `🕐 Heure  : <b>${time}</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `🎯 TP     : <b>+2$</b>\n` +
           `🛑 SL     : <b>-1.5$</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `📱 <i>Elvice242 - SmartTrend v4</i>`;
        }

      // ===== VENTE =====
      else if(action === 'sell')
        {
         message =
           `⚡ <b>ElviceBrice Signal</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `🔴 <b>▼ VENTE — OUVRE SELL</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `📊 Paire  : <b>${ticker}</b>\n` +
           `⏱ TF     : <b>${tf}</b>\n` +
           `💰 Prix   : <b>${price}</b>\n` +
           `🕐 Heure  : <b>${time}</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `🎯 TP     : <b>+2$</b>\n` +
           `🛑 SL     : <b>-1.5$</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `📱 <i>Elvice242 - SmartTrend v4</i>`;
        }

      // ===== FERME BUY =====
      else if(action === 'close_buy')
        {
         message =
           `⚠️ <b>ElviceBrice — CLÔTURE</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `🟡 <b>FERME TON BUY !</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `📊 Paire  : <b>${ticker}</b>\n` +
           `⏱ TF     : <b>${tf}</b>\n` +
           `💰 Prix   : <b>${price}</b>\n` +
           `🕐 Heure  : <b>${time}</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `🟡 ZigZag Haut détecté\n` +
           `👉 <b>Prends ton profit !</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `📱 <i>Elvice242 - SmartTrend v4</i>`;
        }

      // ===== FERME SELL =====
      else if(action === 'close_sell')
        {
         message =
           `⚠️ <b>ElviceBrice — CLÔTURE</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `🟡 <b>FERME TON SELL !</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `📊 Paire  : <b>${ticker}</b>\n` +
           `⏱ TF     : <b>${tf}</b>\n` +
           `💰 Prix   : <b>${price}</b>\n` +
           `🕐 Heure  : <b>${time}</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `🟡 ZigZag Bas détecté\n` +
           `👉 <b>Prends ton profit !</b>\n` +
           `━━━━━━━━━━━━━━━━━━━━\n` +
           `📱 <i>Elvice242 - SmartTrend v4</i>`;
        }

      if(message)
        {
         await sendTelegram(message);
         res.json({ success: true });
        }
      else
        {
         res.json({ success: false, error: 'Action non reconnue : ' + action });
        }
     }
   catch(err)
     {
      console.error('Erreur webhook :', err);
      res.status(500).json({ success: false, error: err.message });
     }
  });

app.get('/', (req, res) =>
  {
   res.json({
     status  : 'ElviceBrice Bot v2 actif',
     version : '2.0',
     auteur  : 'Elvice242',
     alertes : ['buy','sell','close_buy','close_sell']
    });
  });

app.get('/test', async (req, res) =>
  {
   await sendTelegram(
     `⚡ <b>ElviceBrice Bot v2</b>\n` +
     `━━━━━━━━━━━━━━━━━━━━\n` +
     `✅ <b>4 alertes actives :</b>\n` +
     `🟢 ▲ Signal ACHAT\n` +
     `🔴 ▼ Signal VENTE\n` +
     `🟡 Ferme BUY (ZigZag haut)\n` +
     `🟡 Ferme SELL (ZigZag bas)\n` +
     `━━━━━━━━━━━━━━━━━━━━\n` +
     `🕐 ${getWATTime()}\n` +
     `━━━━━━━━━━━━━━━━━━━━\n` +
     `📱 <i>Elvice242 - SmartTrend v4</i>`
    );
   res.json({ success: true });
  });

app.listen(PORT, () =>
  {
   console.log(`ElviceBrice Bot v2 demarre sur port ${PORT}`);
  });
