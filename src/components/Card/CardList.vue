<template>
    <div class="card-list">
        <div class="card-list__tip">
            提醒：<br> 1、使用快捷充值自动绑卡；
            <br> 2、仅未提现成功的银行卡可修改所属银行信息
            <br>
        </div>
        <div class="card-list__content" v-if="hasCard">
            <card-item v-for="(item,index) in list" :key="index" :info="item"></card-item>
        </div>
        <div class="empty" v-else></div>
    </div>
</template>
<script>
import CardItem from './CardItem'
export default {
    data() {
        return {
            list: [],
            hasCard: null
        }
    },
    activated(){
        this.getCardList()
    },
    components: {
        'card-item': CardItem
    },
    methods: {
        getCardList() {
            var _this = this;
            this.$http.get('/user/banklist')
                .then(function(res) {
                    if (res.data.returnData.list.length > 0) {
                        _this.hasCard = true;
                    } else {
                        _this.hasCard = false;
                    }
                    _this.list = res.data.returnData.list
                })
        },
    }
}
</script>

<style lang="scss" scoped>
.card-list {
    min-height: 100%;
    background: #fff;
    padding: .3rem .25rem;
    &__tip {
        font-size: .26rem;
        line-height: .5rem;
        color: #ff6464;
        padding: 0 .45rem;
    }
    &__content {
        margin-top: 0.53rem;
    }
}
</style>
