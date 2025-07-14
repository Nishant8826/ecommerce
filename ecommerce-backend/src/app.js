
const express = require('express');
const { errorMiddleware } = require('./middlewares/error.js');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db.js');
const morgan = require('morgan');
const Stripe = require('stripe');
const cors = require('cors');

// importing routes
const orderRoutes = require('./routes/order.js');
const userRoutes = require('./routes/user.js');
const productRoutes = require('./routes/product.js');
const paymentRoutes = require('./routes/payment.js');

const app = express();
app.use(cors());
dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 5000;
const mongouri = process.env.MONGO_URI || '';
const stripeKey = process.env.STRIPE_KEY || '';


connectDB(mongouri);

module.exports.stripe = new Stripe(stripeKey);


app.use(express.json());
app.use(morgan('common'));

app.get('/', (req, res) => {
    return res.status(404).send('API is not working');
})

// using routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);


app.use('/uploads', express.static('uploads'));
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
