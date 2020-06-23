<template>
  <view class="dy-tab" :class="{'plain': plain}">
    <view class="dy-tab-container">
      <scroll-view :scroll-x="true" style="height: 100%" :show-scrollbar="false">
        <view class="dy-tab-items">
          <view
            class="dy-tab-title"
            v-for="(tab, index) in tabList"
            :key="tab.id"
            :class="{'actived': index === currentIndex}"
            @click="changeTab(index)"
           >
            <text>{{tab.label}}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="dy-tab-slot">
      <slot></slot>
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
        this.$emit('update:currentIndex', index)
        this.$emit('tab-change', index)
      }
    }
  };
</script>
<style lang="scss" scoped>
  .dy-tab {
    display: flex;
    justify-content: space-between;
    height: 72rpx;
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;
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
        margin-right: 0.5rem;
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
