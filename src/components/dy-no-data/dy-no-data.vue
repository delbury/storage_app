<template>
	<tui-no-data :imgUrl="imgUrl">
    <text class="text-color-info">{{text}}</text>
  </tui-no-data>
</template>

<script>
	export default {
    name: 'dy-no-data',
    props: {
      text: {
        type: String,
        default: '没有数据'
      },
      imgUrl: {
        type: String,
        default: '/static/images/no-data.png'
      },
    },
		data() {
			return {
				
			}
		}
	}
</script>

<style>

</style>
