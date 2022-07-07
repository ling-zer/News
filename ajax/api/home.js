import ajax from "@/ajax/http.js"

export const getLabelList = data => ajax({
	name: "getLabelList",
	data
})

export const getArticleList = data => ajax({
	name: "getArticleList",
	data
})

export const updateLike = data => ajax({
	name: "updateLike",
	data
})

export const getSearchData = data => ajax({
	name: "getSearchData",
	data
})

export const updateLabelList = data => ajax({
	name: "updateLabelList",
	data
})

// 获取文章
export const getArticleDetail = data => ajax({
	name: "getArticleDetail",
	data
})

export const updateComment = data => ajax({
	name: "updateComment",
	data
})

export const getCommentList = data => ajax({
	name: "getCommentList",
	data
})