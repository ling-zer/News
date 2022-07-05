<template>
	<view class="search-container">
		<!-- 搜索导航组件 -->
		<NavBar :isSearch="isSearch" :parentVal="parentVal" @updateVal="parentVal=$event" @sendSearchData="_sendSearchData"></NavBar>
		<!-- 搜索容器 -->
		<view v-if="isShowHistory" class="search-wrapper">
			<!-- 没有进行搜索操作 -->
			<view class="search-history-container">
				<!-- 头部 -->
				<view class="search-header">
					<text class="history-text">搜索历史</text>
					<text class="history-clearn" @click="clearHistory">清空</text>
				</view>
				<!-- 内容部分 -->
				<view class="search-history-content" v-if="historyList.length">
					<view @click="openHistory(item)" class="history-content-item" v-for="(item, index) in historyList" :key="index">
						{{item}}
					</view>
				</view>
				<!-- 没有内容 -->
				<view class="no-data" v-else>
					当前没有搜索历史
				</view>
			</view>
			
		</view>
		<!-- 开始进行搜索操作 -->
		<view v-else class="search-list-container">
			<ListItem @saveSearchHistory="saveSearchHistory" :isShowLoadMore="false" v-if="searchList.length" :articleList="searchList"></ListItem>
			<!-- 没有内容 -->
			<view v-else class="no-data">
				当前没有搜索历史
			</view>
		</view>
	</view>
</template>

<script>
	import {getSearchData} from '@/ajax/api/home.js'
	import {mapMutations, mapState} from 'vuex'
	export default {
		data() {
			return {
				isSearch: true,
				parentVal: '',
				searchList: [],
				isShowHistory: true
			}
		},
		computed: {
			...mapState(['historyList'])
		},
		methods: {
			// 发送数据到云函数
			async _sendSearchData() {
				this.isShowHistory = false;
				// 搜索内容为空时
				if(!this.parentVal) {
					this.searchList = [];
					this.isShowHistory = true;
					return;
				}
				const {articleList} = await getSearchData({
					searchVal: this.parentVal
				})
				this.searchList = articleList
				
			},
			saveSearchHistory() {
				this.setHistory(this.parentVal)
			},
			// 通过点击搜索历史记录
			openHistory(item) {
				this.parentVal = item;
				this._sendSearchData()
			},
			...mapMutations(['setHistory', 'clearHistory'])
		}
	}
</script>

<style scoped lang="scss">
	.search-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		.search-wrapper {
			margin-bottom: 20rpx;
			.search-history-container {
				@include flex(flex-start, column);
				align-items: flex-start;
				.search-header {
					width: 100%;
					@include flex();
					font-size: 28rpx;
					color: #666;
					padding: 20rpx 30rpx;
					border-bottom: 1px solid #f5f5f5;
					box-sizing: border-box;
					.history-text {
						color: $base-color;
					}

					.history-clearn {
						color: #2d2;
						font-weight: bold;
					}
				}

				.search-history-content {
					@include flex(flex-start, row, wrap);
					padding: 30rpx;
					padding-top: 0;
					.history-content-item {
						margin-top: 24rpx;
						margin-right: 20rpx;
						padding: 4rpx 20rpx;
						border-radius: 10rpx;
						font-size: 28rpx;
						border: 1px solid #666;
						color: #666;
					}
				}

				
			}
			
		}
		.search-list-container {
			height: 100%;
			flex: 1;
			overflow: hidden;
		}
		.no-data {
			height: 400rpx;
			line-height: 400rpx;
			width: 100%;
			text-align: center;
			color: #666;
			font-size: 28rpx;
		}
	}
</style>
