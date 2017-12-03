let fs = require('fs')

// 默认都是异步的 除非加上sync前缀
fs.readFile('../package.json', function (err, data) {
    // 读取的data是buffer类型,tostring方法即可
    console.log(JSON.parse(data.toString()))
})
console.log('%s %s', 11, 'a')