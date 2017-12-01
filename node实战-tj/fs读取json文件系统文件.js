let fs = require('fs')

fs.readFile('../package.json', function (err, data) {
    // 读取的data是buffer类型,tostring方法即可
    console.log(JSON.parse(data.toString()))
})
