import puppeteer from 'puppeteer'
import path from 'node:path'
import fs from 'node:fs'
import Handlebars from 'handlebars'
import currency from 'currency.js'

function formatCurrency (value) {
  const val = currency(value, {
    presicion: 2,
    separator: ','
  }).format()
  return val
}

export async function generateSaleOrder (req, res) {
  // Adapt the data for the template
  const data = req.body
  const items = data.map(item => ({ ...item.order_items[0], created: new Date(item.date_created).toLocaleDateString() }))
  items.forEach(item => { item.total = item.unit_price * item.quantity })
  let totalEarnings = items.reduce((acc, val) => { return acc + val.total }, 0)
  let totalFees = items.reduce((acc, val) => (acc + val.sale_fee), 0)
  const total = formatCurrency(totalEarnings - totalFees)
  totalEarnings = formatCurrency(totalEarnings)
  totalFees = formatCurrency(totalFees)

  // prepare and configure hbs template
  const file = path.join(global.__dirname, 'public', 'templates', 'report.hbs')
  const sourceTemplate = fs.readFileSync(file, 'utf-8')
  const template = Handlebars.compile(sourceTemplate)

  // generate pdf file
  const hbData = {
    user: req.user,
    items,
    date: new Date().toLocaleDateString(),
    totalEarnings,
    totalFees,
    total
  }
  const html = template(hbData)
  const browser = await puppeteer.launch({
    executablePath: '/snap/bin/chromium',
    args: ['--no-sandbox']
  })
  // const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  await page.pdf({
    path: path.join(global.__dirname, 'public', 'reports', `user-${req.user.id}-report.pdf`),
    format: 'A4',
    printBackground: true
  })
  await browser.close()

  // send response
  const pdf = fs.readFileSync(path.join(global.__dirname, 'public', 'reports', `user-${req.user.id}-report.pdf`))
  res.status(200)
  res.contentType('application/pdf')
  res.send(pdf)
}
