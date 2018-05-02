<template>
  <div class="notice">
    <!--轮播公告-->
    <div class="notice__list bb">
      <ul class="notice__list__ul" :style="{marginTop:mt+'rem'}">
        <router-link tag="li" :to="{name:'newsinfo',query:{id:item.id}}" class="notice__list__item text-ovh" v-for="(item,index) in list" :key="index">{{item.content}}</router-link>
      </ul>
    </div>
    <!--轮播公告-->

    <div class="notice__bot">
      <!--累计成交金额-->
      <div class="notice__bot__item">
        <div class="notice__bot__item__left">
          <div class="notice__bot__item__number">{{total | formatNumber}}
            <span>万元</span>
          </div>
          <div class="notice__bot__item__text">累计成交额</div>
        </div>
        <div class="notice__bot__money__icon"></div>
      </div>
      <!--累计成交金额-->

      <!--新手指导-->
      <router-link tag="div" :to="{name:'help'}" class="notice__bot__item">
        <div class="notice__bot__item__left">
          <div class="notice__bot__item__word">入门宝典</div>
          <div class="notice__bot__item__text">新手指导</div>
        </div>
        <div class="notice__bot__novice__icon"></div>
      </router-link>
      <!--新手指导-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      time: null,
      list: [],
      total:0
    }
  },
  computed: {
    mt() {
      return -this.index * .86
    }
  },
  methods: {
    //初始化定时器
    scrollNotice() {
      this.time = setInterval(() => {
        this.work()
      }, 5000)
    },
    //定时工作内容
    work() {
      if (this.index == this.list.length - 1) {
        this.index = 0
      } else {
        this.index++;
      }
    },
    //获取公告列表
    getNotice() {
      var _this = this;
      this.$http.get('/news/list?type=-2&page=1&size=10')
        .then(function(res) {
          _this.list = res.data.returnData.list;
          _this.scrollNotice();
        })
    },
    //获取成交额
    getTotalInfo() {
      var _this = this;
      this.$http.get('/common/totalInfo')
        .then(function(res) {
         _this.total = ((res.data.returnData.total_investment)/1000).toFixed(1);
        })
    }
  },
  mounted() {
    this.getTotalInfo()
    this.getNotice()
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.notice {
  background: #fff;
  width: 100%;
  height: 2.3rem;
  &__list {
    height: .86rem;
    padding-left: .9rem;
    background: url("../../assets/img/index_notice_icon.png") no-repeat .3rem center;
    background-size: .24rem .28rem;
    overflow: hidden;
    &__ul {
      transition: all .3s;
    }
    &__item {
      width: 100%;
      height: .86rem;
      line-height: .86rem;
      font-size: .26rem;
      color: #666;
    }
  }
  &__bot {
    display: flex;
    height: 1.4rem;
    &__item {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      &__left {
        padding-left: .40rem;
        padding-top: .16rem;
      }
      &__number {
        font-size: .3rem;
        line-height: .58rem;
        color: #ff5a59;
        span {
          font-size: .22rem;
          color: #333;
        }
      }
      &__text {
        font-size: .24rem;
        line-height: 1;
        color: #999;
        margin-top: .1rem;
      }
      &__word {
        font-size: .28rem;
        line-height: .58rem;
        color: #ffb631;
      }
    }
    &__money {
      &__icon {
        width: 1.4rem;
        height: 1.3rem;
        background: url("../../assets/img/index_notice_money.png") no-repeat;
        background-size: contain;
      }
    }
    &__novice {
      &__icon {
        width: 1.4rem;
        height: 1.3rem;
        background: url("../../assets/img/index_notice_novice.png") no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>
