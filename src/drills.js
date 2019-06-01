require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

function itemByTerm(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `${searchTerm}`)
    .then(result => {
      console.log(result)
    })
}

function paginateItems(pageNumber) {
  const productsPerPage = 6
  const offset = productsPerPage * (pageNumber - 1)

  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

function addedAfterDate(daysAgo) {
  knexInstance
    .select('*')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .from('shopping_list')
    .then(result => {
      console.log(result)
    })
}

function totalByCategory() {
  select('*')
  .count('price AS total_price')
  .from('shopping_list')
  .groupBy('category')
  .orderBy([
    { column: 'category', order: 'ASC' }
  ])
  .then(result => {
    console.log(result)
  })
}