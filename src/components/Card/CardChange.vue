<template>
    <div class="card-change">
        <my-header title="修改卡信息" :fix="fix"></my-header>
        <div class="card-change__tip">您的银行卡已绑定，请修改正确的银行所属信息，用于 提现验证。
        </div>
        <div class="card-change__box">
            <div class="cell">
                <div class="cell__title">银行卡号</div>
                <div class="cell__content">{{card.bank_card}}</div>
            </div>
            <div class="cell">
                <div class="cell__title">绑定手机</div>
                <div class="cell__content">{{mobile}}</div>
            </div>
            <div class="cell">
                <div class="cell__title">所在银行</div>
                <select class="cell__select" v-model="bank">
                    <option value="0">请选择</option>
                    <option :value="item.bank_code" v-for="(item,index) in allBank" :key="index">{{item.bank_name}}</option>
                </select>
            </div>
            <div class="cell">
                <div class="cell__title">所属城市</div>
                <select class="cell__select" style="width:2.3rem;margin-right:.5rem" v-model="proId">
                    <option value="0">请选择</option>
                    <option :value="item.id" v-for="(item,index) in pro" :key="index">{{item.title}}</option>
                </select>
                <select class="cell__select" style="width:2.3rem" v-model="cityId">
                    <option value="0">请选择</option>
                    <option :value="item.id" v-for="(item,index) in city" :key="index">{{item.title}}</option>
                </select>
            </div>
        </div>
        <div class="button" @click="sub()">绑定</div>
    </div>
</template>
<script>
import Header from '../Common/Header'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            fix: false,
            bank: '0',
            allBank: [],
            pro: [],
            proId: '0',
            city: [],
            cityId: '0',
            canGetCity: true,  //为了不触发2次获取市区接口而设置
        }
    },
    components: {
        'my-header': Header,
    },
    computed: {
        ...mapState({
            card: state => state.card.card,  //修改的银行卡信息
            mobile: state => state.userInfo.mobile,  //手机
        }),
    },
    watch: {
        proId() {
            if (this.canGetCity) {
                this.getCity()
            }
        }
    },
    mounted() {
        this.getAllBank();
        this.getPro();
    },
    activated() {
        if(this.card.id){
            this.setCity(this.card)
        }else{
            this.$router.push({name:'card'})
        }
    },
    methods: {
        //设置 所在城市
        setCity(card) {
            if (card.is_change == 1) {
                this.canGetCity = false;
                if (card.province_id != 0) {  //如果有省id，则选中省
                    this.proId = card.province_id;
                } else {
                    this.proId = '0';
                }
                this.$nextTick(function() {
                    this.canGetCity = true;
                    if (card.city_id != 0) {
                        this.getCity(card.city_id);
                    } else {
                        this.cityId = '0';
                    }
                    if (card.bank_code != 0) {
                        this.bank = card.bank_code
                    }
                })

            }
        },
        getAllBank() {
            var _this = this;
            this.$http.get('/common/banks')
                .then(function(res) {
                    _this.allBank = res.data.returnData.list;
                })
        },
        getPro() {
            var _this = this;
            this.$http.get('/common/getProvince')
                .then(function(res) {
                    _this.pro = res.data.returnData.list;
                })
        },
        getCity(id) {
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
            if (!this.bank) {
                this.$toast('请选择所在银行')
                return;
            }
            if (this.proId == 0) {
                this.$toast('请选择省')
                return;
            }
            if (this.cityId == 0) {
                this.$toast('请选择市')
                return;
            }
            var _this = this;
            this.$http.post('/user/bank', {
                id: this.card.id,
                bank_card: this.card.bank_card,
                bank_code: this.bank,
                bank_phone: this.mobile,
                province_id: this.proId,
                city_id: this.cityId,
            }).then(function(res) {
                _this.$toast('修改成功')
                setTimeout(function() {
                    _this.$router.go(-1)
                }, 1000)

            })
        },
    }
}
</script>

<style lang="scss" scoped>
.card-change {
    &__tip {
        font-size: .24rem;
        line-height: .33rem;
        padding: .3rem;
        color: #ff6464;
    }
    &__box {
        padding-left: 0.3rem;
        background: #fff;
        margin-bottom: 0.8rem;
    }
}
</style>
