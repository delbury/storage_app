<template>
  <view v-if="showMainList" class="edit-list">
    <scroll-view
      :scroll-y="scrollable"
      style="height: 100%;"
      :scroll-with-animation="true"
      :scroll-top="scrollTop"
      @scroll="drag.scroll"
    >
      <view v-if="!!list.length">
        <block
          v-for="(item, index) in list"
          :key="index"
        >
          <view
            class="edit-list-item"
            :class="{ ['item-id-' + item.id]: true }"
            :data-id="item.id"
            :data-index="index"
            @transitionend="drag.handleTransitionend"
           >
            <view class="label">{{ item.label }}</view>
            
            <slot class="icons" v-if="showSlot" :item="item"></slot>
            <view v-else class="icons">
              <text
                class="bigger-area iconfont icon-category"
                @touchstart.stop.prevent="drag.dragTouchstart"
                @touchmove.stop.prevent="drag.dragTouchmove"
                @touchend.stop.prevent="drag.dragTouchend"
                :data-id="item.id"
              ></text>
            </view>
          </view>
        </block>
      </view>
      <dy-no-data v-else></dy-no-data>
    </scroll-view>
  </view>
  <view v-else class="edit-list">
    <scroll-view :scroll-y="true" style="height: 100%;">
      <block
        v-for="(item, index) in tempList"
        :key="'temp' + index"
      >
        <view class="edit-list-item">
          <view class="label">{{ item.label }}</view>
          <view class="icons">
            <text class="bigger-area iconfont icon-category"></text>
          </view>
        </view>
      </block>
    </scroll-view>
  </view>
</template>

