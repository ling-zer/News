<template>
	<view class="comment-list-container">
		<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
			<CommentBox :commentData="item" @commentReply="commentReply"></CommentBox>
		</view>
		<uni-load-more :status="loading" :contentText="{
			contentdown: '上拉显示更多',
			contentrefresh: '正在加载...',
			contentnomore: '没有更多评论了'
		}"></uni-load-more>
		<!-- 弹窗 -->
		<CommentMasker :showPopup="showPopup" @closeMasker="showPopup=$event" @sendCommentVal="sendCommentVal"></CommentMasker>
	</view>
</template>

<script>
	import {getCommentList, updateComment} from '@/ajax/api/home.js'
	export default {
		onLoad(options) {
			this.articleId = options.id;
			this._getCommentList();
		},
		onReachBottom() {
			if(this.loading === 'no-more') return
			this.page++;
			this._getCommentList()
		},
		data() {
			return {
				articleId: '',
				commentList: [],
				pageSize: 5,
				page: 1,
				loading: 'loading',
				showPopup: false,
				replyDate: {}
			}
		},
		methods: {
			async _getCommentList() {
				const list = await getCommentList({
					articleId: this.articleId,
					pageSize: this.pageSize,
					page: this.page
				})
				if(list.length < this.pageSize) {
					this.loading = "no-more"
				}
				let oldList = JSON.parse(JSON.stringify(this.commentList));
				oldList.push(...list)
				this.commentList = oldList;
			},
			commentReply(data) {
				console.log(this.showPopup);
				this.replyDate = {
					comment_id: data.comment.comment_id,
					is_reply: data.is_reply
				}
				data.comment.reply_id && (this.replyDate.reply_id = data.comment.reply_id)
				this.openMasker();
			},
			async openMasker() {
				await this.checkIsLogin();
				this.showPopup = true;
			},
			async sendCommentVal(content) {
				const {msg} = await updateComment({
					userId: this.userInfo._id,
					articleId: this.articleId,
					content,
					...this.replyDate
				})
				uni.showToast({
					title:msg
				})
				this.showPopup = false;
				this.replyDate = {}
				this.page = 1;
				this.commentList = [];
				this.loading = 'loading'
				this._getCommentList()
			}
		}
	}
</script>

<style scoped lang="scss">
	.comment-list-container {
		width: 100%;
	}
	.comment-content-container {
		padding: 0 30rpx;
		border-bottom: 1px solid #eee;
	}
</style>
