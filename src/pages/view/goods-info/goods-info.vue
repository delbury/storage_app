<template>
	<view class="page page-goods-info">
		<view class="section">
		  <view class="title"><text>基本属性</text></view>
      <view class="content base">
        <view class="image">
          <image v-if="hasImage" :src="goodsInfo.base.image"></image>
          <text v-else class="iconfont icon-add-select"></text>
        </view>
        <view class="rows">
          <view class="name">
            <dy-input type="text" v-model="goodsInfo.base.name" placeholder="名称" />
          </view>
          <view class="divider"></view>
          <view class="sort">
            <dy-select type="text" v-model="goodsInfo.base.sort" placeholder="分类" @select="handleSelectSort" />
          </view>
        </view>
      </view>
		</view>
    <view class="section">
      <view class="title"><text>其他属性</text></view>
      <view class="content other">
        <view class="row header">
          <text>其他属性</text>
          <text class="iconfont icon-editor"></text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
  import validate from '@/common/tui-validation.js'
  
	export default {
		data() {
			return {
        goodsInfo: {
          base: {
            image: '',
            name: '',
            sort: ''
          },
          other: {}
        }
			}
		},
    computed: {
      hasImage() {
        return !!this.goodsInfo.base.image
      }
    },
		methods: {
			// 选择分类
      handleSelectSort() {
        console.log(999999)
      }
		},
    onLoad(params) {
      if(params.mode === 'add') {
        // 添加
        uni.setNavigationBarTitle({
          title: '添加物品'
        })
        
      } else if(params.mode === 'view') {
        // 编辑
        uni.setNavigationBarTitle({
          title: '物品信息'
        })
        
      }
    }
	}
</script>

<style scoped lang="scss">
  .page-goods-info {
    box-sizing: border-box;
    padding: 1em;
    background-color: $uni-bg-color-grey;
    
    .section {
      .title {
        margin-bottom: 20rpx;
        color: $uni-text-color-grey;
        font-size: $uni-font-size-sm;
      }
      
      .content {
        background-color: $uni-bg-color;
        border-radius: $uni-border-radius-lg;
        
        &.other {
          padding: 20rpx;
          font-size: $uni-font-size-base;
          
          .row {
            
            &.header {
              display: flex;
              justify-content: space-between;
              color: $uni-text-color-grey;
              
              .iconfont {
                font-size: $uni-font-size-icon;
              }
            }
          }
          
        }
        
        &.base {
          display: flex;
          flex-direction: row;
          padding: 20rpx 0 20rpx 20rpx;
          
          .image {
            @include flex-center();
            width: 160rpx;
            height: 160rpx;
            border-radius: $uni-border-radius-lg;
            overflow: hidden;
            
            image {
              max-width: 100%;
              max-height: 100%;
            }
            
            .iconfont {
              @include flex-center();
              width: 50%;
              height: 50%;
              font-size: 60rpx;
              background-color: $uni-bg-color-grey;
              border-radius: 50%;
              color: $uni-color-success;
            }
          }
          
          .rows {
            margin-left: 40rpx;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: $uni-font-size-base;
            
            .name {
              padding-right: 20rpx;
            }
            
            .sort {
              position: relative;
              padding-right: 20rpx;
            }
          }
        }
      }
      
      &:not(:last-of-type) {
        margin-bottom: 40rpx;
      }
    }
  }
</style>
