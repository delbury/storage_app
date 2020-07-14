<template>
	<view class="page page-goods-info" @touchstart="handleToucestart" @touchend="handleTouceend">
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
      
      <block v-for="(item, index) in goodsInfoSelfItems" :key="index">
        <view class="content self">
          <tui-swipe-action :operateWidth="60" :forbid="forbidSwipeAction">
            <view slot="content">
              <view class="row">
                <view class="info">
                  <text>{{ item.label }}： </text>
                  
                  <view style="flex: 1; overflow: hidden;">
                    <!-- 选择类型 -->
                    <text
                      v-if="item.type === 'select'"
                    >{{ goodsInfo.self[item.key] }}</text>

                    <!-- 多选标签 -->
                    <dy-select-tags
                      v-else-if="item.type === 'tags'"
                      v-model="goodsInfo.self[item.key]"
                    ></dy-select-tags>

                    <!-- 评分 -->
                    <u-rate
                      v-else-if="item.type === 'rate'"
                      :count="5"
                      v-model="goodsInfo.self[item.key]"
                      active-color=""
                    ></u-rate>

                    <!-- 数量 -->
                    <u-number-box
                      v-else-if="item.type === 'number'"
                      v-model="goodsInfo.self[item.key]"
                      :min="1"
                      :max="999"
                    ></u-number-box>

                    <!-- 购买时间、过期时间 -->
                    <dy-calendar
                      :ref="item.key"
                      v-else-if="item.type === 'date'"
                      v-model="goodsInfo.self[item.key]"
                    ></dy-calendar>

                    <!-- 价格 -->
                    <u-input
                      v-else-if="item.type === 'money'"
                      v-model="goodsInfo.self[item.key]"
                      type="number"
                      placeholder="请输入价格"
                      height="44rpx"
                    ></u-input>

                    <!-- 文本段 -->
                    <u-input
                      v-else-if="item.type === 'textarea'"
                      v-model="goodsInfo.self[item.key]"
                      type="textarea"
                      placeholder="请输入信息"
                      height="44rpx"
                    ></u-input>
                  </view>
                </view>
                
                <text 
                  v-if="item.icon"
                  class="iconfont bigger-tap-area" 
                  :class="[item.icon || '']"
                  @tap="handleTapItem(item.key, item)"
                ></text>
              </view>
            </view>
            
            <view slot="button" class="delete">
              <text class="text" @tap="clearSelfParam(item.key, item.initValue)">清除</text>
            </view>
          </tui-swipe-action>
        </view>
      </block>
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
            barCode: '2339233',
            subSorts: [
              { label: '服装', id: '1' },
              { label: '衣服', id: '2' },
              { label: '裤子', id: '3' },
            ],
            rate: 3,
            quantity: 1,
            unitPrice: '',
            purchaseDate: '',
            expirationDate: '',
            colors: [
              { label: '深海色', id: '1' },
              { label: '墨绿色', id: '2' },
            ],
            seasons: [
              { label: '春季', id: '1' },
              { label: '夏季', id: '2' },
              { label: '秋季', id: '3' },
              { label: '冬季', id: '4' },
            ],
            channels: [
              { label: '淘宝', id: '1' },
              { label: '网购', id: '2' },
            ],
            remark: ''
          },
        },
        
        // 初始化style
        initStyle: {
          size: '',
          width: '',
          height: '',
        },
        
        // 显示弹框
        showPopup: false,

        // 禁止滑动
        forbidSwipeAction: false,
        
        // 物品属性条目
        goodsInfoSelfItems: [
          { key: 'barCode', type: 'select', icon: 'icon-scanning', label: '条码' },
          { key: 'subSorts', type: 'tags', icon: 'icon-arrow-right', label: '分类子标签' },
          { key: 'rate', type: 'rate', label: '评分' },
          { key: 'quantity', type: 'number', label: '数量', initValue: 1 },
          { key: 'unitPrice', type: 'money', label: '单价' },
          { key: 'purchaseDate', type: 'date', label: '购买时间', icon: 'icon-calendar' },
          { key: 'expirationDate', type: 'date', label: '过期时间', icon: 'icon-calendar' },
          { key: 'colors', type: 'tags', icon: 'icon-arrow-right', label: '颜色' },
          { key: 'seasons', type: 'tags', icon: 'icon-arrow-right', label: '季节' },
          { key: 'channels', type: 'tags', icon: 'icon-arrow-right', label: '购货渠道' },
          { key: 'remark', type: 'textarea', icon: '', label: '其他' },
        ]
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
      
      // 点击物品属性图标
      handleTapItem(key, item) {
        if(key === 'barCode') {
          this.handleTapScanBarCode()
        } else if(item.type === 'date') {
          this.$refs[key][0].open()
        }
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
      },

      // 开始滑动
      handleToucestart() {
        // this.forbidSwipeAction = false
      },

      // 滑动结束
      handleTouceend() {
        this.forbidSwipeAction = false
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
    },
    onPageScroll() {
      if(!this.forbidSwipeAction) {
        this.forbidSwipeAction = true
      }
		},
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
          box-sizing: content-box;
          padding: 20rpx;
          display: flex;
          align-items: center;
          min-height: 50rpx;
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
          position: relative;
          &::after {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: block;
            content: "";
            border-bottom: $uni-border-base;
            transform: scaleY(0.5);
          }
        }
        
        &.self {
          font-size: $uni-font-size-base;
          
          .row {
            
            .info {
              margin-right: 2em;
              flex: 1;
              display: flex;
              align-items: center;
              color: $uni-text-color;
              overflow: hidden;
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
            background-color: $uni-color-error;
            
            .text {
              color: $uni-text-color-inverse;
              font-size: $uni-font-size-base;
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
      padding-top: 20rpx;
      padding-bottom: 60rpx;
      
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

    /deep/ .uicon-star-fill.u-iconfont {
      color: $uni-color-warning;
    }
  }
</style>
