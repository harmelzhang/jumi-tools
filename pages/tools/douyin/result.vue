<template>
	<view class="result_area">
		<view class="result">
            <video class="video" v-bind:src="url"></video>
		</view>
		<view class="oper_area">
			<button class="btn" v-on:click="saveVideo">保存视频</button>
            <button class="btn" v-on:click="copyUrl">复制地址</button>
			<button class="btn white_btn" v-on:click="goBack">返回修改</button>
		</view>
		<view class="info">
			<text class="item">版权归原作者所有，引用请联系原作者</text>
			<text class="item">仅做便捷交换数据使用，不得从事非法信息传播</text>
		</view>
	</view>
</template>

<script>
	import UQRCode from "uqrcodejs"

	export default {
		data() {
			return {
				videoId: "",
                url: "",
                videoAd: null
            }
		},
		onLoad(event) {
			this.videoId = event.videoId
            /* #ifdef MP-WEIXIN */
            if (wx.createRewardedVideoAd) {
                this.videoAd = wx.createRewardedVideoAd({
                    adUnitId: "adunit-3ab185262496d101"
                })
                this.videoAd.onLoad(() => {})
                this.videoAd.onError((err) => {
                    console.error('激励视频光告加载失败', err)
                })
            }
            /* #endif */
		},
		onReady() {
            let that = this
			uniCloud.callFunction({
			    name: 'jumi-tools-douyin-parse',
			    data: {videoId: this.videoId},
			    success(res) {
			        if(res.result.code != 0) {
			            uni.showToast({icon: "none", title: res.result.message})
			            return
			        }
			        that.url = res.result.url
			    }
			})
		},
		methods: {
			saveVideo() {
				let that = this
				uni.showModal({
					title: "提示",
					content: "需要观看广告后才能保存，是否保存？",
					confirmColor: "#F05656",
			        confirmText: "观看",
					success: function(res) {
						if(res.confirm) {
			                if(that.videoAd) {
			                    that.videoAd.onClose((res) => {
			                        if (res && res.isEnded) {
			                            uni.showLoading({title: "下载中"})
			                            uni.downloadFile({
			                                url: that.url,
			                                success(res) {
			                                    if(res.statusCode == 200) {
			                                        uni.hideLoading()
			                                        uni.saveVideoToPhotosAlbum({
			                                            filePath: res.tempFilePath,
			                                            success: () => {
			                                                uni.showToast({icon: "none", title: "下载成功"})
			                                            }
			                                        })
			                                    }
			                                }
			                            })
			                        } else {
			                            uni.showToast({icon: "none", title: "提前关闭，未获得权限"})
			                        }
			                    })
			                    that.videoAd.show().catch(() => {
			                        // 失败重试
			                        that.videoAd.load().then(() => videoAd.show()).catch(err => {
			                            console.error('激励视频 广告显示失败', err)
			                        })
			                    })
			                }
						}
					}
				})
			},
			copyUrl() {
			    let that = this
			    uni.showModal({
			    	title: "提示",
			    	content: "需要观看广告后才能保存，是否保存？",
			    	confirmColor: "#F05656",
			        confirmText: "观看",
			    	success: function(res) {
			    		if(res.confirm) {
			                if(that.videoAd) {
			                    that.videoAd.onClose((res) => {
			                        if (res && res.isEnded) {
			                            uni.setClipboardData({
			                                data: that.url,
			                                success: () => {
			                                    uni.showToast({icon: "none", title: "复制成功"})
			                                }
			                            })
			                        } else {
			                            uni.showToast({icon: "none", title: "提前关闭，未获得权限"})
			                        }
			                    })
			                    that.videoAd.show().catch(() => {
			                        // 失败重试
			                        that.videoAd.load().then(() => videoAd.show()).catch(err => {
			                            console.error('激励视频 广告显示失败', err)
			                        })
			                    })
			                }
			    		}
			    	}
			    })
			},
			goBack() {
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="scss">
	.result_area {
		display: flex;
		flex-direction: column;
		align-items: center;
		.result {
			box-shadow: 0 0 10pt rgba(0, 0, 0, .1);
			border-radius: 4pt;
            margin: 0pt 12pt 0pt 12pt;
			width: 100%;
			height: 150pt;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.video {
				width: 100%;
                height: 100%;
			}
		}
		.oper_area {
			margin-top: 12pt;
			.btn {
				margin-top: 12pt;
				font-size: 10pt;
				font-weight: bold;
				background-color: #000000;
				color: #FFFFFF;
				width: 160pt;
			}
			.white_btn {
				background-color: #FFFFFF;
				color: #000000;
				border: 1pt solid #000000;
			}
		}
		.info {
			width: 85%;
			margin-top: 20pt;
			margin-bottom: 20pt;
			font-size: 10pt;
			border: 1pt dashed #000000;
			border-radius: 4pt;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 8pt 0pt;
			.item {
				padding: 0pt 8pt;
				margin-bottom: 4pt;
				&:last-child {
					margin-bottom: 0pt;
				}
			}
		}
	}
</style>
