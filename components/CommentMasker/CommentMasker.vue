<template>
	<view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-wrapper">
				<view class="popup-header">
					<view class="header-item" @click="closeMasker">
						取消
					</view>
					<view class="header-item" @click="sendCommentVal">
						发布
					</view>
				</view>
				<view class="popup-content">
					<textarea class="content-textarea" v-model.trim="commentVal" placeholder="请输入评论内容" maxlength="200"></textarea>
					<view class="content-count">
						{{commentVal.length}} / 200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"CommentMasker",
		props: {
			showPopup: Boolean
		},
		watch: {
			showPopup(newValue) {
				newValue ? this.$refs.popup.open() : this.$refs.popup.close()
			}
		},
		data() {
			return {
				commentVal: ''
			};
		},
		methods: {
			closeMasker() {
				this.$emit('closeMasker', false)
			},
			sendCommentVal() {
				if(!this.commentVal) return;
				this.$emit('sendCommentVal', this.commentVal)
				this.commentVal = ''
			}
		},
	}
</script>

<style scoped lang="scss">
	.popup-wrapper {
		background-color: #fff;
		.popup-header {
			@include flex();
			font-size: 28rpx;
			color: #666600;
			border-bottom: 1px solid #f5f5f5;
			.header-item {
				height: 100rpx;
				line-height: 100rpx;
				padding: 0 30rpx;
			}
		}
		.popup-content {
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;
			.content-textarea {
				height: 420rpx;
				width: 100%;
			}
			.content-count {
				@include flex(flex-end);
				font-size: 24rpx;
				color: $text-color;
			}
		}
	}
</style>