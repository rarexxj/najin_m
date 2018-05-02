<template>
    <div class="form">
        <div class="form__box">
            <div class="cell">
                <div class="cell__title" style="color:#333;width:1.15rem">金额</div>
                <input type="text" class="cell__input" placeholder="请输入100元以上的金额" v-model="money">
            </div>
        </div>
        <div :class="['button',canCharge?'':'gray']" @click="sub()">下一步</div>
        <div class="form__tip">在下一个页面可选择充值银行</div>
        <div class="form__tips">
            <span>温馨提示：</span> <br> 1、正常跳转第三方并完成充值后，即可到账； <br> 2、如遇充值后无法到账，请及时联系客服处理。
        </div>
    </div>
</template>
<script>
import {
    Indicator
} from 'mint-ui';
export default {
    data() {
        return {
            money: '',
            
        }
    },
    computed:{
        canCharge(){
            if(this.money >= 100){
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        //充值
        sub() {
            if(!this.canCharge){
                return
            }
            var _this = this;
            Indicator.open()
            this.$http.post('/funds/recharge', {
                money: _this.money,
                type: 0
            }).then(function(res) {
                Indicator.close()
                window.location.href = res.data.returnData.go_url;
            }).catch(function() {
                Indicator.close()
            })

        },
    }
}
</script>

<style lang="scss" scoped>
.form {
    height: 100%;
    width: 100%;
    padding-top: 0.45rem;
    position: relative;
    &__box {
        background: #fff;
        padding-left: 0.3rem;
        margin-bottom: 0.8rem;
    }
    &__tip {
        text-align: center;
        font-size: .26rem;
        line-height: .5rem;
        color: #666;
        margin-top: 0.47rem;
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
