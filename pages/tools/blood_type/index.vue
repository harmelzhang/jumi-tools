<template>
	<view class="bloodSelect">
		<view class="item">
			<view class="title">
				<text>您的血型：</text>
			</view>
			<view class="select">
				<picker v-bind:range="bloodTypes" v-on:change="changeMeBlood">
					<view class="show">{{bloodTypes[meTypeIndex]}}</view>
				</picker>
			</view>
		</view>
		<view class="item">
			<view class="title">
				<text>配偶血型：</text>
			</view>
			<view class="select">
				<picker v-bind:range="bloodTypes" v-on:change="changeOtherBlood">
					<view class="show">{{bloodTypes[otherTypeIndex]}}</view>
				</picker>
			</view>
		</view>
		<view class="oper">
			<button class="btn" v-on:click="calc">开始计算</button>
		</view>
		<view class="result" v-show="isShow">
			<view class="info">
				<text class="title">孩子可能血型：</text>
				<text class="value possible">{{possible}}</text>
			</view>
			<view class="info">
				<text class="title">不可能血型：</text>
				<text class="value impossible">{{impossible}}</text>
			</view>
		</view>
	</view>
	<view class="warn">
		<text class="info">虽然有一些研究表明血型与性格之间存在某种关系，但目前并没有足够证据证明这种关系的存在。一些人相信血型会影响一个人的性格和行为方式，例如，A型血的人被认为更焦虑，O型血的人则更自信。但这些说法缺乏可靠的科学证据。虽然血型与某些疾病的风险存在一定的相关性，但是关于血型和性格的研究仍然存在争议，不能被作为科学依据。</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bloodTypes: ["A", "B", "AB", "O"],
				meTypeIndex: 0,
				otherTypeIndex: 0,
				isShow: false,
				possible: "",
				impossible: ""
			}
		},
		methods: {
			changeMeBlood(event) {
				this.meTypeIndex = event.detail.value
				this.isShow = false
			},
			changeOtherBlood(event) {
				this.otherTypeIndex = event.detail.value
				this.isShow = false
			},
			calc() {
				let that = this
				let map = [
					{
						"group": ["O+O"],
						"value": {possible: "O", impossible: "A、B、AB"}
					},
					{
						"group": ["O+A", "A+O"],
						"value": {possible: "A、O", impossible: "B、AB"}
					},
					{
						"group": ["O+B", "B+O"],
						"value": {possible: "B、O", impossible: "A、AB"}
					},
					{
						"group": ["O+AB", "AB+O"],
						"value": {possible: "A、B", impossible: "O、AB"}
					},
					{
						"group": ["A+A"],
						"value": {possible: "A、O", impossible: "B、AB"}
					},
					{
						"group": ["A+B", "B+A"],
						"value": {possible: "A、B、AB、O", impossible: "-"}
					},
					{
						"group": ["A+AB", "AB+A"],
						"value": {possible: "A、B、AB", impossible: "O"}
					},
					{
						"group": ["B+B"],
						"value": {possible: "B、O", impossible: "A、AB"}
					},
					{
						"group": ["B+AB", "AB+B"],
						"value": {possible: "A、B、AB", impossible: "O"}
					},
					{
						"group": ["AB+AB"],
						"value": {possible: "A、B、AB", impossible: "O"}
					}
				]
				let key = `${that.bloodTypes[that.meTypeIndex]}+${that.bloodTypes[that.otherTypeIndex]}`
				for(let i = 0; i < map.length; i++) {
					for(let j = 0; j < map[i].group.length; j++) {
						if(key == map[i].group[j]) {
							that.possible = map[i].value.possible
							that.impossible = map[i].value.impossible
							that.isShow = true
							return
						}
						console.log(map[i].group[j])
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.bloodSelect {
		margin: 12pt;
		border-radius: 4pt;
		border: 1rpx solid #F3F3F3;
		.item {
			padding: 4pt 12pt;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 11pt;
			border-bottom: 1rpx solid #F3F3F3;
			.title {
				font-weight: bold;
				width: 85pt;
			}
			.select {
				padding-left: 12pt;
				width: 100%;
				height: 25pt;
				color: #F05656;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-weight: bold;
			}
		}
		.oper {
			margin-bottom: 12pt;
			.btn {
				margin-top: 12pt;
				font-size: 10pt;
				font-weight: bold;
				background-color: #000000;
				color: #FFFFFF;
				width: 160pt;
			}
		}
		.result {
			padding: 0pt 12pt 12pt 12pt;
			.info {
				font-size: 11pt;
				.value {
					font-weight: bold;
				}
				.possible {
					color: #3DB364;
				}
				.impossible {
					color: #F05656;
				}
			}
		}
	}
	.warn {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 12pt;
		.info {
			margin-bottom: 20pt;
			font-size: 10pt;
			border: 1pt dashed #000000;
			border-radius: 4pt;
			padding: 8pt;
			text-indent: 2em;
		}
	}
</style>
