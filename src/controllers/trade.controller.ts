import { Request, Response } from 'express';
import { getFxTradesPaginated } from '../services/trade.service';

export const getFxTrades = async (req: Request, res: Response) => {
  // console.log('Received request for FX trades:-------------', req.query); // Debugging line
  // console.log('Request query parameters:**********', req.query); // Debugging line
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const data = await getFxTradesPaginated(limit, offset);
  // console.log('Data fetched from service:**********', data); // Debugging line
  res.json(data);
};