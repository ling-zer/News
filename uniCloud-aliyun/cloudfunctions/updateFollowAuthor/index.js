'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {authorId, userId} = event
	
	const user = await db.collection('uni-id-users').doc(userId).get()
	
	const authorLikeIds = user.data[0].info.author_likes_ids;
	let returnMsg = '';
	let author_ids = null;
	
	if(authorLikeIds.includes(authorId)) {
		author_ids = dbCmd.pull(authorId)
		returnMsg = '取消关注'
	} else {
		returnMsg = '关注作者成功'
		author_ids = dbCmd.addToSet(authorId)
	}
	await db.collection('uni-id-users').doc(userId).update({
		info: {
			author_likes_ids: author_ids
		}
	})
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: returnMsg
		}
	}
};
