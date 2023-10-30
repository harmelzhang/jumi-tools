export default {
	queryData(that) {
		let year = new Date().getFullYear()

		let dates = uni.getStorageSync(`${year}`)
		let items = []  // 适宜忌讳项目
		let data = [] // 每天数据

		if(!dates) {
			uni.request({
				url: `https://opendata.baidu.com/data/inner?type=json&resource_id=52109&query=${year}年2月&apiType=yearMonthData`
			}).then(res => {
				fetchData(res)
				return uni.request({
					url: `https://opendata.baidu.com/data/inner?type=json&resource_id=52109&query=${year}年5月&apiType=yearMonthData`
				})
			}).then(res => {
				fetchData(res)
				return uni.request({
					url: `https://opendata.baidu.com/data/inner?type=json&resource_id=52109&query=${year}年8月&apiType=yearMonthData`
				})
			}).then(res => {
				fetchData(res)
				return uni.request({
					url: `https://opendata.baidu.com/data/inner?type=json&resource_id=52109&query=${year}年11月&apiType=yearMonthData`
				})
			}).then(res => {
				fetchData(res)
				// 排序
				data.sort((a, b) => {
					if(a.date < b.date) {
						return -1
					} else if(a.date > b.date) {
						return 1
					} else {
						return 0
					}
				})
				that.dates = data
				that.items = items
				uni.setStorageSync(`${year}`, data)
                
                console.log(data)
			})
		} else {
			dates.forEach(day => {
				day.suit.split(".").forEach(word => {  // 适宜
					if(word != '无') {
						if(items.indexOf(word) == -1) {
							items.push(word)
						}
					}
				})
				day.avoid.split(".").forEach(word => {  // 忌讳
					if(word != '无') {
						if(items.indexOf(word) == -1) {
							items.push(word)
						}
					}
				})
			})
			that.dates = dates
			that.items = items
		}

		function fetchData(res) {
			let resultData = res.data.Result[0].DisplayData.resultData.tplData.data.almanac
			resultData.forEach(day => {
				day.suit.split(".").forEach(word => {  // 适宜
					if(items.indexOf(word) == -1) {
						items.push(word)
					}
				})
				day.avoid.split(".").forEach(word => {  // 忌讳
					if(items.indexOf(word) == -1) {
						items.push(word)
					}
				})
				let showMonth = day.month
				if(showMonth.length == 1) {
					showMonth = "0" + showMonth
				}
				let showDay = day.day
				if(showDay.length == 1) {
					showDay = "0" + showDay
				}
				data.push({
					"date": `${day.year}-${showMonth}-${showDay}`,
					"suit": day.suit,  // 适宜
					"avoid": day.avoid,  // 忌讳
					"lunarDate": `${day.year}年${day.lMonth}月${day.lDate}`,  // 农历
					"publicDate": `${day.year}年${showMonth}月${showDay}日`,  // 公历
					"gzDate": `${day.gzYear}年 ${day.gzMonth}月 ${day.gzDate}日 属${day.animal}`,  // 天干地支
					"week": day.cnDay, // 星期几
				})
			})
		}
	}
}