import { format } from 'date-fns';
import { AppDataSource } from '../config/data-source';
import { FxTrade } from '../entities/FxTrade';
import { EquityTrade } from '../entities/EquityTrade';
import { subDays, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

const getDateRange = (filter: string): { startDate: Date; endDate: Date } => {
  const today = new Date();
  console.log('Today:***', today); // Log the current date
  const year = today.getFullYear();
  console.log('Year:***', year); // Log the current year
  console.log('Filter:***', filter); // Log the filter value

  switch (filter.toLowerCase()) {
    case 'yesterday':
      return {
        startDate: startOfDay(subDays(today, 1)),
        endDate: endOfDay(subDays(today, 1)),
      };
    case 'today':
      return {
        startDate: startOfDay(today),
        endDate: endOfDay(today),
      };
    case 'last 15 days':
      return {
        startDate: subDays(today, 15),
        endDate: endOfDay(today),
      };
    case 'this month':
      return {
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
      };
    case '1st quarter':
      return {
        startDate: new Date(year, 3, 1), // Apr 1
        endDate: new Date(year, 5, 30), // june 30
      };
    case '2nd quarter':
      return {
        startDate: new Date(year, 6, 1), // jul 1
        endDate: new Date(year, 8, 30), // sep 30
      };
    case '3rd quarter':
      return {
        startDate: new Date(year, 9, 1), // oct 1
        endDate: new Date(year, 11, 31), // dec 30
      };
    case '4th quarter':
      return {
        startDate: new Date(year, 0, 1), // jan 1
        endDate: new Date(year, 2, 31), // mar 31
      };
    case 'this year':
      return {
        startDate: startOfYear(today),
        endDate: endOfYear(today),
      };
    case 'previous year':
      return {
        startDate: startOfYear(new Date(year - 1, 0, 1)),
        endDate: endOfYear(new Date(year - 1, 11, 31)),
      };
    default:
      throw new Error('Invalid date filter');
  }
};

const fxRepo = AppDataSource.getRepository(FxTrade);
const equityRepo = AppDataSource.getRepository(EquityTrade);



//---------------------------------1. Function to get paginated FX trades --------------------------------------------------

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








//--------------------------------2.Function to get paginated Equity trades-----------------------------------------------



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



















//-----------------------------------3. Global Search in fx_trades table--------------------------------------------------------


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





//-------------------------------------4. Global Search in equity_trades table --------------------------------------------------------



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


















//----------------------------------- 5. Search in fx_trades table by a specific field----------------------------------------
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








//-----------------------------------6.Search in equity_trades table by a specific field----------------------------------------
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



//------------------------7. Get Fx-trades by date range--------------------------------------------------------

export const getFxTradesByDateRange = async (
  dateFilter: string,
  dateField: 'trade_date' | 'value_date',
  limit: number,
  offset: number
) => {
  const query = fxRepo.createQueryBuilder('fx');

  // Get the date range
  const { startDate, endDate } = getDateRange(dateFilter);

  // Add date range filter dynamically based on the dateField
  query.where(`fx.${dateField} BETWEEN :startDate AND :endDate`, {
    startDate,
    endDate,
  });

  // Fetch data with pagination
  const data = await query.skip(offset).take(limit).getMany();

  // Format dates to local time zone
  const formattedData = data.map((trade) => ({
    ...trade,
    trade_date: format(new Date(trade.trade_date), 'yyyy-MM-dd HH:mm:ss'),
    value_date: format(new Date(trade.value_date), 'yyyy-MM-dd HH:mm:ss'),
  }));

  // Get total count
  const total = await query.getCount();

  return { total, data: formattedData };
};




//----------------------------------8. Get Equity-trades by date range--------------------------------------------------------
export const getEquityTradesByDateRange = async (
  dateFilter: string,
  dateField: 'trade_date' | 'value_date',
  limit: number,
  offset: number
) => {
  const query = equityRepo.createQueryBuilder('equity');

  // Get the date range
  const { startDate, endDate } = getDateRange(dateFilter);

  // Add date range filter dynamically based on the dateField
  query.where(`equity.${dateField} BETWEEN :startDate AND :endDate`, {
    startDate,
    endDate,
  });

  // Fetch data with pagination
  const data = await query.skip(offset).take(limit).getMany();

  // Format dates to local time zone
  const formattedData = data.map((trade) => ({
    ...trade,
    trade_date: format(new Date(trade.trade_date), 'yyyy-MM-dd HH:mm:ss'),
    value_date: format(new Date(trade.value_date), 'yyyy-MM-dd HH:mm:ss'),
  }));

  // Get total count
  const total = await query.getCount();

  return { total, data: formattedData };
};