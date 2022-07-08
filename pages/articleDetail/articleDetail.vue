<template>
	<view class="article-detail-container">
		<view class="detail-title">
			{{ articleData.title }}
		</view>
		<view class="detail-header">
			<view class="header-left">
				<view class="avator-container">
					<image :src="articleData.author.avatar" mode="aspectFit"></image>
				</view>
				<view class="info-container">
					<view>{{ articleData.author.author_name }}</view>
					<view>{{ articleData.create_time }} {{ articleData.browse_count }} 浏览 {{ articleData.thumbs_up_count }}👍
					</view>
				</view>
			</view>
			<button class="header-right" @click="_followAuthor">
				{{isFollowAuthor? '取消关注' : '关注'}}
			</button>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="content"></u-parse>
			</view>
			
			<!-- 评论内容部分 -->
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
					<CommentBox :commentData="item" @commentReply="commentReply"></CommentBox>
				</view>
				<view class="no-data" v-if="!commentList.length">
					暂无评论
				</view>
			</view>
		</view>
		<view class="detail-footer">
			<view class="input-container" @click="openMasker">
				<text>探讨那你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-icons">
				<view class="detail-icon-box" @click="goCommentPage">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<SaveLikes :articleId="articleData._id" :size="'22'" class="detail-icon-box"></SaveLikes>
				<!-- <view class="detail-icon-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view> -->
				<view class="detail-icon-box">
					<uni-icons @click="_updateCompliments" :type="isCompliments ? 'hand-up-filled':'hand-up'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<CommentMasker :showPopup="showPopup" @closeMasker="showPopup=$event" @sendCommentVal="sendCommentVal"></CommentMasker>
	</view>
</template>

<script>
import uParse from '@/components/u-parse/u-parse.vue'
import {marked} from 'marked'
import { getArticleDetail, updateComment, getCommentList } from '@/ajax/api/home.js'
import {updateFollowAuthor, updateCompliments} from '@/ajax/api/user.js'

export default {
	onLoad(...options) {
		const res = JSON.parse(options[0].params)
		this.articleData = res;
		// 获取文章内容
		this._getArticleDetail();
		// 获取评论列表
		this._getCommentList()
	},
	components: {
		uParse
	},
	data() {
		return {
			articleData: null,
			showPopup: false,
			commentList: [],
			replyDate: {}
		}
	},
	methods: {
		async openMasker() {
			await this.checkIsLogin();
			this.showPopup = true;
		},
		async _getArticleDetail() {
			const res = await getArticleDetail({ article_id: this.articleData._id });
			this.articleData = res;
		},
		// 发送评论到后端
		async sendCommentVal(content) {
			
			const {msg} = await updateComment({
				userId: this.userInfo._id,
				articleId: this.articleData._id,
				content,
				...this.replyDate
			})
			uni.showToast({
				title:msg
			})
			this.showPopup = false;
			this.replyDate = {}
			this._getCommentList()
		},
		async _getCommentList() {
			const res = await getCommentList({articleId: this.articleData._id})
			this.commentList = res;
		},
		// 处理 回复评论
		commentReply(data) {
			this.replyDate = {
				comment_id: data.comment.comment_id,
				is_reply: data.is_reply
			}
			data.comment.reply_id && (this.replyDate.reply_id = data.comment.reply_id)
			this.openMasker();
		},
		// 关注、取消关注 作者
		async _followAuthor() {
			// 1. 判断是否登录
			await this.checkIsLogin();
			// 2. 请求
			const {msg} = await updateFollowAuthor({
				authorId: this.articleData.author.id,
				userId: this.userInfo._id
			})
			uni.showToast({
				title: msg
			})
			// 改变store的用户存储状态
			let followIds = [...this.userInfo.author_likes_ids]
			if(followIds.includes(this.articleData.author.id)) {
				followIds = followIds.filter(item => item != this.articleData.author.id)
			} else {
				followIds.push(this.articleData.author.id)
			}
			this.updateUserInfo({
				...this.userInfo,
				author_likes_ids: followIds
			})
			uni.$emit('updateFollowAuthor')
		},
		async _updateCompliments() {
			const {msg} = await updateCompliments({
				userId: this.userInfo._id,
				articleId: this.articleData._id
			})
			
			uni.showToast({
				title:msg
			})
			
			let thumbArr = [...this.userInfo.thumbs_up_article_ids]
			if(thumbArr.includes(this.articleData._id)) {
				thumbArr = thumbArr.filter(id => id !== this.articleData._id)
				this.articleData.thumbs_up_count -= 1
			} else {
				thumbArr.push(this.articleData._id)
				this.articleData.thumbs_up_count += 1
			}
			// 修改本地用户信息
			this.updateUserInfo({
				...this.userInfo,
				thumbs_up_article_ids: thumbArr
			})
			
		},
		// 跳转到评论列表
		goCommentPage() {
			uni.navigateTo({
				url:'/pages/CommentList/CommentList?id=' + this.articleData._id
			})
		}
	},
	computed: {
		content() {
			try {
				return marked(this.articleData.content);
			} catch (error) {
				return null
			}
			
		},
		// 是否关注作者
		isFollowAuthor() {
			return this.userInfo && this.userInfo.author_likes_ids.includes(this.articleData.author.id)
		},
		// 是否点赞
		isCompliments() {
			try{
				return this.userInfo && this.userInfo.thumbs_up_article_ids.includes(this.articleData._id)
			}catch(e){
				//TODO handle the exception
				return false
			}
		}
	}
}
</script>

<style lang="scss">
@import "@/pages/articleDetail/test.scss"
</style>
