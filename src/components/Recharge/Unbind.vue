<template>
    <div class="unbind">
        <div class="unbind__icon"></div>
        <div class="unbind__text">
            您的账户尚未实名认证，请前 <br> 往认证。
        </div>
        <router-link tag="div" :to="{name:'safe'}" class="unbind__btn">去认证</router-link>
    </div>
</template>
<style lang="scss" scoped>
.unbind {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__icon {
        width: 1.33rem;
        height: 1.52rem;
        background: url('../../assets/img/recharge_unbind.png') no-repeat;
        background-size: contain;
    }
    &__text {
        font-size: .3rem;
        line-height: .42rem;
        color: #666;
        text-align: center;
        margin-top: 0.46rem;
    }
    &__btn {
        box-sizing: content-box;
        width: 2.4rem;
        height: .66rem;
        border: 1px solid #ff5b5a;
        text-align: center;
        color: #ff5a59;
        font-size: .24rem;
        line-height: .66rem;
        border-radius: .33rem;
        margin-top: 0.87rem;
    }
}
</style>
