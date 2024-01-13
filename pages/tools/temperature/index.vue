<template>
	<view class="temperature">
		<view class="title">
			<view class="title_prefix"></view>
			<text>摄氏度</text>
		</view>
		<view class="content">
			<input class="value" type="text" v-bind:value="centigrade" v-on:input="input('摄氏度', $event)"/>
		</view>
	</view>
	<view class="temperature">
		<view class="title">
			<view class="title_prefix"></view>
			<text>华氏度</text>
		</view>
		<view class="content">
			<input class="value" type="text" v-bind:value="fahrenheit" v-on:input="input('华氏度', $event)"/>
		</view>
	</view>
	<view class="temperature">
		<view class="title">
			<view class="title_prefix"></view>
			<text>开氏度</text>
		</view>
		<view class="content">
			<input class="value" type="text" v-bind:value="kelvin" v-on:input="input('开氏度', $event)"/>
		</view>
	</view>
	<view class="temperature">
		<view class="title">
			<view class="title_prefix"></view>
			<text>兰氏度</text>
		</view>
		<view class="content">
			<input class="value" type="text" v-bind:value="rankine" v-on:input="input('兰氏度', $event)"/>
		</view>
	</view>
	<view class="temperature">
		<view class="title">
			<view class="title_prefix"></view>
			<text>列氏度</text>
		</view>
		<view class="content">
			<input class="value" type="text" v-bind:value="reaumur" v-on:input="input('列氏度', $event)"/>
		</view>
	</view>
	
	<view class="oper_area">
		<button class="btn" v-on:click="clear">清 空</button>
	</view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="ad">
        <ad unit-id="adunit-fcff5bd636238ec6" />
    </view>
    <!-- #endif -->
</template>

<script>
	export default {
		data() {
			return {
				centigrade: "",
				fahrenheit: "",
				kelvin: "",
				rankine: "",
				reaumur: ""
			}
		},
		methods: {
			input(type, event) {
				let number = event.detail.value
				if(number == "" || number == "-") {
					this.centigrade = ""
					this.fahrenheit = ""
					this.kelvin = ""
					this.rankine = ""
					this.reaumur = ""
					return
				}

				let numbers = number.match(/^[-]?\d+\.*\d*/g)
				if(numbers == null) {
					return ""
				}
				
				number = parseFloat(numbers[0])

				if(type == "摄氏度") {
					this.centigrade = number
					this.fahrenheit = Math.round((this.centigrade * 1.8 + 32) * 100) / 100
					this.kelvin = Math.round((this.centigrade + 273.15) * 100) / 100
					this.rankine = Math.round(((this.centigrade + 273.15) * 1.8) * 100) / 100
					this.reaumur = Math.round(this.centigrade * 0.8 * 100) / 100
				} else if(type == "华氏度") {
					this.centigrade = Math.round((number -32) / 1.8 * 100) / 100
					this.fahrenheit = number
					this.kelvin = Math.round((this.centigrade + 273.15) * 100) / 100
					this.rankine = Math.round(((this.centigrade + 273.15) * 1.8) * 100) / 100
					this.reaumur = Math.round(this.centigrade * 0.8 * 100) / 100
				} else if(type == "开氏度") {
					this.centigrade = Math.round((number - 273.15) * 100) / 100
					this.fahrenheit = Math.round((this.centigrade * 1.8 + 32) * 100) / 100
					this.kelvin = number
					this.rankine = Math.round(((this.centigrade + 273.15) * 1.8) * 100) / 100
					this.reaumur = Math.round(this.centigrade * 0.8 * 100) / 100
				} else if(type == "兰氏度") {
					this.centigrade = Math.round((number / 1.8 - 273.15) * 100) / 100
					this.fahrenheit = Math.round((this.centigrade * 1.8 + 32) * 100) / 100
					this.kelvin = Math.round((this.centigrade + 273.15) * 100) / 100
					this.rankine = number
					this.reaumur = Math.round(this.centigrade * 0.8 * 100) / 100
				} else if(type == "列氏度") {
					this.centigrade = Math.round(number / 0.8 * 100) / 100
					this.fahrenheit = Math.round((this.centigrade * 1.8 + 32) * 100) / 100
					this.kelvin = Math.round((this.centigrade + 273.15) * 100) / 100
					this.rankine = Math.round(((this.centigrade + 273.15) * 1.8) * 100) / 100
					this.reaumur = number
				}
			},
			clear() {
				this.centigrade = ""
				this.fahrenheit = ""
				this.kelvin = ""
				this.rankine = ""
				this.reaumur = ""
			}
		}
	}
</script>

<style lang="scss">
	.temperature {
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
