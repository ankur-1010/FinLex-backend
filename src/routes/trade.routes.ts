import { Router } from 'express';
import { getFxTrades, getEquityTrades } from '../controllers/trade.controller'; // Import both fx and equity trades controllers

const router = Router();

router.get('/fx-trades', getFxTrades);
router.get('/equity-trades', getEquityTrades); // Add route for equity trades

export default router;