var express = require('express')
var cheerio = require('cheerio')
//链式调用到了极致出名
var request = require('superagent')

// url 模块是 Node.js 标准库里面的
var url = require('url')

// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express()

var cnodeUrl = 'https://cnodejs.org/'
request
  .get(cnodeUrl)
  .end(function (err, sres) {
      if (err) {
          return next(err)
      }
      var $ = cheerio.load(sres.text)
      var topicUrls = []
      $('#topic_list .topic_title').each(function (idx, element) {
          var $element = $(element)
          // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
          // 我们用 url.resolve 来自动推断出完整 url，变成
          // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
          // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
          var href = url.resolve(cnodeUrl, $element.attr('href'))
          topicUrls.push(href)
      })

      console.log(topicUrls)
  })
