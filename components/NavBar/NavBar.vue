<template>
	<view class="nav-container">
		<view class="navbar-top">
			<!-- 处理app以及小程序的状态栏 -->
			<view :style="{height: statusBarHeight + 'rpx'}"></view>
			<!-- 搜索框 -->
			<!-- 搜索界面时，需要站是一个回退按钮 -->
			<view @click="returnArticleList" class="return-icon" :style="{top: statusBarHeight + 'rpx'}"
				v-if="isSearch">
				<uni-icons type="back" size="22" color="#fff"></uni-icons>
			</view>
			<view @click="geSearch" class="navbar-content"
				:style="{marginRight: marginRight + 'rpx', marginLeft: isSearch ? '20rpx' : ''}">
				<uni-icons type="search" color="#999"></uni-icons>
				<view class="navbar-search-text" v-if="!isSearch">
					输入文章标题进行搜索
				</view>
				<input type="text" class="search-input" placeholder="输入文章标题进行搜索" v-else
					v-model.trim="searchVal"
					confirm-type="search" @confirm="changeInput">
			</view>
		</view>

		<!-- 用于撑开高度，进行占位 -->
		<view :style="{height: statusBarHeight + 80 + 'rpx'}"></view>
	</view>
</template>

<script>
	export default {
		name: "NavBar", // 方便我们的devtools进行内容查找
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			parentVal: String
		},
		data() {
			return {
				statusBarHeight: 20,
				marginRight: 0
			};
		},
		created() {
			this.getSystemInfo();
		},
		computed: {
			searchVal: {
				get() {
					return this.parentVal
				},
				set(val) {
					this.$emit('updateVal', val)
					if(!val) {
						this.$emit('sendSearchData');
					}
				}
			}
		},
		methods: {
			/*处理不同设备顶部状态栏的问题*/
			getSystemInfo() {
				// 处理app及小程序的状态栏
				const systemInfo = uni.getSystemInfoSync();
				systemInfo.statusBarHeight && (this.statusBarHeight = systemInfo.statusBarHeight * 2)
				// 处理微信小程序 顶部的胶囊按钮区域
				// #ifdef MP-WEIXIN
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				this.statusBarHeight = menuButtonInfo.top * 2;
				this.marginRight = menuButtonInfo.width * 2;
				// #endif

			},
			/*跳转到搜索界面*/
			geSearch() {
				if (this.isSearch) return;
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			returnArticleList() {
				// #ifdef H5
				uni.switchTab({
					url: '/pages/index/index'
				})
				// #endif
				// #ifndef H5
				uni.navigateBack()
				// #endif

			},
			// 通知父组件进行查询
			changeInput() {
				this.$emit('sendSearchData')
			}
		},
	}
</script>

<style scoped lang="scss">
	.nav-container {
		.navbar-top {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $base-color;
			padding: 0 30rpx 20rpx;
			box-sizing: border-box;

			.navbar-content {
				@include flex(flex-start);
				height: 60rpx;
				background-color: #fff;
				border-radius: 30rpx;
				flex-grow: 1;
				padding-left: 20rpx;
				box-sizing: border-box;
			}

			.navbar-search-text {
				color: $text-color;
				font-size: 28rpx;
				margin-left: 20rpx;
			}
		}

		// 搜索界面单独样式处理
		.return-icon {
			position: absolute;
			height: 60rpx;
			left: 0;
			@include flex();
		}

		.search-input {
			font-size: 28rpx;
			color: #999;
			width: 100%;
			padding-left: 20rpx;
		}
	}
</style>
