//Freyes 2023-04-21 
//Routes and config
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const config = require('./config/config')
const cors = require('cors')

const ClienteModel = require("./model/cliente.model")

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/allcustomersasync', db.getAllCustomersAsync)
app.get('/allcategories', db.getAllCategories)
app.get('/allproducts', db.getProducts)
app.get('/allcustomers', db.getCustomers)
app.get('/customers/:id', db.getCustomersById)
app.get('/totalorders', db.getTotalOrders)
app.get('/allproductsbycategories', db.getProductsCategoriesProviders)
app.post('/newcategory', db.createNewCategory)

app.get('/api/clientes', ClienteModel.customerAll)
app.get('/api/clientes/:id', ClienteModel.customerById)
app.put('/api/clientes/:id', ClienteModel.customerEdit)
app.post('/api/clientes/registrar', ClienteModel.customerRegister)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(config.PORT, () => {
  console.log(`App running on port ${config.PORT}.`)
})