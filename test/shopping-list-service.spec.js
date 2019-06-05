const ShoppingListService = require('../src/shopping-list-service.js')

const knex = require('knex')

describe(`Shopping-list service object`, () => {
  let db 
  let testItems = [
    {
      id: 1,
      name: 'Test item 1',
      price: '1.50',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 2,
      name: 'Test item 2',
      price: '5.50',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 3,
      name: 'Test item 3',
      price: '12.50',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      checked: false,
      category: 'Main'
    }
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems)
    })

    it(`getList() resolves all items from 'shopping_list' table`, () => {
      return ShoppingListService.getList(db)
        .then(actual => {
          expect(actual).to.eql(testItems)
        })
    })

    it(`getById() resolves items by if from 'shopping_list' table`, () => {
      const firstId = 1
      const firstTestItem = testItems[firstId - 1]
      return ShoppingListService.getById(db, firstId)
        .then(actual => {
          expect(actual).to.eql({
            id: firstId,
            name: firstTestItem.name,
            price: firstTestItem.price,
            date_added: firstTestItem.date_added,
            checked: false,
            category: firstTestItem.category
          })
        })
    })

    it(`updateItem() updates fields on item by id from 'shopping_list' table`, () => {
      const updateItemId = 1
      const newItemData = {
        name: 'Update Test',
        price: '10.40',
        date_added: new Date(),
        checked: true,
        category: 'Lunch'
      }
      return ShoppingListService.updateItem(db, updateItemId, newItemData)
        .then(() => ShoppingListService.getById(db, updateItemId))
        .then(item => {
          expect(item).to.eql({
            id: updateItemId,
            ...newItemData
          })
        })
    })

    it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
      const itemId = 1
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getList(db))
        .then(list => {
          const expected = testItems
            .filter(item => item.id !== itemId)
            .map(item => ({
              ...item,
              checked: false,
            }))
          expect(list).to.eql(expected)
        })
    })
  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getList() resolves an empty array`, () => {
      return ShoppingListService.getList(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })

    it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
      const newItem = {
        name: 'Test new title',
        price: '60.40',
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        checked: false,
        category: 'Main',
      }
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            price: newItem.price,
            date_added: newItem.date_added,
            checked: newItem.checked,
            category: newItem.category
          })
        })
      })
  })
})