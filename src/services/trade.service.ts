import { AppDataSource } from '../config/data-source';
import { FxTrade } from '../entities/FxTrade';
import { EquityTrade } from '../entities/EquityTrade';


export const getFxTradesPaginated = async (limit: number, offset: number) => {
  const fxRepo = AppDataSource.getRepository(FxTrade);
  // console.log('Fetching FX trades with limit:', limit, 'and offset:', offset);
  // console.log('FX trades repository:', fxRepo); // Debugging line
  return fxRepo.find({ skip: offset, take: limit });
};


export const getEquityTradesPaginated = async (limit: number, offset: number) => {
  const equityRepo = AppDataSource.getRepository(EquityTrade);
  return equityRepo.find({ skip: offset, take: limit });
};