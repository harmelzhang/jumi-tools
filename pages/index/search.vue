<template>
	<view class="search">
		<view class="input">
			<image class="icon" src="/static/common/search.png"></image>
			<input class="tip" type="text" placeholder="请输入工具名称" v-on:input="input" v-bind:value="inputValue"/>
			<view class="clear" v-show="inputValue != ''" v-on:click="clearInput">
				<image class="icon" src="/static/common/close.png"></image>
			</view>
		</view>
		<view class="btn" v-on:click="toIndex">
			<text>取消</text>
		</view>
	</view>
	<view class="suggest" v-show="tools.length > 0">
		<view class="tool" v-for="tool in tools" v-on:click="toPage(tool)">
			<text class="category">{{tool.category}}</text>
			<text class="name">{{tool.name}}</text>
		</view>
	</view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="ad">
        <ad unit-id="adunit-4153a7cd21398e73" />
    </view>
    <!-- #endif -->
	<view class="record">
		<view class="title">
			<view class="title_prefix"></view>
			<text>历史搜索</text>
			<image class="delete" src="/static/common/delete.png" v-on:click="deleteHistoryRecord"></image>
		</view>
		<view class="content">
			<text class="item" v-for="tool in historySearch" v-on:click="toPage(tool)">{{tool.name}}</text>
		</view>
	</view>
	<view class="record">
		<view class="title">
			<image class="title_icon" src="/static/common/fire.png"></image>
			<text>热门搜索</text>
		</view>
		<view class="content">
			<text class="item" v-on:click="toPage({name:'二维码生成', to: 'qrcode'})">二维码生成</text>
			<text class="item" v-on:click="toPage({name:'唐诗三百首', to: 'poetry', args: {type: 'tangshi'}})">唐诗三百首</text>
			<text class="item" v-on:click="toPage({name:'宋词', to: 'poetry', args: {type: 'songci'}})">宋词</text>
			<text class="item" v-on:click="toPage({name:'诗经', to: 'poetry', args: {type: 'shijing'}})">诗经</text>
			<text class="item" v-on:click="toPage({name:'楚辞', to: 'poetry', args: {type: 'chuci'}})">楚辞</text>
			<text class="item" v-on:click="toPage({name:'乐府诗集', to: 'poetry', args: {type: 'yuefu'}})">乐府诗集</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				db: [
					{
						"name": "生活娱乐",
						"tools": [
                            {"name": "抖音去水印", "to": "douyin"},
							{"name": "二维码生成", "to": "qrcode"},
							{"name": "黄道吉日", "to": "date"},
							// {"name": "古诗词取名", "to": "name"},
							// {"name": "今天吃什么", "to": "eat"},
							{"name": "卡路里查询", "to": "calorie"},
							{"name": "血型遗传规律", "to": "blood_type"},
							// {"name": "垃圾分类查询", "to": "trash"}
						]
					},
					{
						"name": "教育教学",
						"tools": [
							{"name": "唐诗三百首", "to": "poetry", "args": {"type": "tangshi"}},
							{"name": "宋词", "to": "poetry", "args": {"type": "songci"}},
							{"name": "诗经", "to": "poetry", "args": {"type": "shijing"}},
							{"name": "楚辞", "to": "poetry", "args": {"type": "chuci"}},
							{"name": "乐府诗集", "to": "poetry", "args": {"type": "yuefu"}}
						]
					},
					{
						"name": "数据换算",
						"tools": [
							// {"name": "房贷计算", "to": "mortgage"},
							// {"name": "投资收益计算", "to": "invest"},
							// {"name": "BMI计算", "to": "bmi"},
							// {"name": "日期计算", "to": "date"},
							{"name": "温度转换", "to": "temperature"},
							{"name": "进制转换", "to": "binary"}
						]
					}
				],
				inputValue: "",
				tools: [],
				historySearch: []
			}
		},
		onShow() {
			let tools = uni.getStorageSync("tools");
			if(tools) {
				this.historySearch = tools
			}
		},
		methods: {
			clearInput() {
				this.inputValue = ""
				this.tools = []
			},
			toIndex() {
				uni.switchTab({url: "/pages/index/index"})
			},
			input(event) {
				let value = event.detail.value.trim()
				if(value == "") {
					this.tools = []
					this.inputValue = ""
					return
				}
				this.inputValue = value
				// 查询数据库
				let data = []
				this.db.forEach(function(item) {
					let category = item.name;
					item.tools.forEach(function(tool) {
						if(tool.name.indexOf(value) != -1) {
							data.push({"category": category, "name": tool.name, "to": tool.to, "args": tool.args})
						}
					})
				})
				this.tools = data
			},
			deleteHistoryRecord() {
				let that = this
				uni.showModal({
					content: "是否要清空历史搜索？",
					confirmColor: "#F05656",
					success: function(res) {
						if(res.confirm) {
							that.historySearch = []
							uni.setStorageSync("tools", [])
						}
					}
				})
			},
			toPage(tool) {
				let tools = uni.getStorageSync("tools");
				let item = {"name": tool.name, "to": tool.to, "args": tool.args}
				if(!tools) {
					uni.setStorageSync("tools", [item]);
				} else {
					let index = -1
					for(let i = 0; i < tools.length; i++) {
						if(tool.to == tools[i].to) {
							if(tool.to == "poetry") {
								if(tool.args.type == tools[i].args.type) {
									index = i
									break
								}
							} else {
								index = i
								break
							}
						}
					}
					if(index != -1) {
						tools.splice(index, 1)
					}
					tools.unshift(item)
					uni.setStorageSync("tools", tools.slice(0, 10));
				}

				let url = `/pages/tools/${tool.to}/index`
				if(tool.args) {
					url += "?"
					for(let key in tool.args) {
						url += `${key}=${tool.args[key]}&`
					}
					url = url.substring(0, url.length - 1)
				}
				uni.navigateTo({url: url})
			}
		}
	}
</script>

<style lang="scss">
	.search {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 8pt;
		.input {
			width: 100%;
			height: 16pt;
			padding: 4pt 0pt 4pt 8pt;
			margin-left: 4pt;
			border-radius: 50pt;
			display: flex;
			flex-direction: row;
			align-items: center;
			background-color: #F8F8F8;
			.icon {
				height: 12pt;
				width: 12pt;
				margin-top: 1pt;
			}
			.tip {
				width: 85%;
				margin-left: 2pt;
				font-size: 10pt;
			}
			.clear {
				padding: 4pt 4pt 0pt 4pt;
				.icon {
					width: 16pt;
					height: 16pt;
				}
			}
		}
		.btn {
			width: 40pt;
			font-size: 10pt;
			text-align: center;
		}
	}
	.suggest {
		position: fixed;
		background-color: white;
		width: 100%;
		height: 100%;
		z-index: 1;
		overflow: auto;
		.tool {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 11pt;
			padding: 8pt 0pt 8pt 14pt;
			.category {
				border-radius: 4pt;
				color: white;
				font-size: 8pt;
				padding: 2pt 4pt;
				background-color: #000000;
			}
			.name {
				margin-left: 12pt;
			}
		}
	}
    .ad {
        margin: 0pt 12pt;
    }
	.record {
		margin: 4pt 8pt 8pt 4pt;
		height: 100pt;
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
			.delete {
				width: 12pt;
				height: 12pt;
				margin-left: auto;
				margin-right: 8pt;
			}
		}
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
</style>
