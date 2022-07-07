'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {articleId, pageSize=10, page=1} = event;
	
	const list = await db.collection('article')
		.aggregate()
		.match({
			_id: articleId
		})
		.unwind('$comment')
		.project({
			_id: 0,
			comment: 1
		})
		.replaceRoot({
			newRoot: '$comment'
		})
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.end()
	//返回数据给客户端
	return {
		code: 0,
		msg: "获取评论成功",
		data: list.data
	}
};
