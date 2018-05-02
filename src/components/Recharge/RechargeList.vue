<template>
    <div class="recharge">
        <my-header title="充值记录" :border="border"></my-header>
        <div class="recharge__list">
            <div class="bubble-box" :style="{'top':top + 'px'}">
                <bubble :y="bubbleY"></bubble>
            </div>
            <scroll class="scroll-box" :data="list" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
                <div class="scroll-wrapper">
                    <div class="recharge__item" v-for="(item,index) in list" :key="index">
                        <div>
                            <div class="recharge__item__money">+{{item.money | formatNumber}}</div>
                            <div class="recharge__item__time">{{item.create_at}}</div>
                        </div>
                        <div v-if="item.status == 0" class="recharge__item__status--success">等待充值</div>
                        <div v-if="item.status == 1" class="recharge__item__status--success">成功</div>
                        <div v-if="item.status == 2" class="recharge__item__status--fail">不成功</div>
                        <div v-if="item.status == 3" class="recharge__item__status--success">等待三方审核 </div>
                        <div v-if="item.status == -1" class="recharge__item__status--fail">失效</div>
                    </div>
                    <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
                </div>
            </scroll>
        </div>
    </div>
</template>
<script>
import Header from '../Common/Header'
import Scroll from '../Common/Scroll'
import Bubble from '../Common/Bubble'
import scrollText from '../Common/ScrollText'
export default {
    data() {
        return {
            border: true,
            list: [],
            page: 1,
            size: 15,
            total: 0,
            listenScroll: true,
            posY: 0,
            bubbleY: 0,
            pullup: true,
            pulldown: true,
            showScrollText: true,
        }
    },
    components: {
        'my-header': Header,
        'scroll': Scroll,
        'bubble': Bubble,
        'scroll-text': scrollText,
    },
    computed: {
        top() {
            return this.posY - 80
        },
        canScroll() {  //判断是否为最后一页，是否能再次加载
            if (this.page >= Math.ceil(this.total / this.size)) {
                return false
            } else {
                return true
            }
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {  //获取列表
            var _this = this;
            this.$http.get('/user/rechargeList', {
                params: {
                    page: _this.page,
                    size: _this.size
                }
            }).then(function(res) {
                if(_this.page == 1){
                    _this.list = res.data.returnData.list;
                }else{
                    _this.list = _this.list.concat(res.data.returnData.list)
                }
                _this.total = res.data.returnData.total;
            })
        },
        loadTop() {
            this.page = 1  //页码置1
            this.getList()  //请求列表
        },
        loadBottom() {
            this.page++ //页码加1
            this.getList()  //请求列表
        },
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 80
        },
    }
}
</script>
<style lang="scss" scoped>
.recharge {
    padding-top: 0.88rem;
    height: 100%;
    background: #fff;
    &__list {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    &__item {
        width: 100%;
        height: 1.2rem;
        padding: 0 .4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        &__money {
            font-size: .34rem;
            line-height: .48rem;
        }
        &__time {
            font-size: .24rem;
            line-height: .33rem;
            color: #aaa;
        }
        &__status {
            font-size: .26rem;
            line-height: .37rem;
            &--success {
                @extend .recharge__item__status;
                color: #ff5a59;
            }
            &--fail {
                @extend .recharge__item__status;
                color: #aaa;
            }
        }
    }
}
</style>
