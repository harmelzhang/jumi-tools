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
            <text class="item">保存失败时，建议复制地址</text>
			<text class="item">版权归原作者所有，引用请联系原作者</text>
			<text class="item">仅做便捷交换数据使用，不得从事非法信息传播</text>
		</view>
	</view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="ad">
        <ad unit-id="adunit-396ec261305e02e8" />
    </view>
    <!-- #endif -->
</template>

<script>
	import UQRCode from "uqrcodejs"

	export default {
		data() {
			return {
				videoId: "",
                url: "",
                showVideoAd: false,
                videoAd: null,
                interstitialAd: null
            }
		},
		onLoad(event) {
            let that = this
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
                this.videoAd.onClose((res) => {
                    if (res && res.isEnded) {
                        that.showVideoAd = true
                        uni.showToast({icon: "none", title: "获得奖励，解锁操作权限"})
                    } else {
                        uni.showToast({icon: "none", title: "提前关闭，未获得操作权限"})
                    }
                })
            }
            if(wx.createInterstitialAd) {
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: 'adunit-c31c699b7501eb52'
                })
                this.interstitialAd.onLoad(() => {})
                this.interstitialAd.onError((err) => {
                    console.error('插屏广告加载失败', err)
                })
                this.interstitialAd.onClose(() => {})
            }
            /* #endif */
            uniCloud.callFunction({
                name: 'jumi-tools-douyin-parse',
                data: {videoId: this.videoId},
                success(res) {
                    if(res.result.code != 0) {
                        uni.showToast({icon: "none", title: res.result.message})
                        return
                    }
                    that.url = res.result.url.replace("http://", "https://")
                }
            })
		},
        onShow() {
            if(this.interstitialAd) {
                this.interstitialAd.show().catch((err) => {
                    console.error('插屏广告显示失败', err)
                })
            }
        },
		methods: {
			saveVideo() {
				let that = this
                if(that.showVideoAd) {
                    uni.showLoading({title: "下载中"})
                    uni.downloadFile({
                        url: that.url,
                        success(res) {
                            uni.hideLoading()
                            if(res.statusCode == 200) {
                                uni.saveVideoToPhotosAlbum({
                                    filePath: res.tempFilePath,
                                    success: () => {
                                        uni.showToast({icon: "none", title: "保存成功"})
                                    },
                                    fail: (res) => {
                                        uni.showModal({
                                            title: "保存失败",
                                            showCancel: false,
                                            content: "未授权小程序访问相册，点击小程序顶部“···”按钮 -> 设置 -> 允许添加到相册"
                                        })
                                    }
                                })
                            }
                        },
                        fail(res) {
                            uni.showToast({icon: "none", title: "下载失败"})
                        }
                    })
                } else {
                    uni.showModal({
                        title: "提示",
                        content: "您没有操作权限需要观看一段广告后操作",
                        confirmColor: "#F05656",
                        confirmText: "观看",
                        success: function(res) {
                            if(res.confirm) {
                                that.videoAd.show().catch(() => {
                                    // 失败重试
                                    that.videoAd.load().then(() => videoAd.show()).catch(err => {
                                        console.error('激励视频 广告显示失败', err)
                                    })
                                })
                            }
                        }
                    })
                }
			},
			copyUrl() {
			    let that = this
                if(that.showVideoAd) {
                    uni.setClipboardData({
                        data: that.url,
                        success: () => {
                            uni.showToast({icon: "none", title: "复制成功"})
                        }
                    })
                } else {
                    uni.showModal({
                        title: "提示",
                        content: "您没有操作权限需要观看一段广告后操作",
                        confirmColor: "#F05656",
                        confirmText: "观看",
                        success: function(res) {
                            if(res.confirm) {
                                that.videoAd.show().catch(() => {
                                    // 失败重试
                                    that.videoAd.load().then(() => videoAd.show()).catch(err => {
                                        console.error('激励视频 广告显示失败', err)
                                    })
                                })
                            }
                        }
                    })
                }
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
    
    .ad {
        margin: 0pt 12pt;
    }
</style>
