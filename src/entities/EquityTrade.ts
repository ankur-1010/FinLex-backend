import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EquityTrade {
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
  quantity!: number;

  @Column()
  ticker!: string;

  @Column('numeric')
  price!: number;

  @Column()
  execution_venue!: string;

  @Column()
  trader_name!: string;
}
