# ElviceBrice Bot - Guide Installation

## Etapes pour deployer sur Railway.app

### 1. Creer un compte Railway
- Va sur https://railway.app
- Connecte-toi avec GitHub (gratuit)

### 2. Deployer le bot
- Clique "New Project"
- Choisis "Deploy from GitHub repo"
- Upload les fichiers de ce dossier
- Railway demarre le bot automatiquement

### 3. Recuperer l'URL du serveur
- Railway te donne une URL comme :
  https://elvicebrice-bot.railway.app
- Note cette URL

### 4. Configurer TradingView
- Ouvre ton indicateur SmartTrend v4
- Va dans Alertes → Creer une alerte
- Condition : Signal ACHAT ou VENTE
- Webhook URL : https://ton-url.railway.app/webhook
- Message JSON :
{
  "ticker": "{{ticker}}",
  "action": "{{strategy.order.action}}",
  "price": "{{close}}",
  "interval": "{{interval}}"
}

### 5. Tester
- Va sur https://ton-url.railway.app/test
- Tu dois recevoir un message sur Telegram

## Format des messages recus sur Telegram

### Signal ACHAT :
⚡ ElviceBrice Signal
━━━━━━━━━━━━━━━━━━
🟢 ▲ ACHAT
━━━━━━━━━━━━━━━━━━
📊 Paire  : XAUUSD
⏱ TF     : M1
💰 Prix   : 3325.10
🕐 Heure  : 15:32:45 WAT
━━━━━━━━━━━━━━━━━━
🎯 TP     : +2$
🛑 SL     : -1.5$
━━━━━━━━━━━━━━━━━━
📱 Elvice242 - SmartTrend v4

### Signal VENTE :
⚡ ElviceBrice Signal
━━━━━━━━━━━━━━━━━━
🔴 ▼ VENTE
...
