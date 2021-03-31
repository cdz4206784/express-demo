// npm install mongodb
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://root:www123456@todos.dfvmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// Promise 四连:增加 、查询 、更改 、删除
// MongoClient.connect(url).then((conn)=>{
//     console.log('数据库已连接');
//     const test = conn.db('runoob').collection('test');
//     // 增加
//     test.insertOne({site: 'runoob.com'}).then(res=>{
//         // 查询
//         return test.find().toArray().then(arr=>{
//             console.log(arr)
//         })
//     }).then(()=>{
//         // 更改
//         return test.updateMany({site: 'runoob.com'}, {$set: {site: 'example.com'}})
//     }).then(res=>{
//         // 查询
//         return test.find().toArray().then((arr) => {
//             console.log(arr);
//         });
//     }).then(()=>{
//         // 删除
//         return test.deleteMany({site: 'example.com'});
//     }).then(res=>{
//         // 查询
//         return test.find().toArray().then((arr) => {
//             console.log(arr);
//         });
//     }).catch(err=>{
//         console.log("数据操作失败" + err.message);
//     }).finally(()=>{
//         conn.close()
//     })

// }).catch((err)=>{
//     console.log('数据库连接失败');
// })


// 异步操作
async function dataOperate(){
    var conn = null
    try {
        conn = await MongoClient.connect(url);
        console.log("数据库已连接");
        const test = conn.db("runoob").collection('test');

        // 增加
        await test.insertOne({'site': 'runoob.com'})

        // 查询
        var arr = await test.find().toArray();
        console.log(arr);

        // 更改
        await test.updateMany({'site': 'runoob.com'}, {$set: {'site': 'example.com'}});

        // 查询
        arr = await test.find().toArray();
        console.log(arr);

        // 删除
        await test.deleteMany({'site': 'example.com'})

        // 查询
        arr = await test.find().toArray();
        console.log(arr);

    } catch (err) {
        console.log("错误：" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}


dataOperate()


// 创建数据库
// MongoClient.connect(url, function(err, db){
//     if (err) throw err
//     console.log('数据库已创建')

//     let dbase = db.db("runoob")
//     // 创建集合
//     // dbase.createCollection('site', function (err, res) {
//     //     if (err) throw err
//     //     console.log("创建集合!")
//     //     db.close()
//     // })

//     // 插入一条数据
//     // let myobj = {
//     //     name: '菜鸟教程',
//     //     url: 'www.runoob.com'
//     // }
//     // dbase.collection('site').insertOne(myobj, function(err, res){
//     //     if(err) throw err
//     //     console.log('文档插入成功')
//     //     db.close()
//     // })

//     // 插入多条数据
//     // let myobj = [
//     //     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
//     //     { name: 'Google', url: 'https://www.google.com', type: 'en'},
//     //     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
//     // ]
//     // dbase.collection('site').insertMany(myobj, function(err, res){
//     //     if(err) throw err
//     //     console.log(res.insertedCount)
//     //     db.close()
//     // })

//     // 查找数据
//     // dbase.collection('site').find({}).toArray(function(err, result){    //返回集合中所有数据
//     //     if(err) throw err
//     //     console.log(result)
//     //     db.close()
//     // })

//     // 查找name为菜鸟教程的数据
//     // dbase.collection('site').find({"name": "菜鸟教程"}).toArray(function(err, result){
//     //     if(err) throw err
//     //     console.log(result)
//     //     db.close()
//     // })

//     // 更新一条数据
//     // dbase.collection('site').updateOne({name: '菜鸟教程'}, {$set: {type: 'cn'}}, function(err, res){
//     //     if(err) throw err
//     //     console.log('文档更新成功');
//     //     db.close()
//     // })

//     // 更新多条数据
//     // dbase.collection('site').updateMany({type: 'en'}, {$set: {url: 'https://wwww.runoob.com'}}, function(err, res){
//     //     if(err) throw err
//     //     console.log(res.result.nModified+' 条文档被更新')
//     //     db.close()
//     // })

//     // 删除一条数据
//     // dbase.collection('site').deleteOne({name: '菜鸟教程'}, function(err, res){
//     //     if(err) throw err
//     //     console.log('文档删除成功')
//     //     db.close()
//     // })

//     // 删除多条记录
//     // dbase.collection('site').deleteMany({type: 'en'}, function(err, res){
//     //     if(err) throw err
//     //     console.log(res.result.n + ' 条文档被删除')
//     //     db.close()
//     // })

//     // 排序sort
//     // dbase.collection('site').find().sort({type: -1}).toArray(function(err, res){
//     //     if(err) throw err
//     //     console.log(res)
//     //     db.close()
//     // })

//     // 分页limit skip
//     // dbase.collection('site').find().limit(2).skip(2).toArray(function(err, res){
//     //     if(err) throw err
//     //     console.log(res)
//     //     db.close()
//     // })

//     // 左链接 $lookup
//     // dbase.collection('orders').aggregate([
//     //     {$lookup: {
//     //         from: 'products',   // 右集合
//     //         localField: 'product_id',   // 左集合 join 字段
//     //         foreignField: '_id',    // 右集合 join 字段
//     //         as: 'orderdetails'
//     //     }}
//     // ]).toArray(function(err, res){
//     //     if(err) throw err
//     //     console.log(JSON.stringify(res))
//     //     db.close()
//     // })

//     // 删除集合
//     // dbase.collection('test').drop(function(err, delOK){ // 执行成功 delOK 返回 true，否则返回 false
//     //     if(err) throw err
//     //     if(delOK) console.log('集合已删除')
//     //     db.close()
//     // })
// })

