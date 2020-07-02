<template>
	<scroll-view :scroll-x="true" class="dy-select-tags">
	  <view
      class="content"
      @touchend.stop
    >
      <view class="chip" v-for="(item, index) in value" :key="item.id">
        <tui-tag type="gray" size="" padding="" margin="">
          <text class="label">{{ item.label }}</text>
        </tui-tag>
        <!-- <text class="split iconfont icon-fengefu" v-if="index !== value.length - 1"></text> -->
      </view>
    </view>
	</scroll-view>
</template>

<script>
	export default {
    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    },
		data() {
			return {
				
			}
		},
    methods: {
    }
	}
</script>

<style scoped lang="scss">
  .dy-select-tags {
    height: 100%;
    
    /deep/ .uni-scroll-view-content {
      display: flex;
      align-items: center;
    }
    
    /deep/ .tui-tag {
      padding: 6rpx 12rpx;
    }
    
    .content {
      display: flex;
      align-items: center;
      
      .label {
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
      
      .chip {
        margin: 0 0.25em;
        // display: flex;
        // align-items: center;
        
        // .split {
        //   color: $uni-text-color-grey;
        //   margin: 0 0.2em;
        //   transform: scaleX(0.6);
        // }
      }
    }
  }
</style>
