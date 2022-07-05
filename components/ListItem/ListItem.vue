<template>
	<view class="list-scroll-container">
		<scroll-view scroll-y="true" @scrolltolower="loadMore" class="article-scroll">
			<Article @saveSearchHistory="$emit('saveSearchHistory')" v-for="(item) in articleList" :key="item._id" :item="item"></Article>
			<uni-load-more v-if="isShowLoadMore && articleList && (articleList.length === 0 || articleList.length > 7)" :status="loadStatus"></uni-load-more>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		name:"ListItem",
		props: {
			articleList: Array,
			loadStatus: String,
			isShowLoadMore: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			loadStatus(newVal) {
				this.loading = newVal
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			// scroll-view滚动到底部/右边, 加载数据
			loadMore() {
				this.$emit('loadMore')
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-scroll-container {
		height: 100%;
		overflow: hidden;
		.article-scroll {
			height: 100%;
		}
	}
</style>