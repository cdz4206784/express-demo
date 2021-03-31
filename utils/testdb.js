var db = require('./db')

// db.insertOne('products', {_id: 157, name: '手机'}, function(err, results){
//     if(err) throw err
//     console.log('插入成功')
// })

db.findOne('users', {'username': 'cuidezhu'}, function(err, results){
    if(err) throw err
    console.log(results)
})