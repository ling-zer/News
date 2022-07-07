'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {articleId, userId} = event;
	
	const user = await db.collection('uni-id-users').doc(userId).get()
	const thumbs_up_article_ids = user.data[0].info.thumbs_up_article_ids
	
	let tempArr = null
	let returnMsg = ''
	let thumbsNum = null
	// 对用户的操作处理
	if(thumbs_up_article_ids.includes(articleId)) {
		tempArr = dbCmd.pull(articleId)
		returnMsg = '取消点赞'
		thumbsNum = -1
	} else {
		returnMsg = '点赞成功'
		tempArr = dbCmd.addToSet(articleId)
		thumbsNum = 1
	}
	await db.collection('uni-id-users').doc(userId).update({
		info: {
			thumbs_up_article_ids: tempArr
		}
	})
	// 对文章的点赞处理
	const article = await db.collection('article').doc(articleId).update({
		thumbs_up_count: dbCmd.inc(thumbsNum)
	})
	
	//返回数据给客户端
	return {
		code: 0,
		data: {msg: returnMsg}
	}
};
