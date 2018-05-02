<template>
    <div class="mask" v-show="show">
        <div class="password-box">
            <div class="password-box__frame">
                <div class="password-box__title">约标确认</div>
                <input type="password" class="password-box__input" v-model="password" placeholder="请输入约标密码后购买指定数量">
                <div class="password-box__tip">
                    <span>*</span>如忘记约标密码，请联系客服：<br>&nbsp;&nbsp;{{hotlineList?hotlineList[0].title:''}}</div>
            </div>
            <div class="password-box__btns">
                <div class="password-box__btns__item cancel" @click="cancel()">取消</div>
                <div class="password-box__btns__item confirm" @click="putPassword()">确认</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: ['show'],
    data() {
        return {
            password: ''
        }
    },
    computed: mapState({
        hotlineList: state => state.indexConfig.hotlineList,  //起投金额
        allPay: state => state.projectinfo.allPay,  //是否一键满标
    }),
    methods: {
        cancel() {
            this.$emit('hide')
        },
        putPassword() {   //验证约标密码
            if (!this.password) {
                this.$toast("请输入约标密码")
                return;
            }
            var _this = this;
            this.$http.post('/funds/pwdValidate', {
                id: _this.$route.query.id,
                pwd: _this.password
            }).then(function(res) {
                if (_this.allPay) {
                    //一键满标
                    _this.$router.push({ name: 'projectbuy', query: { id: _this.$route.query.id, type: 'all' } })
                } else {
                    _this.$router.push({ name: 'projectbuy', query: { id: _this.$route.query.id } })
                }
            })
        },
    }
}
</script>

<style scoped lang="scss">
.password-box {
    width: 5.4rem;
    height: 3.8rem;
    background: #f5f5f5;
    border-radius: .1rem;
    position: absolute;
    z-index: 5;
    left: 50%;
    top: 50%;
    margin-top: -1.9rem;
    margin-left: -2.7rem;
    padding-top: 0.3rem;
    &__frame {
        padding: 0 .49rem
    }
    &__title {
        font-size: .32rem;
        line-height: .48rem;
        text-align: center;
    }
    &__input {
        display: block;
        width: 100%;
        height: 0.82rem;
        background: #fff;
        border: 1px solid #e8e8e8;
        border-radius: .08rem;
        margin-top: 0.23rem;
        font-size: .28rem;
        line-height: .82rem;
        text-align: center;
    }
    &__tip {
        font-size: .24rem;
        line-height: .32rem;
        color: #666;
        margin-top: 0.14rem;
        span {
            color: #ff5a59;
        }
    }
    &__btns {
        width: 100%;
        display: flex;
        border-top: 1px solid #e8e8e8;
        margin-top: 0.34rem;
        &__item {
            width: 50%;
            height: 0.86rem;
            line-height: .86rem;
            text-align: center;
            font-size: .34rem;
            &.cancel {
                color: #999;
                border-right: 1px solid #e8e8e8;
            }
            &.confirm {
                color: #ff5a59;
            }
        }
    }
}
</style>