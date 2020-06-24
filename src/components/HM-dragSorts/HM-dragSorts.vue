<template>
  <view class="HM-drag-sort">
    <view class="list" :class="[listSwitch?'show':'hide']">
      <block v-for="(row,index) in dragListA" :key="index">
        <view class="rowA" :id="'rowA'+index">
          <view class="modules">
            <view class="content">
              <image v-if="row.icon" class="icon" :src="row.icon"></image>
              <text class="text">{{row.label}}</text>
            </view>
            <!-- #ifndef MP-WEIXIN -->
            <view class="drag" :data-index="index" data-type="A" :data-isdelay="isdelay" :data-rownum="dragListA.length"
              @touchstart.stop.prevent="drag.touchstart" @touchmove.stop.prevent="drag.touchmove"
              @touchend.stop.prevent="drag.touchend">
              <text class="iconfont icon-drag"></text>
            </view>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <view class="drag" :data-index="index" data-type="A" :data-isdelay="isdelay" :data-rownum="dragListA.length"
              @touchstart="drag.touchstart" @touchmove="drag.touchmove" @touchend="drag.touchend">
              <text class="iconfont icon-drag"></text>
            </view>
            <!-- #endif -->
          </view>
        </view>
      </block>
    </view>
    <!-- #ifndef H5 -->
    <!-- 非H5端，直接切换list，避免看到排序渲染的过程(闪动) 原谅我找不到更好的方法了 ╮(╯▽╰)╭ -->
    <view class="list" :class="[listSwitch?'hide':'show']">
      <block v-for="(row,index) in dragListB" :key="index">
        <view class="rowB" :id="'rowB'+index">
          <view class="modules">
            <view class="content">
              <image v-if="row.icon" class="icon" :src="row.icon"></image>
              <text class="text">{{row.label}}</text>
            </view>
            <!-- #ifndef MP-WEIXIN -->
            <view class="drag" :data-index="index" data-type="B" :data-isdelay="isdelay" :data-rownum="dragListB.length"
              @touchstart.stop.prevent="drag.touchstart" @touchmove.stop.prevent="drag.touchmove"
              @touchend.stop.prevent="drag.touchend">
              <text class="iconfont icon-drag"></text>
            </view>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <view class="drag" :data-index="index" data-type="B" :data-isdelay="isdelay" :data-rownum="dragListB.length"
              @touchstart="drag.touchstart" @touchmove="drag.touchmove" @touchend="drag.touchend">
              <text class="iconfont icon-drag"></text>
            </view>
            <!-- #endif -->
          </view>
        </view>
      </block>
    </view>
    <!-- #endif -->
  </view>
</template>
<script src="./drag.wxs" module="drag" lang="wxs"></script>
<script>
  export default {
    label: 'HM-dragSort',
    data() {
      return {
        dragListA: [],
        dragListB: [],
        listSwitch: true,
        isdelay: false
      }
    },
    props: {
      list: {
        value: Array,
        default: []
      }
    },
    watch: {
      list: {
        handler(val) {
          this.initList(); //数据变化重新初始化list
        },
        immediate: true
      }
    },
    mounted() {
      // #ifndef H5
      this.isdelay = true;
      // #endif
    },
    methods: {
      initList() {
        if (this.dragListA.length > 0) {
          //一个延迟，防止闪动
          setTimeout(() => {
            this.dragListA = this.list;
            this.dragListB = this.list;
          }, 50)
        } else {
          this.dragListA = this.list;
          this.dragListB = this.list;
        }
      },
      //兼容微信小程序震动
      vibrate() {
        uni.vibrateShort()
      },
      sort(e) {
        let tmpList = JSON.parse(JSON.stringify(this.dragListA));
        tmpList.splice(e.offset, 0, tmpList.splice(e.index, 1)[0]);
        // #ifdef H5
        this.dragListA = [];
        this.dragListA = tmpList;
        // #endif
        // #ifndef H5
        if (this.listSwitch) {
          this.dragListB = [];
          this.dragListB = tmpList;
          // #ifdef MP-WEIXIN
          setTimeout(() => {
            // #endif
            // #ifndef MP-WEIXIN
            this.$nextTick(() => {
              // #endif
              this.listSwitch = !this.listSwitch;
              this.$nextTick(() => {
                this.dragListA = [];
                this.dragListA = tmpList;
              })
              // #ifdef MP-WEIXIN
            }, 50)
            // #endif
            // #ifndef MP-WEIXIN
          })
          // #endif
        } else {
          this.dragListA = [];
          this.dragListA = tmpList;
          // #ifdef MP-WEIXIN
          setTimeout(() => {
            // #endif
            // #ifndef MP-WEIXIN
            this.$nextTick(() => {
              // #endif
              this.listSwitch = !this.listSwitch;
              this.$nextTick(() => {
                this.dragListB = [];
                this.dragListB = tmpList;
              })
              // #ifdef MP-WEIXIN
            }, 50)
            // #endif
            // #ifndef MP-WEIXIN
          })
          // #endif
        }
        // #endif
        this.$emit('confirm', {
          list: tmpList
        });
      }
    }
  }
</script>

<style lang="scss">
  .HM-drag-sort {
    touch-action: none;
    display: flex;
    flex-direction: column;

    .list {
      display: flex;
      flex-direction: column;
      // border-bottom: $uni-border-base;
      // border-top: $uni-border-base;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      transform: translateY(0px) translateZ(5px);
      -webkit-transform: translateY(0px) translateZ(5px);

      &.show {
        display: flex;
      }

      &.hide {
        display: none;
      }

      .rowA,
      .rowB {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 45px;
        background-color: rgba(255, 255, 255, 1);
        transform: translateY(0px) translateZ(5px);
        -webkit-transform: translateY(0px) translateZ(5px);


        &.ani {
          transition: all 0.2s;
          -webkit-transition: all 0.2s;
        }

        &.move {
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
          background-color: rgba(255, 255, 255, .8);

          .modules {
            border-bottom-width: 0;
          }
        }

        .modules {
          padding-left: 12px;
          padding-right: 12px;
          width: 100%;
          border-bottom: $uni-border-base;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          .content {
            display: flex;
            flex-direction: row;
            align-items: center;

            .icon {
              width: 30px;
              height: 30px;
              border-radius: 6px;
              margin-right: 13px;
            }

            .text {
              font-size: 13px;
            }
          }

          .drag {
            width: 22px;
            height: 45px;
            flex-shrink: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .iconfont {
              font-size: 22px;
            }
          }
        }

      }
    }

  }

  @font-face {
    font-family: "HM-DS-font";
    src: url('data:font/truetype;charset=utf-8;base64,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') format('truetype');
  }

  .iconfont {
    font-family: "HM-DS-font" !important;
    font-style: normal;
    color: #c7c7cb;

    &.icon-drag {
      &:before {
        content: "\e6e4";
      }
    }

  }
</style>
