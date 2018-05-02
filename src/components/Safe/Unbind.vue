<template>
    <div class="safe-unbind">
        <div class="safe-unbind__tip">请确认您的姓名和证件信息真实有效，认证后无法修改。</div>
        <div class="safe-unbind__box">
            <div class="cell">
                <div class="cell__title">真实姓名</div>
                <input type="text" class="cell__input" placeholder="请输入您的真实姓名" v-model="name">
            </div>
            <div class="cell">
                <div class="cell__title">身份证号</div>
                <input type="text" class="cell__input" placeholder="请输入身份证" v-model="idCard">
            </div>
            <div class="cell bbn">
                <div class="cell__title">账户验证</div>
                <div class="cell__content">{{mobile.substr(0,3)+"****"+mobile.substr(7) }}</div>
            </div>
        </div>

        <div class="button" @click="sub()">确认</div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            name: '',  //真实姓名
            idCard: '',  //身份证号
        }
    },
    computed: {
        ...mapState({
            mobile: state => state.userInfo.mobile,  //认证
        }),
    },
    methods: {
        //实名认证
        sub() {
            if (!this.name) {
                this.$toast("请输入真实姓名")
                return;
            }
            if (!this.idCard) {
                this.$toast("请输入身份证号")
                return;
            }
            if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idCard)) {
                this.$toast("身份证格式错误")
                return;
            }
            let _this = this;
            this.$http.post('/user/auth', {
                realname: _this.name,
                chinaid: _this.idCard,
                type: 0
            }).then(function(res) {
                window.location.href = res.data.returnData.go_url;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.safe-unbind {
    &__tip {
        font-size: .24rem;
        line-height: .33rem;
        padding: .3rem;
        color: #ff6464;
    }
    &__box {
        background: #fff;
        padding-left: 0.3rem;
        margin-bottom: 0.9rem;
    }
    &__phone {
        color: #333;
    }
}
</style>

