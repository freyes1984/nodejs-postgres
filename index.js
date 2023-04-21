//Freyes 2023-04-21 
//Routes and config
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

app.get('/allcustomersasync', db.getAllCustomersAsync)
app.get('/allcategories', db.getAllCategories)
app.get('/allproducts', db.getProducts)
app.get('/allcustomers', db.getCustomers)
app.get('/customers/:id', db.getCustomersById)
app.get('/totalorders', db.getTotalOrders)
app.get('/allproductsbycategories', db.getProductsCategoriesProviders)
app.post('/newcategory', db.createNewCategory)

app.listen(config.PORT, () => {
    console.log(`App running on port ${config.PORT}.`)
})