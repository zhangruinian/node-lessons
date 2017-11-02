let Benchmark = require('benchmark')

let suite = new Benchmark.Suite

let parse1 = function (str) {
    return +str
}

let parse2 = function (str) {
    return parseInt(str, 10)
}

let parse3 = function (str) {
    return Number(str)
}

let number = 10

// console.log(suite)

suite.add('+', () =>{
    parse1(number)
})
.add('parseInt', () =>{
    parse2(number)
})
.add('number', () =>{
  parse3(number)
    // console.log(this)
    // 此处是{}
})
.on('cycle', (event) =>{
    console.log(String(event.target))
})
.on('complete', function () {
    console.log(this)
    // 此处若使用 ()=>则找不到this.filter()  此时this是 Suite()
    console.log('最快的est是' + this.filter('fastest').map('name'))
})
.run({'async': true})

