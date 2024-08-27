import express from 'express';

// importing routes
import userRoutes from './routes/user.js'
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';

const port = 3000;

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(404).send('API is not working');
})

app.use('/api/v1/user', userRoutes);

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
