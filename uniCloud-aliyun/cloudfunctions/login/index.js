'use strict';
const uniID = require('uni-id');
exports.main = async (event, context) => {
	context.APPID = '__UNI__8BFD1FD' // 替换为当前客户端的APPID，通过客户端callFunction请求的场景可以使用context.APPID获取
	context.PLATFORM = 'h5' // 替换为当前客户端的平台类型，通过客户端callFunction请求的场景可以使用context.PLATFORM获取
	context.LOCALE = 'zh-Hans'
	const uniIDIns = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
		context: context,
		// config: {} // 完整uni-id配置信息，使用config.json进行配置时无需传此参数
	})

	//event为客户端上传的参数
	const {
		username,
		password
	} = event;

	const res = await uniIDIns.login({
		username,
		password
	})

	//返回数据给客户端
	return {
		code: 0,
		data: res
	}
};
