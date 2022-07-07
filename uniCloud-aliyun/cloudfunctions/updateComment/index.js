'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {userId, articleId, content, comment_id='', reply_id='', is_reply=false} = event;
	
	// 获取用户信息
	let user = await db.collection('uni-id-users').doc(userId).get();
	user = user.data[0].info;
	// 获取文章数据表
	const article = await db.collection('article').doc(articleId).get();
	
	const comment = article.data[0].comment;
	
	let commentObj = {
		comment_id: generateId(5), // 生成一个唯一的id
		comment_content: content,
		create_time: Date.now(),
		is_reply,
		reply: [],
		author: {
			auhor_id: user._id,
			author_name: user.author_name,
			avatar:user.avatar,
			professional: user.professional
		}
	}
	
	if(comment_id === '') {
		commentObj.reply = [];
		commentObj = dbCmd.unshift(commentObj);
	} else {
		// 获取当前的评论的集合，在这个集合里面找到指定的那一条评论，修改他的reply数组
		let commentAuthor = null;
		let commentIndex = comment.findIndex(item => item.comment_id === comment_id)
		if(is_reply) {
			commentAuthor = comment[commentIndex].reply.find(item => item.comment_id === reply_id).author.author_name
		} else {
			commentAuthor = comment.find(item => item.comment_id === comment_id).author.author_name
		}
		commentObj.to = commentAuthor
		commentObj = {
			[commentIndex]: {
				reply: dbCmd.unshift(commentObj)
			}
		}
	}
	

	
	await db.collection('article').doc(articleId).update({
		comment: commentObj
	})
	
	// 生成id的方法
	function generateId(num) {
		return Number(Math.random().toString().substr(3, num) + Date.now()).toString(36);
	}
	
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: "评论成功"
		}
		
	}
};
