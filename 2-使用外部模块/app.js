// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
var express = require('express')
var utility = require('utility')

// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express()

app.get('/', function (req, res) {
    // 从 req.query 中取出我们的 q 参数。
    // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
    // 如果分不清什么是 query，什么是 body 的话，那就需要补一下 http 的知识了
    var q = req.query.q
    // 调用 utility.md5 方法，得到 md5 之后的值
    // 之所以使用 utility 这个库来生成 md5 值，其实只是习惯问题。每个人都有自己习惯的技术堆栈，
    // 我刚入职阿里的时候跟着苏千和朴灵混，所以也混到了不少他们的技术堆栈，仅此而已。
    // utility 的 github 地址：https://github.com/node-modules/utility
    // 里面定义了很多常用且比较杂的辅助方法，可以去看看
    var qMd5 = utility.md5(q)
    res.send(qMd5)
})

app.listen(3000, function () {
    console.log('app is listening at port 3000')
})