<!-- <script module="drag" lang="wxs" src="./drag.wxs"></script> -->
<script module="drag" lang="renderjs">
  // import store from '@/store/index.js'
  import { constCustomTabbarHeigth as tbh } from '@/common/const.js'
  import DyNoData from '../dy-no-data/dy-no-data.vue'
  
  export default {
    components: { DyNoData },
    data() {
      return {
        currentElement: null,
        startPoint: null,
        unitHeight: null,
        hasOffset: false, // 是否存在偏移
        listItems: [],
        currentMoving: false,
        oldIndex: null,
        newIndex: null,
        epMap: [],
        currentScrollTop: 0, // 实际滚动的距离
        systemInfo: {}, // 系统信息
        scrollOffset: 0, // 累积的滚动距离
      }
    },
    // created() {
    //   uni.getSystemInfo({
    //     success: (info) => {
    //       this.systemInfo.scrollHeight = info.windowHeight - tbh
    //     }
    //   })
    // },
    methods: {    
      handleTransitionend(ev) {
        // this.currentElement.removeClass('releasing')
        // this.currentElement.removeClass('moving')
      },
      
      // 滚动监听
      scroll(ev, instance) {
        this.currentScrollTop = ev.detail.scrollTop
      },
      
      dragTouchstart(ev, instance) {
        instance.callMethod('changeScrollState', false)
        
        this.listItems = [...instance.selectAllComponents(`.edit-list-item`)]
        this.epMap = this.listItems.map((it, index) => index)
        const originId = ev.instance.getDataset().id
        const id = originId.replace(/"/g, '')
        this.listItems.forEach(item => {
          if(item.getDataset().id !== originId) {
            item.addClass('releasing')
          }
        })
        this.currentElement = instance.selectComponent(`.item-id-${id}`)
        this.currentElement.addClass('moving')
        this.currentElement.removeClass('releasing')
        this.startPoint = ev.touches[0].pageY
        this.unitHeight = this.currentElement.$el.offsetHeight
        this.oldIndex = +this.currentElement.getDataset().index
        this.newIndex = this.oldIndex
        this.scrollOffset = 0
        
        return false
      },
      
      dragTouchmove(ev, instance) {
        if(ev.touches.length !== 1) {
          return
        }
        
        // 是否滚动scroll-view
        // let isScrolled = false
        // const scrollOffset = this.unitHeight * 1.5
        // if(ev.touches[0].pageY + this.unitHeight > this.systemInfo.scrollHeight) {
        //   this.scrollOffset += scrollOffset
        //   console.log(this.scrollOffset)
        //   instance.callMethod('scrollTo', scrollOffset + this.currentScrollTop)
        //   isScrolled = true
        // }
        
        const offsetY = ev.touches[0].pageY - this.startPoint
        const currentPosition = this.currentElement.$el.offsetTop + offsetY
        this.currentElement.setStyle({ 
          transform: `translateY(${offsetY + this.scrollOffset}px) translateZ(0px)`
        })
        
        // 判断是否存在偏移
        if(offsetY !== 0 && this.hasOffset === false) {
          this.hasOffset = true
        }
        
        let prevPosition = null
        let nextPosition = null
        let prevElementState = null
        let nextElementState = null
        let nextIndex = null
        let prevIndex = null
        if(this.newIndex < this.listItems.length - 1) {
          // 非最后一个元素
          nextIndex = this.epMap[this.newIndex + 1]
          nextElementState = this.listItems[nextIndex].getState()
          nextElementState.offset = nextElementState.offset || 0
          const offset = nextElementState.offset || 0
          nextPosition = this.listItems[nextIndex].$el.offsetTop + offset * this.unitHeight
        }
        if(this.newIndex > 0) {
          // 非第一个元素
          prevIndex = this.epMap[this.newIndex - 1]
          prevElementState = this.listItems[prevIndex].getState()
          prevElementState.offset = prevElementState.offset || 0
          const offset = prevElementState.offset
          prevPosition = this.listItems[prevIndex].$el.offsetTop + offset * this.unitHeight
        }
        
        
        // 判断交换位置
        if(
          nextPosition !== null &&
          (nextPosition - currentPosition) < 0.3 * this.unitHeight
        ) {
          // 上移
          instance.callMethod('vibrate')
          
          const index = this.epMap[this.newIndex + 1]
          // this.listItems[index + 1].addClass('releasing')
          nextElementState.offset = nextElementState.offset === 0 ? -1 : 0
          this.listItems[index].setStyle({ transform: `translateY(${nextElementState.offset * 100}%) translateZ(0px)` })
          
          ;[this.epMap[this.newIndex], this.epMap[this.newIndex + 1]] = [this.epMap[this.newIndex + 1], this.epMap[this.newIndex]]
          this.newIndex++
        } else if(
          prevPosition !== null &&
          (currentPosition - prevPosition) < 0.3 * this.unitHeight
        ) {
          // 下移
          instance.callMethod('vibrate')
          
          const index = this.epMap[this.newIndex - 1]
          // this.listItems[index - 1].addClass('releasing')
          prevElementState.offset = prevElementState.offset === 0 ? 1 : 0
          this.listItems[index].setStyle({ transform: `translateY(${prevElementState.offset * 100}%) translateZ(0px)` })
          
          ;[this.epMap[this.newIndex], this.epMap[this.newIndex - 1]] = [this.epMap[this.newIndex - 1], this.epMap[this.newIndex]]
          this.newIndex--
        }
        
        return false
      },
      
      dragTouchend(ev, instance) {
        // 交换位置
        this.currentElement.addClass('releasing')
        this.currentElement.setStyle({ transform: `translateY(${(this.newIndex - this.oldIndex) * 100}%) translateZ(0px)` })
        
        setTimeout(() => {
          instance.callMethod('switchList', { orders: this.epMap })
          setTimeout(() => {
            this.listItems.forEach(item => {
              item.setStyle({})
              item.getState().offset = 0
            })
          }, 100)
          
          this.currentElement.removeClass('moving')
          instance.callMethod('changeScrollState', true)
        }, 200)

        return false
      },
    }
  }
</script>
<script>
	export default {
    name: 'dy-drag-list',
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      
      // 是否有移动按钮
      moveable: {
        type: Boolean,
        default: true
      },
      
      // 是否显示slot
      showSlot: {
        type: Boolean,
        default: false
      }
    },
		data() {
			return {
        showMainList: true,
        tempList: [],
        scrollTop: 0, // 滚动距离
        scrollable: true, // 可滚动
			}
		},
    mounted() {
      const query = uni.createSelectorQuery().in(this)
      query.selectAll('.edit-list-item').boundingClientRect(res => {
        this.listItems = [...res]
      }).exec()
        
    },
    methods: {
      // 切换列表
      switchList({ orders }) {
        this.tempList = orders.map(order => this.list[order])
        this.showMainList = false
        
        this.$emit('order-change', orders)
        
        setTimeout(() => {
          this.showMainList = true
        }, 200)
      },
      
      // 振动
      vibrate() {
        uni.vibrateShort()
      },
      
      // 滚动
      scrollTo(offset) {
        console.log(offset)
        this.scrollTop = offset
      },
      
      // 开始、结束拖动
      changeScrollState(flag) {
        this.vibrate() // 振动
        this.scrollable = flag // 锁定滚动
      }
    }
	}
</script>


<style lang="scss" scoped>
.edit-list {
  height: 100%;
    
  .edit-list-item {
    position: relative;
    box-sizing: border-box;
    padding: 0 1rem;
    height: 100rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: $uni-border-base;
    background-color: #fff;
    z-index: 0;
    transform: translateY(0px);
    
    .label {
    }
    .icons > .iconfont {
      @include flex-center();
      @include icon-round(40rpx);
      background-color: $uni-bg-color-grey-deep;
      color: $uni-text-color-grey;
      font-size: 24rpx;
      font-weight: bold;
      
      &.bigger-area::after {
        position: absolute;
        content: "";
        display: block;
        width: 70rpx;
        height: 70rpx;
        background-color: transparent;
      }
    }
    
    &.moving {
      border-bottom: none;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
      background-color: rgba(255, 255, 255, .8);
      z-index: 1;
    }
    &.releasing {
      transition: transform 200ms;
    }
  }
}
</style>
