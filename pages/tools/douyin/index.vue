<template>
	<view class="oper_area">
		<view class="input_area">
			<textarea class="input" maxlength="300" v-on:input="input" placeholder="请粘贴某音分享短链接"></textarea>
		</view>
		<view class="info">
			<text class="tip">{{inputLength}}/300</text>
		</view>
		<button class="btn" v-on:click="generate">去水印</button>
	</view>
</template>

<script>
    import cheerio from "cheerio"
    
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
                // 解析URL
                let url = ""
                let reg = /https:\/\/[^\s]+/g
                let urls = this.inputValue.match(reg)
                if(urls == null || urls.length == 0) {
                    uni.showToast({icon: "none", title: "解析短网址出错"})
                    return
                }
                url = urls[0]
                // 初步解析
                uni.showLoading({title: "解析中"})
                uni.request({
                    url: url,
                    success(res) {
                        uni.hideLoading()
                        const doc = cheerio.load(res.data)
                        let videoId = ""
                        let metas = doc("meta");
                        for(let i = 0; i < metas.length; i++) {
                            let content = metas[i].attribs.content;
                            if(content) {
                                if(content.startsWith("format=html5;url=")) {
                                    videoId = content.substring(content.lastIndexOf("/") + 1)
                                    break
                                }
                            }
                        }
                        if(videoId == "") {
                            uni.showToast({icon: "none", title: "找不到该分享链接的视频"})
                            return
                        }
                        uni.navigateTo({
                            url: "/pages/tools/douyin/result?videoId=" + videoId
                        })
                    }
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
</style>
