<template>
	<view class="page">
    <dy-tab :tabList="tabList" :currentIndex.sync="currentIndex">
      <text class="btn-tab-edit iconfont icon-all-fill" @click="handleTabEdit"></text>
    </dy-tab>
    
    <space-swiper :tabList="tabList" :currentIndex.sync="currentIndex"></space-swiper>
	</view>
</template>

<script>
  import DyTab from '@/components/dy-tab/dy-tab.vue'
  import SpaceSwiper from '@/components/space-swiper/space-swiper.vue'
  
	export default {
    components: { DyTab, SpaceSwiper },
		data() {
			return {
        currentIndex: 0,
       }
		},
    computed: {
      tabList() {
        return this.$store.state.tabList
      }
    },
		methods: {
      // tab栏编辑按钮
			handleTabEdit() {
        uni.navigateTo({
          url: '/pages/furniture/furniture'
        })
      }
		}
	}
</script>

<style>
</style>
