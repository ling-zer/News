import {mapState, mapMutations} from 'vuex'
const uniObj = uniCloud.importObject('checkToken')

export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					
				}
			},
			methods: {
				async checkIsLogin() {
					// 获取token
					const token = uni.getStorageSync('uni_id_token');
					// token校验
					try {
						const res = await uniObj.checkTK(token);
						if(res.code) { // code !== 0时 校验未通过
							uni.navigateTo({
								url: '/pages/userInfo/login/login'
							})
						}
					} catch(e) {
						uni.navigateTo({
							url: '/pages/userInfo/login/login'
						})
					}
					
				},
				...mapMutations(['updateUserInfo'])
			},
			computed: {
				...mapState(['userInfo'])
			}
		})
	}
}