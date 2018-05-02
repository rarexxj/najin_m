<template>
    <router-link tag="div" :to="{name:'newsinfo',query:{id:info.id}}" class="notice-item">
        <div class="notice-item__time">
            <div class="notice-item__time__month">{{info.create_at.split('-')[1]}}月</div>
            <div class="notice-item__time__day">{{info.create_at.split('-')[2]}}</div>
        </div>
        <div class="notice-item__content">
            <div class="notice-item__content__text">{{info.content}}</div>
        </div>
    </router-link>
</template>
<script>
export default {
  props:['info']
}
</script>

<style lang="scss" scoped>
.notice-item {
    display: flex;
    justify-content: space-between;
    padding: .4rem 0;
    &__time {
        width: 0.5rem;
        height: 0.6rem;
        background: #ffb23c;
        border-radius: .04rem;
        color: #fff;
        margin-top: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__month {
            font-size: .2rem;
            line-height: 1;
        }
        &__day {
            font-size: .24rem;
            line-height: 1;
        }
    }
    &__content {
        width: 5.9rem;
        font-size: .32rem;
        line-height: .49rem;
        height: 1.38rem;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid #eee;
        &__text {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
}
</style>
