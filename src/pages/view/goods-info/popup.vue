<template>
  <!-- 弹框 -->
  <tui-bubble-popup
    class="popup"
    :show="show"
    :mask="true"
    v-bind="styleInit"
    @close="handlePopupClose"
  >
  <view class="list">
    <tui-list-cell class="list-item" :lineLeft="false" :lineRight="false">
      <view class="list-item-container" @tap.stop="handleListItemTap($event, 'close')">
        <text class="iconfont icon-close"></text>
      </view>
    </tui-list-cell>
    <tui-list-cell class="list-item" :lineLeft="false" :lineRight="false">
      <view class="list-item-container" @tap.stop="handleListItemTap($event, 'photo')">
        <text class="text">拍照</text>
      </view>
    </tui-list-cell>
    <tui-list-cell class="list-item" :lineLeft="false" :lineRight="false">
      <view class="list-item-container" @tap.stop="handleListItemTap($event, 'ablum')">
        <text class="text">相册</text>
      </view>
    </tui-list-cell>
    <tui-list-cell class="list-item" :lineLeft="false" :lineRight="false">
      <view class="list-item-container" @tap.stop="handleListItemTap($event, 'scan')">
        <text class="text">扫码</text>
      </view>
    </tui-list-cell>
  </view>
  </tui-bubble-popup>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        styleInit: {
          width: '180rpx',
          backgroundColor: '',
          radius: '',
          color: '',
          position: 'absolute',
          left: '20rpx',
          right: '',
          bottom: '',
          top: '20rpx',
          transform: '',
          maskBgColor: 'rbga(0, 0, 0, 0)'
        }
      }
    },
    
    methods: {
      handlePopupClose() {
        this.$emit('close')
      },
      handleListItemTap(ev, key) {
        this.$emit('tap-item', key)
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    .list-item-container {
      @include flex-center();
      width: 100%;
      height: 100%;
    }
    
    .list-item:first-of-type {
      @include flex-center();
      height: 180rpx;
      
      .iconfont {
        @include flex-center();
        width: 50%;
        height: 50%;
        font-size: 60rpx;
        background-color: $uni-bg-color-grey;
        border-radius: 50%;
        color: $uni-color-warning;
      }
    }
    
    .list-item {
      height: 70rpx;
    }
  }
</style>
