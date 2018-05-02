<template>
    <div class="center">
        <div class="center__header">
            <!-- 头部 -->
            <div class="center__header__top">
                <div class="center__header__avatar">
                    <div class="center__header__avatar__img bg-cover" :style="{backgroundImage:'url('+thumb+')'}"><input type="file" @change="Acardpic($event)"></div>
                    <div class="center__header__avatar__name">{{is_check == 1?realname:account}}</div>
                </div>
                <router-link tag="div" :to="{name:'message'}" class="center__header__message">
                    <div class="center__header__message__spot" v-if="unread_count > 0"></div>
                </router-link>
            </div>
            <!-- 头部 -->

            <!-- 账户余额 -->
            <div class="center__header__money">
                <div class="center__header__money__number" v-show="showMoney">{{assets.money | formatNumber}}</div>
                <div class="center__header__money__number" v-show="!showMoney">***</div>
                <div class="center__header__money__text">账户余额(元)</div>
                <div class="center__header__money__close" v-show="showMoney" @click="showMoney = false"></div>
                <div class="center__header__money__open" v-show="!showMoney" @click="showMoney = true"></div>
            </div>
            <!-- 账户余额 -->

            <!-- 收益 -->
            <div class="center__header__profit">
                <div class="center__header__profit__item">
                    <div class="center__header__profit__number">{{assets.yesterday_income | formatNumber}}</div>
                    <div class="center__header__profit__text">上次收益(元)</div>
                </div>
                <div class="center__header__profit__item">
                    <div class="center__header__profit__number">{{assets.have_asset | formatNumber}}</div>
                    <div class="center__header__profit__text">持有资产(元)</div>
                </div>
            </div>
            <!-- 收益 -->
        </div>

        <div class="center__content">
            <div class="center__content__money">
                <router-link tag="div" :to="{name:'withdrawals'}" class="center__content__withdrawals">
                    <div class="center__content__withdrawals__icon"></div>
                    立即提现
                </router-link>
                <router-link tag="div" :to="{name:'recharge'}" class="center__content__recharge">
                    <div class="center__content__recharge__icon"></div>
                    我要充值
                </router-link>
            </div>
            <div class="center__content__nav f-cb">
                <div class="center__content__nav__item" v-for="(item,index) in list" :key="index" @click="centerLink(item.url)">
                    <div :class="['center__content__nav__icon ',item.class]"></div>
                    <div class="center__content__nav__text">{{item.title}}</div>
                </div>
            </div>
        </div>
        <nav-bar :num="3"></nav-bar>
    </div>
