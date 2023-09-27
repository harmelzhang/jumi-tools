<template>
	<view class="result_area">
		<view class="result">
			<canvas class="qrcode" canvas-id="qrcode"></canvas>
		</view>
		<view class="oper_area">
			<button class="btn" v-on:click="saveImage">保存图片</button>
			<button class="btn white_btn" v-on:click="goBack">返回修改</button>
		</view>
		<view class="info">
			<text class="item">当前生成的是静态码，内容无法修改</text>
			<text class="item">仅做便捷交换数据使用，不得从事非法信息传播</text>
		</view>
	</view>
	
</template>

<script>
	import UQRCode from "uqrcodejs"

	export default {
		data() {
			return {
				inputValue: ""
			}
		},
		onLoad(event) {
			this.inputValue = event.inputValue
		},
		onReady() {
			uni.showLoading({
				title: "生成中"
			})

			var qr = new UQRCode()
			qr.data = this.inputValue
			qr.size = 256
			qr.make()
			var canvasContext = uni.createCanvasContext("qrcode", this)
			qr.canvasContext = canvasContext
			qr.drawCanvas()

			uni.hideLoading()
		},
		methods: {
			saveImage() {
				let that = this
				uni.showModal({
					title: "提示",
					content: "是否要保存到本地？",
					confirmColor: "#F05656",
					success: function(res) {
						if(res.confirm) {
							uni.canvasToTempFilePath({
								canvasId: "qrcode",
								success: function(res) {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function(res) {
											uni.showToast({title: "保存成功"})
										},
										fail: function(res) {
											uni.showToast({icon: "none", title: "保存失败"})
										}
									})
								}
							})
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
		margin-top: 20pt;
		display: flex;
		flex-direction: column;
		align-items: center;
		.result {
			box-shadow: 0 0 10pt rgba(0, 0, 0, .1);
			border-radius: 4pt;
			width: 270px;
			height: 270px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.qrcode {
				width: 256px;
				height: 256px;
			}
		}
		.oper_area {
			margin-top: 20pt;
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
