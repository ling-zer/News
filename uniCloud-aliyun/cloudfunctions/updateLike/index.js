'use strict';
const db = uniCloud.database()
// 获取修改指令
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {userId, articleId} = event
	
	const userInfo = await db.collection('uni-id-users').doc(userId).get()
	
	const articleIds = userInfo.data[0].info.article_likes_ids;

	let articleArr = null
	let msg = null
	// 判断数据表的指定数据里面是否收藏了这个文章
	if(articleIds.includes(articleId)) {
		// 删除收藏
		articleArr = dbCmd.pull(articleId)
		msg = "取消收藏"
	} else {
		// 添加收藏
		articleArr = dbCmd.addToSet(articleId)
		msg = "添加收藏"
	}

	// 修改当前用户的收藏文章的数组数据 并返回 新的用户信息
	const {doc} = await db.collection('uni-id-users').doc(userId).updateAndReturn({
		info: {
			article_likes_ids: articleArr
		}
	})
	
	//返回数据给客户端
	return {
		code: 0,
		data: {
			userInfo: doc.info,
			msg
		}
	}
};
