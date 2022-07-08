'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const version = await db.collection('version').get()
	
	//返回数据给客户端
	return {
		version: version.data[0].current_version,
		downLoadLinkUrl: '' // 打包后在云存储中
	}
};
