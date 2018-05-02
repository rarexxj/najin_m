<template>
    <div class="form">
        <div class="form__balance">当前账户余额：
            <span>{{assets.money | formatNumber}}</span>元，免手续费提现额度：
            <span>{{assets.free_withdraw_money | formatNumber}}</span>元</div>
        <div class="form__box">
            <div class="form__card" @click="showCard = true">
                <div class="form__card__title">提现卡</div>
                <div class="form__card__icon bg-cover" :style="{backgroundImage:'url('+selectCard.bank_img+')'}"></div>
                <div class="form__card__select">
                    <div class="form__card__select__text">{{selectCard.bank_name}}</div>
                    <div class="form__card__balance">卡限额：
                        <span>{{selectCard.withdrawable_money}}</span>元</div>
                </div>
                <div class="arrow"></div>
            </div>
            <div v-show="showAddr">
                <div class="cell">
                    <div class="cell__title">所在银行</div>
                    <select class="cell__select" v-model="bank">
                        <option :value="item.bank_code" v-for="(item,index) in allBank" :key="index">{{item.bank_name}}</option>
                    </select>
                </div>
                <div class="cell">
                    <div class="cell__title">所属城市</div>
                    <select class="cell__select" style="width:2.3rem;margin-right:.5rem" v-model="proId">
                        <option :value="item.id" v-for="(item,index) in pro" :key="index">{{item.title}}</option>
                    </select>
                    <select class="cell__select" style="width:2.3rem" v-model="cityId">
                        <option :value="item.id" v-for="(item,index) in city" :key="index">{{item.title}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form__tip">* 第一次提现可修改，当第一次提现成功后，不可修改</div>
        <div class="form__box">
            <div class="cell">
                <div class="cell__title" style="color:#333;width:1.15rem">金额</div>
                <input type="text" class="cell__input" placeholder="请输入100元以上的金额" v-model="money">
            </div>
        </div>
        <div class="button" @click="sub()">下一步</div>
        <div class="form__tips">
            <span>预计到账时间：</span> <br> T日17:00之前申请提现，预计当日到账；
            <br> T日17:00以后申请提现，预计最晚T+1个工作日到账；
            <br> 遇双休日或法定节假日顺延，实际到账时间根据账户托管方
            <br>
        </div>
        <div class="mask" v-show="showCard"></div>
        <transition name="slide-top">
            <div class="card" v-show="showCard">
                <div class="card__title">
                    <div class="card__title__close" @click="showCard = false">取消</div>
                    <div class="card__title__complete" @click="showCard = false">完成</div>
                </div>
                <div class="card__list">
                    <div class="card__list__box">
                        <div class="card__list__item" v-for="(item,index) in list" :key="index" @click="tabCard(index)">
                            <div class="card__list__item__icon bg-cover" :style="{backgroundImage:'url('+item.bank_img+')'}"></div>
                            <div class="card__list__item__text">{{item.bank_name}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import {
    Indicator
} from 'mint-ui';
export default {
    data() {
        return {
            list: [],
            chooseCard: 0,
            selectCard: {},  //选中的卡
            allBank: [],
            bank: '',
            pro: [],
            proId: '',
            city: [],
            cityId: '',
            money: '',
            showAddr: false,  //
            canGetCity: true,  //为了不触发2次获取市区接口而设置
            showCard: false
        }
    },
    computed: {
        ...mapState({
            assets: state => state.assets, //账户余额
            mobile: state => state.userInfo.mobile //账户余额
        }),
    },
    activated() {
        this.getCardList();
    },
    mounted() {
        this.getAllBank()
    },
    watch: {
        proId() {
            if (this.canGetCity) {
                this.getCity()
            }
        }
    },
    methods: {
        tabCard(index) {
            this.chooseCard = index;
            this.setCity(index)
            if (this.list[index].is_change == 1) {
                this.showAddr = true
            } else {
                this.showAddr = false
            }
            this.showCard = false;
            this.selectCard = this.list[index];
        },  //切换银行卡
        setCity(index) {//设置 所在城市
            if (this.list[index].is_change == 1) {
                this.canGetCity = false;
                if (this.list[index].province_id != 0) {  //如果有省id，则选中省
                    this.proId = this.list[index].province_id;
                } else {
                    this.proId = '';
                }
                this.$nextTick(function() {
                    this.canGetCity = true;
                    if (this.list[index].city_id != 0) {
                        this.getCity(this.list[index].city_id);
                    } else {
                        this.cityId = '';
                    }
                    if (this.list[index].bank_code != 0) {
                        this.bank = this.list[index].bank_code
                    }
                })

            }

        },
        getCardList() { // 获取银行卡
            var _this = this;
            this.$http.get('/user/banklist')
                .then(function(res) {
                    // _this.allBank = res.data.returnData.list;
                    _this.bank = res.data.returnData.list[0].bank_code;
                    _this.list = res.data.returnData.list
                    _this.selectCard = _this.list[0]
                    if (_this.list[0].is_change == 1) {
                        _this.showAddr = true
                    } else {
                        _this.showAddr = false
                    }
                    _this.getPro();
                })
        },
        getAllBank() {  //获取所有银行
            var _this = this;
            this.$http.get('/common/banks')
                .then(function(res) {
                    _this.allBank = res.data.returnData.list;
                })
        },
        getPro() {  //获取省列表
            var _this = this;
            this.$http.get('/common/getProvince')
                .then(function(res) {
                    _this.pro = res.data.returnData.list;
                    _this.setCity(0)
                })
        },
        getCity(id) {  //获取市列表
            var _this = this;
            this.cityId = '';
            this.$http.get('/common/getCity?id=' + this.proId)
                .then(function(res) {
                    _this.city = res.data.returnData.list;
                    if (id) {
                        _this.cityId = id
                    }
                })
        },
        sub() {
            if (Number(this.money) < 100) {
                this.$toast('提现金额最低100元');
                return;
            }
            var card = this.list[this.chooseCard];
            if (card.is_change == 1 && !this.bank) {
                this.$toast('请选择所在银行');
                return;
            }
            if (card.is_change == 1 && !this.proId) {
                this.$toast('请选择省');
                return;
            }
            if (card.is_change == 1 && !this.cityId) {
                this.$toast('请选择市');
                return;
            }
            var data = {}
            data.id = card.id;
            data.money = this.money;
            if (card.is_change == 1) {
                data.bank_code = card.bank_code;
                data.bank_card = card.bank_card;
                data.bank_phone = this.mobile;
                data.province_id = this.proId;
                data.city_id = this.cityId;
                this.changeCard(data)
            } else {
                this.wd(data)
            }

        }, //点击提交提交
        wd(data) {  //提现
            var _this = this;
            Indicator.open()
            this.$http.post('/funds/withdraw', {
                id: data.id,
                money: data.money
            }).then(function(res) {
                Indicator.close()
                window.location.href = res.data.returnData.go_url
            }).catch(function() {
                Indicator.close()
            })
        },
        changeCard(data) {  //修改卡信息
            var _this = this;
            this.$http.post('/user/bank', {
                id: data.id,
                bank_card: data.bank_card,
                bank_code: data.bank_code,
                bank_phone: data.mobile,
                province_id: data.province_id,
                city_id: data.city_id,
            }).then(function(res) {
                _this.wd(data)
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.card {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 5.6rem;
    background: #fff;
    z-index: 32;
    &__title {
        width: 100%;
        height: .9rem;
        background: #f6f6f6;
        padding: 0 .3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &__close {
            font-size: .24rem;
            color: #999;
            line-height: 1;
        }
        &__complete {
            font-size: .3rem;
            line-height: 1;
            color: #ff5a59;
        }
    }
    &__list {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        &__box {
            width: 5.25rem;
            height: 3.18rem;
            margin-top: 0.76rem;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        &__item {
            text-align: center;
            padding: .2rem 0;
            &__icon {
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.17rem;
                display: inline-block;
                vertical-align: middle;
            }
            &__text {
                line-height: .4rem;
                font-size: .3rem;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
}

.form {
    height: 100%;
    width: 100%;
    position: relative;
    &__balance {
        font-size: .24rem;
        text-align: center;
        padding: .22rem .22rem;
        background: #fff5d9;
        color: #666;
        span {
            color: #ff5a59;
        }
    }
    &__box {
        background: #fff;
        padding-left: 0.3rem;
    }
    &__card {
        display: flex;
        padding: .3rem 0 .27rem 0;
        border-bottom: 1px solid #eeeeee;
        &__title {
            width: 1.11rem;
            line-height: .42rem;
            font-size: .3rem;
        }
        &__icon {
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.17rem;
        }
        &__select {
            margin-right: 0.15rem;
            &__text {
                line-height: .4rem;
                font-size: .3rem;
                width: 4.8rem;
            }
            select {
                display: block;
                width: 5rem;
                height: 0.42rem;
                line-height: .42rem;
                font-size: .3rem;
            }
        }
        &__balance {
            font-size: .24rem;
            line-height: .33rem;
            color: #666;
            margin-top: 0.1rem;
            span {
                color: #ff6464;
            }
        }
        .arrow {
            margin-top: 0.1rem;
        }
    }
    &__tip {
        width: 100%;
        height: 0.8rem;
        line-height: .8rem;
        font-size: .26rem;
        color: #ff6464;
        padding-left: 0.3rem;
    }
    .button {
        margin-top: 0.5rem;
    }
    &__tips {
        position: absolute;
        left: .3rem;
        bottom: .8rem;
        font-size: .26rem;
        line-height: .5rem;
        color: #666;
        span {
            font-weight: bold;
        }
    }
}
</style>
