<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
      uni.onTabBarMidButtonTap(() => {
        uni.navigateTo({
          url: '/pages/view/goods-info/goods-info?mode=add'
        })
      })
      
      uni.navigateTo({
        url: '/pages/view/goods-info/goods-info?mode=add'
      })
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
  /* #ifndef APP-NVUE */
  @import url('./static/iconfont/iconfont.css');
  page {
    height: 100%;
    color: $uni-text-color;
    font-size: $uni-font-size-base;
  }
  // 页面的样式
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
  .text-color-info {
    color: $uni-color-info;
  }
  .text-color-primary {
    color: $uni-color-primary;
  }
  .text-color-warning {
    color: $uni-color-warning;
  }
  .text-color-success {
    color: $uni-color-success;
  }
  
  .full-h {
    height: 100%;
  }
  
  // 禁用样式
  .disabled,
  .disabled * {
    color: $uni-text-color-disable !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
  }
  
  // input placeholder
  .ph {
    color: $uni-text-color-placeholder;
    font-size: $uni-font-size-base;
  }
  
  // 分割线
  .divider {
    border-bottom: $uni-border-base;
  }
  /* #endif */
</style>
