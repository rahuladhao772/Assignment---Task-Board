import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './src/app.js';
dotenv.config()


const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const DATABASE_URL =process.env.MONGODB_DATABASE_URL;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// Start Server
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))