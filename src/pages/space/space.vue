<template>
	<view>
    <wuc-tab :tabList="tabList" tabClass="space-tab"></wuc-tab>
	</view>
</template>

<script>
  import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	export default {
    components: { WucTab },
		data() {
			return {
        tabList: [
          { name: '客厅' }
        ]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
  .space-tab {
    background-color: $uni-color-primary;
    
    /deep/ .wuc-tab-item {
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      color: #fff;
    }
  }
</style>
