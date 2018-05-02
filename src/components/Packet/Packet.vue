<template>
    <div class="packet">
        <transition name="slide-go-left">
            <agreement :content="agreementContent" :title="agreementTitle" v-show="showAgreement" @hide="hideAgreement"></agreement>
        </transition>
        <my-header title="我的红包">
            <div class="header__right" slot="right" @click="showAgreement = true">规则</div>
        </my-header>
        <div class="packet__list">
            <div class="bubble-box" :style="{'top':top + 'px'}">
                <bubble :y="bubbleY"></bubble>
            </div>
            <scroll class="scroll-box" style="padding:0 .3rem" :data="packetList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
                <div class="scroll-wrapper">
                    <packet-item v-for="(item,index) in packetList" :key="index" :info="item"></packet-item>
                    <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
                </div>
            </scroll>
        </div>
    </div>
</template>
<script>
import Header from '../Common/Header'
import PakcetItem from './PacketItem'
import Scroll from '../Common/Scroll'
import Bubble from '../Common/Bubble'
import scrollText from '../Common/ScrollText'
import Agreement from '../Common/Agreement'
export default {
    data() {
        return {
            showAgreement: false,
            agreementContent: '',
            agreementTitle: '',
            page: 1, 
            size: 10,
            packetList: [],
            total: 0,
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
        'packet-item': PakcetItem,
        'scroll': Scroll,
        'bubble': Bubble,
        'scroll-text': scrollText,
        'agreement': Agreement
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
        this.getAgreement();
        this.getPacketList();
    },
    methods: {
        //获取红包规则
        getAgreement() {
            var _this = this;
            this.$http.get('/common/contractList?type=5')
                .then(function(res) {
                    if (res.data.returnNo == '0000') {
                        _this.agreementContent = res.data.returnData.content;
                        _this.agreementTitle = res.data.returnData.title;
                    }
                })
        },
        //获取红包列表
        getPacketList() {
            var _this = this;
            this.$http.get('/user/redPacketsList', {
                params: {
                    page: _this.page,
                    size: _this.size,
                    pid: 0
                }
            }).then(function(res) {
                if(_this.page == 1){
                    _this.packetList = res.data.returnData.list;
                }else{
                    _this.packetList = _this.packetList.concat(res.data.returnData.list)
                }
                _this.total = res.data.returnData.total
            })
        },
        loadTop() {
            this.page = 1  //页码置1
            this.getPacketList()  //请求列表
        },
        loadBottom() {
            this.page++ //页码加1
            this.getPacketList()  //请求列表
        },
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 80
        },
        hideAgreement() {
            this.showAgreement = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.packet {
    padding-top: 0.88rem;
    &__list {
        height: 100%;
        position: relative;
        overflow: hidden;
    }
}
</style>
