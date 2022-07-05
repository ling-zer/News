'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => { // event = {classify: "xxx"}
	//event为客户端上传的参数
	const {classify, page=1, pageSize=10} = event;
	let matchObj = {};
	if(classify !== "全部") {
		matchObj = {classify};
	}
	
	const list = await db.collection('article')
		.aggregate() // 聚合
		.match(matchObj)
		.project({
			content: 0 // 不显示content
		})
		.skip(pageSize * (page - 1)) //跳过多少条数据,注意第一页的数据从0开始
		.limit(pageSize) // 每页返回多少条数据
		.end()
	
	// 返回当前匹配的数据总数
	const {total} = await db.collection('article').where(matchObj).count()
	//返回数据给客户端
	return {
		code: 0,
		msg: "数据获取成功",
		data: {
			articleList: list.data,
			total
		}
	}
};
