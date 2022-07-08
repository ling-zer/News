<template>
	<view class="my-article-container">
		<ListItem :articleList="articleList" :isShowLoadMore="false"></ListItem>
		<view class="no-data" v-if="!articleList.length">
			暂未发布文章
		</view>
	</view>
</template>

<script>
	import {getMyArticle} from '@/ajax/api/user.js'
	export default {
		data() {
			return {
				articleList: []
			}
		},
		onLoad() {
			this._getMyArticle()
		},
		methods: {
			async _getMyArticle() {
				const res = await getMyArticle({
					userId: this.userInfo._id
				})
				this.articleList = res;
			}
		}
	}
</script>

<style scoped lang="scss">
	.my-article-container {
		width: 100%;
		.no-data {
			text-align: center;
			height: 400rpx;
			line-height: 400rpx;
			width: 100%;
			color: #999;
			font-size: 28rpx;
		}
	}
</style>
