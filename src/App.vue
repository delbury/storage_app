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
  page {
    height: 100%;
  }
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
    
    .btn-tab-edit {
      font-size: $uni-font-size-icon;
    }
  }
  .fw-b {
    font-weight: bold;
  }
  .text-color-primary {
    color: $uni-color-primary;
  }
</style>
