<template>
  <swiper
    class="page-space-swiper"
    @change="handleSwiperChange"
    :duration="300"
    :current="currentIndex"
   >
    <swiper-item
      v-for="item in tabList"
      :key="item.id"
     >
      <uni-grid :column="3" :showBorder="false">
        <uni-grid-item
          v-for="(it, ind) in item.items"
          :key="ind"
        >
          <view class="grid-item">
            <image :src="it.img" mode="aspectFit" style="max-width: 100%; max-height: 50%;"></image>
            <view class="main">{{it.title}}</view>
            <view class="sub">{{it.quantity}}个物品</view>
          </view>
        </uni-grid-item>
      </uni-grid>
    </swiper-item>
  </swiper>
</template>

<script>
  import UniGrid from '@/components/uni-grid/uni-grid.vue'
  import UniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
  
  export default {
    name: 'space-swiper',
    components: { UniGrid, UniGridItem },
    props: {
      currentIndex: {
        type: Number,
        default: 0
      },
      tabList: {
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
      return {}
    },
    
    methods: {
      // 滑块改变
      handleSwiperChange(ev) {
        this.$emit('update:currentIndex', ev.detail.current)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-space-swiper {
    flex: 1;
    width: 100%;
    height: 100%;
    
    .grid-item {
      width: 100%;
      height: 100%;
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
    }
  }
</style>
