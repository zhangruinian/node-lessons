// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
var express = require('express')
var cheerio = require('cheerio')
//链式调用到了极致出名
var request = require('superagent')

// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express()

app.get('/', function (req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    request.get('https://cnodejs.org/')
      .end(function (err, sres) {
          // 常规的错误处理
          if (err) {
              return next(err)
          }
          // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
          // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
          // 剩下就都是 jquery 的内容了
          var $ = cheerio.load(sres.text)
          var items = []
          $('#topic_list .topic_title').each(function (idx, element) {
              var $element = $(element)
              items.push({
                  title: $element.attr('title'),
                  href: $element.attr('href')
              })
          })
          res.send(items)
      })
})

app.listen(3000, function () {
    console.log('app is listening at port 3000')
})