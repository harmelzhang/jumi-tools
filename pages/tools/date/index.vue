<template>
	<view class="search">
		<view class="input">
			<input class="tip" type="text" placeholder="搜索你想要做的事儿" v-on:input="input" v-bind:value="inputValue"/>
			<view class="clear" v-show="inputValue != ''" v-on:click="clearInput">
				<image class="icon" src="/static/common/close.png"></image>
			</view>
			<image class="icon" src="/static/common/search.png"></image>
		</view>
	</view>
	<view class="switch_area">
		<view class="switch_items">
			<text class="item" v-on:click="changeType('适宜')" v-bind:class="{'switch_tab_suit': type == '适宜'}">适 宜</text>
			<text class="item" v-on:click="changeType('禁忌')" v-bind:class="{'switch_tab_avoid': type == '禁忌'}">禁 忌</text>
		</view>
	</view>
	<view class="items">
		<view class="content">
			<text class="item" v-for="item in items" v-on:click="toSearch(item)">{{item}}</text>
		</view>
	</view>
	<view class="toTop" v-show="showToTop" v-on:click="toTop">
		<image class="icon" src="/static/common/up.png"></image>
	</view>
</template>

<script>
	import dateUtils from '@/utils/date.js'

	export default {
		data() {
			return {
				inputValue: "",
				showToTop: false,
				items: [],
				dates: [],
				type: "适宜",
                interstitialAd: null
			}
		},
        onLoad() {
            /* #ifdef MP-WEIXIN */
            if(wx.createInterstitialAd) {
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: 'adunit-ec3d89ca558559c8'
                })
                this.interstitialAd.onLoad(() => {})
                this.interstitialAd.onError((err) => {
                    console.error('插屏广告加载失败', err)
                })
                this.interstitialAd.onClose(() => {})
            }
            /* #endif */
            dateUtils.queryData(this)
        },
        onShow() {
            if(this.interstitialAd) {
                this.interstitialAd.show().catch((err) => {
                    console.error('插屏广告显示失败', err)
                })
            }
        },
		onPageScroll(event) {
			if(event.scrollTop > 200) {
				this.showToTop = true
			} else {
				this.showToTop = false
			}
		},
		methods: {
			input(event) {
				let value = event.detail.value.trim()
				if(value == "") {
					dateUtils.queryData(this)
					this.inputValue = ""
					return
				}
				this.inputValue = value
				let searchResult = []
				this.items.forEach(item => {
					if(item.indexOf(value) != -1) {
						searchResult.push(item)
					}
				})
				this.items = searchResult
			},
			clearInput() {
				dateUtils.queryData(this)
				this.inputValue = ""
			},
			changeType(type) {
				this.type = type
			},
			toSearch(item) {
				uni.navigateTo({
					url: `/pages/tools/date/result?type=${this.type}&item=${item}`
				})
			},
			toTop() {
				uni.pageScrollTo({scrollTop: 0, duration: 300})
			}
		}
	}
</script>

<style lang="scss">
	.search {
		display: flex;
		flex-direction: column;
		padding: 8pt 12pt 4pt 12pt;
		.input {
			width: 100%;
			height: 20pt;
			padding: 4pt 0pt;
			border-radius: 4pt;
			border: 1pt solid #000000;
			display: flex;
			flex-direction: row;
			align-items: center;
			.tip {
				width: 78%;
				margin-left: 8pt;
				font-size: 10pt;
			}
			.clear {
				margin-top: 2pt;
				.icon {
					margin-left: 4pt;
					margin-right: 4pt;
					width: 16pt;
					height: 16pt;
				}
			}
			.icon {
				height: 14pt;
				width: 14pt;
				margin-top: 1pt;
				margin-left: auto;
				margin-right: 8pt;
			}
		}
	}
	.switch_area {
		font-size: 10pt;
		display: flex;
		flex-direction: row;
		justify-content: center;
		.switch_items {
			background-color: #F2F2F2;
			padding: 6pt 2pt;
			border-radius: 4pt;
			.item {
				border-radius: 4pt;
				padding: 4pt;
				color: #A8A8A8;
				&:last-child {
					margin-left: 4pt;
				}
			}
		}
	}
	.switch_tab_suit {
		color: #FFFFFF !important;
		background-color: #3DB364;
	}
	.switch_tab_avoid {
		color: #FFFFFF !important;
		background-color: #F05656;
	}
	.items {
		margin: 0pt 8pt 8pt 4pt;
		padding: 0pt 4pt 12pt 4pt;
		.content {
			.item {
				display: inline-block;
				margin-left: 8pt;
				margin-top: 8pt;
				background-color: #F8F8F8;
				border-radius: 4pt;
				color: #6D6D6D;
				font-size: 10pt;
				padding: 2pt 4pt;
			}
		}
	}
	.toTop {
		position: fixed;
		bottom: 12pt;
		right: 12pt;
		.icon {
			width: 28pt;
			height: 28pt;
		}
	}
</style>
