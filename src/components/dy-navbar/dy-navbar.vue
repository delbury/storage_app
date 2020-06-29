<template>
  <uni-nav-bar :title="title" :fixed="true" class="dy-navbar" color="" backgroundColor="" :border="false">
    <template v-slot:left>
      <view class="left-btn">
        <text class="iconfont icon-home-fill"></text>
        <text class="left-btn-text">{{ btnText }}</text>
      </view>
    </template>
  </uni-nav-bar>
</template>

<script>
	export default {
    name: 'dy-navbar',
    props: {
      title: {
        type: String,
        default: ''
      },
    },
		data() {
			return {
				btnText: '家'
			};
		}
	}
</script>

<style lang="scss" scoped>
  .dy-navbar {
    
    /deep/ .uni-navbar__header {
      background-color: $uni-color-primary;
      color: $uni-text-color-inverse;
    }
    
    .left-btn {
      display: flex;
      align-items: center;
      margin-left: 1em;
      font-size: $uni-font-size-sm;
      
      .left-btn-text {
      }
    }
  }
</style>
