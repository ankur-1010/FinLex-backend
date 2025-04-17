import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateFxTradeDto {
  @IsString()
  trade_id: string;

  @IsDateString()
  trade_date: string;

  @IsDateString()
  value_date: string;

  @IsString()
  counterparty: string;

  @IsString()
  product_type: string;

  @IsString()
  buy_sell: string;

  @IsNumber()
  notional: number;

  @IsString()
  currency: string;

  @IsNumber()
  rate: number;

  @IsString()
  execution_venue: string;

  @IsString()
  trader_name: string;

  @IsString()
  currency_pair: string;
}