<template>
  <uni-popup ref="popup" :maskClick="maskClick" @change="handleDialogChange">
    <view
      class="subnvue-popup"
      :style="{
        width
      }"
    >
      <view class="header">
        <text class="title">{{ title }}</text>
        <text v-if="headerClose" class="close iconfont icon-close" @tap="close"></text>
      </view>
      <view class="body">
        <slot></slot>
      </view>
      <view class="footer">
        <view v-if="footerCancel" class="btn cancel" @tap="close">取消</view>
        <view class="btn confirm">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
  import UniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
  export default {
    name: 'dy-dialog',
    components: { UniPopupDialog },
    props: {
      title: {
        type: String,
        default: '标题'
      },
      
      width: {
        type: String,
        default: '650rpx'
      },
      
      // 点击遮罩是否关闭
      maskClick: {
        type: Boolean,
        default: false
      },
      
      // 是否显示标题栏关闭按钮
      headerClose: {
        type: Boolean,
        default: true
      },
      
      // 是否显示footer的取消按钮
      footerCancel: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      open() {
        this.$refs.popup.open()
      },
      close() {
        this.$refs.popup.close()
      },
      
      // 确认
      confirm() {
        this.$emit('confirm')
      },
      
      // 弹框状态改变
      handleDialogChange(ev) {
        this.$emit('change', ev)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $padding-gap: 30rpx;
  $padding-gap-large: 60rpx;
  
  .subnvue-popup {
    display: flex;
    flex-direction: column;
    background-color: $uni-bg-color;
    border-radius: 20rpx;
    overflow: hidden;
    
    .body {
      padding: $padding-gap-large;
    }
    
    .header {
      @include flex-center();
      position: relative;
      height: 80rpx;
      // border-bottom: $uni-border-base;
      // background-color: $uni-bg-color-grey;
      
      .title {
        font-size: $uni-font-size-lg;
        font-weight: bold;
      }
      .close {
        position: absolute;
        right: $padding-gap;
        font-size: $uni-font-size-icon;
      }
    }
    
    .footer {
      @include flex-center();
      box-sizing: border-box;
      border-top: $uni-border-base;
      height: 80rpx;
      background-color: $uni-bg-color-grey;
      
      .btn {
        flex: 1 1 50%;
        @include flex-center();
        height: 100%;
        box-sizing: border-box;
        font-size: $uni-font-size-base;
        font-weight: bold;
        border: none;
        
        &:not(:last-of-type) {
          border-right: $uni-border-base;
        }
        
        &.confirm {
          color: $uni-color-success;
        }
        &.cancel {
          color: $uni-text-color-placeholder
        }
      }
    }
  }
</style>
