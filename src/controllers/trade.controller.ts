import { Request, Response } from 'express';
import { getFxTradesPaginated, getEquityTradesPaginated } from '../services/trade.service';

export const getFxTrades = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const data = await getFxTradesPaginated(limit, offset);
  res.json(data);
};

export const getEquityTrades = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;

  const data = await getEquityTradesPaginated(limit, offset);
  res.json(data);
};