//  角色

const columnModel = require('../model/columnModel');
const bFunc = require('../utils/businessFunc');
const ObjectId = require('mongodb').ObjectId;


module.exports = {
	//  获取总数
	fetchTotal: (obj) => {
		let newObj = bFunc.filterSpace(obj);
		let {newParams} = bFunc.page(newObj);
		return columnModel.find(newParams).sort({sortNum: -1, createTime: -1}).countDocuments();
	},

	//  获取
	fetch: (obj) => {
		let newObj = bFunc.filterSpace(obj);
		let {limit, skip, newParams} = bFunc.page(newObj);
		return columnModel.find(newParams).sort({sortNum: -1, createTime: -1}).skip(limit).limit(skip);
	},

	//  创建
	create: (obj) => {
		return columnModel.create(obj);
	},

	//	修改
	update: (obj, _id) => {
		let id = ObjectId(_id._id);
		return columnModel.findByIdAndUpdate({_id: id}, obj);
	},

	//	删除
	delete: (obj, _id) => {
		let id = ObjectId(_id._id);
		return columnModel.findByIdAndUpdate({_id: id}, obj);
	}
};
