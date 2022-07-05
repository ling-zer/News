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
