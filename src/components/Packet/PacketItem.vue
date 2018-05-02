<template>
    <div :class="['packet-item',info.status == 1?'used':(info.status == 0?'':'invalid')]">
        <div class="packet-item__box">
            <div class="packet-item__num">
                <div class="packet-item__money">
                    <span>￥</span>{{info.money}}</div>
                <div class="packet-item__title">{{info.source}}</div>
            </div>
            <div class="packet-item__condition">
                投资金额：≥{{info.require_money}}元 <br> 投资期限：≥{{info.require_cycle}}天
            </div>
        </div>
        <div class="packet-item__time">截止日期：{{info.end_time}}</div>
    </div>
</template>
<script>
export default {
  props:['info']
}
</script>

<style lang="scss" scoped>
.packet-item {
    width: 100%;
    height: 2.7rem;
    padding: .54rem 0 0 .4rem;
    background: url('../../assets/img/packet_bg.png') no-repeat;
    background-size: contain;
    color: #999;
    &.used {
        background: url('../../assets/img/packet_bg_used.png') no-repeat;
        background-size: contain;
        color: #c4c4c4;
        .packet-item__money {
            color: #c4c4c4;
        }
    }
    &.invalid {
        background: url('../../assets/img/packet_bg_invalid.png') no-repeat;
        background-size: contain;
        color: #c4c4c4;
        .packet-item__money {
            color: #c4c4c4;
        }
    }
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
        font-size: .24rem;
    }
    &__condition {
        font-size: .24rem;
        line-height: .4rem;
        margin-top: 0.1rem;
    }
    &__time {
        font-size: .24rem;
        line-height: 1;
        margin-top: 0.5rem;
    }
}
</style>
