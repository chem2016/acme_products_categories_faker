const express = require('express')
const app = express()
const db = require('./db')
const { Category, Product } = db.models
const { syncAndSeed } = require('./db')
const path = require('path')

app.use(express.json())
// if request app.js in index html, redirect main.js from webpack
// app.use('/app.js',(req, res, next)=>{
//     res.sendFile(path.join(__dirname, 'dist', 'main.js'))
// })

// app.use('/',(req, res, next)=>{
//     res.sendFile(path.join(__dirname, 'index.html'))
// })
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/api/categories', (req,res,next)=>{
    Category.findAll()
        .then((categories)=>{
            res.send(categories)
        })
        .catch(next)
})

app.post('/api/categories',()=>{
    Category.createFake()
        .then(()=>{
            return Category.findAll()
        })
        .then((categories)=>{
            res.send(categories)
        })
        .catch(next)
})

app.post('/api/categories/:id/products',(req, res, next)=>{
    Product.createFake(req.params.id)
        .then(()=>{
            return Category.findAll({
                where: {
                    CategoryId: req.params.id
                }
            }   
            )
        })
        .then((categories)=>{
            res.send(categories)
        })
        .catch(next)
})

app.delete('/api/categories/:id',(req, res, next)=>{
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(()=>{res.sendStatus(204)})
    .catch(next)   
})

app.delete('/api/products/:id',(req, res, next)=>{
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(()=>{res.sendStatus(204)})
    .catch(next)  
})



const port = process.env.PORT || 3000

syncAndSeed()
    .then(()=>{
        app.listen(port, console.log(`listening on port ${port}`))
    })

