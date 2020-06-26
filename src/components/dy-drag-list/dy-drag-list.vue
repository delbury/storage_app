<template>
  <view v-if="showMainList" class="edit-list">
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
        
        <view class="icons">
          <slot></slot>
          <text
            class="bigger-area iconfont icon-category"
            v-if="moveable"
            @touchstart.stop.prevent="drag.dragTouchstart"
            @touchmove.stop.prevent="drag.dragTouchmove"
            @touchend.stop.prevent="drag.dragTouchend"
            :data-id="item.id"
          ></text>
        </view>
      </view>
    </block>
  </view>
  <view v-else class="edit-list">
    <block
      v-for="(item, index) in tempList"
      :key="'temp' + index"
    >
      <view class="edit-list-item">
        <view class="label">{{ item.label }}</view>
        <view class="icons">
          <slot></slot>
          <text class="bigger-area iconfont icon-category"></text>
        </view>
      </view>
    </block>
  </view>
</template>

<!-- <script module="drag" lang="wxs" src="./drag.wxs"></script> -->
<script module="drag" lang="renderjs">
  import store from '@/store/index.js'
  export default {
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
        epMap: []
      }
    },
    methods: {    
      handleTransitionend() {
        console.log('transitionend')
        this.currentElement.removeClass('releasing')
        this.currentElement.removeClass('moving')
      },
      dragTouchstart(ev, instance) {
        this.listItems = [...instance.selectAllComponents(`.edit-list-item`)]
        this.epMap = this.listItems.map((it, index) => index)
        const id = ev.instance.getDataset().id.replace(/"/g, '')
        this.currentElement = instance.selectComponent(`.item-id-${id}`)
        this.currentElement.removeClass('releasing')
        this.currentElement.removeClass('moving')
        this.currentElement.addClass('moving')
        this.startPoint = ev.touches[0].pageY
        this.unitHeight = this.currentElement.$el.offsetHeight
        this.oldIndex = +this.currentElement.getDataset().index
        this.newIndex = this.oldIndex
        
        return false
      },
      
      dragTouchmove(ev, instance) {
        const offsetY = ev.touches[0].pageY - this.startPoint
        const currentPosition = this.currentElement.$el.offsetTop + offsetY
        this.currentElement.setStyle({ 
          transform: `translateY(${offsetY}px) translateZ(0px)`
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
        this.currentElement.setStyle({ transform: `translateY(${(this.newIndex - this.oldIndex) * 100}%) translateZ(0px)` })
        instance.callMethod('switchList', { orders: this.epMap })
        setTimeout(() => {
          this.listItems.forEach(item => {
            item.setStyle({})
            item.getState().offset = 0
          })
        }, 100)
        
        
        // instance.callMethod('reOrder','drag-over' {
        //   orders: this.epMap,
        //   cb: () => {
        //     console.log('cb')
        //     this.listItems.forEach(item => {
        //       item.setStyle({ transform: null })
        //       item.getState().offset = 0
        //     })
        //     instance.callMethod('refresh')
        //   }
        // })
        
        // 过渡动画
        // this.currentMoving = true
        // if(this.hasOffset) {
        //   this.currentElement.addClass('releasing')
        //   this.currentElement.setStyle({ transform: null })
        //   this.hasOffset = false
        // } else {
        //   this.currentElement.removeClass('moving')
        // }
        this.currentElement.removeClass('moving')

        return false
      },
    }
  }
</script>
<script>
  import { mapMutations } from 'vuex'
  import store from '@/store/index.js'
	export default {
    name: 'dy-drag-list',
    props: {
      // list: {
      //   type: Array,
      //   default: () => ([])
      // },
      
      // 是否有移动按钮
      moveable: {
        type: Boolean,
        default: true
      }
    },
		data() {
			return {
        showMainList: true,
        tempList: [],
			}
		},
    computed: {
      list() {
        return this.$store.state.tabList
      },
    },
    mounted() {
      const query = uni.createSelectorQuery().in(this)
      query.selectAll('.edit-list-item').boundingClientRect(res => {
        this.listItems = [...res]
      }).exec()
        
    },
    methods: {
      ...mapMutations({
        exchangeOrder: 'exchangeOrderMutation',
        reOrder: 'reOrderMutation',
        // refresh: 'refreshMutation'
      }),
      
      // 切换列表
      switchList({ orders }) {
        this.tempList = orders.map(order => this.list[order])
        this.showMainList = false
        this.reOrder({ orders })
        setTimeout(() => {
          this.showMainList = true
        }, 200)
      }
    }
	}
</script>


<style lang="scss" scoped>
.edit-list {
    
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
