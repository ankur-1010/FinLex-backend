import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateEquityTradeDto {
  @IsString()
  trade_id!: string;

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
  quantity: number;

  @IsString()
  ticker: string;

  @IsNumber()
  price: number;

  @IsString()
  execution_venue: string;

  @IsString()
  trader_name: string;

}