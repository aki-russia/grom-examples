var less = require('less')
var R = require('ramda')
var co = require('co')

var renderLess = co.wrap(function* (file){
  var css = (yield less.render(file.toString(), {})).css
  file = file.new(css)
  file.ext('.css')
  return file
})

module.exports['compile-less'] = function* (){
  var cssOutputs = yield R.map(renderLess, yield this.source('./code/**.less'))
  return yield this.dest('./dist', cssOutputs)
}
