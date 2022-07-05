<template>
	<view class="code-container">
		<view class="vCode-btn" @click="_sendCode">
			{{ timer ? `${seconds}秒后重新获取` : '获取验证码'}}
		</view>
	</view>
</template>

<script>
	// import { getCode } from "@/ajax/api/user.js"
	export default {
		name:"SendCode",
		props: {
			form: Object
		},
		data() {
			return {
				timer: null,
				seconds: 60
			};
		},
		beforeDestroy() {
			clearInterval(this.timer);
			this.timer = null;
			this.seconds = 60;
		},
		methods: {
			async _sendCode() {
				// 获取验证表单 => 对phone进行验证
				try{
					const {phone} = await this.form.validateField(['phone']);
					this.timeRunning();
				}catch(e){
					//TODO handle the exception
					console.log('error', e);
				}
			},
			timeRunning() {
				if(this.timer) {return};
				this.timer = setInterval(() => {
					if(this.seconds <= 1) {
						clearInterval(this.timer);
						this.timer = null;
						this.seconds = 60;
					}
					this.seconds--;
				}, 1000)
			}
		},
	}
</script>

<style scoped lang="scss">
	.code-container {
		flex-shrink: 0;
		margin-right: 20rpx;
		.vCode-btn {
			background-color: $base-color;
			color: #fff;
			padding: 16rpx 20rpx;
			border-radius: 10rpx;
			opacity: .8;
		}
	}
</style>