<template>
	<view class="box">
		box
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			getData() {
				console.log(uni.$http);
			}
		}
	}
</script>

<style>
	.box {
		width: 375rpx;
		height: 375rpx;
		background-color: red;
	}
</style>
