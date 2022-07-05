<template>
	<view class="article-container" @click="goArticleDetail">
		<!-- 基础模式 -->
		<view class="article-base" v-if="item.mode==='base'">
			<view class="article-img">
				<image :src="item.cover[0]?item.cover[0]:'/static/img/sakura.png'"></image>
			</view>
			<view class="article-content">
				<view class="article-title">
					<text>{{item.title}}</text>
					<SaveLikes :articleId="item._id"></SaveLikes>
				</view>
				<view class="article-desp">
					<view class="article-type">
						{{item.classify}}
					</view>
					<view class="browse-number">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图模式 -->
		<view class="article-base article-column" v-if="item.mode==='column'">
			<view class="article-top">
				<text>{{item.title}}</text>
				<SaveLikes :articleId="item._id"></SaveLikes>
			</view>
			<view class="article-middle">
				<view class="img-container" v-for="(img, index) in item.cover.slice(0, 3)" :key="index">
					<image :src="img"></image>
				</view>
			</view>
			<view class="article-desp article-bottom">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-number">
					{{item.browse_count}}浏览
				</view>
			</view>
		</view>
		<!-- 大图模式 -->
		<view class="article-base article-column article-image" v-if="item.mode==='image'">
			<view class="article-top">
				<view class="img-container">
					<image :src="item.cover[0]" mode="aspectFill"></image>
				</view>
			</view>
			<view class="article-middle">
				<text>{{item.title}}</text>
				<SaveLikes :articleId="item._id"></SaveLikes>
			</view>
			<view class="article-desp article-bottom">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-number">
					{{item.browse_count}}浏览
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Article",
		props: {
			item: Object
		},
		data() {
			return {
				
			};
		},
		methods: {
			goArticleDetail() {
				this.$emit('saveSearchHistory')
			}
		}
	}
</script>

<style scoped lang="scss">
 .article-container {
	 // padding: 20rpx;
	 // box-sizing: border-box;
	 // 基础模式
	 .article-base {
		@include flex();
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 10px 2rpx rgba(0, 0, 0, .1);
		.article-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			overflow: hidden;
			flex-shrink: 0;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.article-content {
			@include flex(space-between, column);
			padding-left: 20rpx;
			width: 100%;
			align-items: flex-start;
			.article-title {
				@include flex();
				align-items: flex-start;
				font-size: 28rpx;
				color: #333;
				font-weight: 400;
				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-break: break-all;
				}
			}

			
		}
	 }
	 // 三种模式公共样式
	 .article-desp {
	 	@include flex();
	 	font-size: 24rpx;
	 	width: 100%;
	 	margin-top: 20rpx;
	 	.article-type {
	 		padding: 0 10rpx;
	 		margin-right: 10rpx;
	 		border-radius: 30rpx;
	 		border: 1px solid $base-color;
	 	}
	 	.browse-number {
	 		color: $text-color;
	 	}
	 }
	 // 多图和大图模式公共样式
	 .article-top, .article-middle, .article-bottom {
		 @include flex();
		 width: 100%;
	 }
	 // 多图模式
	 .article-column {
		 flex-direction: column;
		 .article-top {
			 text {
				 font-size: 28rpx;
				 color: #333;
			 }
			 
		 }
		 .article-middle {
			 margin: 20rpx 0;
			 .img-container {
				 width: 32%;
				 border-radius: 10rpx;
				 height: 140rpx;
				 overflow: hidden;
				 image {
					 width: 100%;
					 height: 100%;
				 }
			 }
		 }
	 }
	 &.article-image {
		 flex-direction: column;
		 .img-container {
			 width: 100%;
			 height: 200rpx;
			 image {
				 width: 100%;
				 height: 100%;
			 }
		 }
		 .article-middle {
			 margin-top: 10rpx;
			 text {
				 font-size: 28rpx;
				 color: #333;
			 }
		 }
	 }
 }
</style>