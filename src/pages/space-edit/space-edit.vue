<template>
	<view class="page page-custom-tabbar bg">
    <view class="full-h">
      <dy-drag-list :list="tabList" :showSlot="showSlot" @order-change="handleOrderChange">
        <template v-slot="data">
          <view v-if="mode === 'select'" class="custom-icons">
            <text
              class="btn-select bigger-area iconfont"
              :class="{'icon-seleted selected': selectedItem[data.item.id]}"
              @tap="handleSelect(data)"
            ></text>
          </view>
          <view v-else-if="mode === 'edit'" class="custom-icons">
            <text class="btn-tap iconfont icon-ashbin" @tap="handleDelete(data)"></text>
            <text class="btn-tap iconfont icon-editor" @tap="handleEdit(data)"></text>
          </view>
        </template>
      </dy-drag-list>
    </view>
    
    <!-- 弹框 -->
    <popup-add ref="popupAdd"></popup-add>
    
		<!-- 自定义tabbar -->
		<dy-tabbar :buttons="editButtons" @tap-button="handleTapButton"></dy-tabbar>
	</view>
</template>

<script>
  import { spaceEditButtons as editButtons } from '@/common/custom-tabbar-buttons.js'
  import { mapMutations } from 'vuex'
  import PopupAdd from './popup-add.vue'
  
	export default {
    components: { PopupAdd },
    computed: {
      tabList() {
        return this.$store.state.tabList
      },
      
      editButtons() {
        return editButtons[this.mode]
      }
    },
		data() {
			return {
				mode: 'normal',
        showSlot: false, // 是否显示slot
        selectedItem: {}
			}
		},
		methods: {
      ...mapMutations({
        reOrder: 'reOrderMutation',
        deleteTab: 'deleteTabMutation'
      }),
      
			handleTapButton(key) {
        if(key === 'select') {
          // 多选
          this.mode = 'select'
          this.showSlot = true
          
        } else if(key === 'cancel') {
          // 取消
          this.mode = 'normal'
          this.showSlot = false
          this.selectedItem = {}
          
        } else if(key === 'add') {
          // 添加
          this.$refs.popupAdd.open()
          
        } else if(key === 'edit') {
          // 编辑
          this.mode = 'edit'
          this.showSlot = true
          
        } else if(key === 'delete') {
          // 删除
          const ids = []
          for(let id in this.selectedItem) {
            if(this.selectedItem[id]) {
              ids.push(id)
            }
          }
          if(ids.length) {
            uni.showModal({
              title: '提示',
              content: '确认删除该空间？',
              success: res => {
                if(res.confirm) {
                  this.deleteTab(ids)
                }
              }
            })
          }
        }
      },
      
      // 变更选中状态
      handleSelect(data) {
        if(!this.selectedItem[data.item.id]) {
          this.$set(this.selectedItem, data.item.id, true)
        } else {
          this.selectedItem[data.item.id] = false
        }
      },
      
      // 行内删除
      handleDelete(data) {
        uni.showModal({
          title: '提示',
          content: '确认删除该空间？',
          success: res => {
            if(res.confirm) {
              this.deleteTab([data.item.id])
            }
          }
        })
      },
      
      // 行内编辑
      handleEdit(data) {
        this.$refs.popupAdd.openWithParams(data.item)
      },
      
      // 排序改变
      handleOrderChange(orders) {
        this.reOrder({ orders })
      }
		}
	}
</script>

<style lang="scss" scoped>
  .bg {
    background-color: $uni-bg-color-grey-light;
  }
  // .custom-icons {
  //   @include flex-center();
  // }
  // 多选按钮样式
  /deep/ .btn-select {
    box-sizing: border-box;
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
    
    &.bigger-area::after {
      position: absolute;
      content: "";
      display: block;
      width: 70rpx;
      height: 70rpx;
      background-color: transparent;
    }
  }
  /deep/ .btn-tap {
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    z-index: 1;
    font-size: 40rpx;
    
    &:not(:last-of-type) {
      margin-right: 1.5em;
    }
  }
</style>
