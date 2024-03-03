<template>
	<view class="search" v-on:click="toSearch">
		<view class="input">
			<text class="tip">搜索你想要找的工具</text>
			<image class="icon" src="/static/common/search.png"></image>
		</view>
	</view>
	
	<view class="advertise">
		<view class="row">
			<view class="item item2">
				<!-- 个人 -->
				<image class="icon icon-top-left-radius" mode="widthFix" src="/static/advertise/meituan.png" v-on:click="toApp('wxde8ac0a21135c07d', 'index/pages/h5/h5?noshare=1&f_openId=0&weburl=https%3A%2F%2Fclick.meituan.com%2Ft%3Ft%3D1%26c%3D2%26p%3D8nsxar5zu3UC&f_userId=0&f_token=0')"></image>
			</view>
			<view class="item item2">
				<!-- 个人 -->
				<image class="icon icon-top-right-radius" mode="widthFix" src="/static/advertise/ele.png" v-on:click="toApp('wxece3a9a4c82f58c9', 'commercialize/pages/taoke-guide/index?scene=663730b3100a40ffa1c9583376870a80')"></image>
			</view>
		</view>
		<view class="row">
			<view class="item item3">
				<image class="icon icon-bottom-left-radius" mode="widthFix" src="/static/advertise/huaxiaozhu.png" v-on:click="toApp('wxd98a20e429ce834b', '/pages/chitu/index?scene=0qlzdP5&source_id=109743jutuike123456')"></image>
			</view>
			<view class="item item3">
				<image class="icon" mode="widthFix" src="/static/advertise/dididache.png" v-on:click="toApp('wxaf35009675aa0b2a', '/pages/index/index?scene=Yz0AdQx&source_id=109743jutuike123456')"></image>
			</view>
			<view class="item item3">
				<image class="icon icon-bottom-right-radius" mode="widthFix" src="/static/advertise/didijiayou.png" v-on:click="toApp('wxaf35009675aa0b2a', '/pages/index/index?scene=Knxk83A&source_id=109743jutuike123456')"></image>
			</view>
		</view>
	</view>

	<view class="applications">
		<view class="title">
			<text>生活娱乐</text>
		</view>
		<view class="content">
            <view class="item" v-on:click="toPage('douyin')">
            	<view class="info">
            		<view class="title_area">
            			<text class="title">抖音去水印</text>
            		</view>
            		<view class="desc_area">
            			<text class="desc">视频搬运有神器</text>
            		</view>
            	</view>
            	<view class="icon">
            		<image src="/static/icon/douyin.png"></image>
            	</view>
            	<view class="tip_area">
            		<text class="tip">热</text>
            	</view>
            </view>
            <view class="item" v-on:click="toApp('wx080898d8ab298091', 'pages/almanac/almanac')">
            	<view class="info">
            		<view class="title_area">
            			<text class="title">每日运势</text>
            		</view>
            		<view class="desc_area">
            			<text class="desc">今天适合做什么呢</text>
            		</view>
            	</view>
            	<view class="icon">
            		<image src="/static/icon/luck.png"></image>
            	</view>
            	<view class="tip_area">
            		<text class="tip">热</text>
            	</view>
            </view>
			<view class="item" v-on:click="toPage('qrcode')">
				<view class="info">
					<view class="title_area">
						<text class="title">二维码生成</text>
					</view>
					<view class="desc_area">
						<text class="desc">扫一扫就有答案</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/qrcode.png"></image>
				</view>
				<view class="tip_area">
					<text class="tip">热</text>
				</view>
			</view>
			<view class="item" v-on:click="toPage('date')">
				<view class="info">
					<view class="title_area">
						<text class="title">吉日查询</text>
					</view>
					<view class="desc_area">
						<text class="desc">那天我要做点什么</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/date.png"></image>
				</view>
				<view class="tip_area">
					<text class="tip tip_new">新</text>
				</view>
			</view>
			<!--
			<view class="item" v-on:click="toPage('name')">
				<view class="info">
					<view class="title_area">
						<text class="title">古诗词取名</text>
					</view>
					<view class="desc_area">
						<text class="desc">富有诗意的名字谁不想要</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/name.png"></image>
				</view>
				<view class="tip_area">
					<text class="tip">热</text>
				</view>
			</view>
			<view class="item" v-on:click="toPage('eat')">
				<view class="info">
					<view class="title_area">
						<text class="title">今天吃什么</text>
					</view>
					<view class="desc_area">
						<text class="desc">选择困难症快走开</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/eat.png"></image>
				</view>
				<view class="tip_area">
					<text class="tip tip_new">新</text>
				</view>
			</view>
			-->
			<view class="item" v-on:click="toPage('calorie')">
				<view class="info">
					<view class="title_area">
						<text class="title">卡路里查询</text>
					</view>
					<view class="desc_area">
						<text class="desc">燃烧我的卡路里</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/calorie.png"></image>
				</view>
			</view>
			<view class="item" v-on:click="toPage('blood_type')">
				<view class="info">
					<view class="title_area">
						<text class="title">血型遗传规律</text>
					</view>
					<view class="desc_area">
						<text class="desc">我遇见谁会有怎样的对白</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/blood_type.png"></image>
				</view>
			</view>
			<!--
			<view class="item" v-on:click="toPage('trash')">
				<view class="info">
					<view class="title_area">
						<text class="title">垃圾分类查询</text>
					</view>
					<view class="desc_area">
						<text class="desc">你是什么垃圾</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/trash.png"></image>
				</view>
			</view>
			-->
		</view>
	</view>

	<view class="applications">
		<view class="title">
			<text>教育教学</text>
		</view>
		<view class="content">
			<view class="item" v-on:click="toPage('poetry', {'type': 'tangshi'})">
				<view class="info">
					<view class="title_area">
						<text class="title">唐诗三百首</text>
					</view>
					<view class="desc_area">
						<text class="desc">不会作诗也会吟</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/book.png"></image>
				</view>
			</view>
			<view class="item" v-on:click="toPage('poetry', {'type': 'songci'})">
				<view class="info">
					<view class="title_area">
						<text class="title">宋词</text>
					</view>
					<view class="desc_area">
						<text class="desc">未成曲调先有情</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/book.png"></image>
				</view>
			</view>
			<view class="item" v-on:click="toPage('poetry', {'type': 'shijing'})">
				<view class="info">
					<view class="title_area">
						<text class="title">诗经</text>
					</view>
					<view class="desc_area">
						<text class="desc">青青子衿，悠悠我心</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/book.png"></image>
				</view>
			</view>
			<view class="item" v-on:click="toPage('poetry', {'type': 'chuci'})">
				<view class="info">
					<view class="title_area">
						<text class="title">楚辞</text>
					</view>
					<view class="desc_area">
						<text class="desc">路曼曼其修远兮</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/book.png"></image>
				</view>
			</view>
			<view class="item" v-on:click="toPage('poetry', {'type': 'yuefu'})">
				<view class="info">
					<view class="title_area">
						<text class="title">乐府诗集</text>
					</view>
					<view class="desc_area">
						<text class="desc">孔雀东南飞，五里一徘徊</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/book.png"></image>
				</view>
				<view class="tip_area">
					<text class="tip tip_new">新</text>
				</view>
			</view>
		</view>
	</view>
	
	<view class="applications">
		<view class="title">
			<text>数据换算</text>
		</view>
		<view class="content">
			<!--
			<view class="item" v-on:click="toPage('mortgage')">
				<view class="info">
					<view class="title_area">
						<text class="title">房贷计算</text>
					</view>
					<view class="desc_area">
						<text class="desc">快速计算贷款利息和还款金额</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/mortgage.png"></image>
				</view>
				<view class="tip_area">
					<text class="tip">热</text>
				</view>
			</view>
			<view class="item" v-on:click="toPage('invest')">
				<view class="info">
					<view class="title_area">
						<text class="title">投资收益计算</text>
					</view>
					<view class="desc_area">
						<text class="desc">智能化的投资收益计算工具</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/invest.png"></image>
				</view>
				<view class="tip_area">
					<text class="tip">热</text>
				</view>
			</view>
			<view class="item" v-on:click="toPage('bmi')">
				<view class="info">
					<view class="title_area">
						<text class="title">BMI计算</text>
					</view>
					<view class="desc_area">
						<text class="desc">你的健康我知道</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/bmi.png"></image>
				</view>
				<view class="tip_area">
					<text class="tip tip_new">新</text>
				</view>
			</view>
			
			<view class="item" v-on:click="toPage('date')">
				<view class="info">
					<view class="title_area">
						<text class="title">日期计算</text>
					</view>
					<view class="desc_area">
						<text class="desc">日期间隔天数计算器</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/date.png"></image>
				</view>
				<view class="tip_area">
					<text class="tip tip_new">新</text>
				</view>
			</view>
			-->
			<view class="item" v-on:click="toPage('temperature')">
				<view class="info">
					<view class="title_area">
						<text class="title">温度转换</text>
					</view>
					<view class="desc_area">
						<text class="desc">各种温度单位之间的数值转换</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/temperature.png"></image>
				</view>
			</view>
			<view class="item" v-on:click="toPage('binary')">
				<view class="info">
					<view class="title_area">
						<text class="title">进制转换</text>
					</view>
					<view class="desc_area">
						<text class="desc">常见进制之间的数值转换</text>
					</view>
				</view>
				<view class="icon">
					<image src="/static/icon/binary.png"></image>
				</view>
			</view>
		</view>
	</view>

	<view class="toTop" v-show="showToTop" v-on:click="toTop">
		<image class="icon" src="/static/common/up.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showToTop: false
			}
		},
		onLoad() {
			
		},
		onPageScroll(event) {
			if(event.scrollTop > 200) {
				this.showToTop = true
			} else {
				this.showToTop = false
			}
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url: "/pages/index/search"
				})
			},
			toApp(appId, path) {
				uni.navigateToMiniProgram({
					appId: appId,
					path: path,
					fail() {}
				})
			},
			toPage(to, args) {
				let url = `/pages/tools/${to}/index`
				if(typeof args == "object") {
					url += "?"
					for(let key in args) {
						url += `${key}=${args[key]}&`
					}
					url = url.substring(0, url.length - 1)
				}
				uni.navigateTo({
					url: url
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
		flex-direction: row;
		padding: 8pt 12pt;
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
				margin-left: 8pt;
				color: #A8A8A8;
				font-size: 10pt;
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

	.advertise {
		padding: 0pt 12pt;
		display: flex;
		flex-direction: column;
		.row {
			display: flex;
			flex-direction: row;
			margin-top: 4pt;
			&:first-child {
				margin-top: 0pt;
			}
			.item {
				display: flex;
				flex-direction: column;
				margin-right: 4pt;
				&:last-child {
					margin-right: 0pt;
				}
				.icon {
					width: 100%;
				}
				.icon-top-left-radius {
					border-top-left-radius: 4pt;
				}
				.icon-top-right-radius {
					border-top-right-radius: 4pt;
				}
				.icon-bottom-left-radius {
					border-bottom-left-radius: 4pt;
				}
				.icon-bottom-right-radius {
					border-bottom-right-radius: 4pt;
				}
			}
			.item2 {
				width: 50%;
			}
			.item3 {
				width: 33.33%;
			}
		}
	}

	.applications {
		padding: 8pt 12pt 12pt 12pt;
		.title {
			font-size: 12pt;
			font-weight: bold;
		}
		.content {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.item {
				height: 60pt;
				width: 48%;
				margin-top: 8pt;
				margin-right: 8pt;
				padding: 6pt;
				box-shadow: 0 0 10pt rgba(0, 0, 0, .1);
				border-radius: 4pt;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				&:nth-child(2n) {
					margin-right: 0pt;
				}
				.info {
					margin-right: 6pt;
					display: flex;
					flex-direction: column;
					.title_area {
						.title {
							font-size: 10pt;
						}
					}
					.desc_area {
						overflow: hidden;
						.desc {
							font-size: 8pt;
							color: #A8A8A8;
						}
					}
				}
				.icon {
					margin-left: auto;
					display: flex;
					flex-direction: column;
					justify-content: center;
					image {
						width: 24pt;
						height: 24pt;
					}
				}
				.tip_area {
					position: relative;
					.tip {
						position: absolute;
						top: -6pt;
						right: -6pt;
						background-color: #F05656;
						padding: 1pt 3pt;
						border-top-right-radius: 4pt;
						border-bottom-left-radius: 4pt;
						font-size: 8pt;
						color: white;
					}
					.tip_new {
						background-color: #3DB364;
					}
				}
			}
		}
	}
	.toTop {
		position: fixed;
		bottom: 8pt;
		right: 12pt;
		.icon {
			width: 28pt;
			height: 28pt;
		}
	}
</style>
