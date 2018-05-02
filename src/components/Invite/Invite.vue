<template>
    <div class="invite">
        <my-header title="邀请好友" :border="border">
            <router-link tag="div" :to="{name:'invitelist'}" class="header__right" slot="right">记录</router-link>
        </my-header>
        <div class="scroll-box">
            <div class="invite__content">
                <div class="invite__title">方式1：让朋友用手机扫描下面二维码即可</div>
                <div class="invite__qrcode"><img :src="wechat" alt=""></div>
                <div class="invite__title">方式2：请使用浏览器自带的分享按钮进行分享</div>
                <div class="invite__img"></div>
                <div class="invite__tip">邀请好友注册一起享受新手红包</div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../Common/Header'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            border: true,
            wechat:''
        }
    },
    components: {
        'my-header': Header,
    },
    computed: {
        ...mapState({
            account: state => state.userInfo.account,  //账户
            mobile: state => state.userInfo.mobile,  //手机
        }),
    },
    mounted(){
        if(!this.account){
            this.$router.push({name:'register',query:{actcode:this.$route.query.mobile}})
        }
        this.wechat = this.plus.path + "/qr?d="+encodeURIComponent(this.plus.path2 + "#/login/register?actcode="+ this.mobile);
    }
}
</script>

<style lang="scss" scoped>
.invite {
    padding-top: 0.88rem;
    &__content {
        padding: .6rem;
    }
    &__title {
        font-size: .28rem;
        line-height: .4rem;
        text-align: center;
    }
    .scroll-box {
        background: #fff;
    }
    &__qrcode {
        width: 2.68rem;
        height: 2.68rem;
        margin: .58rem auto 1.24rem;
    }
    &__img {
        width: 5.8rem;
        height: 3rem;
        margin: .38rem auto 1.5rem;
        background: url('../../assets/img/invite_img.png') no-repeat;
        background-size: contain;
    }
    &__tip {
        font-size: .28rem;
        line-height: .4rem;
        color: #999;
        text-align: center;
    }
}
</style>
