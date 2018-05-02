<template>
    <div class="agreement">
        <div class="agreement__header  border">
            <div class="agreement__header__back" @click="hide()"></div>
            <div class="agreement__header__title text-ovh">{{title}}</div>
        </div>
        <div class="scroll-box">
            <div class="agreement__content" v-html="content"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['content','title'],
    methods:{
        hide(){
            this.$emit('hide')
        }
    }
}
</script>

<style lang="scss" scoped>
.agreement {
    width: 100%;
    height: 100%;
    background: #fff;
    padding-top: 0.88rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 41;
    &__content {
        padding: .3rem;
        font-size: .3rem;
        line-height: .6rem;
        color: #666;
        img{
            max-width: 100%;
        }
    }
    &__header {
        height: .88rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #e1e1e1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        &__title {
            width: 5rem;
            font-size: .34rem;
            line-height: 1;
            text-align: center;
            color: #333;
        }
        &__back {
            width: 0.3rem;
            height: 0.3rem;
            position: absolute;
            top: .27rem;
            left: .23rem;
            background: url('../../assets/img/header_black_back.png') no-repeat center center;
            background-size: .15rem .25rem;
        }
    }
}
</style>
