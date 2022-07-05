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
