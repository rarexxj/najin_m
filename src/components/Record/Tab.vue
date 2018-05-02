<template>
    <div class="record-tab">
        <div :class="[choose == index?'record-tab__item--active':'record-tab__item']" v-for="(item,index) in list" :key="index" @click="tab(index)">{{item}}
            <i class="line"></i>
        </div>
        <div class="record-tab__back" @click="back()"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: ['投资项目', '债权承接']
        }
    },
    computed: {
        choose() {
            return this.$store.state.record.choose
        }
    },
    methods: {
        //切换
        tab(index) {
            this.$store.commit('CHANGE_RECORD', index);
            if (index == 1) {
                this.$store.commit('LOAD_RECORD_CREDITOR');
            }
            // if (index == 0) {
            //     this.$store.commit('LOAD_NEWS');
            // }
        },
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.record-tab {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: .88rem;
    background: #fff;
    border-bottom: 1px solid #eee;
    &__back{
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: .27rem;
        left: .23rem;
        background: url('../../assets/img/header_black_back.png') no-repeat center center;
        background-size: .15rem .25rem;
    }
    .line {
        position: absolute;
        width: .24rem;
        height: .04rem;
        bottom: 0;
        left: 50%;
        margin-left: -.12rem;
        background: #ff5a59;
        display: none;
    }
    &__item {
        font-size: .3rem;
        line-height: .88rem;
        color: #666;
        position: relative;
        height: .88rem;
        &--active {
            @extend .record-tab__item;
            color: #ff5a59;
            .line {
                display: block;
            }
        }
        &:nth-child(1) {
            margin-right: 0.85rem;
        }
    }
}
</style>
