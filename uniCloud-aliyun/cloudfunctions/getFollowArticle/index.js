'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate; // 获取聚合操作符
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {userId} = event
	
	let userInfo = await db.collection('uni-id-users').doc(userId).get();
	// 获取用户收藏的文章的id数组
	let article_likes_ids = userInfo.data[0].info.article_likes_ids;
	
	let list = await db.collection('article')
		.aggregate()
		.addFields({
			is_likes: $.in(['$_id', article_likes_ids])
		})
		.project({
			content: 0
		})
		.match({
			is_likes: true
		})
		.end()
	
	//返回数据给客户端
	return {
		code: 0,
		msg: "获取数据成功",
		data: list.data
	}
};
