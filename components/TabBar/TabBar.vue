<template>
	<view class="tab">
		<!-- 滚动区域 -->
		<scroll-view scroll-x="true" class="tab-scroll" scroll-with-animation="true" :scroll-into-view="curentIndex">
			<view class="tab-scroll-box">
				<view @click="changeActiveIndex(index)" :class="{active: activeIndex===index}" class="tab-scroll-item" 
					:id="`tab-item-${index}`"
					v-for="(item, index) in labelList" :key="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 图标部分 -->
		<view class="tab-icon">
			<uni-icons type="gear" size="26" color="666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"TabBar",
		props: {
			labelList: Array,
			activeIndex: Number,
		},
		watch: {
			activeIndex(index) {
				this.curentIndex = `tab-item-${index}`;
			}
		},
		data() {
			return {
				curentIndex: `tab-item-0`
			};
		},
		methods: {
			changeActiveIndex(index) {
				this.$emit('changeActiveIndex', index)
			}
		}
	
	}
</script>

<style scoped lang="scss">
	.tab {
		@include flex();
		width: 100%;
		border-bottom: 1px solid #f5f5f5;
		background-color: #fff;
		box-sizing: border-box;
		.tab-scroll {
			flex: 1;
			box-sizing: border-box;
			height: 90rpx;
			overflow: hidden;
			.tab-scroll-box {
				@include flex(flex-start);
				height: 90rpx;
				box-sizing: border-box;
				.tab-scroll-item {
					flex-shrink: 0;
					padding: 0 20rpx;
					color: #333;
					font-size: 28rpx;
					&.active {
						color: $base-color;
					}
				}
			}
		}
		.tab-icon {
			width: 90rpx;
			position: relative;
			@include flex(center);
			&:after {
				content: "";
				position: absolute;
				height: 32rpx;
				left: 0;
				width: 2rpx;
				background-color: #ddd;
			}
		}
	}
</style>