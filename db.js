const Sequelize = require('sequelize')
const faker = require('faker')
const conn = new Sequelize(process.env.DATABASE_URL, {
    logging: false
})

const Category = conn.define('category',{
    name: {
        type: Sequelize.STRING,
    }
})

const Product = conn.define('product',{
    name: {
        type: Sequelize.STRING,
    }
})

Category.hasMany(Product)

Category.createFake = function(){
    return this.create({
        name: faker.commerce.department()
    })
}

Product.createFake = function(categoryId){
    return this.create({
        name: faker.commerce.productName(),
        categoryId: categoryId 
    })
}

const syncAndSeed = () =>{
    return conn.sync({force: true})
            .then(()=>{
                Promise.all([
                    Category.createFake(),
                    Category.createFake(),
                    Category.createFake(),
                    Product.createFake(),
                    Product.createFake(), 
                ])
            })
            .catch(err=>console.log(err))
}

module.exports = {
    syncAndSeed,
    models: {
        Category,
        Product,
    }
}