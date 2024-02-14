import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `SELECT
  item.id AS id,
  item.name AS name,
  item.description AS description,
  item.code AS code,
  item.type AS type,
  item.unit AS unit,
  pharmacy_price.pharmacyId as pricePharmacyId,
  pharmacy_price.price as price,
  pharmacy_stock.pharmacyId as stockPharmacyId,
  pharmacy_stock.stock as stock
  FROM item item
  LEFT JOIN
  pharmacy_price pharmacy_price
  ON item.id = pharmacy_price.itemId
  LEFT JOIN
  pharmacy_stock pharmacy_stock
  ON item.id = pharmacy_stock.itemId`,
})
export class ItemList {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  code: string;

  @ViewColumn()
  type: number;

  @ViewColumn()
  unit: string;

  @ViewColumn()
  pricePharmacyId: number;

  @ViewColumn()
  stockPharmacyId: number;

  @ViewColumn()
  price: number;

  @ViewColumn()
  stock: number;
}
