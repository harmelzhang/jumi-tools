<template>
	<view class="poetry">
		<view class="title">
			<text class="item" v-for="title in poetry.title">{{title}}</text>
		</view>
		<text class="author">{{poetry.author}}</text>
		<view class="content">
			<text class="item" v-for="content in poetry.content">{{content}}</text>
		</view>
		<view class="oper_area">
			<button class="btn" v-on:click="random">随机一首</button>
		</view>
	</view>
</template>

<script>
	import poetryUtils from '@/utils/poetry.js'

	function splitPoetryContent(content) {
		let result = []
		let items = content.split(/[。？！?!:：;；]/).slice(0, -1)
		for(let i = 0; i < items.length; i++) {
			let index = content.indexOf(items[i]) + items[i].length
			items[i] = items[i] + content.substring(index, index + 1)
			result.push(items[i])
		}
		return result
	}
	
	function show(that, index) {
		return function() {
			if(!that.poetryType) {
				uni.switchTab({url: "/pages/index/index"})
				return
			}
			if(!that.poetrys || index < 0) {
				uni.navigateTo({
					url: `/pages/tools/poetry?type=${this.poetryType}`
				})
				return
			}
			let poetry = that.poetrys[index]
			poetry.content = poetry.content.replace(/[（\(][\s\S]+[\)）]/g, "").replace(/<[a-zA-Z]+>/g, "")
			poetry.content = splitPoetryContent(poetry.content)
			that.poetry = poetry
		}
	}
	
	export default {
		data() {
			return {
				poetryType: "",
				poetrys: [],
				poetry: {}
			}
		},
		onLoad(event) {
			uni.pageScrollTo({scrollTop: 0, duration: 0})

			let poetryType = event.type

			let poetryTypeMap = {
				"tangshi": "唐诗三百首",
				"songci": "宋词",
				"shijing": "诗经",
				"chuci": "楚辞",
				"yuefu": "乐府诗集"
			}
			
			if(!(poetryType in poetryTypeMap)) {
				uni.switchTab({url: "/pages/index/index"})
				return
			}

			this.poetryType = poetryType
			uni.setNavigationBarTitle({title: poetryTypeMap[poetryType]})

			poetryUtils.queryData(this, show(this, event.index))
		},
		methods: {
			random() {
				uni.pageScrollTo({scrollTop: 0, duration: 0})
				let poetrys = uni.getStorageSync(this.poetryType)
				poetryUtils.queryData(this, show(this, Math.floor(Math.random() * poetrys.length)))
			}
		}
	}
</script>

<style lang="scss">
	.poetry {
		margin-top: 20pt;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 24pt;
		.title {
			padding: 0pt 12pt;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 4pt 12pt;
			.item {
				font-size: 14pt;
				font-weight: bold;
			}
		}
		.author {
			margin-top: 12pt;
			color: #A8A8A8;
		}
		.content {
			margin-top: 12pt;
			padding: 0pt 12pt;
			display: flex;
			flex-direction: column;
			align-items: center;
			.item {
				margin-bottom: 4pt;
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
		}
	}
</style>
