<template>
	<view class="page">
		<dy-tab :tabList="tabList" :currentIndex.sync="currentIndex" plain>
      <text class="btn-tab-edit iconfont icon-ellipsis fw-b text-color-primary" @click="handleTabEdit"></text>
		</dy-tab>
    
    <space-swiper :tabList="tabList" :currentIndex.sync="currentIndex" selectable></space-swiper>
	</view>
</template>

<script>
  import SpaceSwiper from '@/components/space-swiper/space-swiper.vue'
  
	export default {
    components: { SpaceSwiper },
		data() {
			return {
				currentIndex: 0
			}
		},
    computed: {
      tabList() {
        return this.$store.state.tabList
      }
    },
		methods: {
			handleTabEdit() {}
		}
	}
</script>

<style>

</style>
