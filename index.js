const express = require('express');
const mongoose = require('mongoose');
const productHandler = require('./routeHandler/productsHandler');
const userHandler = require('./routeHandler/userHandler');
const app = express();
app.use(express.json());

// products route controller
app.use('/products',productHandler);
app.use('/users',userHandler);

// DB connection
const dbConnect = async()=>{
  try {
   await mongoose.connect('mongodb://localhost:27017/ecommerce');
   console.log('Database connected');
  } catch (error) {
    console.log( `Database connected failed ${error.message}`);
  }
} 
// Start the server
const port = 3000;
app.listen(port, async() => {
  console.log(`Server is running on http://localhost:${port}`);
  await dbConnect();
});
