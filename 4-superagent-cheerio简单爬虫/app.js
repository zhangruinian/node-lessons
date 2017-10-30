var cheerio = require('cheerio')
//链式调用到了极致出名
var request = require('superagent')
var axios = require('axios')

// url 模块是 Node.js 标准库里面的
var url = require('url')

var cnodeUrl = 'https://cnodejs.org/'
var topicUrls = []
request
  .get(cnodeUrl)
  .end(function (err, sres) {
      if (err) {
          return next(err)
      }
      var $ = cheerio.load(sres.text)
      $('#topic_list .topic_title').each(function (idx, element) {
          var $element = $(element)
          // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
          // 我们用 url.resolve 来自动推断出完整 url，变成
          // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
          // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
          var href = url.resolve(cnodeUrl, $element.attr('href'))
          topicUrls.push(href)
      })
      topicUrls.forEach(function (topicUrl) {
          /*request.get(topicUrl)
            .end(function (err, res) {
                console.log('fetch ' + topicUrl + ' successful')
            })*/
      })
  })
/*
function getTopic (topicUrl) {
    return new Promise(resolve, reject) {
        request.get(topicUrl)
          .end(function (err, res) {
              console.log('fetch ' + topicUrl + ' successful')
          })
    }
}*/

// 不可.
/*
axios.get(cnodeUrl).then((err, res) =>{
    var $ = cheerio.load(res.text)
    var topicUrls = []
    $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element)
        var href = url.resolve(cnodeUrl, $element.attr('href'))
        topicUrls.push(href)
    })
    console.log(topicUrls)
}).catch((err) =>{
    console.log(err)
})
*/

