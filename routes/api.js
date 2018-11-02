const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ApiModel = require('../model/apiModel');
const config = require('../config');

router.get('/', function (req, res, next) {
	res.send('api');
});

//  增

router.post('/columnPost', function (req, res, next) {
	let token = req.cookies['my-cookies'];
	jwt.verify(token, config.jwtSecret, (err, decoded) => {
		if (err) {
			res.json({
				code: 401,
				message: 'no token detected in http header "Authorization"'
			});
		}

		if (decoded) {
			ApiModel.column.create(req.body).then(resq => {
				if (resq) {
					let jsonS = {
						code: res.statusCode,
						message: '新增成功',
						data: resq
					};
					res.json(jsonS);
				}
			})
		}
	});
});

//  查

router.get('/columnGet', function (req, res, next) {
	// 初始化数据库
	/*for (let i = 0; i < 10; i++) {
		ApiModel.column.create({
			parentId: '',
			columnName: '闻' + i,
			enName: 'wen' + i,
			intro: 'wens闻' + i,
			state: 1
		}).then(resq => {
			console.log(resq);
		})
	}*/
	ApiModel.column.find({}).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '获取数据成功',
				data: resq,
				len: resq.length
			};
			res.send(jsonS);
		}
	});
});

//  改

router.post('/columnPut', function (req, res) {
	ApiModel.column.update({_id: req.body._id}, req.body).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '更新成功',
				data: resq
			};
			res.json(jsonS);
		}
	})

});

//  删

router.post('/columnDelete', function (req, res) {
	console.log(req.body);
	ApiModel.column.remove({_id: req.body._id}).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '删除成功',
				data: resq
			};

			res.json(jsonS);
		}
	})
});

//  info

router.post('/infoPost', function (req, res, next) {

	ApiModel.info.create(req.body).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '新增成功',
				data: resq
			};
			res.json(jsonS);
		}
	})
});

//  查

router.get('/infoGet', function (req, res, next) {
	ApiModel.info.find({}).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '获取数据成功',
				data: resq,
				len: resq.length
			};
			res.send(jsonS);
		}
	});
});

module.exports = router;