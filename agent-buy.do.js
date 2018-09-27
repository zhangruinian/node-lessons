let request = require('superagent')
let $ = require('cheerio')

let url = 'http://e.xmferry.com/order/buy.do?dailyFlightId=7BB31B2B8B9C40D59D8DF79ABE2246E9'
request
    .get(url)
    .set({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        cookie:'uid=4320489; Hm_lvt_ada71f492c2a5e189b8ba97cbc8e64b0=1530798477,1531060708; Hm_lpvt_ada71f492c2a5e189b8ba97cbc8e64b0=1531060708; UM_distinctid=1647a546f8b79a-0e5146fdfa2864-5e442e19-e1000-1647a546f90129; JSESSIONID=5C1175DEF9C19BA8F1649178639A1E51'
    })
    .end(function (err, res, res1) {
        if (err) {
            console.log(err)
        }
        console.log(res)
        console.log(res1)
        console.log('dailyFlightId', $('#dailyFlightId', res).attr('value'))
        console.log($.load(res.text))
    })