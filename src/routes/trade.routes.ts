import { Router } from 'express';
import { getFxTrades } from '../controllers/trade.controller';

const router = Router();

router.get('/fx-trades', getFxTrades);

export default router;