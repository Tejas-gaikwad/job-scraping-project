
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 5000;

const url = 'mongodb+srv://tejasg4646:Tejas0504@cluster0.f1boujn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URL
const dbName = 'job-scraping';  // Replace with your database name Mutual-fund database

async function main() {
    try {
      await mongoose.connect(url);
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    } catch (err) {
      console.error(err);
    } 
  }
  
  main().catch(console.error);