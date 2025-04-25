import { format } from 'date-fns';
import { AppDataSource } from '../config/data-source';
import { FxTrade } from '../entities/FxTrade';
import { EquityTrade } from '../entities/EquityTrade';

const fxRepo = AppDataSource.getRepository(FxTrade);
const equityRepo = AppDataSource.getRepository(EquityTrade);



//---------------------------------Function to get paginated FX trades --------------------------------------------------

export const getFxTradesPaginated = async (limit: number, offset: number) => {
  // Get total count of FX trades
  const total = await fxRepo.count();
  // console.log('Total FX trades:*****', total); // Log the total count of FX trades

  // Get paginated FX trades
  const data = await fxRepo.find({ skip: offset, take: limit });
  // console.log('FX trades*****:', data); // Log the FX trades data
  const formattedData = data.map((trade) => ({
    ...trade,
    trade_date: format(new Date(trade.trade_date), 'yyyy-MM-dd HH:mm:ss'),
    value_date: format(new Date(trade.value_date), 'yyyy-MM-dd HH:mm:ss'),
  }));

  return { total, data: formattedData };
};



//-------------------------------- Function to get paginated Equity trades-----------------------------------------------



export const getEquityTradesPaginated = async (limit: number, offset: number) => {

  // Get total count of Equity trades
  const total = await equityRepo.count();
  // console.log('Total Equity trades:*****', total); // Log the total count of Equity trades


  // Get paginated Equity trades
  const data = await equityRepo.find({ skip: offset, take: limit });
  // console.log('Equity trades*****:', data); // Log the Equity trades data

  const formattedData = data.map((trade) => ({
    ...trade,
    trade_date: format(new Date(trade.trade_date), 'yyyy-MM-dd HH:mm:ss'),
    value_date: format(new Date(trade.value_date), 'yyyy-MM-dd HH:mm:ss'),
  }));

  return { total, data: formattedData };
};




//----------------------------------- Global Search in fx_trades table--------------------------------------------------------


