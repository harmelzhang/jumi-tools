export default {
	queryData(that, func) {
		let poetryTypeMap = {
			"tangshi": {
				"url": "https://mp-2f73ffe0-5d4f-4852-8a6b-86892c3cb1ee.cdn.bspapp.com/cloudstorage/8d73973b-4db0-448d-a3a8-0bcf11f70cdd.json"
			},
			"songci": {
				"url": "https://mp-2f73ffe0-5d4f-4852-8a6b-86892c3cb1ee.cdn.bspapp.com/cloudstorage/0f8c7e63-ddd4-4c3d-9b7f-66e06379615d.json"
			},
			"shijing": {
				"title": "诗经",
				"url": "https://mp-2f73ffe0-5d4f-4852-8a6b-86892c3cb1ee.cdn.bspapp.com/cloudstorage/51c0866d-fa78-4826-884b-4a6d38cd3350.json"
			},
			"chuci": {
				"url": "https://mp-2f73ffe0-5d4f-4852-8a6b-86892c3cb1ee.cdn.bspapp.com/cloudstorage/660515eb-b994-47d1-b0ab-4102b2f829ce.json"
			},
			"yuefu": {
				"url": "https://mp-2f73ffe0-5d4f-4852-8a6b-86892c3cb1ee.cdn.bspapp.com/cloudstorage/6cd80263-672c-401d-968e-65fa5fb6d90c.json"
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