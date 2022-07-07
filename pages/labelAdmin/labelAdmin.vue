<template>
	<view class="label-container">
		
		<view class="label-top">
			<view class="label-tip">
				<text>我的标签</text>
				<text class="edit" @click="editLabel">
					{{showEdit ? '编辑' : '完成'}}
				</text>
			</view>
			<!-- 已选标签 -->
			<view class="my-labels">
				<view class="label-item" v-for="item in selfLabelList" :key="item._id">
					{{item.name}}
					<uni-icons @click="deleteLabel(item)" class="icon-close" type="clear" size="20" color="red" v-show="!showEdit"></uni-icons>
				</view>
			</view>
			<view v-if="!selfLabelList.length" class="no-data">
				当前没有数据
			</view>
		</view>
		<!-- 待选标签 -->
		<view class="label-bottom">
			<view class="label-recom">
				标签推荐
			</view>
			<view class="my-labels">
				<view @click="addLabel(item)" class="label-item" v-for="item in recommandLabelList" :key="item._id">
					{{item.name}}
				</view>
			</view>
			<view v-if="!recommandLabelList.length" class="no-data">
				当前没有数据
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from "vuex"
	import {updateLabelList} from "@/ajax/api/home.js"
	export default {
		data() {
			return {
				showEdit: true,
				labelIds: []
			}
		},
		watch: {
			userInfo: {
				immediate: true,
				handler(newVal, oldVal) {
					this.labelIds = this.userInfo.label_ids
				}
			}
		},
		computed: {
			...mapState(['labelList']),
			selfLabelList () {
				return this.labelList.filter(item => this.labelIds.includes(item._id))
			},
			recommandLabelList() {
				return this.labelList.filter(item => !this.labelIds.includes(item._id) && item.name !== '全部')
			}
		},
		methods: {
			// 点击编辑，进入到编辑状态
			editLabel() {
				this.showEdit = !this.showEdit
				this.showEdit && this._updateLabels()
			},
			// 点击完成，推送到数据库
			async _updateLabels() {
				// userInfo._id  label_ids
				const label_ids = this.selfLabelList.map(item => item._id);
				const {msg} = await updateLabelList({userId: this.userInfo._id, label_ids});
				uni.showToast({
					title: msg
				})
				this.updateUserInfo({...this.userInfo, label_ids})
			},
			// 添加标签
			addLabel(item) {
				if(this.showEdit) return;
				this.labelIds.push(item._id)
			},
			// 删除标签
			deleteLabel(item) {
				this.labelIds = this.labelIds.filter(id => id !== item._id)
			},
			...mapMutations(['setLabelList'])
		}
	}
</script>

<style scoped lang="scss">
	.label-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #333;
		background-color: #f5f5f5;
		.label-top {
			background-color: #fff;
			margin-bottom: 20rpx;
			.label-tip {
				@include flex();
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #f5f5f5;
				.edit {
					color: #3d3;
				}
			}
		}
		.label-bottom {
			background-color: #fff;
			.label-recom {
				padding: 20rpx 30rpx;
				border-bottom: 1px solid #f5f5f5;
			}
		}
		.my-labels {
			@include flex(flex-start, row, wrap);
			padding: 20rpx 30rpx;
			.label-item {
				padding: 6rpx 10rpx;
				border: 1px solid #333;
				border-radius: 10rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				position: relative;
				.icon-close {
					position: absolute;
					top: 0;
					right: 0;
					transform: translate(50%, -50%);
				}
			}
	
		}
		.no-data {
			width: 100%;
			color: #999;
			text-align: center;
			padding: 100rpx 0;
		}
	}
</style>
