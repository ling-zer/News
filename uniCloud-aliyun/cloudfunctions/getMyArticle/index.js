'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {userId} = event;
	let userInfo = await db.collection('uni-id-users').doc(userId).get();
	let article_ids = userInfo.data[0].info.article_ids
	
	let articleList = await db.collection('article')
		.aggregate()
		.project({
			content: 0,
			comment: 0
		})
		.match({
			id: dbCmd.in(article_ids)
		})
		.end()
	//返回数据给客户端
	return {
		code: 0,
		msg: "数据请求成功",
		data: articleList.data
	}
};
