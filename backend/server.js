// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
connectDB();



// Mount product routes
app.use('/api/products', productRoutes);
const __dirname=path.resolve();

if(process.env.NODE_EV==="production"){
  app.use(express.static(path.join(__dirname,'/frontend/dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
})
}
// Root route
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
