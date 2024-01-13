<template>
	<view class="numerial">
		<view class="title">
			<view class="title_prefix"></view>
			<text>二进制</text>
		</view>
		<view class="content">
			<input class="value" type="number" v-bind:value="inputValue2" v-on:input="input(2, $event)"/>
		</view>
	</view>
	<view class="numerial">
		<view class="title">
			<view class="title_prefix"></view>
			<text>八进制</text>
		</view>
		<view class="content">
			<input class="value" type="number" v-bind:value="inputValue8" v-on:input="input(8, $event)"/>
		</view>
	</view>
	<view class="numerial">
		<view class="title">
			<view class="title_prefix"></view>
			<text>十进制</text>
		</view>
		<view class="content">
			<input class="value" type="number" v-bind:value="inputValue10" v-on:input="input(10, $event)"/>
		</view>
	</view>
	<view class="numerial">
		<view class="title">
			<view class="title_prefix"></view>
			<text>十六进制</text>
		</view>
		<view class="content">
			<input class="value" type="text" v-bind:value="inputValue16" v-on:input="input(16, $event)"/>
		</view>
	</view>
	<view class="numerial">
		<view class="title">
			<view class="title_prefix"></view>
			<text>三十二进制</text>
		</view>
		<view class="content">
			<input class="value" type="text" v-bind:value="inputValue32" v-on:input="input(32, $event)"/>
		</view>
	</view>
	
	<view class="oper_area">
		<button class="btn" v-on:click="clear">清 空</button>
	</view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="ad">
        <ad unit-id="adunit-1d1467b77fbe36e9" />
    </view>
    <!-- #endif -->
</template>

<script>
	export default {
		data() {
			return {
				inputValue2: "",
				inputValue8: "",
				inputValue10: "",
				inputValue16: "",
				inputValue32: ""
			}
		},
		methods: {
			input(numType, event) {
				let number = event.detail.value
				if(number == "") {
					this.inputValue2 = ""
					this.inputValue8 = ""
					this.inputValue10 = ""
					this.inputValue16 = ""
					this.inputValue32 = ""
					return
				}
				if(number.length >= 2 && number[0] == "0") {
					number = number.substring(1, number.length)
				}

				if(numType == 2) {
					let  reg = /[^01]/g
					let matchs = number.match(reg)
					if(matchs != null && matchs.length != 0) {
						return number.replace(reg, "")
					}
				} else if(numType == 8) {
					let  reg = /[^0-7]/g
					let matchs = number.match(reg)
					if(matchs != null && matchs.length != 0) {
						return number.replace(reg, "")
					}
				} else if(numType == 16) {
					let  reg = /[^0-9A-Fa-f]/g
					let matchs = number.match(reg)
					if(matchs != null && matchs.length != 0) {
						return number.replace(reg, "")
					}
				} else if(numType == 32) {
					let  reg = /[^0-9A-Va-v]/g
					let matchs = number.match(reg)
					if(matchs != null && matchs.length != 0) {
						return number.replace(reg, "")
					}
				}

				number = parseInt(number, numType)

				this.inputValue2 = number.toString(2)
				this.inputValue8 = number.toString(8)
				this.inputValue10 = number.toString(10)
				this.inputValue16 = number.toString(16)
				this.inputValue32 = number.toString(32)
			},
			clear() {
				this.inputValue2 = ""
				this.inputValue8 = ""
				this.inputValue10 = ""
				this.inputValue16 = ""
				this.inputValue32 = ""
			}
		}
	}
</script>

<style lang="scss">
    page {
        padding-bottom: 8pt;
    }
	.numerial {
		margin: 4pt;
		padding: 4pt;
		.title {
			padding: 4pt 0pt;
			display: flex;
			flex-direction: row;
			align-items: center;
			color: #333333;
			font-size: 11pt;
			font-weight: bold;
			.title_prefix {
				width: 4pt;
				height: 12pt;
				background-color: #000000;
				margin-left: 4pt;
				margin-right: 6pt;
				border-radius: 4pt;
			}
		}
		.content {
			margin-top: 4pt;
			padding: 0pt 4pt;
			.value {
				height: 14pt;
				padding: 4pt 8pt;
				border-radius: 4pt;
				border: 1pt solid #F3F3F3;
			}
		}
	}
	.oper_area {
		.btn {
			margin-top: 12pt;
			font-size: 10pt;
			font-weight: bold;
			background-color: #000000;
			color: #FFFFFF;
			width: 120pt;
		}
	}
    .ad {
        margin: 12pt;
    }
</style>
