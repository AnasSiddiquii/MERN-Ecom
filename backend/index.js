const express = require('express')
const cors = require('cors')
require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')
const app = express()

app.use(express.json())
app.use(cors())

// app.get('/users',async(req,resp)=>{
//     let user = await User.find()
//     if(user.length>0){
//         resp.send(user)
//     }
//     else{
//         resp.send({result:'no product found'})
//     }
// })

app.post('/signup',async(req,resp)=>{
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    resp.send(result)
})

app.post('/login',async(req,resp)=>{
    let result = await User.findOne(req.body).select('-password')
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no user found'})
    }
})

app.get('/products',async(req,resp)=>{
    let product = await Product.find()
    if(product.length>0){
        resp.send(product)
    }
    else{
        resp.send({result:'no product found'})
    }
})

app.post('/add',async(req,resp)=>{
    let product = new Product(req.body)
    let result = await product.save()
    resp.send(result)
})

//////////////////////////////////////////////////////////////////

app.delete('/remove/:id',async(req,resp)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.get('/edit/:id',async(req,resp)=>{
    let product = await Product.findOne({_id:req.params.id})
    if(product){
        resp.send(product)
    }
    else{
        resp.send({result:'no product found'})
    }
})

app.put('/edit/:id',async(req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/search/:key',async(req,resp)=>{
    let product = await Product.find({
        '$or':[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    })
    if(product.length>0){
        resp.send(product)
    }
    else{
        resp.send({result:'no product found'})
    }
})

app.listen(5001)