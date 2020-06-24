<template>
  <view class="edit-list">
    <view
      class="edit-list-item"
      :class="{
        'moving': movingFlag === item.id,
        'releasing': releasing === true && movingFlag === item.id
      }"
      :style="movingFlag === item.id ? listStyle : {}"
      v-for="(item, index) in list"
      :key="item.id"
      ref="listItem"
     >
      <view class="label">{{ item.label }}</view>
      
      <view class="icons">
        <slot></slot>
        <text
          class="iconfont icon-category"
          v-if="moveable"
          @touchstart.stop="dragTouchstart($event, item.id, index)"
          @touchmove.stop="dragTouchmove($event, item.id)"
          @touchend.stop="dragTouchend($event, item.id)"
        ></text>
      </view>
    </view>
  </view>
  
</template>

<script>
  import { mapMutations } from 'vuex'
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
      }
    },
		data() {
			return {
        releasing: false,
				movingFlag: null,
        movingIndex: null,
        startPoint: null,
        listStyle: {
          transform: 'translateY(0px)'
        },
			}
		},
    methods: {
      ...mapMutations({
        exchangeOrder: 'exchangeOrderMutation'
      }),
      dragTouchstart(ev, id, index) {
        if(ev.touches.length === 1) {
          this.movingFlag = id
          this.startPoint = ev.touches[0].pageY
          this.movingIndex = index
        }
      },
      dragTouchmove(ev, id) {
        if(this.startPoint !== null && ev.touches.length === 1) {
          let index = this.movingIndex
          
          const currentElTop = this.$refs.listItem[index].$el.offsetTop
          const offsetY = ev.touches[0].pageY - this.startPoint
          const currentPosition = currentElTop + offsetY
          this.listStyle.transform = `translateY(${offsetY}px)`
          
          console.log(currentPosition)
          
          if(index < this.list.length - 1) {
            // 非最后一个元素下移

          } else if(index > 0) {
            // 非第一个元素上移

          }
        }
      },
      dragTouchend(ev, id) {
        this.movingIndex = null
        this.movingFlag = null
        this.startPoint = null
        this.listStyle.transform = 'translateY(0px)'
        // this.releasing = true
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
    height: 40px;
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
    }
    
    &.moving {
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
