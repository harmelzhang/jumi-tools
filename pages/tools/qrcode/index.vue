<template>
	<view class="oper_area">
		<view class="input_area">
			<textarea class="input" maxlength="300" v-on:input="input" placeholder="请输入想要说的话或想要访问的网址"></textarea>
		</view>
		<view class="info">
			<text class="tip">{{inputLength}}/300</text>
		</view>
		<button class="btn" v-on:click="generate">生成二维码</button>
	</view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="ad">
        <ad unit-id="adunit-93e2eb60359210b3" />
    </view>
    <!-- #endif -->
</template>

<script>
	export default {
		data() {
			return {
				inputLength: 0,
				inputValue: ""
			}
		},
		methods: {
			input(event) {
				let value = event.detail.value.trim()
				this.inputLength = value.length
				this.inputValue = value.trim()
			},
			generate() {
				if(this.inputValue == "") {
					uni.showToast({icon: "none", title: "内容不能为空"})
					return
				}
				uni.navigateTo({
					url: "/pages/tools/qrcode/result?inputValue=" + this.inputValue
				})
			}
		}
	}
</script>

<style lang="scss">
	.oper_area {
		margin: 8pt;
		display: flex;
		flex-direction: column;
		.input_area {
			height: 140pt;
			border: 1pt solid #F3F3F3;
			border-radius: 4pt;
			padding: 8pt;
			.input {
				width: 100%;
				height: 100%;
				font-size: 10pt;
			}
		}
		.info {
			position: relative;
			.tip {
				position: absolute;
				right: 8pt;
				top: -18pt;
				font-size: 10pt;
				color: #A8A8A8;
			}
		}
		.btn {
			margin-top: 12pt;
			font-size: 10pt;
			font-weight: bold;
			background-color: #000000;
			color: #FFFFFF;
			width: 160pt;
		}
	}
    
    .ad {
        margin: 12pt 8pt;
    }
</style>
