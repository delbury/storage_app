<template>
  <uni-nav-bar
    class="dy-navbar"
    :title="title"
    :fixed="true"
    :backgroundColor="backgroundColor"
    :border="false"
    color=""
    :left-icon="backIcon"
    @clickLeft="handleClickLeft"
  >
    <template v-slot:left>
      <view class="left-btn" @tap="openPopup" v-if="hasSpaceBtn">
        <text class="iconfont icon-home-fill"></text>
        <text class="left-btn-text">{{ btnText }}</text>
        
        <!-- 选择框 -->
        <tui-bubble-popup
          class="popup"
          :show="showPopup"
          :mask="true"
          v-bind="styleInit"
          @close="handlePopupClose"
        >
          <view v-for="item in homeList" :key="item.id">
            <tui-list-cell class="list-item">
              <view class="list-item-container" @tap.stop="handleListItemTap($event, item.id)">
                <text
                  class="iconfont icon-home-fill"
                  :class="{
                    'text-color-success': item.id === currentHome.id,
                    'text-color-info': item.id !== currentHome.id,
                  }"
                ></text>
                <text class="text">{{ item.label }}</text>
              </view>
            </tui-list-cell>
          </view>
          <view>
            <tui-list-cell class="list-item disabled">
              <view class="list-item-container" @tap.stop="handleListItemTap($event, null)">
                <text class="iconfont icon-set text-color-warning"></text>
                <text class="text">管理</text>
              </view>
            </tui-list-cell>
          </view>
        </tui-bubble-popup>
      </view>
    </template>
  </uni-nav-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
	export default {
    name: 'dy-navbar',
    props: {
      title: {
        type: String,
        default: ''
      },
      
      // 是否有左上角自定义按钮
      hasSpaceBtn: {
        type: Boolean,
        default: true,
      },
      
      // 背景颜色
      backgroundColor: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters({
        homeList: 'homeList',
        currentHome: 'currentHome',
      }),
      
      // 是否有返回按钮
      backIcon() {
        return !this.hasSpaceBtn ? 'back' : ''
      }
    },
		data() {
			return {
				btnText: '家',
        showPopup: false,
        styleInit: {
          width: '350rpx',
          backgroundColor: '',
          radius: '',
          color: '',
          position: 'absolute',
          left: '0',
          right: '',
          bottom: '',
          top: '3em',
          transform: '',
          maskBgColor: 'rbga(0, 0, 0, 0)'
        }
			};
		},
    methods: {
      // 打开选择框
      openPopup() {
        this.showPopup = true
      },
      
      // 点击蒙层回调
      handlePopupClose() {
        this.showPopup = false
      },
      
      // 选择item
      handleListItemTap(ev, id) {
        if(id) {
          // 切换空间
          console.log(id)
          this.showPopup = false
          
        } else {
          // 管理页面
        }
      },
      
      // 返回
      handleClickLeft() {
        if(!!this.backIcon) {
          uni.navigateBack()
        }
      }
    }
	}
</script>

<style lang="scss" scoped>
  .dy-navbar {
    
    /deep/ .uni-navbar__header {
      background-color: $uni-color-primary;
      color: $uni-text-color-inverse;
    }
    
    /deep/ .uni-navbar__content {
      overflow: visible;
    }
    
    .left-btn {
      position: relative;
      display: flex;
      align-items: center;
      margin-left: 1em;
      font-size: $uni-font-size-sm;
      
      .left-btn-text {
        margin-left: 0.25em;
      }
    }
    

    .list-item {
      height: 70rpx;
      
      .list-item-container {
        display: flex;
        align-items: center;
        padding: 0 1em 0 0.5em;
        height: 100%;
        
        .iconfont {
          font-size: $uni-font-size-icon;
        }
        .text {
          margin-left: 0.5em;
          font-size: $uni-font-size-base;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
</style>
