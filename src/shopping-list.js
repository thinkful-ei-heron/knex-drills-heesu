require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('./shopping-list-service');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

console.log(ShoppingListService.getAllItems());

// ShoppingListService.getAllItems(knexInstance)
//   .then(items => console.log(items))
//   .then(() =>
//   ShoppingListService.insertItem(knexInstance, {
//       name: 'New name',
//       price: 'New price',
//       category: 'New category',
//       checked: false,
//       date_added: new Date(),
//     })
//   )
//   .then(newItem => {
//     console.log(newItem)
//     return ShoppingListService.updateItem(
//       knexInstance,
//       newItem.id,
//       { name: 'Updated name' }
//     ).then(() => ShoppingListService.getById(knexInstance, newItem.id))
//   })
//   .then(article => {
//     console.log(article)
//     return ShoppingListService.deleteItem(knexInstance, item.id)
//   })


