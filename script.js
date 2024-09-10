const tg = window.Telegram.WebApp
const tgDataEl = document.getElementById('tg-data')
const tgTokenEl = document.getElementById('tg-token')
const responseBlockEl = document.getElementById('response')
const paymentBtn = document.getElementById('payment-btn')

tg.ready()

let initData = tg.initData
let accessToken

if (tg.platform === 'unknown') {
  initData =
    'query_id=AAEV3w4qAgAAABXfDio79p6P&user=%7B%22id%22%3A5000584981%2C%22first_name%22%3A%22Perhapps%22%2C%22last_name%22%3A%22Test%22%2C%22username%22%3A%22perch%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725975208&hash=e608e48b02e49a15f1af6758f265084a4718de796da3bea289b13efd6d8a6818'
}

tgDataEl.innerHTML = initData

function tgGetToken() {
  let encode = encodeURIComponent(initData).replace(
    /%([a-f0-9]{2})/gi,
    (m, $1) => String.fromCharCode(parseInt($1, 16))
  )
  return btoa(encode)
}

const tgToken = tgGetToken()

tgTokenEl.innerHTML = tgToken

// fetchData()

async function login() {
  try {
    const response = await fetch(
      'https://api.intelliwar.com/api/v1/auth/login-by-tg',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: tgToken })
      }
    )

    const json = await response.json()
    accessToken = json.accessToken

    responseBlockEl.style.setProperty('color', 'black')
    responseBlockEl.innerHTML = JSON.stringify(json)
  } catch (error) {
    responseBlockEl.style.setProperty('color', 'red')
    responseBlockEl.innerHTML = error
  }
}

async function getInvoice() {
  try {
    const response = await fetch(
      'https://api.intelliwar.com/api/v1/shop/get-tg-link',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ purchaseId: '66c3852b22c5e3bbec4affbe' })
      }
    )

    const json = await response.json()
    responseBlockEl.style.setProperty('color', 'black')
    responseBlockEl.innerHTML = JSON.stringify(json)
    return json.link
  } catch (error) {
    responseBlockEl.style.setProperty('color', 'red')
    responseBlockEl.innerHTML = error
  }
}

;(async () => {
  await login()
})()

paymentBtn.addEventListener('click', async () => {
  const link = await getInvoice()

  try {
    tg.openInvoice(link, (status) => {
      responseBlockEl.style.setProperty('color', 'black')
      responseBlockEl.innerHTML = status
    })
  } catch (error) {
    responseBlockEl.style.setProperty('color', 'red')
    responseBlockEl.innerHTML = error
  }
})
