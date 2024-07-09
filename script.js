const tg = window.Telegram.WebApp
const tgDataEl = document.getElementById('tg-data')
const tgTokenEl = document.getElementById('tg-token')
const responseBlockEl = document.getElementById('response')

tg.ready()

let initData = tg.initData

if (tg.platform === 'unknown') {
  initData =
    'query_id=AAHyMvYYAAAAAPIy9hiznDsx&user=%7B%22id%22%3A418788082%2C%22first_name%22%3A%22Arkadiy%22%2C%22last_name%22%3A%22Kovtun%22%2C%22username%22%3A%22Frozo13%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1720523658&hash=eb4dec65d4af57f2d04fcaf28616accaaa6a95246c188cd86a21958e4873854e'
}

tgDataEl.innerHTML = initData

function base64encode(str) {
  let encode = encodeURIComponent(str).replace(/%([a-f0-9]{2})/gi, (m, $1) =>
    String.fromCharCode(parseInt($1, 16))
  )
  return btoa(encode)
}

const tgToken = base64encode(initData)

tgTokenEl.innerHTML = tgToken

fetchData()

async function fetchData() {
  try {
    const response = await fetch(
      'https://api.intelliwar.com/api/v1/auth/login-by-tg',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: tgToken })
      }
    )

    responseBlockEl.innerHTML = JSON.stringify(await response.json())
  } catch (error) {
    responseBlockEl.style.setProperty('color', 'red')
    responseBlockEl.innerHTML = error
  }
}
