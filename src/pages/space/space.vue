<template>
	<view class="page">
    <dy-tab :tabList="tabList" :currentIndex.sync="currentIndex">
      <text class="btn-tab-edit iconfont icon-all-fill" @click="handleTabEdit"></text>
    </dy-tab>
    
    <space-swiper :tabList="tabList" :currentIndex.sync="currentIndex"></space-swiper>
	</view>
</template>

<script>
	export default {
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
          url: '/pages/furniture-edit/furniture-edit'
        })
      }
		}
	}
</script>

<style>
</style>
