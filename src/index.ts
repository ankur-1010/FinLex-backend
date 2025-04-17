import express from 'express';
import * as dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import tradeRoutes from './routes/trade.routes';
dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use('/api', tradeRoutes);
const port = parseInt(process.env.PORT || '4000');

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });