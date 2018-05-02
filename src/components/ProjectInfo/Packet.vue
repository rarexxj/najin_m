<template>
    <div class="packet">
        <div class="packet__title">
            <div class="packet__title__close" @click="hidePacketBox()">取消</div>
            <div class="packet__title__complete" @click="hidePacketBox()">完成</div>
        </div>
        <div class="packet__list">
            <div :class="['packet__list__item',(parseInt(investmentMoney) >= parseInt(item.require_money))&&(parseInt(cycle) >= parseInt(item.require_cycle))?'':'out']" v-for="(item,index) in packetList" :key="index" @click="checkPacket(index)">
                <div class="packet__list__item__box">
                    <div class="packet__list__item__num">
                        <div class="packet__list__item__money">
                            <span>￥</span>{{item.money}}</div>
                        <div class="packet__list__item__title">{{item.source}}</div>
                    </div>
                    <div class="packet__list__item__condition">
                        投资金额：≥{{item.require_money}}元 <br> 投资期限：≥{{item.require_cycle}}天
                    </div>
                </div>
                <div class="packet__list__item__time">截止日期：{{item.end_time}}</div>
                <div :class="[item.check?'packet__list__item__check--active':'packet__list__item__check']"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    mounted() {
        this.getPacket()
    },
    computed: {
        ...mapState({
            packetList: state => state.projectinfo.packetList,  //红包列表
            investmentMoney: state => state.projectinfo.investmentMoney,  //投资金额
            cycle: state => state.projectinfo.projectInfo.cycle,  //投资项目期限
        }),
        ...mapGetters({
            checkedPacket: 'checkedPacket',
        }),
        allPacketMoney() {  //红包总额
            var sum = 0
            for (var i in this.checkedPacket) {
                sum = Number(this.checkedPacket[i].money) + sum;
            }
            return sum;
        }
    },
    methods: {
        //隐藏红包  
        hidePacketBox() {
            this.$store.commit("CHANGE_PACKET", false)
        },
        //获取红包
        getPacket() {
            var _this = this;
            this.$http.get('/user/redPacketsList?page=-1')
                .then(function(res) {
                    var packetArr = []
                    for (var i in res.data.returnData.list) {
                        var data = res.data.returnData.list[i]
                        if (data.status == 0) {
                            data.check = false;
                            packetArr.push(data)
                        }
                    }
                    // _this.packetLen = packetArr.length;
                    _this.$store.commit('SET_PACKET', packetArr)
                })
        },
        //选中红包
        checkPacket(index) {
            var datas = this.packetList[index];
            if (datas.check) {
                this.$store.commit('CANCEL_PACKET', index)
            } else {
                if (parseInt(this.investmentMoney) >= parseInt(datas.require_money) && parseInt(this.cycle) >= parseInt(datas.require_cycle)) {
                    if (Number(this.allPacketMoney) + Number(datas.money) > Number(this.investmentMoney)) {  //选中红包是否大于投资金额
                        this.$toast('选中红包总金额大于投资金额')
                    } else {
                        this.$store.commit('SELECT_PACKET', index)
                    }

                } else {
                    this.$toast('该红包无法使用');
                }

            }
        }
    }
}
</script>

<style scoped lang="scss">
.packet {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 10rem;
    background: #fff;
    z-index: 32;
    &__title {
        width: 100%;
        height: .9rem;
        background: #f6f6f6;
        padding: 0 .3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &__close {
            font-size: .24rem;
            color: #999;
            line-height: 1;
        }
        &__complete {
            font-size: .3rem;
            line-height: 1;
            color: #ff5a59;
        }
    }
    &__list {
        height: 9.1rem;
        padding: 0 .4rem;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        &__item {
            width: 100%;
            height: 2.7rem;
            background: url('../../assets/img/project_red_packet.png') no-repeat;
            background-size: contain;
            margin-top: 0.38rem;
            padding: .45rem .4rem 0;
            position: relative;
            &__box {
                display: flex;
            }
            &__num {
                width: 2.2rem;
                border-right: 1px dashed #e6e6e6;
                margin-right: 0.48rem;
            }
            &__money {
                font-size: .52rem;
                line-height: .52rem;
                color: #ff5a59;
                span {
                    font-size: .36rem;
                }
            }
            &__title {
                color: #999999;
                font-size: .24rem;
            }
            &__condition {
                font-size: .24rem;
                line-height: .4rem;
                color: #999;
                margin-top: 0.1rem;
            }
            &__time {
                font-size: .24rem;
                color: #999;
                line-height: 1;
                margin-top: 0.5rem;
            }
            &__check {
                width: 0.44rem;
                height: 0.44rem;
                position: absolute;
                top: 1rem;
                right: .4rem;
                background: url('../../assets/img/project_packet_check.png') no-repeat;
                background-size: contain;
                &--active {
                    @extend .packet__list__item__check;
                    background: url('../../assets/img/project_packet_checked.png') no-repeat;
                    background-size: contain;
                }
            }
            &.out {
                background: url('../../assets/img/project_gray_packet.png') no-repeat;
                background-size: contain;
                .packet__list__item__money,
                .packet__list__item__title,
                .packet__list__item__condition,
                .packet__list__item__time {
                    color: #c4c4c4;
                }
            }
        }
    }
}
</style>