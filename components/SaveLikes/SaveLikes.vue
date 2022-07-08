<template>
	<view class="save-incons" @click.stop="_changeLikeStatus">
		<uni-icons color="#ff6600" :type="isSave? 'heart-filled' : 'heart'" :size="size"></uni-icons>
	</view>
</template>

<script>
	import {updateLike} from "@/ajax/api/home.js"
	export default {
		name:"SaveLikes",
		props: {
			articleId: String,
			size: {
				type: String,
				default: '20'
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			async _changeLikeStatus() {
				// 判断用户是否登录了，没有登陆就先跳转登录
				await this.checkIsLogin()
				// 修改数据库 收藏文章状态
				const {msg, userInfo} = await updateLike({
					articleId: this.articleId,
					userId: this.userInfo._id
				})
				uni.showToast({
					title:msg,
					icon:"none"
				})
				this.updateUserInfo({...this.userInfo, ...userInfo});
				uni.$emit('updateFollowArticle')
			}
		},
		computed: {
			isSave() {
				return this.userInfo && this.userInfo.article_likes_ids.includes(this.articleId);
			}
		}
	}
</script>

<style>

</style>