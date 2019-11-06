const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');

describe(`Shopping items service object`, function() {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'Shamburger',
      price: '20.00',
      category: 'Breakfast',
      checked: false,
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      name: 'Pizza',
      price: '15.50',
      category: 'Snack',
      checked: false,
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 3,
      name: 'Pasta',
      price: '19.10',
      category: 'Lunch',
      checked: false,
      date_added: new Date('2029-01-22T16:28:32.615Z')
    }
  ]
  
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
      .into('shopping_list')
      .insert(testItems)
    });

    it(`getAllItems() resolves all items from 'shopping_list' table`, () => { 
      const expectedItems = testItems.map(item => ({ 
        ...item 
      })); 
      return ShoppingListService.getAllItems(db) 
        .then(actual => { 
          expect(actual).to.eql(expectedItems) 
        })
    });
    
    it(`getById() resolves items by id from 'shopping_list' table`, () => {
      const thirdId = 3;
      const thirdItem = testItems[thirdId - 1];
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdItem.name,
            price: thirdItem.price,
            category: thirdItem.category,
            checked: false,
            date_added: thirdItem.date_added,
          })
        })
    });

    it(`deleteItem() removes item by id from 'shopping_list' table`, () => {
      const itemId = 3;
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          // copy the test items array without the "deleted" item
          const expected = testItems.filter(item => item.id !== itemId)
          expect(allItems).to.eql(expected)
        })
    })

    it(`updateItem() updates item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3
      const newItemData = {
        name: 'Fried Rice',
        price: '25.00',
        category: 'Main',
        checked: true,
        date_added: new Date(),
      }
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData,
          })
        });
    })
  });

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
        expect(actual).to.eql([])
        })
    });
    
    it(`insertItem() inserts an item and resolves the itme with an 'id'`, () => {
      const newItem = {
        name: 'Test new new name',
        price: '3.50',
        category: 'Lunch',
        checked: true,
        date_added: new Date('2020-01-01T00:00:00.000Z'),
      }
      return ShoppingListService.insertItem(db, newItem)
      .then(actual => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          checked: newItem.checked,
          date_added: newItem.date_added,
        })
      })
    });
  });

});