</template>
<script>
import Navbar from '../Common/Navbar.vue'
import axios from 'axios'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            list: [{
                title: '账户设置',
                class: 'ac',
                url: 'account'
            }, {
                title: '投资记录',
                class: 'ir',
                url: 'record'
            }, {
                title: '收益记录',
                class: 'er',
                url: 'gain'
            }, {
                title: '债权转让',
                class: 'tc',
                url: 'assignlist'
            }, {
                title: '我的红包',
                class: 'pk',
                url: 'packet',
            }, {
                title: '邀请好友',
                class: 'it',
                url: 'invite',
            }, {
                title: '帮助中心',
                class: 'hp',
                url: 'help'
            }, {
                title: '联系我们',
                class: 'ct',
                url: 'contact'
            }],
            showMoney: true, //是否显示账户余额
        }
    },
    activated() {
        this.$store.dispatch('getBalance')
    },
    computed: {
        ...mapState({
            account: state => state.userInfo.account,  //账户
            is_check: state => state.userInfo.is_check,  //认证
            realname: state => state.userInfo.realname,  //真实姓名
            unread_count: state => state.userInfo.unread_count,  //未读消息数
            assets: state => state.assets,  //余额
            mobile: state => state.userInfo.mobile,  //手机号码
        }),
        ...mapGetters([
            'thumb'
        ])
    },
    components: {
        'nav-bar': Navbar,
    },
    methods: {
        centerLink(url){
            if(url == 'invite'){
                this.$router.push({name:url,query:{mobile:this.mobile}})
            }else{
                this.$router.push({name:url})
            }
        },
        Acardpic: function(imgFile) {
            var filextension = imgFile.target.value.substring(imgFile.target.value.lastIndexOf("."), imgFile.target.value.length);
            filextension = filextension.toLowerCase();
            var file = imgFile.target.files[0], fileSize = 0;
            fileSize = file.size / 1024
            if (fileSize > 2048) {
                this.$toast("不能超过2mb");
                return false;
            } else {
                if ((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
                    this.$toast("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢!");
                }
                else {
                    var _this = this;
                    var fd = new FormData();
                    //            var path, img = document.getElementById("hand").getElementsByTagName("img")[0];
                    fd.append("files", file);
                    axios({
                        method: 'post',
                        url: _this.plus.path + '/fileUpload',
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        data: fd
                    }).then(function(res) {
                        var r = res.data.files[0];
                        if (r.id) {
                            _this.$http.post('/user/info', {
                                photo: r.id
                            }).then(function(res) {
                                // var userInfo = _this.plus.base64decode(_this.plus.cook.get('userInfo'));
                                let userInfo = _this.plus.base64decode(window.localStorage.getItem('userInfo'));
                                userInfo.thumb = r.url;
                                // _this.plus.cook.set('userInfo', _this.plus.base64encode(userInfo));  //更新cookie的头像
                                window.localStorage.setItem('userInfo', _this.plus.base64encode(userInfo))
                                _this.$store.commit('SET_USERINFO_AVATAR', { url: r.url })  //更新store的头像
                            })
                        } else {
                            _this.$toast("上传失败!");
                        }
                    })
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.center {
    background: #fff;
    &__header {
        width: 100%;
        height: 5.6rem;
        padding: .3rem;
        background-image: linear-gradient(-155deg, #ff9475 0%, #ff645e 100%);
        &__top {
            display: flex;
            justify-content: space-between;
        }
        &__avatar {
            display: flex;
            &__img {
                width: 0.66rem;
                height: 0.66rem;
                position: relative;
                border-radius: 50%;
                overflow: hidden;
                input {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    opacity: 0;
                }
            }
            &__name {
                font-size: .24rem;
                color: #fff;
                line-height: .66rem;
                margin-left: 0.15rem;
            }
        }
        &__message {
            width: 0.44rem;
            height: 0.44rem;
            background: url(../../assets/img/center_message.png) no-repeat;
            background-size: contain;
            margin-top: 0.11rem;
            position: relative;
            &__spot {
                width: 0.12rem;
                height: 0.12rem;
                border-radius: 50%;
                background: #f8ff0a;
                position: absolute;
                right: .05rem;
                top: 0;
            }
        }
        &__money {
            color: #fff;
            text-align: center;
            margin-top: .8rem;
            position: relative;
            &__number {
                font-size: .8rem;
                line-height: 1;
            }
            &__text {
                font-size: .24rem;
                line-height: 1;
                opacity: .7;
                margin-top: 0.2rem;
            }
            &__open {
                width: 0.6rem;
                height: 0.6rem;
                background: url('../../assets/img/center_money_open.png') no-repeat center center;
                background-size: .4rem .4rem;
                position: absolute;
                top: .25rem;
                right: .3rem;
            }
            &__close {
                width: 0.6rem;
                height: 0.6rem;
                background: url('../../assets/img/center_money_close.png') no-repeat center center;
                background-size: .4rem .4rem;
                position: absolute;
                top: .25rem;
                right: .3rem;
            }
        }
        &__profit {
            display: flex;
            margin-top: 0.7rem;
            &__item {
                width: 50%;
                text-align: center;
                color: #fff;
                &:first-child {
                    border-right: 1px solid rgba(255, 255, 255, .2);
                }
            }
            &__number {
                font-size: .36rem;
                line-height: .53rem;
            }
            &__text {
                font-size: .24rem;
                line-height: .33rem;
                opacity: .7;
            }
        }
    }
    &__content {
        background: #fff;
        position: relative;
        padding: 1.35rem .3rem 0;
        &__money {
            width: 6.7rem;
            height: 1.14rem;
            background-image: linear-gradient(-180deg, #fff7f7 2%, #ffffff 50%);
            box-shadow: 0 2px 8px 0 rgba(110, 4, 0, 0.06);
            border-radius: .06rem;
            display: flex;
            position: absolute;
            left: 50%;
            margin-left: -3.35rem;
            top: -.2rem;
            z-index: 2;
        }
        &__recharge {
            width: 50%;
            height: 1.14rem;
            text-align: center;
            font-size: .26rem;
            line-height: 1;
            color: #ff5a59;
            display: flex;
            justify-content: center;
            align-items: center;
            &__icon {
                margin-right: 0.15rem;
                width: 0.36rem;
                height: 0.38rem;
                background: url(../../assets/img/center_recharge_icon.png) no-repeat;
                background-size: contain;
            }
        }
        &__withdrawals {
            @extend .center__content__recharge;
            border-right: 1px solid #eee;
            &__icon {
                margin-right: 0.15rem;
                width: 0.36rem;
                height: 0.38rem;
                background: url(../../assets/img/center_withdrawals_icon.png) no-repeat;
                background-size: contain;
            }
        }
        &__nav {
            &__item {
                width: 25%;
                height: 2.15rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                float: left;
                border-bottom: 1px solid #eee;
            }
            &__text {
                color: #666;
                font-size: .22rem;
                line-height: .3rem;
                margin-top: 0.1rem;
            }
            &__icon {
                width: 0.5rem;
                height: 0.5rem;
                &.ac {
                    background: url('../../assets/img/center_nav_ac.png') no-repeat;
                    background-size: contain;
                }
                &.ir {
                    background: url('../../assets/img/center_nav_ir.png') no-repeat;
                    background-size: contain;
                }
                &.er {
                    background: url('../../assets/img/center_nav_er.png') no-repeat;
                    background-size: contain;
                }
                &.tc {
                    background: url('../../assets/img/center_nav_tc.png') no-repeat;
                    background-size: contain;
                }
                &.pk {
                    background: url('../../assets/img/center_nav_pk.png') no-repeat;
                    background-size: contain;
                }
                &.it {
                    background: url('../../assets/img/center_nav_it.png') no-repeat;
                    background-size: contain;
                }
                &.hp {
                    background: url('../../assets/img/center_nav_hp.png') no-repeat;
                    background-size: contain;
                }
                &.ct {
                    background: url('../../assets/img/center_nav_ct.png') no-repeat;
                    background-size: contain;
                }
            }
        }
    }
}
</style>
