const express = require('express');
const route = express.Router();
const checkLogin = require('../middlware/auth_middlware');
const productSchema = require('../migration/product_migration');
const mongoose = require('mongoose');
const Product = mongoose.model('product', productSchema);

//find all products
route.get('/',async(req,res)=>{
 products = await Product.find();
 return res.status(200).send(products);
});
// find a specific product
route.get('/:id',async(req,res)=>{
    try {
        const productId = req.params.id; // Extract the product ID from the route parameter
        const product = await Product.findById(productId);
    
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        return res.status(200).json(product);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
   });
// insert single product document
route.post('/',checkLogin,async (req, res) => {
    try {
        const { title, price, description, addDate, status } = req.body;

        // Use Model.create() to insert a new product directly
        const product = await Product.create({
            title: title,
            price: price,
            description: description,
            addDate: addDate,
            status: status
        });

        res.send(product);
    } catch (error) {
        res.status(500).send('Error inserting data: ' + error.message);
    }
});

// insert multiple product document onece
route.post('/many', async (req,res)=>{
  try {
    const productsData = req.body;
    const products = await Product.create(productsData);
    res.status(200).send("Products insert successfully");
  } catch (error) {
    res.status(500).send('Error inserting data: ' + error.message);
  }
});
// update proudct data
route.put('/:id', async(req,res)=>{
  try {
     const productId = req.params.id;
     const updateData = req.body;
     const updateProduct = await Product.findByIdAndUpdate({_id:productId},updateData,
        // return new data
        {new:true} 
        );
    if(!updateProduct){
        return res.status(404).send('Product not found');
    }else{
     return res.status(200).send('Product update successfully');
    }    
  } catch (error) {
    res.status(500).send('Error updating products: ' + error.message);
  }
});
//Delete a product data
route.delete('/:id',async (req,res)=>{
    try {
        const productId = req.params.id; // Extract the product ID from the route parameter
        const product = await Product.deleteOne({_id:productId});
    
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        return res.status(200).json("Product delete succssfully");
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
});
module.exports = route;
