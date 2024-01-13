<template>
	<view class="page">
		<view class="search">
			<view class="input">
				<input class="tip" type="text" placeholder="搜索你想要找的关键字" v-on:input="input" v-bind:value="inputValue"/>
				<view class="clear" v-show="inputValue != ''" v-on:click="clearInput">
					<image class="icon" src="/static/common/close.png"></image>
				</view>
				<image class="icon" src="/static/common/search.png"></image>
			</view>
			<view class="switch">
				<radio-group v-on:change="changeType">
					<radio class="item" value="title" color="#000000" checked="checked">标题</radio>
					<radio class="item" value="content" color="#000000">内容</radio>
					<radio class="item" value="author" color="#000000">作者</radio>
				</radio-group>
			</view>
		</view>
		<view class="poetrys">
			<view class="item" v-for="poetry in poetrys" v-on:click="show(poetry.index)">
				<view class="titles">
					<text class="title" v-for="title in poetry.title">{{title}}</text>
				</view>
				<text class="author">{{poetry.author}}</text>
			</view>
		</view>
		<view class="toTop" v-show="showToTop" v-on:click="toTop">
			<image class="icon" src="/static/common/up.png"></image>
		</view>
	</view>
</template>

<script>
	import poetryUtils from '@/utils/poetry.js'
	
	export default {
		data() {
			return {
				poetryType: "",
				inputValue: "",
				inputType: "title",
				poetrys: [],
				showToTop: false,
                interstitialAd: null
			}
		},
		onLoad(event) {
            /* #ifdef MP-WEIXIN */
            if(wx.createInterstitialAd) {
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: 'adunit-6bfb8fe5f65eb2ea'
                })
                this.interstitialAd.onLoad(() => {})
                this.interstitialAd.onError((err) => {
                    console.error('插屏广告加载失败', err)
                })
                this.interstitialAd.onClose(() => {})
            }
            /* #endif */  

			uni.pageScrollTo({scrollTop: 0, duration: 0})

			let poetryType = event.type

			let poetryTypeMap = {
				"tangshi": {
					"title": "唐诗三百首"
				},
				"songci": {
					"title": "宋词"
				},
				"shijing": {
					"title": "诗经"
				},
				"chuci": {
					"title": "楚辞"
				},
				"yuefu": {
					"title": "乐府诗集"
				}
			}
			
			if(!(poetryType in poetryTypeMap)) {
				uni.switchTab({url: "/pages/index/index"})
				return
			}
			
			this.poetryType = poetryType
			uni.setNavigationBarTitle({title: poetryTypeMap[poetryType].title})
			
			poetryUtils.queryData(this)
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
					this.poetrys = uni.getStorageSync(this.poetryType)
					this.inputValue = ""
					return
				}
				this.inputValue = value
				this.changeType({
					detail: {value: this.inputType}
				})
			},
			clearInput() {
				this.poetrys = uni.getStorageSync(this.poetryType)
				this.inputValue = ""
			},
			changeType(event) {
				const that = this
				let inputType = event.detail.value
				that.inputType = inputType
				if(that.inputValue == "") {
					return
				}
				let data = []
				let poetrys = uni.getStorageSync(this.poetryType)
				poetrys.forEach(function(item) {
					let value = item[inputType]
					if(value == null) {
						return
					}
					if(inputType == "title") {
						value = item[inputType].join(",")
					}
					if(value.indexOf(that.inputValue) != -1) {
						data.push(item)
					}
				})
				this.poetrys = data
			},
			show(index) {
				uni.navigateTo({
					url: `/pages/tools/poetry/result?type=${this.poetryType}&index=${index}`
				})
			},
			toTop() {
				uni.pageScrollTo({scrollTop: 0, duration: 300})
			}
		}
	}
</script>

<style lang="scss">
	// 增加 page 是为了解决 Vue3 传参时有多个 <view> 会出现警告
	.page {
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
			.switch {
				margin-top: 2pt;
				margin-left: -8pt;
				.item {
					font-size: 14pt;
					font-weight: bold;
					transform: scale(0.65);
					&:last-child {
						margin-right: 0pt;
					}
				}
			}
		}
		.poetrys {
			padding: 0pt 12pt 8pt 12pt;
			.item {
				margin-bottom: 4pt;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 6pt 4pt;
				border-bottom: 1rpx solid #F3F3F3;
				&:last-child {
					border: none;
				}
				.titles {
					display: flex;
					flex-direction: column;
					.title {
						font-size: 12pt;
					}
				}
				.author {
					margin-left: 8pt;
					font-size: 10pt;
					color: #A8A8A8;
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
	}
</style>
