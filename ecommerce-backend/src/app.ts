import express from 'express';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import NodeCache from 'node-cache'
import { config } from 'dotenv';

// importing routes
import userRoutes from './routes/user.js'
import productRoutes from './routes/product.js'
import orderRoutes from './routes/order.js'
import morgan from 'morgan';

config({
    path: './.env'
})

const port = process.env.PORT || 4000;
const mongouri = process.env.MONGO_URI || '';

connectDB(mongouri);

export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(morgan('common'));

app.get('/', (req, res) => {
    return res.status(404).send('API is not working');
})

// using routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);


app.use('/uploads', express.static('uploads'));
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
