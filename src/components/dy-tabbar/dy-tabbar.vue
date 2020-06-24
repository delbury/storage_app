<template>
	<view class="custom-tabbar">
		<view class="list" v-for="item in buttons" :key="item.key" @click="handleItemClick(item.key)">
      <text class="iconfont" :class="[item.iconClass]"></text>
      <view class="label">{{item.label}}</view>
		</view>
	</view>
</template>

<script>
	export default {
    name: 'dy-tabbar',
    props: {
      /**
       * label, key, iconClass
       */
      buttons: {
        type: Array,
        default: () => ([])
      }
    },
		data() {
			return {
				
			}
		},
		methods: {
			handleItemClick(key) {
        this.$emit('click-button', key)
      }
		}
	}
</script>

<style lang="scss" scoped>
  .custom-tabbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    position: fixed;
    z-index: 9;
    width: 100%;
    height: $uni-custom-tabbar-height;
    left: 0;
    bottom: 0;
    background-color: $uni-custom-tabbar-bg-color;
    border-top: $uni-custom-tabbar-border-top;
    
    .list {
      margin-top: 10rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      .iconfont {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48rpx;
        height: 48rpx;
        border: 1rpx solid $uni-border-color;
        border-radius: 50%;
        font-size: 36rpx;
      }
      .label {
        margin-top: 8rpx;
        font-size: 20rpx;
      }
    }
  }
</style>
