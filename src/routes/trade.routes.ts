import { Router } from 'express';
import { getFxTrades, getEquityTrades, searchFxTradesController, searchEquityTradesController } from '../controllers/trade.controller';


const router = Router();

//
router.get('/fx-trades', getFxTrades);
router.get('/equity-trades', getEquityTrades); // Add route for equity trades

// routes for GLOBAL search
router.get('/search-fx-trades', searchFxTradesController);
router.get('/search-equity-trades', searchEquityTradesController);


export default router;