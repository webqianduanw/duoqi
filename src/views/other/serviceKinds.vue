<template>
	<div class="content">
		<ul class="hotQuestion">
			<div v-for="(item, index) in queMap" :key="index">
				<template v-if="que == index+1">
					<h2 class="hotQue"><span>{{ item.title }}</span></h2>
					<ul>
						<li @click="toggle(indexQue)" v-for="(itemQue,indexQue) of item.list" :key="indexQue" class="van-hairline--bottom">
							<p class="title"><span>{{itemQue.queTitle}}</span><i :class="{ down:show == indexQue }"></i></p>
							<p class="answer" v-show="show == indexQue">{{itemQue.answer}}</p>
						</li>
					</ul>
				</template>
			</div>
		</ul>
	</div>
</template>

<script>
  
	export default {
		name: 'app',
		components: {

		},

		data() {
			return {
				show: [false],
				que: this.que,
				queMap: [{
						"title": "认证问题",
						"list": [{
							"queTitle": "身份证扫描无反应",
							"answer": "请您先退出 APP 的进程（关闭多贝的后台程序），重新进入 APP 扫描，如果还是无反应，请截图后联系在线客服，提供您的注册手机号码和手机型号，我们为您处理"
						}, {
							"queTitle": "扫脸无反应",
							"answer": "建议您找个光线充足、信号稳定的环境进行人脸识别，识别时需垂直紧握手机，按照系统指示完成指定动作。"
						}, {
							"queTitle": "扫脸后提示认证失败",
							"answer": "请您端正坐好竖直拿着手机，手机要和面部一个高度，不要躺卧，不要用头发或眼睛帽子等遮挡，再次尝试一下。您的扫脸认证次数是有限的，如果超限需要明天才能尝试了。"
						}, {
							"queTitle": "人脸识别提示“竖直紧握手机”",
							"answer": "请您端正坐好竖直拿着手机，手机要和面部一个高度，不要躺卧，不要用头发或眼睛帽子等遮挡，再次尝试一下。您的扫脸认证次数是有限的，如果超限需要明天才能尝试了。"
						}, {
							"queTitle": "身份信息被其他账号绑定的问题",
							"answer": "如果您之前注册并使用身份证绑定过多贝，就不能再重复绑定了，您可以用原来的手机号码登录。"
						}, {
							"queTitle": "绑卡失败",
							"answer": "如果绑卡失败，请检查您的银行卡号，银行名称，预留手机号码是否正确。如果都正确，可能是银行维护导致的，您可以联系客服确认这个问题"
						}, {
              "queTitle": "运营商一直在认证中",
              "answer": "如果运营商一直在认证中，可能是因为您没有给多贝开通通知权限造成的，因为开通通知权限后，APP 才可以自动刷新。如果您用的是苹果手机，点击“设置-多贝”就可以开启通知权限了。如果是安卓手机，如果您的手机有“安全管家”这种应用，可以去“安全管家”中设置。设置完成后，关闭程序重新进入 APP 就可以了"
            },{
              "queTitle": "运营商因为认证的手机号不用了而无法认证",
              "answer": "我们认证的运营商手机号码是您的银行卡主卡预留手机号码，若无法使用，请联系客服更换银行卡主卡。"
            },{
              "queTitle": "信用评分不足，认证审核失败",
              "answer": "建议您过15天再来尝试下呢！虽然您这次没有通过，但已成为我们这边的优质客户，您当前急需资金的话可以在我们贷款超市看下呢，您可以多尝试几家，这样可以提高您贷款成功的概率哦。"
            },{
              "queTitle": "信用认证一直在认证中",
              "answer": "如果运营商一直在认证中，可能是因为您没有给多开通通知权限造成的，因为开通通知权限后，APP 才可以自动刷新。如果您用的是苹果手机，点击“设置-多贝”就可以开启通知权限了。如果是安卓手机，如果您的手机有“安全管家”这种应用，可以去“安全管家”中设置。设置完成后，关闭程序重新进入 APP 就可以了"
            },]
					}, {
						"title": "借款问题",
						"list": [{
							"queTitle": "借款失败是什么原因",
							"answer": "提交审核未通过，并不代表您信用不好，对客户的审核体系在不断优化中，您15天以后可以再试试；我们根据您信用等级给您推荐了一些优质的渠道，若是急需资金可以到我们贷款超市看看哦。"
						}, {
							"queTitle": "APP 显示打款成功，但是还没有收到款项",
							"answer": "请查询您绑定的银行卡主卡的发卡银行，以实际到账为准"
						}, {
							"queTitle": "延期还款可以通过支付宝办理吗",
							"answer": "不可以，需要通过在app上操作办理延期"
						}]
					}, {
						"title": "还款问题",
						"list": [{
							"queTitle": "支付宝还款账号经常变更",
							"answer": "因为财务结算原因，我方需要多个支付宝账号，只要是 APP 官方公布的支付宝账号都是安全的。请您放心。"
						}, {
							"queTitle": "还款一直处于处理中",
							"answer": "若您是通过支付宝还款，请您还款后在立即还款下方\"我已支付宝还款\"点击进入提交支付宝还款的订单号，9:00-22:30期间一般1-2个小时左右处理一次，请您耐心等待下哦，若是银行卡一般处理时间需5-10分钟。"
						}, {
							"queTitle": "按时全额转账但却还未结清",
							"answer": "如果您转账的时间是在应还日期之前，且转账金额是当时的应还金额，请联系客服。"
						}, {
							"queTitle": "银行卡还款失败",
							"answer": "如果您银行卡还款失败，请根据您在支付失败后的弹窗提示进行操作，如果按照提示操作还是不行，请您联系客服"
						}]
					}, {
						"title": "额度问题",
						"list": [{
							"queTitle": "可不可以提额",
							"answer": "多贝是有系统提额规则，只要您坚持使用并按时还款，您一定会提额的"
						}, {
							"queTitle": "额度下降了？",
							"answer": "额度下降了，可能是因为您某次没有按时还款，不过不用担心，如果一直坚持使用并按时还款，您一定会提额的"
						}]
					}, {
						"title": "异常问题",
						"list": [{
							"queTitle": "为什么要授权存储权限",
							"answer":"因为在实名认证的过程中会用到相机权限和相册权限，否则无法扫描身份证和人脸。"},
              {
							"queTitle": "如何给多贝开通各项权限",
							"answer": "如果您用的是苹果手机，点击“设置-多贝”就可以开启各种权限了。如果是安卓手机，如果您的手机有“安全管家”这种应用，可以去“安全管家”中设置。设置完成后，关闭程序重新进入 APP 就可以了"}]
					}, {
						"title": "其他问题",
						"list": [{
							"queTitle": "更换主卡？",
							"answer": "打开APP，点“我的”-“银行卡管理”里面绑定一张新的银行卡，然后副卡的右上角有三条横线的，您点击下就可以自己更换（切换）主卡就可以"
						}, {
							"queTitle": "解绑银行卡？",
							"answer": "若您只绑定一张银行卡是没办法解绑银行卡的哦，银行卡绑定最低数量是一张。若是绑定了多张银行卡，将要解绑的银行卡设置成副卡，然后副卡的右上角有三条横线的，操作解绑就可以"
						}, {
							"queTitle": "更改注册手机号？",
							"answer": "注册的手机号相当于您的用户名，手机号是无法更改的"
						}, {
							"queTitle": "银行卡签约失败？",
							"answer": "银行签约失败是因为您填写的信息有误，导致了签约失败"
						}]
					}

				]
			}
		},
		created() {
      let que = this.$Utils.urlAnalytical().que||""
      this.que = que
			this.showQue();
		},
		methods: {
			toggle(e) {
				this.show = this.show == e ? -1 : e
			},
			showQue() {
				if(this.que === '1') {
					$(document).attr("title", "认证问题");
				} else if(this.que === '2') {
					$(document).attr("title", "借款问题");
				} else if(this.que === '3') {
					$(document).attr("title", "还款问题");
				} else if(this.que === '5') {
					$(document).attr("title", "额度评估");
				} else if(this.que === '4') {
					$(document).attr("title", "异常问题");
				} else if(this.que === '6') {
					$(document).attr("title", "其他问题");
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
  @function vw($px) {
  @return ($px / 7.5) * 100vw;
  }
	.content {
    font-size: 12px;
		.hotQue {
			height: vw(0.88);
			line-height: vw(0.88);
			background: #fff;
      padding-left: vw(.4);
			color: #606B87;
      font-size: 16px;
      position: relative;
        span {
          &:after {
            content: '';
            position: absolute;
            background: #edeff0;
            width: 100%;
            height: 1px;
            left: 0;
            top: 11.73333vw;
            transform: scaleY(0.5);
            -webkit-transform: scaleY(0.5);
            transform-origin: 0 0;
            -webkit-transform-origin: 0 0;
            z-index: 1;
          }
      }
		}
		.hotQuestion {
			li {
				position: relative;
				.title {
          font-size: 14px;
					height: vw(0.88);
					line-height: vw(0.88);
					background-color: #fff;
					position: relative;
					padding-left: vw(0.4);
          // &:before{
          //   content: '';
          //   display: inline-block;
          //   width: vw(.32);
          //   height: vw(.32);
          //   background: url("./img/b.png") no-repeat center;
          //   background-size: 100%;
          //   position: relative;
          //   top: 2px;
          //   margin-right: 5px;
          // }
          .down {
            transform: translateY(-50%) rotate(180deg);
						transition: all 0.5s;
          }
					i {
						-webkit-background-size: cover;
						background-size: cover;
						position: absolute;
						top: 50%;
						right: vw(0.4);
            width: vw(0.2);
            height: vw(0.12);
            background-image: url(./img/up.png);
            transform: translateY(-50%) rotate(0);
						transition: all 0.5s;
					}
				}
				.answer {
					padding: vw(0.2) vw(0.4);
					text-align: Justify;
					background-color: #fff;
					color: #969696;
					background-color: #F7F7F7;
					line-height: vw(0.4);
          font-size: 12px;
					white-space: pre-wrap;
					white-space: -pre-wrap;
					*word-wrap: break-word;
					*white-space: normal;
				}
			}
			li:after {
				content: '';
				position: absolute;
				background: #edeff0;
				width: 94.5%;
				height: 1px;
				left: vw(0.4);
				top: vw(0.88);
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				z-index: 1;
			}
		}
		.kefuOnline {
			position: fixed;
			bottom: vw(1);
			right: 0;
			z-index: 2;
			a {
				width: vw(1.06);
				height: vw(0.92);
			}
		}
	}
</style>
