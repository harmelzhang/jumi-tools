<template>
	<view class="info">
		<text class="title">聚米工具箱</text>
		<text class="version">v1.6.5.1</text>
	</view>
	
	<view class="operate">
		<view class="item">
			<view class="icon_area">
				<image class="icon" src="/static/common/clear.png"></image>
			</view>
			<view class="btn_area">
				<button class="text" type="default" v-on:click="clear">清理缓存</button>
			</view>
			<view class="nav_area">
				<image class="nav" src="/static/common/right.png"></image>
			</view>
		</view>
		<view class="item">
			<view class="icon_area">
				<image class="icon" src="/static/common/message.png"></image>
			</view>
			<view class="btn_area">
				<button class="text" type="default" open-type="contact">在线客服</button>
			</view>
			<view class="nav_area">
				<image class="nav" src="/static/common/right.png"></image>
			</view>
		</view>
	</view>

    <view class="ad">
        <!-- #ifdef MP-WEIXIN -->
        <ad unit-id="adunit-09e3b047f9292348" />
        <!-- #endif -->
    </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			clear() {
				uni.showModal({
					content: "是否要清理本地缓存？",
					confirmColor: "#F05656",
					success: function(res) {
						if(res.confirm) {
							uni.showLoading({title: "清理中"})
							let hasErr = false
							try {
								uni.clearStorageSync()
							} catch(e) {
								hasErr = true
							}
							uni.hideLoading()
							let tip = "清理成功"
							if(hasErr) {
								tip = "清理失败"
							}
							uni.showToast({icon: "none", title: tip})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F3F3F3;
	}
	.info {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30pt 0pt;
		.title {
			font-size: 20pt;
		}
		.version {
			color: #999999;
			margin-top: 8pt;
		}
	}
	
	.operate {
		margin: 8pt;
		padding: 0pt 4pt;
		background-color: white;
		border-radius: 4pt;
		&:last-child {
			margin-bottom: 40pt;
		}
		.item {
			height: 36pt;
			padding-left: 12pt;
			border-top: 1rpx solid #F3F3F3;
			color: #333333;
			display: flex;
			flex-direction: row;
			align-items: center;
			.icon_area {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.icon {
					width: 16pt;
					height: 16pt;
				}
			}
			.btn_area {
				width: 100%;
				margin-left: 10pt;
				.text {
					width: 100%;
					padding: 0px;
					text-align: left;
					font-size: 11pt;
					color: #333333;
					background-color: white;
					border: none;
					&::after {
						border: none;
					}
				}
			}
			.nav_area {
				height: 100%;
				width: 16pt;
				margin-left: auto;
				margin-right: 8pt;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.nav {
					width: 16pt;
					height: 16pt;
				}
			}
		}
	}
    
    .ad {
        margin: 8pt;
    }
</style>
