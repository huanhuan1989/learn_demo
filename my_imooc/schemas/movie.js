//模式
var mongoose = require('mongoose');  //MongoDB对象建模工具  ：mongoose是MongoDB的对象建模工具设计异步环境中工作
var Schema = mongoose.Schema;   //  创建模型

//实例化新模型
var MovieSchema = new Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	meta: {   //更新时间记录
		createAt:{  //创建时间
			type:Date,
			default:Date.now()
		},
		updateAt:{ //更新时间
			type:Date,
			default:Date.now()
		}
	}
});

//储存
MovieSchema.pre('save', function (next) {
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	};
	next();
});

//取数据
MovieSchema.statics = {
	fetch: function(cb){  //查询数据库中所有的数据
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb){  //通过ID查询单条数据
		return this
			.findOne({_id: id})
			.sort('meta.updateAt')
			.exec(cb)
	}
};

module.exports = MovieSchema;