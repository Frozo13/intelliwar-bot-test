const tg = window.Telegram.WebApp
const tgDataEl = document.getElementById('tg-data')

tg.ready()

tgDataEl.innerHTML = tg.initData

tg.sendData(JSON.stringify({ test: 'Hello world!' }))
