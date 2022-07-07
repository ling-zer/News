<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-logo">
				<image :src="commentData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-info">
				<view class="title" v-if="!commentData.is_reply">
					{{commentData.author.author_name}}
				</view>
				<view class="title" v-else>
					{{commentData.author.author_name}}
					<text class="reply-text">回复</text>
					{{commentData.to}}
				</view>
				<view class="date">
					<uni-dateformat :date="commentData.create_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
			</view>
		</view>
		<!-- 评论内容 -->
		<view class="comment-content">
			<view class="content">
				{{commentData.comment_content}}
			</view>
			<view class="comment-btn-container">
				<view class="comment-btn" @click="commentReply({comment: commentData, isReply})">
					回复
				</view>
			</view>
			<!-- 子回复展示区域 -->
			<view class="comment-reply-list" v-for="item in commentData.reply" :key="item.comment_id">
				<CommentBox :isReply="true" :commentData="item" @commentReply="commentReply"></CommentBox>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"CommentBox",
		props: {
			commentData: Object,
			isReply: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			// 回复
			commentReply(data) {
				if(data.isReply) {
					data.comment.reply_id = data.comment.comment_id
					data.comment.comment_id = this.commentData.comment_id
				}
				console.log(data);
				// return;
				this.$emit('commentReply', data)
			}
		}
	}
</script>

<style lang="scss" scoped>
 @import "@/components/CommentBox/CommentBox.scss";
</style>