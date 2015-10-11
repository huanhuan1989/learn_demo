var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var bodyParser = require('body-parser');  //Returns中间件  //用来解析  http请求的  body体，put post 的 body

var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc_movies'); //连接数据库

app.set('views', './views/pages');
app.set('view engine', 'jade'); 
  
/*
 * parse application/x-www-form-urlencoded
 * app.use(bodyParser.urlencoded({ extended: false }))
 * parse application/json
 * app.use(bodyParser.json())
 * create application/x-www-form-urlencoded parser 
 * https://www.npmjs.com/package/body-parser
*/
/*app.use(bodyParser.urlencoded({   
	extended: false
}));*/
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'static')));
app.locals.moment = require("moment");
app.listen(port);

console.log('imooc started on port ' + port)


var options = [
	{
		title: '夏洛特烦恼',
		_id: 1,
		poster: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3495368848,1024610533&fm=58'
	},
	{
		title: '港囧',
		_id: 2,
		poster: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2216854043,79332823&fm=58'
	},
	{
		title: '秦时明月',
		_id: 3,
		poster: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3581888646,954935648&fm=58'
	},
	{
		title: '九层妖塔',
		_id: 4,
		poster: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3390769120,1095505666&fm=58'
	},
	{
		title: '道士下山',
		_id: 5,
		poster: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2538286140,1113265781&fm=58'
	},
	{
		title: '解救吾先生',
		_id: 6,
		poster: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2063394264,370624593&fm=58'
	},
	{
		title: '移动迷宫',
		_id: 7,
		poster: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3371796565,942382144&fm=58'
	}
];


//路由编写
//index page
app.get('/', function (req, res){
	Movie.fetch(function (err, movies){
		err && console.log(err);
		res.render('index', {
			title: 'imooc 首页',
			movies: movies
		})
	});
});

//detail page
app.get('/movie/:id', function (req, res){
	var id = req.params.id;
	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: 'imooc ' + movie.title,
			movie: movie
		})
	});
});

//amin page
app.get('/admin/movie', function (req, res){
	res.render('admin', {
		title: 'imooc 后台录入页',
		movie: {
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster:'',
			language: '',
			flash: '',
			summary: ''
		}
	})
});

// admin update movie
app.get('/admin/update/:id', function (req, res){
	var id = req.params.id;
	id && Movie.findById(id, function (err,movie){
			res.render('admin', {
				title: 'imooc admin update page',
				movie: movie
			})
		});
})


//admin post movie  POST /admin/movie/new gets urlencoded bodies 
app.post('/admin/movie/new', function (req, res){
	/*
	* id !== undefined  为更新
	* 否则为新增
	*/
	var id = req.body.movie._id;   //通过上面的bodyParser.urlencoded  得到urlencoded的bodies
	var movieObj = req.body.movie;
	var _movie;

	if (id !== 'undefined') {
		Movie.findById(id, function (err, movie) {
			err && console.log(err);

			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie) {
				err && console.log(err);

				res.redirect('/movie/' + movie._id)
			})
		})
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		});

		_movie.save(function (err, movie) {
			err && console.log(err);
			res.redirect('/movie/' + movie._id)
		})
	}
});

//list page
app.get('/admin/list', function (req, res){
	Movie.fetch(function (err, movies){
		err && console.log(err);
		res.render('list', {
			title: 'imooc 列表页',
			movies: movies
		})
	});
});

//list delete movie
app.delete('/admin/list', function (req, res){
	var id = req.query.id;
	id && Movie.remove({_id: id}, function (err, movie){
			err ? console.log(err) : res.json({success: 1});
		});
});