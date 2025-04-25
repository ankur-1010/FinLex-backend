import { Router } from 'express';


import { getFxTrades, getEquityTrades, searchFxTradesController, searchEquityTradesController, searchFxTradesByFieldController, searchEquityTradesByFieldController } from '../controllers/trade.controller';




const router = Router();

//
router.get('/fx-trades', getFxTrades);
router.get('/equity-trades', getEquityTrades); // Add route for equity trades

// routes for GLOBAL search
router.get('/search-fx-trades', searchFxTradesController);
router.get('/search-equity-trades', searchEquityTradesController);

// Route for search by a specific field
router.get('/fx-trades/search-by-field', searchFxTradesByFieldController); 
router.get('/equity-trades/search-by-field', searchEquityTradesByFieldController); 

export default router;
