<template>
	<view class="page page-custom-tabbar">
		<dy-tab :tabList="tabList" :currentIndex.sync="currentIndex" plain>
      <text class="btn-tab-edit iconfont icon-ellipsis fw-b text-color-primary" @tap="handleTabEdit"></text>
		</dy-tab>
    
    <space-swiper
      :tabList="tabList"
      :currentIndex.sync="currentIndex"
      selectable
      :selectedItems.sync="selectedItems"
    ></space-swiper>
    
    <!-- 自定义tabbar -->
    <dy-tabbar :buttons="editButtons" @tap-button="handleTapButton"></dy-tabbar>
	</view>
</template>

<script>
  import { furnitureEditButtons as editButtons } from '@/common/custom-tabbar-buttons.js'
	export default {
		data() {
			return {
				currentIndex: 0,
        selectedItems: [], // 选中的项
			}
		},
    computed: {
      tabList() {
        return this.$store.state.tabList
      },
      
      editButtons() {
        if(!this.selectedItems.length) {
          return editButtons.noSeleted
        } else if(this.selectedItems.length === 1) {
          return editButtons.singleSeleted
        } else {
          return editButtons.multipleSeleted
        }
        return []
      }
    },
		methods: {
      // tab more按钮
			handleTabEdit() {
        uni.navigateTo({
          url: '/pages/space-edit/space-edit'
        })
      },
      
      // tabbar按钮
      handleTapButton(key) {
        console.log(key)
      }
		}
	}
</script>

<style>

</style>
