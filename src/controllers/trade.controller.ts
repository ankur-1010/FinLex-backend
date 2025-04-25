
import { Request, Response } from 'express';
import { getFxTradesPaginated, getEquityTradesPaginated } from '../services/trade.service';
import { searchFxTrades, searchEquityTrades } from '../services/trade.service';
import { searchFxTradesByField, searchEquityTradesByField } from '../services/trade.service'; // Import the new service function


//Function to get FX trades with pagination
export const getFxTrades = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const { total, data } = await getFxTradesPaginated(limit, offset);
  res.json({ total, length: data.length, data });
};

//Function to get Equity trades with pagination
export const getEquityTrades = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const { total, data } = await getEquityTradesPaginated(limit, offset);
  res.json({ total, length: data.length, data });
};

// Controller for searching fx_trades
export const searchFxTradesController = async (req: Request, res: Response) => {
  const searchTerm = req.query.search as string || '';
  console.log("searchTerm*****  ", searchTerm); // Log the search term
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const { total, data } = await searchFxTrades(searchTerm, limit, offset);
  res.json({ total, length: data.length, data });
};

// Controller for searching equity_trades
export const searchEquityTradesController = async (req: Request, res: Response) => {
  const searchTerm = req.query.search as string || '';
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const { total, data } = await searchEquityTrades(searchTerm, limit, offset);
  res.json({ total, length: data.length, data });
};


// Controller for searching fx_trades by a specific field
export const searchFxTradesByFieldController = async (req: Request, res: Response) => {
  const fieldName = req.query.field as string; // Field to search
  const searchTerm = req.query.search as string || ''; // Search term
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  try {
    const { total, data } = await searchFxTradesByField(fieldName, searchTerm, limit, offset);
    res.json({ total, length: data.length, data });
  } catch (error) {
    console.error('Error in searchFxTradesByFieldController:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

// Controller for searching equity_trades by a specific field
export const searchEquityTradesByFieldController = async (req: Request, res: Response) => {
  const fieldName = req.query.field as string; // Field to search
  const searchTerm = req.query.search as string || ''; // Search term
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  try {
    const { total, data } = await searchEquityTradesByField(fieldName, searchTerm, limit, offset);
    res.json({ total, length: data.length, data });
  } catch (error) {
    console.error('Error in searchEquityTradesByFieldController:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
