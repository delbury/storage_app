<template>
	<view class="page page-custom-tabbar bg">
    <scroll-view scroll-y="true" style="height: 100%;">
      <dy-drag-list :list="tabList" style="margin-bottom: 20px;"></dy-drag-list>
      
      <HM-dragSorts :list="tabList"></HM-dragSorts>
    </scroll-view>
    
		<!-- 自定义tabbar -->
		<dy-tabbar :buttons="editButtons" @click-button="handleClickButton"></dy-tabbar>
	</view>
</template>

<script>
  import { spaceEditButtons as editButtons } from '@/common/custom-tabbar-buttons.js'
  
	export default {
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
				mode: 'normal'
			}
		},
		methods: {
			handleClickButton(key) {
        if(key === 'move-mode') {
          this.mode = 'move'
        } else if(key === 'cancel') {
          this.mode = 'normal'
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
  .bg {
    background-color: $uni-bg-color-grey-light;
  }
</style>
