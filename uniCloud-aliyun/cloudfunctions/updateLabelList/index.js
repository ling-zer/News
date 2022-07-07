'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {userId, label_ids} = event;
	console.log(userId, label_ids, '----');
	await db.collection('uni-id-users').doc(userId).update({
		info: {
			label_ids
		}
	})
	
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: "修改成功"
		}
	}
};
