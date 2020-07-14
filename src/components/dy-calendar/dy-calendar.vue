<template>
  <view class="dy-calendar">
    <text>{{ value }}</text>
    <u-calendar v-model="show" @change="handleChange"></u-calendar>
  </view>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        show: false,

      }
    },
    methods: {
      open() {
        this.show = true
      },
      handleChange(val) {
        this.$emit('input', val.result)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dy-calendar {
  }
</style>