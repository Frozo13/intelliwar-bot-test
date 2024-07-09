const tg = window.Telegram.WebApp
const tgDataEl = document.getElementById('tg-data')

tg.ready()

tgDataEl.innerHTML = tg.initData
tgDataEl.innerHTML =
  'query_id=AAHyMvYYAAAAAPIy9hhfcdCP&user=%7B%22id%22%3A418788082%2C%22first_name%22%3A%22Arkadiy%22%2C%22last_name%22%3A%22Kovtun%22%2C%22username%22%3A%22Frozo13%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1720518534&hash=a43a09eaa35a25221fecee88723bcc44cb0bc6132e0403500bf4829b19bed660'
