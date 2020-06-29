<template>
  <view>
    <view class="dy-tab" :class="{'plain': plain}">
      <view class="dy-tab-container">
        <scroll-view :scroll-x="true" style="height: 100%" :show-scrollbar="false">
          <view class="dy-tab-items">
            <block
              v-for="(tab, index) in tabList"
              :key="tab.id"
            >
              <view
                class="dy-tab-title"
                :class="{'actived': index === currentIndex}"
                @tap="changeTab(index)"
               >
                <text>{{tab.label}}</text>
              </view>
            </block>
          </view>
        </scroll-view>
      </view>
      <view class="dy-tab-slot">
        <slot></slot>
      </view>
    </view> 
  </view>
</template>
<script>
  export default {
    name: 'dy-tab',
    props: {
      /**
       * label
       */
      tabList: {
        type: Array,
        default: () => ([])
      },
      currentIndex: {
        type: Number,
        default: 0
      },
      plain: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      };
    },
    methods: {
      // 改变tab
      changeTab(index) {
        console.log('start')
        this.$emit('update:currentIndex', index)
        this.$emit('tab-change', index)
        
        return true
      },
      handleTouchend() {
        console.log('end')
      },
      handleTouchmove() {
        console.log('move')
      },
      handleTouchcancel() {
        console.log('cancel')
      }
    }
  };
</script>
<style lang="scss" scoped>
  .dy-tab {
    display: flex;
    justify-content: space-between;
    // height: 72rpx;
    box-sizing: border-box;
    padding: 0.25rem 1rem;
    font-size: $uni-font-size-sm;
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
    
    &.plain {
      background-color: $uni-bg-color;
      color: $uni-text-color-grey;
      border-bottom: 1rpx solid $uni-border-color;
      
      .dy-tab-title.actived {
        color: $uni-text-color;
      }
    }

    .dy-tab-container {
      margin-right: 1rem;
      flex: 1;
      overflow: hidden;
    }

    .dy-tab-items {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .dy-tab-title {
      display: inline-block;
      flex: 0;
      white-space: nowrap;
      transition: all 200ms;

      // &:first-of-type {
      //   margin-left: 0.5rem;
      // }
      &:not(:last-of-type) {
        margin-right: 1rem;
      }

      &.actived {
        font-size: $uni-font-size-lg;
        // transform: scale(1.2, 1.2);
      }
    }

    .dy-tab-slot {
      display: flex;
      align-items: center;
    }
  }
</style>
