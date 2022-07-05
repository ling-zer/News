'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {loginName, password, phone, type} = event;
	const {affectedDocs, data} = await db.collection('user')
		.aggregate()
		.match(type === 0 ? {loginName, password} : {phone})
		.project({
			password: 0,
			phone: 0
		})
		.end()
	
	//返回数据给客户端
	return affectedDocs ? {
		code: 0,
		msg: "获取用户信息成功",
		data: data[0]
	} : {
		code: 1,
		msg: type === 0 ? "获取用户信息失败!请检查账户名和密码" : "手机号或验证码错误"
	}
};
