import puppeteer from 'puppeteer'
import path from 'node:path'
import fs from 'node:fs'
import Handlebars from 'handlebars'
// repositories
import { getOrdersAll } from '../repositories/orders.js'
export async function generateSaleOrder (req, res) {
  // prepare and configure hbs template
  const file = path.join(global.__dirname, 'public', 'templates', 'report.hbs')
  const sourceTemplate = fs.readFileSync(file, 'utf-8')
  const template = Handlebars.compile(sourceTemplate)
  // get orders
  let orders = null
  try {
    const response = await getOrdersAll(req.token)
    orders = response.data.results
  } catch (error) {
    res.status(400).json({
      message: 'No se pudieron obtener las ordenes de venta'
    })
    return
  }
  const items = orders.map(order => (order.order_items[0]))
  console.log(orders)
  // prepare the data
  const currentDate = new Date().toLocaleString()
  const data = {
    user: req.user,
    currentDate,
    items
  }
  // generate pdf file
  const html = template(data)
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
    printBackground: true
  })
  await browser.close()
  res.status(200).json({
    message: 'ok'
  })
}
