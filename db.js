const Pool =require('pg').Pool

// const pool=new Pool({
//     user:"postgres",
//     host:"127.0.0.1:5432",
//     port:5432,
//     database:"perntodo"
// })

const pool =new Pool({
    connectionString:"postgres://gbowcjzc:LVM92WZGoGAnWdT5I28z67ibtbDU3g78@drona.db.elephantsql.com/gbowcjzc"
})

module.exports=pool