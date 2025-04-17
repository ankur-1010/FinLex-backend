import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FxTrade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  trade_id!: string;

  @Column()
  trade_date!: Date;

  @Column()
  value_date!: Date;

  @Column()
  counterparty!: string;

  @Column()
  product_type!: string;

  @Column()
  buy_sell!: string;

  @Column('numeric')
  notional!: number;

  @Column()
  currency!: string;

  @Column('numeric')
  rate!: number;

  @Column()
  execution_venue!: string;

  @Column()
  trader_name!: string;

  @Column()
  currency_pair!: string;
}
