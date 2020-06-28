<template>
  <dy-dialog ref="dyDialog" @change="handleDialogChange">
    <view class="body">
      <view class="input-box">
        <input
          class="input"
          type="text"
          v-model.trim="form.inputValue"
          placeholder="请输入名称"
          placeholder-class="placeholder"
          confirm-type="done"
          @confirm="handleConfirm"
          :cursor-spacing="20"
        />
      </view>
    </view>
  </dy-dialog>
</template>

<script>
  import DyDialogMixin from '@/components/dy-dialog/dy-dialog-mixin.js'
  export default {
    mixins: [DyDialogMixin],
    data() {
      return {
        form: {
          inputValue: ''
        },
      }
    },
    methods: {
      handleConfirm() {
        uni.hideKeyboard()
      },
      
      // 关闭初始化参数
      handleDialogChange(ev) {
        if(!ev.show) {
          this.resetForm()
          this.inputWidth = '5em'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .body {
    $input-box-height: 100rpx;
    
    .input-box {
      box-sizing: border-box;
      @include flex-center();
      width: 100%;
      height: $input-box-height;
      border: $uni-border-base;
      border-radius: calc(#{$input-box-height} / 2);
    }
    .input {
      box-sizing: border-box;
      padding: 0 1em;
      width: 100%;
      overflow: visible;
      
      /deep/ .uni-input-wrapper {
        @include flex-center();
        
        .uni-input-input {
          text-align: center;
        }
      }
      
      // &:focus-within .placeholder {
      //   padding: 0 0.5em;
      //   left: 0;
      //   top: calc(#{$input-box-height} / -2) !important;
      //   color: $uni-color-primary;
      //   font-size: $uni-font-size-sm;
      //   background-color: $uni-bg-color;
      // }
    }
    
    .placeholder {
      left: calc(50% - 2.5em);
      // top: 0 !important;
      width: fit-content;
      height: 100%;
      color: $uni-text-color-placeholder;
      text-align: center;
      // transition: all 200ms;
    }
  }
</style>
