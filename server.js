const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect("mongodb+srv://mokchheduls46:mokchhedul@cluster0.cxqeo.mongodb.net/saas?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected for Successfully"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// Test Route
app.get('/', (req, res) => res.send("SaaS School API is Running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));