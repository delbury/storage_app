<template>
	<input
    class="dy-input"
    v-bind="$attrs"
    @input="handleInput"
    :value="value"
    @confirm="handleConfirm"
    placeholder-class="ph"
  />
</template>

<script>
	export default {
    name: 'dy-input',
    props: {
      value: {
        required: true
      }
    },
		data() {
			return {
				
			}
		},
    methods: {
      handleInput(ev) {
        const value = ev.detail.value
        this.$emit('input', value !== '' ? value.trim() : '')
      },
      
      handleConfirm(ev) {
        uni.hideKeyboard()
        this.$emit('confirm', ev)
      }
    }
	}
</script>

<style scoped lang="scss">
  .dy-input {
    /deep/ .uni-input-input {
      font-size: $uni-font-size-base;
    }
  }
</style>
