<template>
    <div class="content">
        <div class="content__titles">
            <div :class="['content__titles__item',type == index?'cur':'']" v-for="(item,index) in list" :key="index" @click="tab(index)">{{item}}
                <i class="line"></i>
            </div>
        </div>
        <div class="content__info" v-html="content"></div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            content: '',
            type:0,
            list: ['项目详情', '借款信息', '风险措施', '合同模板'],
        }
    },
    computed: mapState({
        detail: state => state.projectinfo.projectInfo.detail,  //项目详情
        agreement: state => state.projectinfo.projectInfo.agreement,  //合同模板
        measure: state => state.projectinfo.projectInfo.measure,  //风险措施
        loan_info: state => state.projectinfo.projectInfo.loan_info,  //借款信息
    }),
    watch: {
        detail() {
            this.content = this.detail;
        }
    },
    mounted(){
        this.content = this.detail;
    },
    methods: {
        tab(index) {
            this.type = index;
            switch (index) {
                case 0:
                    this.content = this.detail;
                    break;
                case 1:
                    this.content = this.loan_info;
                    break;
                case 2:
                    this.content = this.measure;
                    break;
                case 3:
                    this.content = this.agreement;
                    break;
            }
        },
    }
}
</script>

<style scoped lang="scss">
.content {
    margin-top: 0.3rem;
    background: #fff;
    &__titles {
        display: flex;
        height: 1rem;
        border-bottom: 1px solid #eee;
        &__item {
            flex: 1;
            height: 1rem;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .26rem;
            line-height: 1;
            color: #999;
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
            &.cur {
                color: #ff5a59;
                .line {
                    display: block;
                }
            }
        }
    }
    &__info {
        width: 100%;
        min-height: 2rem;
        padding: .38rem .3rem;
        font-size: .28rem;
        line-height: .56rem;
        color: #666;
        img {
            max-width: 100%;
            ;
        }
    }
}
</style>