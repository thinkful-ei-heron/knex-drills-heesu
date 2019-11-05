require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchByItemName(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
    .finally(() => knexInstance.destroy());
};

searchByItemName('steak');

function paginateItems(page) {
  const  limit = 6
  const offset = limit * (page - 1)
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(limit)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
    .finally(() => knexInstance.destroy());
};

paginateItems(2);

function productsAddedDaysAgo(daysAgo) {
  knexInstance
    .select('id', 'name', 'price', 'category', 'checked', 'date_added')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
    .finally(() => knexInstance.destroy());
};

productsAddedDaysAgo(10);

function costForCategory() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
    .finally(() => knexInstance.destroy());
};

costForCategory();

