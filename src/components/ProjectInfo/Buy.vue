<template>
    <div class="buy">
        <my-header title="确认投资"></my-header>
        <div class="scroll-box">
            <div class="buy__info">
                <div class="buy__info__title">{{title}}</div>
                <div class="buy__info__item">
                    <div class="buy__info__item__tit">预期年化利率</div>
                    <div class="buy__info__item__num">{{rate}}%</div>
                </div>
                <div class="buy__info__item">
                    <div class="buy__info__item__tit">项目期限</div>
                    <div class="buy__info__item__num">{{cycle}}天</div>
                </div>
                <div class="buy__info__item">
                    <div class="buy__info__item__tit">剩余可投(元)</div>
                    <div class="buy__info__item__num">{{surplus | formatNumber}}</div>
                </div>
            </div>

            <div class="buy__money">
                <div class="buy__money__title">购买金额</div>
                <div class="buy__money__box">
                    <div class="buy__money__unit">￥</div>
                    <input type="text" class="buy__money__input" :placeholder="min_money + '元起投'" v-model="investmentMoney" @input="inputMoney()">
                    <div class="buy__money__all" @click="allBuy()">一键满标</div>
                </div>
                <div class="buy__money__balance">
                    <div class="buy__money__balance__num">可用余额 {{money}}元</div>
                    <div class="buy__money__balance__enough" v-if="!enoughAssets">余额不足，请充值</div>
                </div>
            </div>

            <div class="buy__packet" @click="showPacketBox()">
                <span>使用红包</span>
                <div class="buy__packet__right">
                    <div class="buy__packet__text">{{packetText}}
                        <div class="arrow"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="buy__bot">
            <div class="buy__bot__profit">预计可获得收益
                <span>{{profitMoney}}元</span>
            </div>
            <div class="buy__bot__btn" @click="buyBtn()">确认购买</div>
        </div>

        <!-- 红包 -->
        <div class="mask" v-show="showPacket"></div>
        <transition name="slide-top">
            <packet v-show="showPacket"></packet>
        </transition>
        <!-- 红包 -->
    </div>
