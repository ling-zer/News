export default {
	updateUserInfo(state, userInfo) {
		uni.setStorageSync('userInfo', userInfo)
		state.userInfo = userInfo;
	},
	// 修改搜索历史记录存储
	setHistory(state, val) {
		let list = state.historyList;
		if(list.length && list.includes(val)) return; 
		list.unshift(val);
		uni.setStorageSync('historyList', list)
		state.historyList = list
	},
	clearHistory(state) {
		uni.removeStorageSync('historyList')
		state.historyList = []
	},
	setLabelList(state, val) {
		uni.setStorageSync('labelList', val);
		state.labelList = val;
	}
}