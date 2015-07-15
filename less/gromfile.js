var less = require('less')
var R = require('ramda')
var co = require('co')

var renderLess = co.wrap(function* (file){
  var css = (yield less.render(yield file.source(), {})).css
  try{
    file.new({ext: '.css'}, css)
  } catch (e) {
    console.log(e)
  }
  return file.new({ext: '.css'}, css)
})

module.exports['compile-less'] = function* (){
  var cssOutputs = yield R.map(renderLess, yield this.source('./code/**.less'))
  return yield this.dest('./dist', cssOutputs)
}
