<template>
  <view class="page-space-swiper">
    <swiper
      @change="handleSwiperChange"
      :duration="200"
      :current="currentIndex"
      style="height: 100%;"
      easing-function="linear"
     >
      <swiper-item
        v-for="item in spaceList"
        :key="item.id"
       >
       <scroll-view :scroll-y="true" style="height: 100%;">
        <view class="grid-list">
          <block
            v-for="(it, ind) in item.items"
            :key="it.id"
          >
            <view
              class="grid-item"
              @tap="handleSelectItem(it, ind, item)"
            >
             <text
               v-if="selectable"
               class="btn-select iconfont"
               :class="{'icon-seleted selected': selectedStatusList[ind]}"
             ></text>
             <text v-else-if="!it.quantity" class="iconfont icon-kong empty"></text>
             <image :src="it.img" mode="aspectFit" style="max-width: 100%; max-height: 50%;"></image>
             <text class="main">{{it.title}}</text>
             <view class="text-color-info">
               <text :class="{
                 'text-color-primary': !!it.quantity,
               }">{{it.quantity}}</text>
               <text>个物品</text>
             </view>
            </view>
          </block>
        </view>
       </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    name: 'space-swiper',
    props: {
      currentIndex: {
        type: Number,
        default: 0
      },
      spaceList: {
        type: Array,
        default: () => ([])
      },
      
      // 可选择
      selectable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectedItems: [], // 已选项
        selectedStatusList: {}, // 选择状态变量
      }
    },
    
    watch: {
      selectedItems: {
        immediate: true,
        handler(val) {
          this.$emit('update:selectedItems', val)
        }
      }
    },
    
    methods: {
      // 滑块改变
      handleSwiperChange(ev) {
        this.selectedItems = []
        this.selectedStatusList = {}
        this.$emit('update:currentIndex', ev.detail.current)
      },
      
      // 选择
      handleSelectItem(item, index, tab) {
        if(!this.selectable) {
          return
        }
        
        const state = this.selectedStatusList[index]
        if(!state) {
          this.selectedItems.push(item)
        } else {
          const ind = this.selectedItems.findIndex(it => it === item)
          this.selectedItems.splice(ind, 1)
        }
        this.$set(this.selectedStatusList, index, !state)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-space-swiper {
    flex: 1;
    // width: 100%;
    // height: 100%;
    
    .grid-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }    
    .grid-item {
      position: relative;
      width: 250rpx;
      height: 250rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      
      .main {
        margin-top: 10rpx;
        font-size: $uni-font-size-base;
      }
      .sub {
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
      
      .btn-select {
        box-sizing: border-box;
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 40rpx;
        height: 40rpx;
        border: 1px solid $uni-border-color;
        border-radius: 50%;
        z-index: 1;
        font-size: 30rpx;
        font-weight: bold;
        
        &.selected {
          background-color: $uni-color-success;
          color: $uni-text-color-inverse;
          box-shadow: $uni-box-shadow;
          border: none;
        }
      }
      
      .empty {
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        z-index: 1;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 40rpx;
        height: 40rpx;
        font-size: 30rpx;
        font-weight: bold;
        color: $uni-text-color-inverse;
        background-color: $uni-color-warning;
        border-radius: 50%;
        
        padding: 2px;
        border: 1px dashed $uni-color-warning;
        background-clip: content-box;
        
        &::before {
          margin-left: -4rpx;
        }
      }
    }
  }
</style>
