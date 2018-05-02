<template>
    <div class="project">
        <div class="scroll-box">
            <!-- 详情头部 -->
            <info></info>
            <!-- 详情头部 -->

            <!-- 计划总额、还款方式、安全保障 -->
            <intro></intro>
            <!-- 计划总额、还款方式、安全保障 -->

            <!-- 投资记录 -->
            <div class="project__investment" @click="linkInvestment()">
                <span>投资记录</span>
                <div class="arrow"></div>
            </div>
            <!-- 投资记录 -->

            <!-- 项目详情 -->
            <contents></contents>
            <!-- 项目详情 -->
        </div>
        <div class="project__bot" v-if="status == 1 && sold < 100">
            <div class="project__bot__buy" @click="Buy()">购买（￥{{min_money}}起）</div>
            <div class="project__bot__all" @click="Buy('all')">一键满标</div>
        </div>
        <div class="project__bot" v-if="status == 0">{{date}}天{{hour}}小时{{min}}分{{sec}}秒开始</div>
        <div class="project__bot--gray" v-if="status == 1 && sold == 100">已售罄</div>
        <div class="project__bot--gray" v-if="status == 2">还款中</div>
        <div class="project__bot--gray" v-if="status == 3">已还清</div>
        <!-- 约标密码 -->
        <password-box :show="showPasswordBox" @hide="hidePasswordBox"></password-box>
        <!-- 约标密码 -->
    </div>
</template>
<script>
import Info from './Info'
import Intro from './Intro'
import Content from './Content'
import PasswordBox from './PasswordBox'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default {
    name: 'projectinfo',
    data() {
        return {
            status: null,
            showPasswordBox: false,
            date: '00',
            hour: '00',
            min: '00',
            sec: '00',
        }
    },
    components: {
        'info': Info,
        'intro': Intro,
        'contents': Content,
        'password-box': PasswordBox
    },
    computed: {
        ...mapState({
            min_money: state => state.projectinfo.projectInfo.min_money,  //起投金额
            need_pwd: state => state.projectinfo.projectInfo.need_pwd,  //是否需要支付密码
            allPay: state => state.projectinfo.allPay,  //是否一键满标
            account: state => state.userInfo.account,  //账号
            is_check: state => state.userInfo.is_check,  //账号
            time: state => state.projectinfo.projectInfo.start_at,  //开始时间
            stime: state => state.projectinfo.projectInfo.stime,  //当前时间
        }),
        ...mapGetters([
            'sold'
        ])
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        //链接到投资记录
        linkInvestment() {
            this.$router.push({ name: 'investmentlist', query: { id: this.$route.query.id } })
        },
        //购买
        Buy(type) {
            if (type == 'all') {  //判断是否一键满标
                this.$store.commit('SET_PROJECT_INFO_ALLPAY', true)
            } else {
                this.$store.commit('SET_PROJECT_INFO_ALLPAY', false)
            }
            if (!this.account) {
                let _this = this
                this.$msgbox.confirm('您还没有登录，请登录后<br>进行此操作', '').then(action => {
                    _this.$store.commit('SHOW_GLOBAL_LOGIN', true)
                }).catch(e => {
                    console.log(e)
                })
                return
            }
            if(this.is_check != 1){
                this.$msgbox.confirm('您的账户还未认证，请完成<br>认证后进行此操作', '').then(action => {
                    _this.$router.push({name:'safe'})
                }).catch(e => {
                    console.log(e)
                })
                return
            }
            if (this.need_pwd == 1) {
                this.showPasswordBox = true
            } else {
                this.linkBuy(type)
            }
        },
        //连接到购买
        linkBuy(type) {
            if (this.allPay) {
                //一键满标
                this.$router.push({ name: 'projectbuy', query: { id: this.$route.query.id, type: 'all' } })
            } else {
                this.$router.push({ name: 'projectbuy', query: { id: this.$route.query.id } })
            }
        },
        //获取项目详情
        getInfo() {
            var _this = this;
            this.$http.get('project/info?id=' + this.$route.query.id)
                .then(function(res) {
                    res.data.returnData.stime = res.data.returnTime * 1000
                    _this.status = res.data.returnData.status
                    _this.$store.commit('SET_PROJECTINFO_INFO', res.data.returnData)
                    if(_this.status == 0){
                        _this.countDown()
                    }
                })
        },
        //隐藏密码弹窗
        hidePasswordBox() {
            this.showPasswordBox = false
        },
        countDown() {   //倒计时
            let time = parseInt((new Date(this.time).getTime() - new Date(this.stime).getTime()) / 1000);
            console.log(time)
            this.timer = setInterval(() => {
                time--;
                this.getLastTime(time)
            }, 1000)
        },
        getLastTime(time) {  //计算倒计时
            let date = Math.floor(time / (24 * 60 * 60));
            let h = Math.floor(time / 60 / 60 % 24);
            let m = Math.floor(time / 60 % 60);
            let s = Math.floor(time % 60);
            if (h + m + s < 0) {
                location.reload()
                return false;
            }
            this.date = this.checkTime(date)
            this.hour = this.checkTime(h)
            this.min = this.checkTime(m)
            this.sec = this.checkTime(s)
        },
        checkTime(i) {  //格式化时间
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
    }
}
</script>
<style scoped lang="scss">
.project {
    height: 100%;
    padding-bottom: 1rem;
    &__investment {
        width: 100%;
        height: 0.75rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .3rem;
        margin-top: 0.3rem;
        color: #999
    }
    &__bot {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1rem;
        background: #ff5a59;
        display: flex;
        text-align: center;
        justify-content: center;
        font-size: .3rem;
        line-height: 1rem;
        color: #fff;
        &__buy {
            width: 5.3rem;
            height: 1rem;
        }
        &__all {
            width: 2.2rem;
            height: 1rem;
            background: #ffa12f;
        }
        &--gray {
            @extend .project__bot;
            background: #cacaca;
        }
    }
}
</style>
