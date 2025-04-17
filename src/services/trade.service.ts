import { AppDataSource } from '../config/data-source';
import { FxTrade } from '../entities/FxTrade';
import { EquityTrade } from '../entities/EquityTrade';

export const getFxTradesPaginated = async (limit: number, offset: number) => {
  const fxRepo = AppDataSource.getRepository(FxTrade);

  // Get total count of FX trades
  const total = await fxRepo.count();
  console.log('Total FX trades:*****', total); // Log the total count of FX trades

  // Get paginated FX trades
  const data = await fxRepo.find({ skip: offset, take: limit });
  console.log('FX trades*****:', data); // Log the FX trades data

  return { total, data };
};

export const getEquityTradesPaginated = async (limit: number, offset: number) => {
  const equityRepo = AppDataSource.getRepository(EquityTrade);

  // Get total count of Equity trades
  const total = await equityRepo.count();
  console.log('Total Equity trades:*****', total); // Log the total count of Equity trades

  // Get paginated Equity trades
  const data = await equityRepo.find({ skip: offset, take: limit });
  console.log('Equity trades*****:', data); // Log the Equity trades data

  return { total, data };
};