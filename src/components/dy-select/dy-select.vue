<template>
  <view class="dy-select" @tap="handleTap">
    <view class="container">
      <input v-bind="$attrs" :value="showText" disabled placeholder-class="ph" />
    </view>
    <text class="iconfont icon-arrow-right"></text>
  </view>
</template>

<script>
	export default {
    name: 'dy-select',
    props: {
      value: {
        type: [String, Number, Object], // { label, value }
        default: ''
      }
    },
    computed: {
      showText() {
        if(this.value === undefined || this.value === null || this.value === '') {
          return ''
        } else if(typeof this.value === 'object') {
          return this.value.label || ''
        } else {
          return this.value
        }
      }
    },
		data() {
			return {
				
			}
		},
    methods: {
      handleTap() {
        this.$emit('select')
      }
    }
	}
</script>

<style scoped lang="scss">
  .dy-select {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
      
    &::before {
      position: absolute;
      left: 0;
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 1;
    }
    
    .container {
      flex: 1;
    }
    .iconfont {
      margin-left: 1em;
      font-size: $uni-font-size-icon;
    }
    
    /deep/ .uni-input-input {
      font-size: $uni-font-size-base;
    }
  }
</style>
