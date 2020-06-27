<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import url('./static/iconfont/iconfont.css');
  page {
    height: 100%;
    color: $uni-text-color;
    font-size: $uni-font-size-base;
  }
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
    
    .btn-tab-edit {
      font-size: $uni-font-size-icon;
    }
    
    &.page-custom-tabbar {
      height: calc(100% - #{$uni-custom-tabbar-height});
    }
  }
  .fw-b {
    font-weight: bold;
  }
  .text-color-primary {
    color: $uni-color-primary;
  }
  .full-h {
    height: 100%;
  }
</style>
