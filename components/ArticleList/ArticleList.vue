<template>
	<swiper class="swiper-container" :current="activeIndex" @change="changeActiveIndex">
		<swiper-item v-for="(item, index) in labelList" :key="item._id">
			<view class="swiper-item">
				<ListItem :articleList="articleData[index]" @loadMore="loadMoreData" :loadStatus="loadData[index]?loadData[index].loading:'loading'"></ListItem>
			</view>
		</swiper-item>
		
	</swiper>
</template>

<script>
	import {getArticleList} from "../../ajax/api/home.js"
	export default {
		name:"ArticleList",
		props: {
			labelList: Array,
			activeIndex: Number,
		},
		watch: {
			labelList(newVal, oldVal) {
				if(JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
				this.articleData = {};
				this.loadData = {};
				this._getArticleList(this.activeIndex)
			}
		},
		created() {
			this.labelList.length && this._getArticleList(this.activeIndex)
		},
		data() {
			return {
				articleData: {},
				loadData: {}, //用于记录数据加载情况包括当前加载到第几页page，总共多少条数据total，是否完成加载loading
				pageSize: 6
			};
		},
		methods: {
			changeActiveIndex(e) {
				const index = e.detail.current;
				this.$emit('changeActiveIndex', index);
				// 如果当前tab的articleList已经请求过，就不再请求
				if(!this.articleData[index] || !this.articleData[index].length) {
					this._getArticleList(index)
				}
				
			},
			/*进行数据请求*/
			async _getArticleList(index) {
				// 指定每一个分类里面的页数信息
				if(!this.loadData[index]) {
					this.loadData[index] = {
						page: 1,
						loading: 'loading',
						total: 0
					}
				}
				const classify = this.labelList[index]
				const {articleList, total} = await getArticleList({
					classify: classify.name,
					page: this.loadData[index].page,
					pageSize: this.pageSize
				})
				// 数据追加
				let oldList = this.articleData[index] || [];
				oldList.push(...articleList);
				this.$set(this.articleData, index, oldList); 
				// this.articleData[index] = res; // 复杂对象，重新扩展的话，不会二次对对象里的值进行监听 v2.0 defineProperty的弊端
				this.loadData[index].total = total;
				// 修改加载状态
				if(this.loadData[index].page * this.pageSize >= total) {
					 this.loadData[index].loading = "noMore"
				}
			},
			// articleList到底部，加载数据
			loadMoreData() {
				const data = this.loadData[this.activeIndex];
				if(data.page * this.pageSize < data.total) {
					data.page++;
					this._getArticleList(this.activeIndex);
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.swiper-container {
		height: 100%;
		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>