export const searchFxTrades = async (searchTerm: string, limit: number, offset: number) => {

  const data = await fxRepo
    .createQueryBuilder('fx')
    .where('CAST(fx.trade_id AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(fx.trade_date AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` }) // Cast to TEXT

    .orWhere('CAST(fx.value_date AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` }) // Cast to TEXT

    .orWhere('fx.counterparty ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.product_type ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.buy_sell ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.currency ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.execution_venue ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.trader_name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.currency_pair ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(fx.notional AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(fx.rate AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    .skip(offset)
    .take(limit)
    .getMany();

  // console.log('FX trades*****:', data); // Log the FX trades data


  // Format dates to local time zone
  const formattedData = data.map((trade) => ({
    ...trade,
    trade_date: format(new Date(trade.trade_date), 'yyyy-MM-dd HH:mm:ss'),
    value_date: format(new Date(trade.value_date), 'yyyy-MM-dd HH:mm:ss'),
  }));

  // console.log('FX trades*****:', formattedData); // Log the FX trades data

  const total = await fxRepo
    .createQueryBuilder('fx')
    .where('CAST(fx.trade_id AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(fx.trade_date AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` }) // Cast to TEXT

    .orWhere('CAST(fx.value_date AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` }) // Cast to TEXT

    .orWhere('fx.counterparty ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.product_type ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.buy_sell ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.currency ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.execution_venue ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.trader_name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('fx.currency_pair ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(fx.notional AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(fx.rate AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    .getCount();

  return { total, data: formattedData };
};



//-------------------------------------  Global Search in equity_trades table --------------------------------------------------------



export const searchEquityTrades = async (searchTerm: string, limit: number, offset: number) => {

  const data = await equityRepo
    .createQueryBuilder('equity')
    .where('CAST(equity.trade_id AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(equity.trade_date AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(equity.value_date AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.counterparty ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.product_type ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.buy_sell ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.ticker ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.execution_venue ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.trader_name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(equity.quantity AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(equity.price AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .skip(offset)
    .take(limit)
    .getMany();


  // Format dates to local time zone
  const formattedData = data.map((trade) => ({
    ...trade,
    trade_date: format(new Date(trade.trade_date), 'yyyy-MM-dd HH:mm:ss'),
    value_date: format(new Date(trade.value_date), 'yyyy-MM-dd HH:mm:ss'),
  }));

  const total = await equityRepo
    .createQueryBuilder('equity')
    .where('CAST(equity.trade_id AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(equity.trade_date AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(equity.value_date AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.counterparty ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.product_type ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.buy_sell ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.ticker ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.execution_venue ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('equity.trader_name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(equity.quantity AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .orWhere('CAST(equity.price AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })

    .getCount();

  return { total, data: formattedData };
};


//----------------------------------- Search in fx_trades table by a specific field----------------------------------------
export const searchFxTradesByField = async (
  fieldName: string,
  searchTerm: string,
  limit: number,
  offset: number
) => {
  // Validate the field name to prevent SQL injection
  const validFields = [
    'trade_id',
    'trade_date',
    'value_date',
    'counterparty',
    'product_type',
    'buy_sell',
    'currency',
    'execution_venue',
    'trader_name',
    'currency_pair',
    'notional',
    'rate',
  ];

  if (!validFields.includes(fieldName)) {
    throw new Error('Invalid field name');
  }

  // Build the query dynamically
  const data = await fxRepo
    .createQueryBuilder('fx')
    .where(`CAST(fx.${fieldName} AS TEXT) ILIKE :searchTerm`, { searchTerm: `%${searchTerm}%` })
    .skip(offset)
    .take(limit)
    .getMany();

  // Format dates to local time zone
  const formattedData = data.map((trade) => ({
    ...trade,
    trade_date: format(new Date(trade.trade_date), 'yyyy-MM-dd HH:mm:ss'),
    value_date: format(new Date(trade.value_date), 'yyyy-MM-dd HH:mm:ss'),
  }));

  // Get the total count for the specific field
  const total = await fxRepo
    .createQueryBuilder('fx')
    .where(`CAST(fx.${fieldName} AS TEXT) ILIKE :searchTerm`, { searchTerm: `%${searchTerm}%` })
    .getCount();

  return { total, data: formattedData };
};


//----------------------------------- Search in equity_trades table by a specific field----------------------------------------
export const searchEquityTradesByField = async (
  fieldName: string,
  searchTerm: string,
  limit: number,
  offset: number
) => {
  // Validate the field name to prevent SQL injection
  const validFields = [
    'trade_id',
    'trade_date',
    'value_date',
    'counterparty',
    'product_type',
    'buy_sell',
    'ticker',
    'execution_venue',
    'trader_name',
    'quantity',
    'price',
  ];

  if (!validFields.includes(fieldName)) {
    throw new Error('Invalid field name');
  }

  // Build the query dynamically
  const data = await equityRepo
    .createQueryBuilder('equity')
    .where(`CAST(equity.${fieldName} AS TEXT) ILIKE :searchTerm`, { searchTerm: `%${searchTerm}%` })
    .skip(offset)
    .take(limit)
    .getMany();

  // Format dates to local time zone
  const formattedData = data.map((trade) => ({
    ...trade,
    trade_date: format(new Date(trade.trade_date), 'yyyy-MM-dd HH:mm:ss'),
    value_date: format(new Date(trade.value_date), 'yyyy-MM-dd HH:mm:ss'),
  }));

  // Get the total count for the specific field
  const total = await equityRepo
    .createQueryBuilder('equity')
    .where(`CAST(equity.${fieldName} AS TEXT) ILIKE :searchTerm`, { searchTerm: `%${searchTerm}%` })
    .getCount();

  return { total, data: formattedData };
};