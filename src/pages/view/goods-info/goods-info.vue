<template>
	<view class="page page-goods-info">
		<view class="section">
		  <view class="title"><text>基本属性</text></view>
      <view class="content base">
        <local-popup
          :show="showPopup"
          @close="showPopup = false"
          @tap-item="handlePopupTapItem"
        ></local-popup>
        
        <view class="image" @tap="handleOpenPopup">
          <image v-if="hasImage" :src="goodsInfo.base.image"></image>
          <text v-else class="iconfont icon-add-select"></text>
        </view>
        <view class="rows">
          <view class="name">
            <dy-input type="text" v-model="goodsInfo.base.name" placeholder="名称" />
          </view>
          <view class="divider"></view>
          <view class="sort">
            <dy-select type="text" v-model="goodsInfo.base.sorts" placeholder="分类" @select="handleSelectSort" />
          </view>
        </view>
      </view>
		</view>
    
    <view class="section">
      <view class="title"><text>物品属性</text></view>
      <view class="content self">
        <!-- 条码 -->
        <tui-swipe-action :operateWidth="60">
          <template #content>
            <view class="row">
              <view class="info">
                <text>条码： </text>
                <text>{{ goodsInfo.self.barCode }}</text>
              </view>
              <text class="iconfont icon-scanning bigger-tap-area" @tap="handleTapScanBarCode"></text>
            </view>
          </template>
          
          <template #button>
            <view class="delete">
              <text class="text" @tap="clearSelfParam('barCode', '')">删除</text>
            </view>
          </template>
        </tui-swipe-action>
      </view>
      
      <view class="content self">
        <!-- 子分类 -->
        <tui-swipe-action :operateWidth="60">
          <template #content>
            <view class="row">
              <view class="info">
                <text>分类子标签： </text>
                <text>{{ goodsInfo.self.subSorts.length }}</text>
              </view>
              <text class="iconfont icon-arrow-right bigger-tap-area" @tap="() => {}"></text>
            </view>
          </template>
          
          <template #button>
            <view class="delete">
              <text class="text" @tap="clearSelfParam('subSorts', [])">删除</text>
            </view>
          </template>
        </tui-swipe-action>
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
    
    <view class="footer">
      <tui-button 
        class="btn"
        v-bind="initStyle"
        :disabled="btnDisabled"
        :type="btnDisabled ? 'gray' : 'green'"
        :plain="btnDisabled ? false : true"
      >完成</tui-button>
      <tui-button 
        class="btn"
        v-bind="initStyle"
        :disabled="btnDisabled"
        :type="btnDisabled ? 'gray' : 'green'"
      >完成并标记</tui-button>
    </view>
	</view>
</template>

<script>
  import validate from '@/common/tui-validation.js'
  import LocalPopup from './popup.vue'
  
	export default {
    components: { LocalPopup },
		data() {
			return {
        goodsInfo: {
          base: {
            image: '',
            name: '',
            sorts: ''
          },
          self: {
            barCode: '',
            subSorts: []
          },
          other: {}
        },
        
        // 初始化style
        initStyle: {
          size: '',
          width: '',
          height: '',
        },
        
        // 显示弹框
        showPopup: false
			}
		},
    computed: {
      // 是否录入了图片
      hasImage() {
        return !!this.goodsInfo.base.image
      },
      
      // 按钮是否禁用
      btnDisabled() {
        return !!this.goodsInfo.base.name
      }
    },
		methods: {
			// 选择分类
      handleSelectSort() {
        console.log(999999)
      },
      
      // 打开弹框
      handleOpenPopup() {
        this.showPopup = true
      },
      
      // 清除图片
      clearImage() {
        this.goodsInfo.base.image = ''
        this.showPopup = false
      },
      
      // 选取图片
      chooseImage(sourceType) {
        console.log(sourceType)
        uni.chooseImage({
          count: 1,
          sizeType: ['original'],
          sourceType: [sourceType], // album, camera
          success: (res) => {
            this.showPopup = false
            
            const filePath = encodeURIComponent(res.tempFilePaths[0])
            uni.navigateTo({
              url: `/pages/view/image-cropper/image-cropper?path=${filePath}`
            })
          }
        })
      },
      
      // 扫码导入
      importByScan() {
        // #ifdef APP-PLUS
        uni.scanCode({
          scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
          onlyFromCamera: false,
          success: res => {
            const info = res.result
            const type = res.scanType
          }
        })
        // #endif
      },
      
      // 扫入条码
      handleTapScanBarCode() {
        // #ifdef APP-PLUS
        uni.scanCode({
          scanType: ['barCode'],
          onlyFromCamera: false,
          success: res => {
            const info = res.result
            this.goodsInfo.self.barCode = info
          }
        })
        // #endif
      },
      
      // 清除输入
      clearSelfParam(key, init) {
        this.goodsInfo.self[key] = init
      },
      
      // 气泡弹出框点击
      handlePopupTapItem(key) {
        if(key === 'close') {
          // 清除图片
          this.clearImage()
          
        } else if(key === 'camera') {
          // 拍摄
          this.chooseImage('camera')
          
        } else if(key === 'album') {
          // 相册
          this.chooseImage('album')
          
        } else if(key === 'scan') {
          // 扫码
          this.importByScan()
          
        }
      },
      
      // 设置图片
      setImage(path) {
        this.goodsInfo.base.image = path
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
        
        .row {
          display: flex;
          align-items: center;
          height: 48rpx;
        }
        
        &:last-of-type {
          border-bottom-left-radius: $uni-border-radius-lg;
          border-bottom-right-radius: $uni-border-radius-lg;
        }
        &:nth-of-type(2) {
          border-top-left-radius: $uni-border-radius-lg;
          border-top-right-radius: $uni-border-radius-lg;
        }
        &:not(:last-of-type) {
          border-bottom: $uni-border-base;
        }
        
        &.self {
          padding: 20rpx;
          font-size: $uni-font-size-base;
          
          .row {
            
            .info {
              margin-right: 2em;
              flex: 1;
              display: flex;
              color: $uni-text-color;
            }
            .iconfont {
              color: $uni-text-color-grey;
              font-size: $uni-font-size-icon;
            }
          }
          
          .delete {
            @include flex-center();
            width: 100%;
            height: 100%;
            
            .text {
              color: $uni-color-error;
              font-size: $uni-font-size-base;
            }
          }
        }
        
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
          position: relative;
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
    
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 40rpx;
      
      .btn {
        width: 45%;
        height: 72rpx;
        border-radius: 36rpx;
        font-size: $uni-font-size-base;
        
        &.unactive {
          color: $uni-text-color-inverse;
        }
      }
    }
  }
</style>
