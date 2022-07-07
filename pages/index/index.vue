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
	import {mapMutations, mapState} from "vuex"
	export default {
		onLoad() {
			this._initLabellist();
		},
		data() {
			return {
				activeIndex: 0
			}
		},
		computed: {
			labelList() {
				if(this.userInfo) {
					this.activeIndex = 0;
					return [...this.$store.state.labelList.slice(0, 1), 
						...this.$store.state.labelList.filter(item => this.userInfo.label_ids.includes(item._id))]
				} else {
					return this.$store.state.labelList;
				}
			}
		},
		methods: {
			async _initLabellist() {
				if(this.labelList.length) return;
				const res = await getLabelList()
				this.setLabelList([{name: "全部"}, ...res])
			},
			async changeActiveIndex(index) {
				this.activeIndex = index;
			},
			...mapMutations(['setLabelList'])
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