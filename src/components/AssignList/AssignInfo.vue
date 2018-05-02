<template>
    <div class="assign-info">
        <transition name="slide-go-left">
            <agreement :content="agreementContent" :title="agreementTitle" v-show="agreementShow" @hide="hideAgreement"></agreement>
        </transition>

        <my-header title="申请转让" :border="border"></my-header>
        <div class="scroll-box">
            <assgin-item :show-btn="showBtn" type="4" :info="transferInfo"></assgin-item>
            <div class="assign-info__box">
                <div class="cell pr30">
                    <div class="cell__title">转让价格</div>
                    <input type="text" class="cell__input" style="width:5.1rem" v-model="selmoney" @blur="vsel()" :placeholder="'(本息*'+rate.min_rate*100+'% ≤ 转让金额 ≤ 本息*'+rate.max_rate*100+'%)'" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">
                </div>
                <div class="cell pr30">
                    <div class="cell__title">转让手续费</div>
                    <div class="cell__content">{{transferInfo.trans_fee}}元</div>
                    <div class="cell__code blue">本金*{{rate.transfee}}</div>
                </div>
                <div class="cell pr30">
                    <div class="cell__title">到账金额</div>
                    <div class="cell__content">{{Number(selmoney-transferInfo.trans_fee)
                        < 0? '0':Number(selmoney-transferInfo.trans_fee)}}元</div>
                            <div class="cell__code blue">转让价格-手续费</div>
                    </div>
                    <div class="cell pr30">
                        <div class="cell__title">验证手机</div>
                        <div class="cell__content">{{mobile.substr(0,3)+"****"+mobile.substr(7) }}</div>
                        <div class="cell__code" @click="getCode()">{{codeText}}</div>
                    </div>
                    <div class="cell pr30">
                        <div class="cell__title">验证码</div>
                        <input type="text" class="cell__input" style="width:5.1rem" v-model="code" placeholder="请输入短信验证">
                    </div>
                </div>

                <div class="agree">
                    <label for="agree"><input type="checkbox" class="agree-checkbox" id="agree" v-model="agree">已同意</label>
                    <span @click="agreementShow = true">《债权转让声明》</span>
                </div>

                <div class="button" @click="sub()">确认转让</div>

            </div>
            <div class="assign-info__tip">若债权在{{transferInfo.next_interest_at}}日之前未转让，将自动取消</div>
        </div>
    </div>
</template>
<script>
import Header from '../Common/Header'
import AssignItem from './AssignItem'
import Agreement from '../Common/Agreement'
import { mapState } from 'vuex'
export default {
    name:'assigninfo',
    data() {
        return {
            border: true,
            showBtn: false,
            rate: {},
            selmoney: '',
            codeText: '获取验证码',
            canGetCode: true,  //是否能发送验证码
            codeTime: 60,  //验证码计时
            code: '',
            agree: false,
            agreementTitle: '',
            agreementContent: '',
            agreementShow: false,
        }
    },
    mounted() {
        if (!this.transferInfo.id) {
            this.$router.go(-1)
        } else {
            this.getConfig()
        }
        this.getAgreement()
    },
    computed: {
        ...mapState({
            transferInfo: state => state.assignlist.transferInfo,
            mobile: state => state.userInfo.mobile
        })
    },
    components: {
        'my-header': Header,
        'assgin-item': AssignItem,
        'agreement': Agreement
    },
    methods: {
        getConfig() {  //获取债权常用参数
            var _this = this;
            this.$http.get('/transfer/config')
                .then(function(res) {
                    _this.rate = res.data.returnData;
                })
        },
        vsel() {
            if (this.selmoney >= this.transferInfo.trans_money_max) {
                this.selmoney = this.transferInfo.trans_money_max
            }
            if (this.selmoney <= this.transferInfo.trans_money_min) {
                this.selmoney = this.transferInfo.trans_money_min
            }
        },
        //获取验证码
        getCode() {
            if (!this.canGetCode) {
                return;
            }
            var _this = this;
            this.$http.post('/userCommon/sendCode', {
                mobile: this.mobile,
                type: 4
            }).then(function(res) {
                _this.canGetCode = false;
                var cutdown = setInterval(function() {
                    if (_this.codeTime == 0) {
                        clearInterval(cutdown);
                        _this.codeTime = '60';
                        _this.codeText = '获取验证码';
                        _this.canGetCode = true;
                    } else {
                        _this.codeTime--;
                        _this.codeText = _this.codeTime + 's后重新获取';
                    }
                }, 1000);
            })
        },
        //隐藏购买协议
        hideAgreement() {
            this.agreementShow = false;
        },
        //获取转让规则
        getAgreement() {
            var _this = this;
            this.$http.get('/common/contractList?type=6')
                .then(function(res) {
                    if (res.data.returnNo == '0000') {
                        _this.agreementContent = res.data.returnData.content;
                        _this.agreementTitle = res.data.returnData.title;
                    }
                })
        },
        sub() {  //确认转让
            if (!this.selmoney) {
                this.$toast("请输入转让价格")
                return false;
            }
            if (!this.code) {
                this.$toast("请输入验证码")
                return false;
            }
            if (!this.agree) {
                this.$toast("请阅读并勾选协议！")
                return false;
            }
            var _this = this;
            this.$http.put('user/transfer', {
                id: this.info.id,
                money: this.selmoney,
                code: this.code
            }).then(function(res) {
                _this.$toast("转让成功");
                setTimeout(() => {
                    _this.$router.go(-1)
                },500)
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.assign-info {
    padding-top: 0.88rem;
    padding-bottom: 0.7rem;
    &__box {
        background: #fff;
        padding-left: 0.3rem;
    }
    &__tip {
        background: #fff5d9;
        width: 100%;
        height: 0.7rem;
        line-height: .7rem;
        text-align: center;
        color: #999999;
        font-size: .24rem;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>
