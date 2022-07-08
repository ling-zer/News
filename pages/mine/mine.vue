<template>
	<view class="my-container">
		<view v-if="userInfo" class="my-header">
			<view class="my-header-back">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header-logo">
				<view class="my-header-logo-box">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="username">{{userInfo.author_name}}</text>
			</view>
			<view class="my-header-info">
				<view class="my-header-info-box">
					<text class="my-header-info-title">被关注</text>
					<text>{{userInfo.follow_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">粉丝数</text>
					<text>{{userInfo.fans_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">积分</text>
					<text>{{userInfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>
		<!-- 内容部分 -->
		<view class="my-content">
			<view v-if="!userInfo" class="my-content-list" @click="goLogin">
				<view class="my-content-item">
					<image class="logo" :src="userInfo.avatar" mode="aspectFill"></image>
					<text>HI, 你尚未登录，请点击登录</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content-list" @click="goMyArticle">
				<view class="my-content-item">
					<uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content-list">
				<view class="my-content-item">
					<uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			
			<!-- #ifdef APP-PLUS -->
			<view class="my-content-list" @click="hasNewVersion && _getNewVersion()">
				<view class="my-content-item">
					<uni-icons class="icons" type="paperclip" size="16" color="#666"></uni-icons>
					<view class="version-container">
						<text>当前版本
							<text v-if="hasNewVersion" class="new-version">(点击下载最新版本)</text>
						</text>
						<text class="version">{{currentVersion}}</text>
					</view>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<!-- #endif -->
			
			<button v-if="userInfo" type="warn" class="sign-out" @click="signOut">退出</button>
		</view>
	</view>

</template>

<script>
	import {getCurrentVersion} from '@/ajax/api/common.js'
	export default {
		data() {
			return {
				hasNewVersion: true,
				currentVersion: '1.0.0',
				downLoadLinkUrl: ''
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			uni.getSystemInfo({
				success: res => {
					if(res.platform === "android") {
						plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
							this.currentVersion = wgtinfo;
							this._checkVersion();
						})
					}
				}
			})
			// #endif
		},
		methods: {
			// 用户退出
			signOut() {
				this.$store.commit('updateUserInfo', null);
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			// 跳转登录
			goLogin() {
				uni.navigateTo({
					url:'/pages/userInfo/login/login'
				})
			},
			// 点击跳转我的文章
			goMyArticle() {
				uni.navigateTo({
					url:'/pages/myArticle/myArticle'
				})
			},
			// 检查当前应用版本
			async _checkVersion() {
				const {version, downLoadLinkUrl} = await getCurrentVersion();
				if(version !== this.currentVersion) {
					this.hasNewVersion = true;
					this.downLoadLinkUrl = downLoadLinkUrl;
				}
			},
			// 下载最新版本
			_getNewVersion() {
				uni.showLoading({
					title:'下载中，请稍后'
				});
				let dtask = plus.downloader.createDownload(this.downLoadLinkUrl, {}, function(d, status) {
					// 下载完成
					uni.hideLoading({});
					if(status === 200) {
						plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error){
							uni.showToast({
								title:"安装失败"
							})
						})
					} else {
						uni.showToast({
							title:"更新失败"
						})
					}
				})
				dtask.start();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/pages/mine/mine.scss'
</style>
