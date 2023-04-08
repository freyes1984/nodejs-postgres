const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const config = require('./config')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'})
})

app.get('/customersasync', db.getCustomersAsync)
app.get('/categories', db.getCategories)
app.get('/products', db.getProducts)
app.get('/customers', db.getCustomers)
app.get('/customers/:id', db.getCustomersById)
app.get('/totalorders', db.getTotalOrders)

app.listen(config.PORT, () => {
    console.log(`App running on port ${config.PORT}.`)
})