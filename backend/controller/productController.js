import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = expressAsyncHandler( async(req,res) =>{
    const products = await Product.find({})
    res.json(products)
})

const getProductById = expressAsyncHandler( async(req,res) =>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else {
        res.status(404).json({message :'item not found'})
    }
   
})

export {getProductById,getProducts}