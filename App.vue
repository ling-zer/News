<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("@/components/u-parse/u-parse.css");
	/*每个页面公共css */
	page {
/* 		height: initial;
		overflow-y: initial;
		min-height: 100vh; */
		height: 100%;
		display: flex;
	}
</style>
