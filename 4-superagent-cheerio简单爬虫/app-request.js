var cheerio = require('cheerio')
//链式调用到了极致出名
var superagent = require('superagent')
var request = require('request')

// url 模块是 Node.js 标准库里面的
var url = require('url')

var cnodeUrl = 'https://cnodejs.org/'
var topicUrls = []
/*superagent
  .get(cnodeUrl)
  .end(function (err, sres) {
      if (err) {
          return next(err)
      }
      var $ = cheerio.load(sres.text)
      $('#topic_list .topic_title').each(function (idx, element) {
          var $element = $(element)
          var href = url.resolve(cnodeUrl, $element.attr('href'))
          topicUrls.push(href)
      })
      console.log(topicUrls)
  })*/

request.get(cnodeUrl,function (err, res, html) {
    if (err) {
        return next(err)
    }
    var $ = cheerio.load(html)
    console.log($.html())
    $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element)
        var href = url.resolve(cnodeUrl, $element.attr('href'))
        topicUrls.push(href)
    })
    console.log(topicUrls)
})
