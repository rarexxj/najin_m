<template>
    <div class="investment" style="padding-top:1.68rem">
        <my-header title="投资记录"></my-header>
        <div class="investment__title">
            <div class="investment__title__item">好友姓名</div>
            <div class="investment__title__item">注册手机</div>
            <div class="investment__title__item">注册时间</div>
        </div>

        <div class="investment__list" v-if="list.length > 0">
            <div class="bubble-box" :style="{'top':top + 'px'}">
                <bubble :y="bubbleY"></bubble>
            </div>
            <scroll class="scroll-box" :data="list" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
                <div class="scroll-wrapper">
                    <div class="investment__list__item" v-for="(item,index) in list" :key="index">
                        <div class="investment__list__item__name">{{item.name}}</div>
                        <div class="investment__list__item__money">{{item.mobile}}</div>
                        <div class="investment__list__item__time">{{item.create_at}}</div>
                    </div>
                    <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
                </div>
            </scroll>
        </div>
        <div class="empty-gray" v-else></div>
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
            list: [],
            page: 1,
            total: 0,
            size: 15,
            listenScroll: true,
            posY: 0,
            bubbleY: 0,
            pullup: true,
            pulldown: true,
            showScrollText: false,
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
        this.getList();
    },
    methods: {
        getList() {
            var _this = this;
            this.$http.get('user/inviteList', {
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
    },
}
</script>
<style lang="scss" scoped>
.investment {
    height: 100%;
    &__title {
        width: 100%;
        height: 0.8rem;
        background: #ecf1f6;
        position: absolute;
        left: 0;
        top: .88rem;
        display: flex;
        &__item {
            flex: 1;
            height: 0.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .26rem;
            color: #666;
            line-height: 1;
        }
    }
    &__list {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        &__item {
            background: #fff;
            width: 100%;
            height: 1.24rem;
            display: flex;
            font-size: .26rem;
            line-height: 1;
            &__name {
                display: flex;
                width: 2.7rem;
                justify-content: center;
                align-items: center;
                color: #666;
            }
            &__money {
                display: flex;
                width: 2.1rem;
                justify-content: center;
                align-items: center;
                color: #666;
            }
            &__time {
                display: flex;
                width: 2.7rem;
                justify-content: center;
                align-items: center;
                color: #666666;
            }
        }
    }
}
</style>

