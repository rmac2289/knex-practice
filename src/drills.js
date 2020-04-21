const knex = require('knex')
require('dotenv').config()

const knexInstance = knex ({
    client: 'pg',
    connection: process.env.DB_URL,
})

function getItemsWithText(searchTerm){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

function getPaginatedItems(pageNumber){
    const itemsPerPage = 6
    const offset = itemsPerPage * (pageNumber - 1)
    knexInstance  
     .select('*')
     .from('shopping_list')
     .limit(itemsPerPage)
     .offset(offset)
     .then(result => {
         console.log(result)
     })
}

function getItemsAfterDate(daysAgo){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
        .then(result => {
            console.log(result)
        })
}

function getTotalCost(){
    knexInstance  
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum('price AS total')
        .then(result => {
            console.log(result)
        })
}
getTotalCost()