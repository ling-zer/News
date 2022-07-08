<template>
	<view class="follow-container">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active: currentIndex === 0}" @click="currentIndex=0">
					文章
				</view>
				<view class="follow-tab-item" :class="{active: currentIndex === 1}" @click="currentIndex=1">
					作者
				</view>
			</view>
		</view>
		<view class="follow-list-container">
			<swiper class="follow-list-swiper" :current="currentIndex" @change="changeCurrent">
				<swiper-item>
					<!-- 关注文章列表 -->
					<view class="swiper-item">
						<ListItem :articleList="articleList" :isShowLoadMore="false"></ListItem>
						<view v-if="noArticle" class="no-data">
							暂无收藏文章
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<AuthorList :authorList="authorList"></AuthorList>
						<view v-if="noAuthor" class="no-data">
							暂无收藏文章
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {getFollowArticle, getAuthorList} from '@/ajax/api/user.js'
	export default {
		data() {
			return {
				currentIndex: 0,
				articleList: [],
				noArticle: false,
				authorList: [],
				noAuthor: false
			}
		},
		onLoad() {
			uni.$on('updateFollowArticle', () => {
				this._getFollowArticle()
			})
			uni.$on('updateFollowAuthor', () => {
				this._getAuthorList()
			})
			this._getFollowArticle()
			this._getAuthorList()
		},
		methods: {
			changeCurrent(e) {
				this.currentIndex = e.detail.current
			},
			// 获取收藏文章
			async _getFollowArticle(){
				const list = await getFollowArticle({
					userId: this.userInfo._id
				})
				this.articleList = list
				if(!list.length) {
					this.noArticle = true
				}
			},
			// 获取关注的作者列表
			async _getAuthorList() {
				const list = await getAuthorList({
					userId: this.userInfo._id
				})
				this.authorList = list
				if(!list.length) {
					this.noAuthor = true
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/pages/like/like.scss'
</style>
