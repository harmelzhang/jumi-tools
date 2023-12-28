export default {
	queryData(that, func) {
		let poetryTypeMap = {
			"tangshi": {
				"url": "https://mp-891f5bfc-219e-4d25-9015-03afc44533e7.cdn.bspapp.com/jumi-tools/poetry/tangshi.json"
			},
			"songci": {
				"url": "https://mp-891f5bfc-219e-4d25-9015-03afc44533e7.cdn.bspapp.com/jumi-tools/poetry/songci.json"
			},
			"shijing": {
				"url": "https://mp-891f5bfc-219e-4d25-9015-03afc44533e7.cdn.bspapp.com/jumi-tools/poetry/shijing.json"
			},
			"chuci": {
				"url": "https://mp-891f5bfc-219e-4d25-9015-03afc44533e7.cdn.bspapp.com/jumi-tools/poetry/chuci.json"
			},
			"yuefu": {
				"url": "https://mp-891f5bfc-219e-4d25-9015-03afc44533e7.cdn.bspapp.com/jumi-tools/poetry/yuefu.json"
			}
		}
		let poetrys = uni.getStorageSync(that.poetryType)
		if(!poetrys) {
			uni.request({
				url: poetryTypeMap[that.poetryType].url,
				success(res) {
					let resultData = []
					let index = 0
					res.data.forEach(item => {
						let titles = item.title.split(" / ")
						for(let i = 0; i < titles.length; i++) {
							if(i != 0) {
								titles[i] = "(" + titles[i] + ")"
							}
						}
						resultData.push({
							index: index,
							title: titles,
							author: item.author,
							content: item.content
						})
						index++
					})
					that.poetrys = resultData
					uni.setStorageSync(that.poetryType, resultData)
					if(func) {
						func()
					}
				}
			})
		} else {
			that.poetrys = poetrys
			if(func) {
				func()
			}
		}
	}
}