//模型
var mongoose = require('mongoose');  //引用mongoose模块 mongoose操作mongodb
var MovieSchema = require('../schemas/movie');  //引用模式下的movie模块
var Movie = mongoose.model('Movie', MovieSchema);  //与Movie集合关联

module.exports = Movie;  