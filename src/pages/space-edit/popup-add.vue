<template>
  <dy-dialog
    ref="dyDialog"
    @change="handleDialogChange"
    @confirm="handleDialogConfirm"
    :title="title"
  >
    <view class="body">
      <view class="input-box">
        <input
          class="input"
          type="text"
          v-model.trim="initParams.inputValue"
          placeholder="请输入名称"
          placeholder-class="placeholder"
          confirm-type="done"
          @confirm="handleKeyboardConfirm"
          :cursor-spacing="20"
        />
      </view>
    </view>
  </dy-dialog>
</template>

<script>
  import DyDialogMixin from '@/components/dy-dialog/dy-dialog-mixin.js'
  import { mapMutations } from 'vuex'
  export default {
    mixins: [DyDialogMixin],
    data() {
      return {
        initParams: {
          inputValue: '',
          edit: false,
          currentParams: null
        },
      }
    },
    computed: {
      title() {
        switch(this.initParams.edit) {
          case true:
            return '编辑空间'
          default:
            return '添加空间'
        }
      }
    },
    methods: {
      ...mapMutations({
        addNewTab: 'addNewTabMutation',
        editTab: 'editTabMutation'
      }),
      handleKeyboardConfirm() {
        uni.hideKeyboard()
      },
      
      // 关闭初始化参数
      handleDialogChange(ev) {
        if(!ev.show) {
          this.resetForm()
          this.inputWidth = '5em'
        }
      },
      
      // 对话框确认
      handleDialogConfirm(cb) {
        if(this.initParams.inputValue) {
          if(this.initParams.edit) {
            // 编辑
            this.editTab({
              label: this.initParams.inputValue,
              id: this.initParams.currentParams.id
            })
            cb && cb()
            
          } else {
            // 新增
            this.addNewTab({
              label: this.initParams.inputValue
            })
            cb && cb()
          }
        } else {
          //
        }
      },
      
      // 回显
      openWithParams(params) {
        this.initParams.currentParams = params
        this.initParams.edit = true
        this.initParams.inputValue = params.label
        this.open()
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
