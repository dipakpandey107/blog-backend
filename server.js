
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db'); 
dotenv.config(); 
connectDB(); 
const app = express();
app.use(express.json());


const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

