<template>
	<view class="header">
		<text class="info">今年剩余{{type}}{{item}}的日子</text>
	</view>
    <view v-show="result.length == 0" class="no-data">
        <text>暂无，请明年再计划吧！</text>
    </view>
	<view class="date" v-for="date in result">
		<view class="item">
			<view class="title">
				<text>公历：</text>
			</view>
			<view class="content">
				<text>{{date.date}}</text>
			</view>
		</view>
		<view class="item">
			<view class="title">
				<text>农历：</text>
			</view>
			<view class="content">
				<text>{{date.lunarDate}}</text>
			</view>
		</view>
		<view class="item">
			<view class="title">
				<text>干支：</text>
			</view>
			<view class="content">
				<text>{{date.gzDate}}</text>
			</view>
		</view>
		<view class="item">
			<view class="title">
				<text>星期：</text>
			</view>
			<view class="content">
				<text>{{date.week}}</text>
			</view>
		</view>
		<view class="item">
			<view class="title">
				<text>适宜：</text>
			</view>
			<view class="content">
				<text>{{date.suit.replaceAll('.', '，')}}</text>
			</view>
		</view>
		<view class="item">
			<view class="title">
				<text>禁忌：</text>
			</view>
			<view class="content">
				<text>{{date.avoid.replaceAll('.', '，')}}</text>
			</view>
		</view>
	</view>
	<view style="height: 1pt;"></view>
	<view class="toTop" v-show="showToTop" v-on:click="toTop">
		<image class="icon" src="/static/common/up.png"></image>
	</view>
</template>

<script>
	import dateUtils from '@/utils/date.js'

	export default {
		data() {
			return {
				type: "",
				item: "",
				items: [],
				dates: [],
				result: [],
				showToTop: false
			}
		},
		onLoad(event) {
			uni.pageScrollTo({scrollTop: 0, duration: 0})
			
			this.type = decodeURIComponent(event.type)
			this.item = decodeURIComponent(event.item)
			
			uni.setNavigationBarTitle({title: `${this.type}日`})
			
			dateUtils.queryData(this)

			let currentDate = new Date()
			let month = currentDate.getMonth() + 1
			if(month < 10) {
				month = '0' + month
			}
			let day = currentDate.getDate()
			if(day < 10) {
				day = '0' + day
			}
			currentDate = currentDate.getFullYear() + '-' + month + '-' + day

			this.dates.forEach(date => {
				if(date.date >= currentDate) {
					if(this.type == '适宜') {
						if(date.suit.indexOf(this.item) != -1) {
							this.result.push(date)
						}
					} else if(this.type == '禁忌') {
						if(date.avoid.indexOf(this.item) != -1) {
							this.result.push(date)
						}
					}
				}
			})
		},
		onPageScroll(event) {
			if(event.scrollTop > 200) {
				this.showToTop = true
			} else {
				this.showToTop = false
			}
		},
		methods: {
			toTop() {
				uni.pageScrollTo({scrollTop: 0, duration: 300})
			}
		}
	}
</script>

<style lang="scss">
	.header {
		margin-top: 10pt;
		margin-bottom: 2pt;
		display: flex;
		flex-direction: row;
		justify-content: center;
		.info {
			font-size: 14pt;
			font-weight: bold;
		}
	}
    
    .no-data {
        margin-top: 36pt;
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 11pt;
    }
    
	.date {
		margin: 8pt;
		padding: 8pt;
		border-radius: 4pt;
		box-shadow: 0 0 10pt rgba(0, 0, 0, .1);
		.item {
			padding: 4pt;
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1rpx solid #F3F3F3;
			font-size: 11pt;
			.title {
				width: 45pt;
				font-weight: bold;
			}
			.content {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			&:last-child {
				border: none;
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
