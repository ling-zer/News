export default ({name, data={}}) => {
	// 返回一个Promise对象
	return new Promise((resolve, reject) => {
		// 1. 打开loading弹窗
		// uni.showLoading({})
		// 2. 发起数据请求
		uniCloud.callFunction({
			name, // 云函数的名称
			data, // 
			success({result}) { // 成功的状态
				if(result.code === 0) { // 能够拿到数据
					resolve(result.data);
				} else { // 没有查询到数据
					uni.showToast({
						icon: "none",
						title: result.msg
					})
				}
			},
			fail(err) { // 请求失败，网络的原因或后端错误
				reject(err);
			},
			complete() { // 请求完成的状态
				// uni.hideLoading() // 关闭loading弹窗
			}
		})
	})
}