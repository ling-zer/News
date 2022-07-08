import ajax from "@/ajax/http.js"

// 用户登录
export const userLogin = data => ajax({
	name: "userLogin",
	data
})

// 利用uni-id 登录
export const login = data => ajax({
	name: "login",
	data
})

export const checkToken = data => ajax({
	name: "checkToken",
	data
})

export const updateFollowAuthor = data => ajax({
	name: "updateFollowAuthor",
	data
})

// 点赞文章
export const updateCompliments = data => ajax({
	name: "updateCompliments",
	data
})

export const getFollowArticle = data => ajax({
	name: "getFollowArticle",
	data
})

export const getAuthorList = data => ajax({
	name: "getAuthorList",
	data
})

// 获取用户发布的文章
export const getMyArticle = data => ajax({
	name: "getMyArticle",
	data
})