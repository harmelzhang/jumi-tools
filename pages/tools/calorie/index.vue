<template>
	<view class="search">
		<view class="input">
			<input class="tip" type="text" placeholder="搜索你想要找的关键字" v-on:input="input" v-bind:value="inputValue"/>
			<view class="clear" v-show="inputValue != ''" v-on:click="clearInput">
				<image class="icon" src="/static/common/close.png"></image>
			</view>
			<image class="icon" src="/static/common/search.png"></image>
		</view>
	</view>
	<view class="calories">
		<view class="record" v-for="calorie in calories">
			<view class="title">
				<image class="title_icon" src="/static/common/fire.png"></image>
				<text>{{calorie.name}}</text>
			</view>
			<view class="content">
				<view class="item" v-for="item in calorie.data" v-on:click="toSearch(item.name)">
					<text class="name">{{item.name}}</text>
					<text class="value">{{item.value}}</text>
				</view>
			</view>
		</view>
	</view>
	<view class="toTop" v-show="showToTop" v-on:click="toTop">
		<image class="icon" src="/static/common/up.png"></image>
	</view>
</template>

<script>
	function queryData(that) {
		let calories = uni.getStorageSync("calorie")
		if(!calories) {
			uni.request({
				url: "https://mp-2f73ffe0-5d4f-4852-8a6b-86892c3cb1ee.cdn.bspapp.com/cloudstorage/a075d9db-bea9-4d78-ae37-402f479f425d.json",
				success(res) {
					that.calories = res.data
					uni.setStorageSync("calorie", res.data)
				}
			})
		} else {
			that.calories = calories
		}
	}

	export default {
		data() {
			return {
				showToTop: false,
				inputValue: "",
				calories: []
			}
		},
		onLoad() {
			queryData(this)
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
					this.calories = uni.getStorageSync("calorie")
					this.inputValue = ""
					return
				}
				this.inputValue = value
				
				let result = []
				this.calories.forEach(category => {
					let foodCategory = {
						name: category.name,
						type: category.type,
						data: []
					}
					category.data.forEach(item => {
						if(item.name.indexOf(value) != -1) {
							foodCategory.data.push(item)
						}
					})
					if(foodCategory.data.length != 0) {
						result.push(foodCategory)
					}
				})
				this.calories = result
			},
			clearInput() {
				this.calories = uni.getStorageSync("calorie")
				this.inputValue = ""
			},
			toSearch(name) {
				name = name.replace(/\(.+\)/g, "").replace(/[a-zA-Z]/g, "")
				uni.navigateToMiniProgram({
					appId: "wx667be9ee0e001ef2",
					path: `pages/lemma/lemma?key=${name}`,
					fail() {}
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
	.calories {
		padding-bottom: 12pt;
		.record {
			margin: 4pt 8pt 8pt 4pt;
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
				.title_icon {
					width: 14pt;
					height: 14pt;
					margin-left: 4pt;
					margin-right: 2pt;
				}
			}
			.content {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-left: 8pt;
					margin-top: 8pt;
					background-color: #F8F8F8;
					border-radius: 4pt;
					color: #6D6D6D;
					font-size: 10pt;
					padding: 2pt 4pt;
					.value {
						font-size: 8pt;
						color: #F05656;
					}
				}
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
