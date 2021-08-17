const express = require('express')
const router = express.Router()
const Stock = require('../models/stocks')

//All stocks route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const stocks = await Stock.find(searchOptions)
        res.render('stocks/index', { 
            stocks: stocks,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//New stock route
router.get('/new', (req, res) => {
    res.render('stocks/new', { stock: new Stock() })
})

//Create stock route
router.post('/', async (req, res) => {
    const stock = new Stock({
        name: req.body.name
    })
    try{
        const newStock = await stock.save()
        // res.redirect('stocks/${newStock.id')
        res.redirect('stocks')
    } catch {
        res.render('stocks/new', {
            stock: stock,
            errorMessage: 'Error creating stock'
        })
    }
})

module.exports = router