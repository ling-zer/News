'use strict';
// 获取数据库的引用
const db = uniCloud.database()

exports.main = async (event, context) => {
	const collection = db.collection('label');
	const res = await collection.get();
	
	//返回数据给客户端
	return {
		code: 0,
		data: res.data
	}
	// return {
	// 	code: 1,
	// 	msg: "查询数据失败"
	// }
};
