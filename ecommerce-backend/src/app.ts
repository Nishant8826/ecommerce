import express from 'express';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import NodeCache from 'node-cache'

// importing routes
import userRoutes from './routes/user.js'
import productRoutes from './routes/product.js'

const port = 3000;

connectDB();

export const myCache = new NodeCache();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(404).send('API is not working');
})

// using routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);


app.use('/uploads',express.static('uploads'));
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
