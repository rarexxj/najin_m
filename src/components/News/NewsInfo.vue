<template>
    <div class="news-info">
        <my-header :border="border"></my-header>
        <div class="scroll-box">
            <div class="news-info__content">
                <div class="news-info__content__title">{{info.title}}</div>
                <div class="news-info__content__time">发布时间：{{info.create_at}}</div>
                <div class="news-info__content__info" v-html="info.content">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../Common/Header'
import {
    Indicator
} from 'mint-ui';
export default {
    name: 'newsinfo',
    data() {
        return {
            border: true,
            info: {}
        }
    },
    components: {
        'my-header': Header
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            Indicator.open()
            let _this = this;
            this.$http.get('/news/info?id=' + this.$route.query.id)
                .then(function(res) {
                    _this.info = res.data.returnData;
                    Indicator.close();
                }).catch(function() {
                    Indicator.close()
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.news-info {
    padding-top: 0.88rem;
    height: 100%;
    background: #fff;
    &__content {
        padding: .6rem .3rem;
        &__title {
            width: 95%;
            margin: 0 auto;
            text-align: center;
            font-size: .48rem;
            line-height: .6rem;
        }
        &__time {
            font-size: .24rem;
            line-height: 1;
            text-align: center;
            margin-top: 0.35rem;
            color: #999;
        }
        &__info {
            margin-top: 0.55rem;
            font-size: .34rem;
            line-height: .6rem;
            img {
                max-width: 100%;
                ;
            }
        }
    }
}
</style>


