/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  //trancate all existing tables
  await knex.raw('TRUNCATE TABLE "shops" CASCADE');
  await knex.raw('TRUNCATE TABLE "addresses" CASCADE');
  await knex.raw('TRUNCATE TABLE "bouquets" CASCADE');

  await knex('shops').insert([
    {id: 1, shop_name: 'shop1'},
    {id: 2, shop_name: 'shop2'},
    {id: 3, shop_name: 'shop3'}
  ]);

  await knex('addresses').insert([
    {id: 1, address: 'address1', shop_id: 1},
    {id: 2, address: 'address2', shop_id: 2},
    {id: 3, address: 'address3', shop_id: 3},
    {id: 4, address: 'address4', shop_id: 1}
  ]);

  await knex('bouquets').insert([
    {id: 1, bouquet: 'bouquet1', shop_id: 1},
    {id: 2, bouquet: 'bouquet2', shop_id: 2},
    {id: 3, bouquet: 'bouquet3', shop_id: 3},
    {id: 4, bouquet: 'bouquet4', shop_id: 1}
  ]);
};