</template>
<script>
import Header from '../Common/Header'
import Packet from './Packet'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    name: 'projectbuy',
    data() {
        return {
            fix: false,
            investmentMoney: '', //投资金额
            enoughAssets: true,  //是否余额充足
            profitMoney: 0,  //收益
            canBuy: true, //是否能购买，标识符
        }
    },
    components: {
        'my-header': Header,
        'packet': Packet
    },
    computed: {
        ...mapState({
            id: state => state.projectinfo.projectInfo.id,  //投资项目id
            showPacket: state => state.projectinfo.showPacket,  //是否显示红包
            title: state => state.projectinfo.projectInfo.title,  //投资项目标题
            cycle: state => state.projectinfo.projectInfo.cycle,  //投资项目期限
            rate: state => state.projectinfo.projectInfo.rate,  //投资项目利率
            max_money: state => state.projectinfo.projectInfo.max_money,  //单个用户最大可投金额
            filled_money: state => state.projectinfo.projectInfo.filled_money,  //用户已投金额
            min_money: state => state.projectinfo.projectInfo.min_money,  //起投金额
            money: state => state.assets.money,  //起投金额
            packetList: state => state.projectinfo.packetList,  //红包列表
        }),
        ...mapGetters([
            'surplus',
            'checkedPacket'
        ]),
        higtest() {  //最高可投
            if (this.max_money > 0) {
                return this.max_money - this.filled_money;
            } else {
                return this.surplus
            }
        },
        choosePacketMoney() {  //选中的红包总额
            var sum = 0
            for (var i in this.checkedPacket) {
                sum = Number(this.checkedPacket[i].money) + sum;
            }
            return sum
        },
        packetText() {  //选中的红包文字
            if (this.packetList.length == 0) {
                return '无可适用红包'
            } else {
                if (this.checkedPacket.length == 0) {
                    return '选择红包';
                } else {

                    return '已选择' + this.choosePacketMoney + '元红包';
                }
            }
        },
        realPayMoney(){  //实际支付的金额
            return this.investmentMoney - this.choosePacketMoney
        }
    },
    mounted() {
        if (!this.id) {
            this.getInfo();
        }
        this.$store.dispatch('getBalance')
    },
    watch: {
        //监听投资金额变化，清空选择的红包
        investmentMoney() {
            this.$store.commit('CLEAR_CHOOSE_PACKET')
            this.$store.commit('SET_PROJECTINFO_MONEY', this.investmentMoney)
            this.calculate();  //计算收益
        },
        //监听实际支付的金额变化，判断余额是否充足
        realPayMoney(){
            this.isEnougth()
        }
    },
    methods: {
        //显示红包
        showPacketBox() {
            if (!this.investmentMoney) {
                this.$toast('请输入投资金额')
            } else {
                this.$store.commit("CHANGE_PACKET", true)
            }
        },
        //一键满标
        allBuy() {
            this.investmentMoney = Number(this.surplus) < Number(this.higtest) ? this.surplus : this.higtest;
        },
        //验证余额是否充足
        isEnougth() {
            if (Number(this.realPayMoney) > Number(this.money)) {
                this.enoughAssets = false;   //余额不足
            } else {
                this.enoughAssets = true;
            }
        },
        //输入金额
        inputMoney() {
            if (Number(this.investmentMoney) > Number(this.higtest)) {
                this.investmentMoney = this.higtest
            }
        },
        //计算收益
        calculate() {
            if (isNaN(this.investmentMoney)) {
                this.profitMoney = 0;
            } else {
                var num = (this.investmentMoney * this.rate / 100 / 365 * this.cycle).toFixed(2);
                this.profitMoney = num;
            }
        },
        getInfo() {
            var _this = this;
            this.$http.get('project/info?id=' + this.$route.query.id)
                .then(function(res) {
                    _this.$store.commit('SET_PROJECTINFO_INFO', res.data.returnData)
                })
        },
        //点击购买
        buyBtn() {
            if (!this.enoughAssets) {
                this.$toast("余额不足")
                return;
            }
            if (!this.investmentMoney) {
                this.$toast("请输入理财金额")
                return;
            }
            if (Number(this.investmentMoney) < Number(this.min_money)) {
                this.$toast("理财金额不能少于最小投标额")
                return;
            }

            if (!this.canBuy) {
                return;
            }
            this.canBuy = false;
            let arr = [];
            for (let i in this.checkedPacket) {
                arr.push(this.checkedPacket[i].id)
            }
            let _this = this;
            this.$http.post('/funds/investment', {
                id: _this.$route.query.id,
                money: _this.investmentMoney,
                rids: arr.join(',')
            }).then(function(res) {
                _this.canBuy = true;
                window.location.href = res.data.returnData.go_url;
            }).catch(function() {
                _this.canBuy = true;
            })

        },
    }
}
</script>
<style scoped lang="scss">
.buy {
    height: 100%;
    padding-top: 0.88rem;
    padding-bottom: 1.7rem;
    &__info {
        background: #ff716f;
        height: 3.4rem;
        padding: .4rem .3rem 0;
        &__title {
            font-size: .3rem;
            line-height: .42rem;
            color: #fff;
            margin-bottom: 0.34rem;
        }
        &__item {
            width: 50%;
            float: left;
            margin-bottom: 0.3rem;
            &__tit {
                font-size: .24rem;
                line-height: .37rem;
                color: rgba(255, 255, 255, .7)
            }
            &__num {
                font-size: .32rem;
                line-height: .45rem;
                color: #fff;
            }
        }
    }
    &__money {
        background: #fff;
        padding: .28rem .3rem 0;
        margin-top: 0.38rem;
        &__title {
            font-size: .26rem;
            line-height: .37rem;
            color: #666;
        }
        &__box {
            margin-top: 0.33rem;
            padding-bottom: 0.2rem;
            border-bottom: 1px solid #e6e6e6;
            height: 0.9rem;
            display: flex;
        }
        &__unit {
            width: 0.9rem;
            text-align: center;
            font-size: .64rem;
            line-height: .7rem;
        }
        &__input {
            width: 4.4rem;
            height: 0.7rem;
            font-size: .5rem;
        }
        &__all {
            font-size: .3rem;
            line-height: .7rem;
            color: #ff9659;
            padding-left: 0.3rem;
            border-left: 1px solid #eeeeee;
        }
        &__balance {
            height: 0.96rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &__num {
                font-size: .26rem;
                line-height: 1;
                color: #666;
            }
            &__enough {
                font-size: .24rem;
                color: #ff0000;
                line-height: 1;
            }
        }
    }
    &__packet {
        width: 100%;
        height: 0.75rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .3rem;
        margin-top: 0.6rem;
        color: #999;
        &__text {
            display: flex;
            align-items: center;
            .arrow {
                margin-left: 0.2rem;
            }
        }
    }
    &__bot {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        &__profit {
            height: 0.7rem;
            background: #fff5d9;
            font-size: .24rem;
            line-height: .7rem;
            text-align: center;
            span {
                color: #ff5a59;
            }
        }
        &__btn {
            height: 1rem;
            background: #ff5a59;
            color: #fff;
            font-size: .32rem;
            line-height: 1rem;
            text-align: center;
        }
    }
}
</style>