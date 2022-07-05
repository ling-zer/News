<template>
	<view class="home-container">
		<NavBar></NavBar>
		<TabBar :labelList="labelList" :activeIndex="activeIndex" @changeActiveIndex="changeActiveIndex"></TabBar>
		<!-- 文章列表 -->
		<ArticleList @changeActiveIndex="changeActiveIndex" :labelList="labelList" class="list-container" :activeIndex="activeIndex"></ArticleList>
	</view>
</template>

<script>
	import {getLabelList} from "../../ajax/api/home.js"
	export default {
		onLoad() {
			this._initLabellist();
		},
		data() {
			return {
				labelList: [],
				activeIndex: 0
			}
		},
		methods: {
			async _initLabellist() {
				const res = await getLabelList()
				this.labelList = [{name: "全部"}, ...res];
			},
			async changeActiveIndex(index) {
				this.activeIndex = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
		// height: calc(100vh - var(--tab-bar-height) - env(safe-area-inset-bottom));
		flex: 1;
		overflow: auto;
		box-sizing: border-box;
		@include flex(flex-start, column);
		align-items: inherit;
	}
	.list-container {
		flex: 1;
		box-sizing: border-box;
	}
</style>