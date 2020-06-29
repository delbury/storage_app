<template>
  <uni-nav-bar
    class="dy-navbar"
    :title="title"
    :fixed="true"
    backgroundColor=""
    :border="false"
    color=""
  >
    <template v-slot:left>
      <view class="left-btn" @tap="togglePopup">
        <text class="iconfont icon-home-fill"></text>
        <text class="left-btn-text">{{ btnText }}</text>
        
        <!-- 选择框 -->
        <tui-bubble-popup
          class="popup"
          :show="showPopup"
          :mask="true"
          v-bind="styleInit"
        >
          <view v-for="item in homeList" :key="item.id">
            <tui-list-cell class="list-item" @tap="handleListItemTap(item.id)">
              <view class="list-item-container">
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
            <tui-list-cell class="list-item" @tap="handleListItemTap(null)">
              <view class="list-item-container">
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
    },
    computed: {
      ...mapGetters({
        homeList: 'homeList',
        currentHome: 'currentHome',
      })
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
      // 开关选择框
      togglePopup() {
        this.showPopup = !this.showPopup
      },
      
      // 选择item
      handleListItemTap(id) {
        if(id) {
          // 切换空间
          console.log(id)
          
        } else {
          // 管理页面
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
    
    .popup {
      background-color: $uni-color-primary;
      
      /deep/ .tui-popup-list {
        box-sizing: border-box;
        border-radius: 16rpx;
        overflow: hidden;
        box-shadow: 3px 3px 10px $uni-shadow-color;
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
