export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					mobileReg: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
					userRules: {
						loginName: {
							rules: [{
									required: true,
									errorMessage: '{label}不能为空'
								},
								{
									minLength: 3,
									maxLength: 10,
									errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符'
								}
							],
							label: '账户名',
							validateTrigger:'submit'
						},
						password: {
							rules: [{
								required: true,
								errorMessage: '{label}不能为空'
							}, {
								minLength: 6,
								maxLength: 16,
								errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
							}],
							label: '密码',
							validateTrigger: 'submit'
						},
						phone: {
							rules: [{
									required: true,
									errorMessage: '{label}不能为空'
								},
								{	// 小程序json 中不能使用正则对象，如：/^\S+?@\S+?\.\S+?$/，使用正则对象会被微信序列化，导致正则失效。
									// 因此使用validateFunction自定义验证规则,在其中进行正则匹配的判断
									validateFunction: this._patternValidate
								}
							],
							label: '手机号',
							validateTrigger:'submit'
						},
						vCode: {
							rules: [{
								required: true,
								errorMessage: '{label}不能为空'
							}],
							label: '验证码'
						}
					}
				}
			},
			methods: {
				_patternValidate(rule, value, data, callback) {
					if(!this.mobileReg.test(value)) {
						callback('请输入正确的手机号')
					}
					return true
				}
			}
		})
	}
}
