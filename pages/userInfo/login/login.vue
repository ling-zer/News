<template>
	<view class="login-container">
		<image src="../../../static/img/login_bg.png" class="banner-bg" mode=""></image>
		<!-- 导航 -->
		<view class="login-nav">
			<view class="nav-item" :class="{'active': type===0}" @click="changeType(0)">
				账号登录
			</view>
			<view class="nav-item" :class="{'active': type===1}" @click="changeType(1)">
				手机登录
			</view>
		</view>
		<!-- 表单 -->
		<uni-forms ref="form" :model="formData" class="form" label-align="center" :rules="userRules">
			<view class="" v-if="type===0">
				<uni-forms-item label="账号" name="username">
					<input type="text" v-model="formData.username" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item name="password" label="密码">
					<input type="password" multiple v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</view>
			<view class="" v-else>
				<uni-forms-item label="手机号" name="phone">
					<input type="text" v-model="formData.phone" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="vCode" label="验证码">
					<input type="text" multiple v-model="formData.vCode" placeholder="请输入验证码" />
					<SendCode :form="$refs.form"></SendCode>
				</uni-forms-item>
			</view>
			<button class="login-btn" @click="_userLoginSubmit">立即登录</button>

		</uni-forms>
		<view class="footer-container">
			<text>注册</text>
			<text>忘记密码</text>
		</view>
	</view>
</template>

<script>
	import { login } from "@/ajax/api/user.js"

	export default {
		data() {
			return {
				formData: {
					username: '',
					password: '',
					phone: '',
					vCode: ''
				},
				type: 0 // 0: 账号登陆  1: 手机号登录
			}
		},
		methods: {
			changeType(type) {
				this.type = type;
			},
			async _userLoginSubmit() {
				this.$refs.form.validate((err, formData) => {
					if (!err) { // 如果校验通过
						this._sendUserInfo({
							// type: this.type,
							...formData
						})
					}
					
				})

			},
			// 发送数据到后端
			async _sendUserInfo(info) {
				const res = await login(info);
				if(res.code === 0) { // 登录成功后,在storage内保存用户的token及其过期时间
					const {token, tokenExpired} = res;
					uni.setStorageSync('uni_id_token', token)
					uni.setStorageSync('uni_id_token_expired', tokenExpired)
					// 保存用户信息
					this.updateUserInfo(res.userInfo.info);
					uni.showToast({
						title: "登录成功",
						icon: 'none',
						duration: 1000
					})
					uni.navigateBack()
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.login-container {
		background-color: #f8f8f8;
		width: 100%;

		.banner-bg {
			width: 100%;
			height: 400rpx;
		}

		.login-nav {
			@include flex(space-around);
			font-weight: bold;
			color: $text-color;

			.nav-item {
				position: relative;
				margin-bottom: 40rpx;

				&.active {
					color: $base-color;

					&:after {
						content: "";
						position: absolute;
						bottom: -20rpx;
						left: 50%;
						transform: translateX(-50%);
						width: 60rpx;
						height: 8rpx;
						border-radius: 4rpx;
						background-color: $base-color;
					}

				}
			}
		}

		.form {
			padding-top: 20rpx;

		}

		.login-btn {
			width: 640rpx;
			height: 90rpx;
			background-color: $base-color;
			color: #fff;

		}

		.footer-container {
			width: 640rpx;
			margin: 20rpx auto;
			color: $text-color;
			@include flex();
			font-size: 26rpx;
		}
	}

	::v-deep .uni-forms-item__label {
		margin-left: 20rpx;
	}

	::v-deep .uni-forms-item__content {
		margin-left: 20rpx;
	}
</style>
