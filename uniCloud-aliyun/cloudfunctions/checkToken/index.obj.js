// 开发文档: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
const uniID = require('uni-id')
module.exports = {
	_before() {
		const clientInfo = this.getClientInfo()
		this.uniID = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
			clientInfo
		})
	},
	async checkTK(token) {
		// console.log(token);
		const res = await this.uniID.checkToken(token, {
			needUserInfo: false
		})
		return res
	}
}
