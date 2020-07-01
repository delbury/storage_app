<template>
  <view class="page page-custom-tabbar">
    <!-- <dy-navbar title="图片裁剪" :hasSpaceBtn="false" backgroundColor="rgba(0, 0, 0, 0.6)"></dy-navbar> -->
    <tui-image-cropper
      :imageUrl="path"
      :quality="0.9"
      @ready="handleReady"
      @imageLoad="handleLoad"
      @cropper="handleCropper"
    ></tui-image-cropper>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				path: ''
			}
		},
		methods: {
      // 页面初始化完成
			handleReady() {
      },
      
      // 图片加载完成
      handleLoad() {
      },
      
      // 裁剪
      handleCropper(res) {
        const clipImgPath = res.url
        const pages = getCurrentPages()
        pages[pages.length - 2].$vm.setImage(clipImgPath)
        uni.navigateBack()
      }
		},
    onLoad(params) {
      if(params.path) {
        this.path = decodeURIComponent(params.path)
      } else {
        uni.navigateBack()
      }
    }
	}
</script>

<style>

</style>
