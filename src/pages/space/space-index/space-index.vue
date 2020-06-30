<template>
	<view class="page">
    <dy-navbar title="空间"></dy-navbar>
    <dy-tab :tabList="spaceList" :currentIndex.sync="currentIndex">
      <text class="btn-tab-edit iconfont icon-all-fill" @tap="handleTabEdit"></text>
    </dy-tab>
    
    <space-swiper :spaceList="spaceList" :currentIndex.sync="currentIndex"></space-swiper>
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
      spaceList() {
        return this.$store.state.spaceList
      }
    },
		methods: {
      // tab栏编辑按钮
			handleTabEdit() {
        uni.navigateTo({
          url: '/pages/space/furniture-edit/furniture-edit'
        })
      },
      
      // 设置header按钮
      setHeaderButton() {}
		}
	}
</script>

<style>
</style>
